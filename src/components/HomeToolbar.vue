<template>
  <v-toolbar max-height="56">
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn icon large v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="exportCSV">
          <v-list-item-title>Export to CSV</v-list-item-title>
        </v-list-item>
        <v-list-item @click="openDialog({ dialogName: 'unlockAllAccountsDialog', account: $event })">
          <v-list-item-title>Unlock All</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-text-field
      hide-details
      prepend-icon="mdi-magnify"
      :value="search"
      single-line
      label="Search"
      @input="$emit('input', $event)"
    ></v-text-field>

    <v-btn icon to="/add-account">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HelloToolbar',

  data() {
    return {}
  },
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions('dialog', ['openDialog']),
    logout() {
      this.$store.dispatch('auth/logout')
    },
    exportCSV() {
      this.$store.dispatch('home/exportCSV')
    },
    unlockAll() {
      this.$store.dispatch('home/unlockAll')
    }
  },
  computed: {}
}
</script>
