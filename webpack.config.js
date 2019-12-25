const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./js/main.js",
    output: {
        path: path.resolve(__dirname, "./js"),
        filename: "main-bundled.js"
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [{
            test: /\.hbs$/,
            use: [{
                loader: "handlebars-loader",
                options: { helperDirs: path.resolve(__dirname, "./js/helpers") }
            }]
        }]
    }
};