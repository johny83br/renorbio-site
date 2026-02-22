const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@BASICS": resolve("src/components/basics"),
        "@MODULES": resolve("src/components/modules/"),
        "@PAGES": resolve("src/components/pages"),
        "@STYLES": resolve("src/styles/"),
      },
    },
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/styles/variables.scss`
        additionalData: '@import "@/styles/main.scss";',
      },
    },
  },
  chainWebpack: config => {
    // remove the prefetch plugin
    config.plugins.delete("prefetch");
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.whitespace = "preserve"; // or 'condense'
        return options;
      });
  },
};
