import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "md",
    },
    theme: {
        themes: {
            light: {
                primary: colors.indigo,
            },
            dark: {
                primary: colors.indigo,
            }
        },
    },
});
