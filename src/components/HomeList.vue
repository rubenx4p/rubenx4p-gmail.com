<template>
  <v-list three-line>
    <div v-for="item in items" :key="item.id">
      <HomeListItem
        :item="item"
        @copy="$emit('copy', $event)"
        @deleteAccountDialog="$emit('deleteAccountDialog', $event)"
        @unlockAccountDialog="$emit('unlockAccountDialog', $event)"
        @lock="$emit('lock', $event)"
        @edit="$emit('edit', $event)"
      />
      <v-divider></v-divider>
    </div>
  </v-list>
</template>

<script>
const HomeListItem = () => import('./HomeListItem.vue')
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
    }
  },
  methods: {},
  computed: {}
}
</script>
<style lang="scss" scoped></style>
