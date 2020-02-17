<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-snackbar v-model="snackbar">
      {{ msg }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',

  components: {},

  data: () => ({}),
  computed: {
    ...mapState('snackbar', ['msg']),
    snackbar: {
      get() {
        return this.$store.state.snackbar.snackbar
      },
      set() {
        this.$store.commit('snackbar/stop')
      }
    }
  }
}
</script>
