<template>
  <v-toolbar max-height="48" color="elevation-0">
    <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>

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
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'HelloToolbar',

  data: () => ({}),
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapMutations('settings', ['setDrawer'])
    // setSearch(value) {
    //   console.log(value)
    // }
  },
  computed: {
    ...mapState('settings', ['drawer'])
  }
}
</script>
