<template>
  <div class="home" @click="hideRole">
    <navigation ref="nav"></navigation>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import Navigation from 'components/navigation/navigation'

  export default {
    name: 'home',
    created() {
    },
    methods: {
      hideRole() {
        this.$refs.nav.hideRole()
      }
    },
    components: {
      Navigation
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/theme'
  .home
    width: 100%
    display: flex
    height: 100vh
    .content
      overflow: hidden
      flex: 1
      overflow: hidden
</style>
