<template>
  <div class="home">
    <HomeToolbar :search="search" @input="setSearch($event)" />
    <HomeList :items="accounts" @selectItem="selectAccount($event)" :selected="account" />
    <NavigationDrawer></NavigationDrawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapMutations('home', ['setSearch', 'selectAccount'])
  },
  computed: {
    ...mapGetters('home', ['accounts', 'search', 'account'])
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
