module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Doclight';
      return args;
    });
  },

  lintOnSave: false,

  publicPath: process.env.NODE_ENV === 'production'
    ? '/doclight/'
    : '/',

  pwa: {
    name: 'Doclight',
    themeColor: '#3f51b5',
    manifestOptions: {
      'background_color': '#3f51b5',
      'description': 'A PDF scanning app that does not suck.',
    },
  },

  transpileDependencies: [
    'vuetify',
  ],
};
