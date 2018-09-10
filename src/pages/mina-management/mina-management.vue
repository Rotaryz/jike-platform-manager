<template>
  <base-model ref="baseModel">
    <div slot="content" class="content-box">
      <router-view ref="mina" @showToast="showToast" @showShade="showShade" @hideShade="hideShade" @showImage="showImage"></router-view>
    </div>
    <div slot="shade-box" class="shade-box">
      <p class="shade-title">
        {{del ? '提示' : '失败原因'}}
        <transition name="fade-enter">
          <img src="./icon-del2@2x.png" class="del-icon hand" @click="hideShade">
        </transition>
      </p>
      <div class="del-tip" v-if="del">{{title}}</div>
      <div class="del-tip" v-if="!del" v-html="text"></div>
      <div class="shade-btn" v-if="del">
        <div class="btn-item hand btn-border" @click="hideShade">取消</div>
        <div class="btn-item hand" :class="project + '-btn-blue'" @click="confrim">确定</div>
      </div>
    </div>
  </base-model>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import BaseModel from 'components/base-model/base-model'
  import {mapGetters} from 'vuex'

  export default {
    name: 'agent-management',
    data() {
      return {
        del: true,
        text: '',
        title: ''
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    methods: {
      showToast(content, time = 1000) {
        this.$refs.baseModel.showContent(content, time)
      },
      showShade(del, text, title) {
        this.del = del
        this.text = text || ''
        this.title = title || ''
        this.$refs.baseModel.showShade()
      },
      hideShade() {
        this.$refs.baseModel.hideShade()
      },
      showImage(img) {
        this.$refs.baseModel.showImage(img)
      },
      async confrim() {
        await this.$refs.mina.submit()
        this.hideShade()
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
    min-height: 261px
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
      padding: 0 30px
      line-height: 16px
      box-sizing: border-box
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
