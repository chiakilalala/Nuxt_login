<template>
  <div style="display: inherit">
    <div v-if="!isUserLoggedIn" class="navbar-item">
      <div class="field is-grouped">
        <p class="control">
          <a class="button is-rounded is-small" @click="$emit('loginClick')">
            <span>登入</span>
          </a>
        </p>
        <p class="control">
          <a
            class="button is-primary is-rounded is-small"
            @click="$emit('registeredClick')"
          >
            <span>註冊</span>
          </a>
        </p>
      </div>
    </div>
    <div v-else class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        <figure
          v-if="1 == 1"
          class="image is-32x32"
          style="margin-right: 10px; display: inline-block"
        >
          <img
            style="max-height: inherit"
            class="is-rounded"
            :src="getUserPicture"
          />
        </figure>
        <span style="vertical-align: top; line-height: 32px"> {{getUserName}} </span>
      </a>
      <div class="navbar-dropdown is-boxed">
        <nuxt-link class="navbar-item" :to="{ name: 'user-favorite' }">
          我的收藏
        </nuxt-link>
        <hr class="navbar-divider" />
        <a class="navbar-item" @click="logout">登出</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {};
  },
  computed: {
    getUserName() {
      return this.$store.state.userName;
    },
    getUserPicture() {
      if (!this.$store.state.userPicture)
        return "https://bulma.io/images/placeholders/128x128.png";
      return this.$store.state.userPicture;
    },

    isUserLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.commit('setUserlogout');
    },
  },
};
</script>


