<template>
  <base-model ref="baseModel" :showNull="showNull">
    <div slot="content" class="content-box">
      <router-view @showToast="showToast" @showShade="showShade" @hideShade="hideShade" @showImage="showImage" @setNull="setNull"></router-view>
    </div>
    <div slot="shade-box" class="shade-box">
      <p class="shade-title">
        提示
        <transition name="fade-enter">
          <img src="./icon-del2@2x.png" class="del-icon hand" @click="hideShade">
        </transition>
      </p>
      <div class="del-tip">真要删除该条记录吗？</div>
      <div class="shade-btn">
        <div class="btn-item hand btn-border" @click="hideShade">取消</div>
        <div class="btn-item hand" :class="project + '-btn-blue'">确定</div>
      </div>
    </div>
  </base-model>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import BaseModel from 'components/base-model/base-model'
  import { mapGetters } from 'vuex'

  export default {
    name: 'agent-management',
    data() {
      return {
        showNull: false
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    methods: {
      showToast(content, time = 1000) {
        this.$refs.baseModel.showContent(content, time)
      },
      showShade() {
        this.$refs.baseModel.showShade()
      },
      hideShade() {
        this.$refs.baseModel.hideShade()
      },
      showImage(img) {
        console.log(img)
        this.$refs.baseModel.showImage(img)
      },
      setNull(status = false) {
        this.showNull = status
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

  .content-box
    height: 100%
    width: 100%
    display: flex
    flex-direction: column

  .shade-box
    height: 261px
    color: $color-text33
    font-family: $fontFamilyLight
    .shade-title
      height: 60px
      text-indent: 30px
      line-height: 60px
      border-bottom-1px()
    .del-icon
      width: 16px
      col-center()
      right: 30px
      transform: rotate(0deg)
      transform-origin: 50% 50%
      transition: all .5s
      &:hover
        transform: rotate(90deg)
        transform-origin: 50% 50%
        transition: all 0.5s
    .del-tip
      margin-top: 46px
      text-indent: 30px
      font-size: $font-size-medium14

    .shade-btn
      position: absolute
      width: 100%
      bottom: 20px
      display: flex
      justify-content: flex-end
      padding-right: 10px
      box-sizing: border-box
      .btn-item
        margin-left: 20px
        border-radius: 3px
        width: 96px
        height: 40px
        text-align: center
        line-height: 40px
      .btn-border
        border-1px($color-lineCC, 6px)
</style>
