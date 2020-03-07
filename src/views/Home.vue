<template>
  <div class="home">
    <HomeToolbar :search="search" @input="setSearch($event)" />
    <HomeList
      :items="accounts"
      :selected="account"
      :deleting="deleting"
      :getingPassword="getingPassword"
      @selectItem="selectAccount($event)"
      @deleteItem="deleteAccount($event)"
      @getPassword="getPassword"
    />
    <NavigationDrawer></NavigationDrawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapMutations } from 'vuex'

import HomeToolbar from '@/components/HomeToolbar.vue'
import HomeList from '@/components/HomeList.vue'
import NavigationDrawer from '@/components/NavigationDrawer'
export default {
  name: 'home',
  components: {
    HomeToolbar,
    HomeList,
    NavigationDrawer
  },
  created() {
    this.$store.dispatch('home/getAccounts')
  },
  methods: {
    ...mapActions('home', ['deleteAccount', 'getPassword']),
    ...mapMutations('home', ['setSearch', 'selectAccount', 'resetState'])
  },
  computed: {
    ...mapGetters('home', ['accounts', 'search', 'account', 'deleting', 'getingPassword'])
  },
  destroyed() {
    this.resetState()
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.v-list {
  flex: 1 1 0;
  overflow: auto;
}
</style>
