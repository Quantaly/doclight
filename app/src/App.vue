<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>Doclight</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        :disabled="$store.state.images.length === 0"
        @click="downloadPdf"
      >
        <v-icon>save_alt</v-icon>
      </v-btn>
      <!-- <v-btn icon disabled>
        <v-icon>share</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-text-field label="Document title" v-model="name"></v-text-field>

        <image-list v-if="$store.state.images.length > 0"></image-list>

        <div class="capture-unsupported-warning" v-if="!imageCaptureSupported">
          <p>
            Doclight is best used from a mobile browser that
            <a href="https://caniuse.com/html-media-capture"
              >supports media capture</a
            >.
          </p>
          <p>
            You can still select JPEG images from this device to convert to a
            PDF.
          </p>
        </div>
      </v-container>

      <v-btn
        fixed
        bottom
        right
        fab
        dark
        color="primary"
        aria-label="Add photo"
        @click="addImage"
      >
        <v-icon>{{
          imageCaptureSupported ? "camera_alt" : "add_photo_alternate"
        }}</v-icon>
      </v-btn>
    </v-main>

    <!-- <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Some document</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>delete</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <snackbars v-if="$store.state.snackbars.$load"></snackbars>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { detectImageCapture } from "./feature-detection";
import wasm from "./wasm";

@Component({
  components: {
    Snackbars: () => import("./components/Snackbars.vue"),
    ImageList: () => import("./components/ImageList.vue"),
  },
})
export default class App extends Vue {
  drawer = null;
  imageCaptureSupported = true;

  created() {
    this.imageCaptureSupported = detectImageCapture();
    const now = new Date();
    this.name =
      `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()} ` +
      `${now.getHours()}:` +
      `${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.$store.commit("storePwaEvent", e as any);

      if (
        !localStorage.getItem("doclight:pwaPromptDontShow") &&
        this.imageCaptureSupported
      ) {
        this.$store.commit("snackbars/show", "pwaPrompt");
      }
    });
  }

  get name(): string {
    return this.$store.state.documentName;
  }

  set name(newName: string) {
    this.$store.commit("setName", newName);
  }

  addImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg";
    input.setAttribute("capture", "environment");
    input.style.display = "none";
    input.addEventListener("input", () => {
      if (input?.files?.[0]) {
        this.$store.commit("addImage", input.files[0]);
      }
    });
    document.body.appendChild(input);
    input.click();
    input.remove();
  }

  async createPdf(): Promise<Blob | null> {
    const w = await wasm;
    const job = w.PdfJob.new();
    for (const src of this.$store.state.images) {
      job.add_image(new Uint8Array(await (await fetch(src)).arrayBuffer()));
    }
    try {
      const result = job.create_pdf();
      return new Blob([result], { type: "application/pdf" });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async downloadPdf() {
    const blob = await this.createPdf();
    if (blob) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${this.$store.state.documentName}.pdf`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
      this.$store.commit("snackbars/show", "downloadSuccess");
    } else {
      this.$store.commit("snackbars/show", "downloadError");
    }
  }
}
</script>
