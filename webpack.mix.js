let mix = require("laravel-mix")

mix.webpackConfig({
  "module": {
    "rules": [
      {
        "test": /jsx$/,
        "exclude": /node_modules/,
        "loader": "babel-loader" + mix.config.babelConfig()
      }
    ]
  }
})

mix.js("assets/js/app.jsx", "public/js")
mix.sass("assets/css/app.scss", "public/css")

mix.js("assets/js/embed.jsx", "public/js")
mix.js("assets/js/plain-embed.jsx", "public/js")
mix.sass("assets/css/embed.scss", "public/css")
