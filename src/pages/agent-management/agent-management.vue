<template>
  <base-model>
    <div slot="content" class="content-box">
      <ul class="tab">
        <li class="tab-item hand" v-for="(item, index) in tabArr" :class="{'ws-btn-line': tabIndex === index}" :key="index">{{item}}</li>
      </ul>
    </div>
  </base-model>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import BaseModel from 'components/base-model/base-model'

  export default {
    name: 'agent-management',
    data() {
      return {
        tabArr: ['代理商列表', '申请记录'],
        tabIndex: 0
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
    height: 100%
    width: 100%
    box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
    background: $color-white
    border-radius: 6px

  .tab
    height: 60px
    display: flex
    align-items: center
    box-sizing: border-box
    border-bottom: 1px solid $color-line-E1
    .tab-item
      height: 100%
      line-height: 60px
      margin: 0 30px
</style>