import path from "path";
//nuxt router 改在這裡定義

export default [{
        name: 'testRouter',
        path: '/demo/testRouter',
        component: path.resolve(__dirname, 'pages/demo/tpl.vue'),
    },
    {
        name: 'index',
        path: '/',
        component: path.resolve(__dirname, 'pages/index.vue'),
    }
];