<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
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
        <v-text-field label="Document name" v-model="name"></v-text-field>

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

      <v-speed-dial
        v-if="imageCaptureSupported"
        v-model="speedDial"
        fixed
        bottom
        right
        dark
      >
        <template v-slot:activator>
          <v-btn
            fab
            color="primary"
            aria-label="Add photo"
            @click.stop="addImage"
            @contextmenu.prevent="speedDial = true"
            ><v-icon>camera_alt</v-icon></v-btn
          >
        </template>
        <v-btn
          fab
          small
          color="primary"
          aria-label="Add photo from device"
          @click.stop="addImage(false)"
          ><v-icon>add_photo_alternate</v-icon></v-btn
        >
      </v-speed-dial>
      <v-btn
        v-else
        fixed
        bottom
        right
        fab
        dark
        color="primary"
        aria-label="Add photo"
        @click="addImage(false)"
      >
        <v-icon>add_photo_alternate</v-icon>
      </v-btn>
    </v-main>

    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            href="https://github.com/Quantaly/doclight"
            target="_blank"
          >
            <v-list-item-action>
              <v-icon>code</v-icon>
            </v-list-item-action>
            <v-list-item-content> View source code </v-list-item-content>
          </v-list-item>
          <v-list-item
            href="https://github.com/Quantaly/doclight/issues/new"
            target="_blank"
          >
            <v-list-item-action>
              <v-icon>bug_report</v-icon>
            </v-list-item-action>
            <v-list-item-content>Report an issue</v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <snackbars v-if="$store.state.snackbars.$load"></snackbars>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { detectImageCapture } from "./feature-detection";
import sanitizeFilename from "./filename-sanitization";
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
  speedDial = false;

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
        this.imageCaptureSupported // don't prompt for "the best experience" if the main functionality is gutted
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

  addImage(capture = true) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg";
    if (capture && "capture" in input) {
      (input as { capture: boolean }).capture = true;
    }
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
      a.download = `${sanitizeFilename(this.$store.state.documentName)}.pdf`;
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
