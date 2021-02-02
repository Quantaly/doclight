module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/doclight/'
        : '/',

    transpileDependencies: [
        'vuetify',
    ],

    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Doclight';
            return args;
        });
    }
};
