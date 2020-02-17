<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn color="primary" @click="logout" block>Logout</v-btn>
      </div>
    </template>
    <!-- <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

    <!-- <v-divider></v-divider> -->

    <!-- <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
  </v-navigation-drawer>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.settings.drawer
      },
      set(value) {
        this.$store.commit('settings/setDrawer', value)
      }
    }
  }
}
</script>
