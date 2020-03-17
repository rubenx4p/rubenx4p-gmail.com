<template>
  <v-toolbar max-height="48" color="elevation-0">
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="exportCSV">
          <v-list-item-title>Export to CSV</v-list-item-title>
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
    logout() {
      this.$store.dispatch('auth/logout')
    },
    exportCSV() {
      this.$store.dispatch('home/exportCSV')
    }
  },
  computed: {}
}
</script>
