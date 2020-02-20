<template>
  <v-list three-line>
    <div v-for="item in items" :key="item.id">
      <HomeListItem
        :item="item"
        :selected="selected"
        @selectItem="$emit('selectItem', $event)"
        @deleteItem="$emit('deleteItem', $event)"
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
    }
  },
  methods: {
    ok() {
      console.log('AAA')
    }
  },
  computed: {}
}
</script>
<style lang="scss" scoped></style>
