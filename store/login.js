export const state = () => ({
    test_data: {
        aaa: 1,
        bbb: "string"
    }
});

export const getters = {
    [_M.SET_CONFIG_URL]: state => {
        // alert('this');
        return state.test_data.aaa;
    },
    // get_aaabbb: state => {
    //     return state.test_data.aaa + state.test_data.bbb;
    // },
}

export const mutations = {

    add_test_data: (state, payload) => {
        state.test_data.title = payload.title
        state.test_data.aaa++;
    },
}

export const actions = {
    async [_M.REMOVE_DATA]({ commit }, payload) {
        let data = await this.$axios("/api/test");
        alert('111');
        console.log(data.data, 'data.data');

        commit('add_test_data', {
            title: data.data
        });
    }
}

export const namespaced = false;