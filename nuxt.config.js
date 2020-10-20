import router from "./router.js";
import webpack from 'webpack';

console.log(process.env.NODE_ENV, "nuxt.config.js")


export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'project001',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [

            { src: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.js" }
        ]

    },
    loading: { color: '#40659b', height: "2px", duration: 5000 },
    transition: {
        name: 'layout',
        mode: 'out-in'
    },


    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '~/assets/scss/main.scss'
    ],
    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: '~/plugins/datepicker.js', mode: 'client' },
        { src: '~/plugins/gsap.js', mode: 'client' },
        { src: '~/plugins/qs.js' },
        { src: '~/plugins/axios.js' },
    ],


    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [

        ['@nuxtjs/dotenv', { filename: '.env.' + process.env.NODE_ENV }] //這是給其他 .env 使用
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        'cookie-universal-nuxt',

    ],
    // proxy: [
    //     'http://localhost:3034/api'
    // ],

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        loaders: {
            imgUrl: { limit: 1000 },
        },
        plugins: [
            new webpack.ProvidePlugin({
                _M: "~/constants.js",
            })
        ],

        extend(config, ctx) {
            console.log(config.module.rules);
        },
        postcss: {
            preset: {
                autoprefixer: {
                    browsers: ["last 1 versions"]
                }
            }
        }

    },
    router: {
        //這段可以不用寫
        extendRoutes(routes, resolve) {
            // return router
        }
    },
    serverMiddleware: [
        // { path: '/api', handler: '~/server/api.js' },
        { path: '/auth', handler: '~/server/auth.js' },
    ],
    // env: {
    //     firebaseApiKey: "AIzaSyAhoow1udQz0A9ChImK4Fz7I1Y9JlsblOs"
    // },




}