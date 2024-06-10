import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isMenuShown: false,
    links: [
      { route: 'Dash', label: 'Dash' },
    ],
  }),
  actions: {
    updateMenu(isShown) {
      this.isMenuShown = isShown;
    },
  },
});
