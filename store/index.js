import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import API from '~/api.js';

export const state = () => ({
    test_data: {
        aaa: 1,
        bbb: "string"
    },
    courses: [],
    isUserLoggedIn: false, //是否登入
    userPicture: "", //會員照片
    userName: "", //會員名稱
    userUid: "", //會員 firebase 的 uid

})

export const getters = {
    get_aaa: state => {
        return state.test_data.aaa;
    },
    get_aaabbb: state => {
        return state.test_data.aaa + state.test_data.bbb;
    },
}

export const mutations = {
    setUserLoggedIn: (state, payload) => {
        state.isUserLoggedIn = true;
        state.userPicture = payload.userPicture || "https://bulma.io/images/placeholders/128x128.png";
        state.userName = payload.userName;
        state.userUid = payload.userUid;

        if (process.client) {
            Cookie.set("id_token", payload.id_token);
            Cookie.set("refresh_token", payload.refresh_token);
            Cookie.set('userUid', state.userUid);
            Cookie.set('userPicture', state.userPicture);
            Cookie.set('userName', state.userName);
        }

    },
    setUserlogout: (state, payload) => {
        state.isUserLoggedIn = false;
        state.userPicture = "",
            state.userName = ""
        Cookie.remove('id_token');
        Cookie.remove('refresh_token');
        Cookie.remove('userUids');
        Cookie.remove('userPicture');
        Cookie.remove('userName');
        $nuxt.$router.push({ name: 'index' });
    },
    add_test_data: (state, payload) => {
        state.test_data.title = payload.title
        state.test_data.aaa++;
    },
    set_courses: (state, payload) => {
        state.courses = payload.courses
    },
    set_userFavorite: (state, payload) => {
        state.userFavorite = payload || {};
    }
}

export const actions = {
    nuxtServerInit({ commit }, context) {




        //這邊是給 Oauth 回來時提早觸發
        if (context.query.id_token && context.query.refresh_token) {
            let id_token_Decode = jwtDecode(context.query.id_token);
            commit('setUserLoggedIn', {
                id_token: context.query.id_token,
                refresh_token: context.query.refresh_token,
                userUid: id_token_Decode.user_id,
                userPicture: id_token_Decode.picture,
                userName: id_token_Decode.name,
            });

            context.app.$cookies.set("id_token", context.query.id_token);
            context.app.$cookies.set("refresh_token", context.query.refresh_token);
            context.app.$cookies.set("userUid", id_token_Decode.user_id);
            context.app.$cookies.set("userPicture", id_token_Decode.picture);
            context.app.$cookies.set("userName", id_token_Decode.name);
            return
        }
        if (context.app.$cookies.get('id_token')) {

            let picture = context.app.$cookies.get('userPicture');
            let name = context.app.$cookies.get('userName');
            let uid = context.app.$cookies.get('userUid');
            commit('setUserLoggedIn', {
                userPicture: picture,
                userName: name,
                userUid: uid
            });

        }

        // //這邊是給重整時觸發
        // if (!!context.req.headers.cookie) {
        //     if (context.req.headers.cookie.indexOf("id_token=") > -1) {
        //         //nuxtServerInit 取得 cookie的方式和前端不同;
        //         console.log(context.req.headers.cookie, 'context.req.headers.cookie');
        //         let picture = decodeURI(context.req.headers.cookie.split("userPicture=")[1].split(" ")[0]);
        //         let name = decodeURI(unescape(context.req.headers.cookie.split("userName=")[1].split(" ")[0]));
        //         let uid = decodeURI(context.req.headers.cookie.split("userUid=")[1].split(" ")[0]);
        //         commit('setUserLoggedIn', {
        //             userPicture: picture,
        //             userName: name,
        //             userUid: uid
        //         });
        //     }
        // }


    },

    async ajaxTest({ commit, getters }, payload) {
        let data = await this.$axios("/api/test");
        // console.log(data.data, 'data.data');
        getters[_M.SET_CONFIG_URL]
        commit('add_test_data', {
            title: data.data
        });
    },
    async get_courses({ commit }) {
        let data = await this.$axios('api/courses')
        commit('get_courses', {...data.data })
    }


}