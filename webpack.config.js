const webpack = require("webpack");
const path = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
require("file-loader");

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    entry: "./src/ui/ui.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/webui")
    },
    mode: "development",
    
    // Add the loader for .ts files.
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: "awesome-typescript-loader"
        },
        { 
            test: /\.html/, 
            use: "file-loader?name=[name].[ext]" 
        },
        {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    },
    node: {
        fs: "empty",
        readline: "empty"
    },
    watch : true,
    devServer: {
        contentBase: path.join(__dirname, "dist/webui"),
        compress: true,
        port: 9000
    },
    plugins: [
        new CheckerPlugin(),
    ]
};
