<template>
  <base-model ref="baseModel">
    <div slot="content" class="content-box">
      <router-view @showToast="showToast" @showShade="showShade" @hideShade="hideShade" @showImage="showImage"></router-view>
    </div>
  </base-model>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import BaseModel from 'components/base-model/base-model'
  import { mapGetters } from 'vuex'

  export default {
    name: 'member-management',
    computed: {
      ...mapGetters(['project'])
    },
    methods: {
      showToast(content, time = 1000) {
        // sdadass
        this.$refs.baseModel.showContent(content, time)
      },
      showShade() {
        this.$refs.baseModel.showShade()
      },
      hideShade() {
        this.$refs.baseModel.hideShade()
      },
      showImage(img) {
        this.$refs.baseModel.showImage(img)
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

  .content-box
    height: 100%
    width: 100%
    display: flex
    flex-direction: column
</style>
