<template>
  <div>
    <SingleAccountDialog :fullscreen="fullscreen" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
const SingleAccountDialog = () => import('./SingleAccountDialog.vue')
export default {
  name: 'Dialog',
  components: {
    SingleAccountDialog
  },
  created() {
    this.fullscreen = document.body.clientWidth < 600 ? true : false
    window.onresize = () => {
      this.fullscreen = document.body.clientWidth < 600 ? true : false
    }
  },
  data() {
    return {
      fullscreen: false
    }
  },
  props: {},
  methods: {},
  computed: {
    ...mapState('dialog', ['showDeleteAccountDialog'])
  }
}
</script>
<style lang="scss" scoped></style>
