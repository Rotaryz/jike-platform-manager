<template>
  <base-model>
    <div slot="content" class="content-box">
      <router-view></router-view>
    </div>
  </base-model>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import BaseModel from 'components/base-model/base-model'

  export default {
    name: 'order-management',
    data() {
      return {
      }
    },
    methods: {
      showToast() {
        console.log(9999)
      }
    },
    components: {
      BaseModel
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/theme'

  .content-box
    width: 100%
    height: 100%

</style>
