<template>
  <div class="home">
    <navigation></navigation>
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
    methods: {},
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
    display: flex
    height: 100vh
    .content
      flex: 1
</style>