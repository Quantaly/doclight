<template>
  <div>
    <v-snackbar v-model="downloadSuccess" color="green">
      Export successful.
    </v-snackbar>

    <v-snackbar v-model="downloadError" color="red">
      An unexpected error occurred. One or more images may be corrupted.
    </v-snackbar>

    <v-snackbar v-model="pwaPrompt" vertical timeout="-1">
      Install as an app for the best experience!

      <template v-slot:action="{ attrs }">
        <v-btn color="primary" v-bind="attrs" @click="installPwa">Yes</v-btn>
        <v-btn text v-bind="attrs" @click="dismissPwaPrompt">No</v-btn>
        <v-btn text v-bind="attrs" @click="permaDismissPwaPrompt"
          >Don't show again</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Snackbars extends Vue {
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

  // TODO maybe figure out a way of automating these getters/setters?
  get downloadSuccess(): boolean {
    return this.$store.state.snackbars.downloadSuccess;
  }

  set downloadSuccess(v: boolean) {
    this.$store.commit(
      v ? "snackbars/show" : "snackbars/hide",
      "downloadSuccess"
    );
  }

  get downloadError(): boolean {
    return this.$store.state.snackbars.downloadError;
  }

  set downloadError(v: boolean) {
    this.$store.commit(
      v ? "snackbars/show" : "snackbars/hide",
      "downloadError"
    );
  }

  get pwaPrompt(): boolean {
    return this.$store.state.snackbars.pwaPrompt;
  }

  set pwaPrompt(v: boolean) {
    this.$store.commit(v ? "snackbars/show" : "snackbars/hide", "pwaPrompt");
  }
}
</script>