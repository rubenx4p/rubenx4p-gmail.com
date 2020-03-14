<template>
  <v-list three-line>
    <div v-for="item in items" :key="item.id">
      <HomeListItem
        :item="item"
        :selected="selected"
        :deleting="deleting"
        :getingPassword="getingPassword"
        @selectItem="$emit('selectItem', $event)"
        @deleteItem="$emit('deleteItem', $event)"
        @getPassword="$emit('getPassword', $event)"
        @copy="$emit('copy', $event)"
      />
      <v-divider></v-divider>
    </div>
  </v-list>
</template>

<script>
import HomeListItem from './HomeListItem'
export default {
  name: 'HomeToolbar',
  components: {
    HomeListItem
  },
  data() {
    return {
      key: '',
      showKey: false
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Object,
      default: undefined
    },
    deleting: {
      type: Boolean,
      default: false
    },
    getingPassword: {
      type: Boolean,
      default: false
    }
  },
  methods: {},
  computed: {}
}
</script>
<style lang="scss" scoped></style>
