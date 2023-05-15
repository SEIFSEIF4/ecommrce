const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    publicPath: "/",
    path: path.join(__dirname, "/app"),
    filename: "[name].js",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "/app"),
    },
    port: 8081,
    compress: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },

      {
        test: /.s?css$/,
        exclude: /bootstrap\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      {
        test: /bootstrap\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "rtl-css-loader", "sass-loader"],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: "./images/[name][ext]"
        }
      },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "./fonts/[name][ext]"
        }
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/css/style.css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "checkout.html",
      template: "./src/checkout.html",
    }),
    new HtmlWebpackPlugin({
      filename: "product.html",
      template: "./src/product.html",
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: "./src/contact.html",
    }),
    new HtmlWebpackPlugin({
      filename: "search.html",
      template: "./src/search.html",
    }),
    new HtmlWebpackPlugin({
      filename: "payment.html",
      template: "./src/payment.html",
    }),
  ],
};
