<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>Doclight</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :disabled="images.length === 0" @click="downloadPdf">
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
          <div class="image-display" v-for="(src, i) in images" :key="src">
            <img :src="src" />
            <v-btn tile :disabled="i === 0" @click="swapImageLeft(i)">
              <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-btn tile @click="deleteImage(i)">
              <v-icon>clear</v-icon>
            </v-btn>
            <v-btn
              tile
              :disabled="i === images.length - 1"
              @click="swapImageRight(i)"
            >
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </div>
          <div class="container-padding"></div>
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
        <v-icon>camera_alt</v-icon>
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

    <v-snackbar v-model="snackbars.downloadSuccess" color="green">
      Export successful.
    </v-snackbar>

    <v-snackbar v-model="snackbars.downloadError" color="red">
      An unexpected error occurred. One or more images may be corrupted.
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
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import wasm from "./wasm";

@Component({})
export default class App extends Vue {
  drawer = null;
  name = "";
  images: string[] = [];

  snackbars = {
    downloadSuccess: false,
    downloadError: false,
  };

  created() {
    const now = new Date();
    this.name =
      `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()} ` +
      `${now.getHours()}:` +
      `${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
  }

  addImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg";
    input.setAttribute("capture", "environment");
    input.style.display = "none";
    input.addEventListener("input", () => {
      if (input?.files?.[0]) {
        this.images.push(URL.createObjectURL(input.files[0]));
      }
    });
    document.body.appendChild(input);
    input.click();
    input.remove();
  }

  swapImageLeft(i: number) {
    const tmp = this.images[i - 1];
    this.$set(this.images, i - 1, this.images[i]);
    this.$set(this.images, i, tmp);
  }

  swapImageRight(i: number) {
    const tmp = this.images[i + 1];
    this.$set(this.images, i + 1, this.images[i]);
    this.$set(this.images, i, tmp);
  }

  deleteImage(i: number) {
    URL.revokeObjectURL(this.images.splice(i, 1)[0]);
  }

  async createPdf(): Promise<Blob | null> {
    const w = await wasm;
    const job = w.PdfJob.new();
    for (const src of this.images) {
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
      a.download = `${this.name}.pdf`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
      this.snackbars.downloadSuccess = true;
    } else {
      this.snackbars.downloadError = true;
    }
  }
}
</script>
