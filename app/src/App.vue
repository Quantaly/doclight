<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Doclight</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon disabled>
        <v-icon>save_alt</v-icon>
      </v-btn>
      <v-btn icon disabled>
        <v-icon>share</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-text-field label="Document title"></v-text-field>
      </v-container>

      <v-btn fixed bottom right fab dark color="primary" aria-label="Add photo">
        <v-icon>camera_alt</v-icon>
      </v-btn>
    </v-main>

    <v-navigation-drawer v-model="drawer" app>
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
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  drawer = null;
}
</script>
