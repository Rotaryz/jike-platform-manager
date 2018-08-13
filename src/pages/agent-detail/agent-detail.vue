<template>
  <BaseModel>
    <div slot="content">
      <div class="agent-detail-box">
        <div :class="project + '-line'" class="agent-text">基本信息</div>
      </div>
      <div class="agent-detail-box">
        <div :class="project + '-line'" class="agent-text">商品信息</div>
      </div>
      <div class="agent-detail-box">
        <div :class="project + '-line'" class="agent-text">资产信息</div>
      </div>
      <div class="agent-detail-box">
        <div :class="project + '-line'" class="agent-text">团队信息</div>
      </div>
    </div>
  </BaseModel>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import BaseModel from 'components/base-model/base-model'

  export default {
    name: 'agent-detail',
    computed: {
      ...mapGetters(['project'])
    },
    components: {
      BaseModel
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .agent-detail-box
    box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
    border-radius: 6px
    background: $color-white
    padding: 40px 0
    margin-bottom: 20px
  .agent-text
    margin-bottom: 40px
</style>