const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    // Use `include` vs `exclude` to whitelist vs blacklist
                    path.resolve(__dirname, 'src'), // Whitelist your app source files
                    require.resolve('bootstrap-vue') // Whitelist bootstrap-vue
                ],
                loader: 'babel-loader'
            }
        ]
    }
}