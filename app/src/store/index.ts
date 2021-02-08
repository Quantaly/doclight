import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

type PwaEvent = {
  prompt: () => Promise<void>;
};

export default new Vuex.Store({
  state: {
    documentName: "",
    images: [] as string[],
    pwaEvent: null as (PwaEvent | null),
  },
  mutations: {
    setName(state, newName: string) {
      state.documentName = newName;
    },
    addImage(state, blob: Blob) {
      state.images.push(URL.createObjectURL(blob));
    },
    swapImageLeft(state, i: number) {
      if (i > 0 && i < state.images.length) {
        const tmp = state.images[i - 1];
        Vue.set(state.images, i - 1, state.images[i]);
        Vue.set(state.images, i, tmp);
      }
    },
    swapImageRight(state, i: number) {
      if (i >= 0 && i < state.images.length - 1) {
        const tmp = state.images[i + 1];
        Vue.set(state.images, i + 1, state.images[i]);
        Vue.set(state.images, i, tmp);
      }
    },
    deleteImage(state, i: number) {
      URL.revokeObjectURL(state.images.splice(i, 1)[0]);
    },
    storePwaEvent(state, e: PwaEvent) {
      state.pwaEvent = e;
    },
  },
  modules: {
    snackbars: {
      namespaced: true,
      state: {
        $load: false,
        downloadSuccess: false,
        downloadError: false,
        pwaPrompt: false,
      },
      mutations: {
        show(state, name: string) {
          if (name !== "$load") {
            state.$load = true;
            state[name] = true;
          }
        },
        hide(state, name: string) {
          if (name !== "$load") {
            state[name] = false;
          }
        },
      },
    }
  },
  strict: process.env.NODE_ENV !== 'production',
});
