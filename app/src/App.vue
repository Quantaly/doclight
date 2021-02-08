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

        <div class="image-container" :class="{ 'no-overflow-x': drawer }">
          <div class="container-padding"></div>
          <div
            class="image-display"
            v-for="(src, i) in $store.state.images"
            :key="src"
          >
            <img :src="src" />
            <v-btn
              tile
              :disabled="i === 0"
              @click="$store.commit('swapImageLeft', i)"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-btn tile @click="$store.commit('deleteImage', i)">
              <v-icon>clear</v-icon>
            </v-btn>
            <v-btn
              tile
              :disabled="i === $store.state.images.length - 1"
              @click="$store.commit('swapImageRight', i)"
            >
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </div>
          <div class="container-padding"></div>
        </div>

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

    <!-- TODO these currently modify the state directly instead of through mutations -->
    <v-snackbar v-model="$store.state.snackbars.downloadSuccess" color="green">
      Export successful.
    </v-snackbar>

    <v-snackbar v-model="$store.state.snackbars.downloadError" color="red">
      An unexpected error occurred. One or more images may be corrupted.
    </v-snackbar>

    <v-snackbar v-model="$store.state.snackbars.pwaPrompt" vertical timeout="-1">
      Install as an app for the best experience!

      <template v-slot:action="{ attrs }">
        <v-btn color="primary" v-bind="attrs" @click="installPwa">Yes</v-btn>
        <v-btn text v-bind="attrs" @click="dismissPwaPrompt">No</v-btn>
        <v-btn text v-bind="attrs" @click="permaDismissPwaPrompt"
          >Don't show again</v-btn
        >
      </template>
    </v-snackbar>
  </v-app>
</template>

<style lang="scss">
.image-container {
  padding: 18px 0;
  background-color: lightgrey;
  overflow-x: scroll;
  display: flex;
  gap: 16px;
}

.no-overflow-x {
  overflow-x: hidden !important;
}

.container-padding {
  min-width: 2px;
}

.image-display {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto auto;
  grid-template-areas: "img img img" "left delete right";
  gap: 4px;
}

img {
  grid-area: img;
  max-height: 50vh;
  margin: auto;
}

.capture-unsupported-warning {
  margin-top: 16px;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { detectImageCapture } from "./feature-detection";
import wasm from "./wasm";

@Component({})
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

  get name() {
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

  installPwa() {
    this.$store.commit("snackbars/hide", "pwaPrompt");
    this.$store.state.pwaEvent?.prompt();
  }

  dismissPwaPrompt() {
    this.$store.commit("snackbars/hide", "pwaPrompt");
  }

  permaDismissPwaPrompt() {
    this.$store.commit("snackbars/hide", "pwaPrompt");
    localStorage.setItem("doclight:pwaPromptDontShow", "f");
  }
}
</script>
