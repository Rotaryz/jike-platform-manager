<template>
  <base-model ref="baseModel" :showNull="showNull">
    <div slot="content" class="content-box">
      <router-view @showToast="showToast" @showImg="showImg" @setNull="setNull"></router-view>
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
        showNull: false
      }
    },
    methods: {
      // 是否显示空白页
      setNull(status = false) {
        this.showNull = status
      },
      showToast(content, time = 1000) {
        this.$refs.baseModel.showContent(content, time)
      },
      showImg(src) {
        this.$refs.baseModel.showImage(src)
      }
    },
    watch: {
      '$route'() {
        this.setNull(false)
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
