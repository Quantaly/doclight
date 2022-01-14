<template>
  <div class="container">
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
        @click="$store.commit('moveImageLeft', i)"
      >
        <v-icon>chevron_left</v-icon>
      </v-btn>
      <v-btn tile @click="$store.commit('deleteImage', i)">
        <v-icon>clear</v-icon>
      </v-btn>
      <v-btn
        tile
        :disabled="i === $store.state.images.length - 1"
        @click="$store.commit('moveImageRight', i)"
      >
        <v-icon>chevron_right</v-icon>
      </v-btn>
    </div>
    <div class="container-padding"></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-bottom: 16px;
  padding: 16px 0;
  overflow-x: scroll;
  display: flex;
  gap: 14px;

  background-color: lightgrey;
  @media (prefers-color-scheme: dark) {
    background-color: #222;
  }
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

@Component({})
export default class ImageList extends Vue {}
</script>