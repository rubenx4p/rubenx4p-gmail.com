<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-snackbar v-model="snackbar" multi-line>
      {{ msg }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <Dialog></Dialog>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Dialog from '@/components/Dialog.vue'
export default {
  name: 'App',

  components: {
    Dialog
  },

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
