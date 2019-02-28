let config = require('./config')

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'Vue_template',
        script: [
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.4.2/jquery.fancybox.min.js' }
        ],
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Vue_template' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.4.2/jquery.fancybox.min.css' }
        ]
    },
    modules: [
        '~/io',
        '@nuxtjs/axios',
        'bootstrap-vue/nuxt'
    ],
    env: {
        API_URL: config.API_URL,
        API_URL_BROWSER: config.API_URL_BROWSER,
        WEBSOCKETS_URL: config.WEBSOCKETS_URL
    },

    axios: {
        baseURL: config.API_URL,
        browserBaseURL: config.API_URL_BROWSER
    },
    plugins: [
        { src: '~/plugins/axios.js' }
    ],
    /*
    ** Global CSS
    */
    // css: ['~/assets/scss/application.scss'],
    /*
    ** Add axios globally
    */
    build: {
        // extractCSS: true,
        vendor: [
            'axios',
            'traverse',
            'lodash',
            'socket.io-client',
            'vue-notifications'
        ],
        maxChunkSize: 300000,
        /*
        ** Run ESLINT on save
        */
        extend(config, ctx) {
            if (ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
