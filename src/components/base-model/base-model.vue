<template>
  <div class="base-model">
    <div class="herder-peo">
      <div class="user" :class="{'user-active': logout}" @mouseenter="showlogout" @mouseleave="hidelogout">
        <span class="nick-name">{{userName}}</span>
        <img src="./header.jpeg" class="user-header">
        <i class="icons-top" :class="logout ? 'icons-bottom': '' "></i>
        <transition name="fade">
          <div class="logout-box" v-show="logout" @mouseenter="showlogout">
            <div class="logout" @click.stop="isLogout">
              <span class="logout-icons"></span>
              退出登录
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="tag">
      <div class="tag-title">
        <span class="title-item" v-for="(item,index) in titleArr" :key="index">{{index > 0 ? '/' : ''}} {{item}}</span>
      </div>
      <slot name="tap"></slot>
    </div>
    <!-- 弹窗-->
    <transition name="fade">
      <div class="shade-win" @click.stop="isHideShade" v-show="isShade">
        <div class="shade-detail" @click.stop>
          <slot name="shade-box"></slot>
        </div>
      </div>
    </transition>
    <!--图片预览-->
    <transition name="fade">
      <div class="shade-win" @click.stop="hideImage" v-show="isImage">
        <img :src="shadeImage" class="shade-img">
      </div>
    </transition>
    <div class="content-base">
      <slot name="content"></slot>
      <div class="blank" v-if="showNull">
        <div class="blank-icon"></div>
        <div class="blank-title">暂无相关数据</div>
      </div>
    </div>
    <toast ref="toast"></toast>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import {mapGetters} from 'vuex'
  import Toast from 'components/toast/toast'
  import storage from 'storage-controller'

  export default {
    name: 'base-model',
    props: {
      isHide: {
        type: Boolean,
        default: true
      },
      showNull: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        navStatus: true,
        userName: storage.get('userName', 'super'),
        logout: false,
        showOut: false,
        dataStatus: '',
        isShade: false,
        isImage: false,
        shadeImage: ''
      }
    },
    methods: {
      hideImage() {
        this.isImage = false
      },
      showImage(img) {
        this.shadeImage = img || ''
        this.isImage = true
      },
      showShade() {
        this.isShade = true
      },
      hideShade() {
        this.isShade = false
      },
      isHideShade() {
        if (!this.isHide) {
          return
        }
        this.isShade = false
        this.$emit('close')
      },
      showlogout() {
        this.logout = true
      },
      hidelogout() {
        this.logout = false
      },
      isLogout() {
        localStorage.clear()
        this.$router.push({path: '/login'})
      },
      showHeight() {
        this.showOut = true
      },
      hideHeight() {
        this.showOut = false
      },
      showContent(content, time) {
        const showTime = time || 1000
        this.$refs.toast.show(content, showTime)
      }
    },
    computed: {
      ...mapGetters(['titleArr'])
    },
    components: {
      Toast
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .base-model
    position: relative
    height: 100vh
    overflow-y: auto
    display: flex
    flex-direction: column
    &::-webkit-scrollbar
      width: 8px
      height: 10px
    &::-webkit-scrollbar-thumb
      background-color: rgba(0, 0, 0, .15)
      border-radius: 10px
    &::-webkit-scrollbar-thumb:hover
      background-color: rgba(0, 0, 0, .3)
    &::-webkit-scrollbar-track
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .15)
      border-radius: 10px
  .herder-peo
    position: relative
    z-index: 800
    width: 100%
    background: $color-white
    display: flex
    min-height: 80px
    box-sizing: border-box
    align-items: center
    justify-content: flex-end
    border-bottom: 1px solid #eee
    .guild-box
      height: 100%
      width: 78px
      position: relative
      cursor: pointer
      &:hover
        background: $color-background
    .guide
      margin-left: 26px
      margin-top: 19.5px
      height: 26px
      width: 26px
      transform: rotateY(180deg)
      transition: all 0.5s
    .guide-rotate
      transform: rotateY(0deg)
      transition: all 0.5s
    .user
      cursor: pointer
      height: 80px
      display: flex
      align-items: center
      padding: 0 41px 0 33px
      position: relative
      z-index: 1500
      .logout-box
        position: absolute
        right: 2px
        bottom: -58px
        height: 58px
        width: 99%
        z-index: 1500
        &.fade-enter, &.fade-leave-to
          opacity: 0
        &.fade-enter-to, &.fade-leave-to
          transition: all .2s ease-in-out
      .logout
        background-color: $color-white
        margin-top: 4px
        border-radius: 3px
        width: 100%
        text-indent: 64px
        height: 50px
        box-shadow: 0 3px 8px 0 rgba(12, 6, 14, 0.20)
        line-height: 50px
        z-index: 200
        .logout-icons
          position: absolute
          left: 30px
          height: 22px
          width: 22px
          icon-image('icon-exit')
          col-center()
      .logout:active
        background: $color-background
      .user-header
        height: 40px
        border-radius: 100%
        margin-right: 10px
      .nick-name
        font-size: $font-size-medium-x
        color: $color-text-icon
        margin: 0 10px 0 10px
      .icons-top
        height: 0px
        border: 8px solid $color-text99
        border-bottom: 8px solid transparent
        border-left: 8px solid transparent
        border-right: 8px solid transparent
        position: absolute
        right: 28px
        top: 47%
        transform-origin: 7px 3px
        transform: rotate(0deg)
        transition: all 0.2s
      .icons-bottom
        transform-origin: 7px 3px
        transform: rotate(180deg)
        transition: all 0.2s
    .user-active
      background: $color-background

  .tag
    display: flex
    background: $color-white
    min-height: 90px
    align-items: center
    position: relative
    .tag-title
      line-height: 90px
      color: $color-text-little
      text-indent: 25px
      font-size: $font-size-large18
      font-family: $fontFamilyLight
      .title-item
        color: $color-text99
        margin-left: 6px
        &:last-child
          color: $color-text33
    .tag-choice
      display: flex
      padding: 0 10px
      margin: 20px 0 10px
      position: relative
      z-index: 100
      .tag-time
        white-space: nowrap
        .time-title
          cursor: pointer
          display: inline-block
          position: relative
          margin-left: 1.5625vw
          padding-bottom: 10px
          font-size: $font-size-medium14
          color: $color-text33
          &:hover
            color: $color-nomal
          &:before
            row-center()
            bottom: 0px
            content: ''
            height: 2px
            width: 32px
            background: $color-white
          &:last-child
            position: relative
            .block
              position: absolute
              bottom: -40px
              transform: translateX(-20%)
        .time-title-active
          color: $color-nomal
          &:before
            background: $color-nomal
    .tag-city, .tag-industry
      margin-left: 2.6vw
      display: flex
      font-size: $font-size-medium14
      color: $color-text33
      .city-title
        line-height: 17px
        no-wrap()
      .city-select
        cursor: pointer
        height: 30px
        margin-left: 10px
        border: 1px solid $color-white
        border-radius: 4px
        font-size: $font-size-medium14
        color: $color-text-66
        transform: translateY(-25%)
        position: relative
        .city-show
          border: 1px solid $color-line
          border-radius: 2px
          padding: 0 39px 0 10px
          line-height: 30px
          height: 100%
          no-wrap()
          .city-tap
            position: absolute
            right: 0
            top: 0
            height: 100%
            width: 24px
            border-left: 1px solid $color-line
            .city-tap-top
              height: 0
              border: 6px solid $color-text-66
              border-bottom: 6px solid transparent
              border-left: 6px solid transparent
              border-right: 6px solid transparent
              row-center()
              top: 42%
              transform: rotate(0deg) translateX(-43%)
              transform-origin: 1px 3px
            .city-tap-top-two
              height: 0
              border: 6px solid $color-text33
              border-bottom: 6px solid transparent
              border-left: 6px solid transparent
              border-right: 6px solid transparent
              row-center()
              top: 42%
              transform-origin: 1px 3px
              transform: rotate(0deg) translateX(-43%)
              transition: all 0.2s
            .city-tap-bottom
              border: 6px solid  $color-text33
              border-bottom: 6px solid transparent
              border-left: 6px solid transparent
              border-right: 6px solid transparent
              row-center()
              top: 42%
              transform-origin: 1px 3px
              transform: rotate(180deg) translateX(-43%)
              transition: all 0.2s
        .city-show-active
          color: $color-text33
        &:hover
          transition: color 0.2s
          .city-show
            color: $color-text33
            border: 1px solid $color-text-66
            .city-tap
              border-left: 1px solid $color-text-66
            .city-tap-top
              border: 6px solid $color-text33
              border-bottom: 6px solid transparent
              border-left: 6px solid transparent
              border-right: 6px solid transparent
              top: 42%
            .city-tap-bottom
              border: 6px solid  $color-text33
              border-bottom: 6px solid transparent
              border-left: 6px solid transparent
              border-right: 6px solid transparent
              row-center()
              top: 42%
              transform-origin: 1px 3px
              transform: rotate(180deg) translateX(-43%)
              transition: all 0.2s
        .city-big-box
          position: absolute
          min-width: 100%
          z-index: 100
        .city-box
          width: 100%
          border-radius: 3px
          box-shadow: 0 1px 5px 0 rgba(12, 6, 14, 0.20)
          background: $color-white
          margin-top: 4px
          max-height: 228px
          overflow-y: auto
          &.fade-enter, &.fade-leave-to
            opacity: 0
          &.fade-enter-to, &.fade-leave-to
            transition: opacity .2s ease-in-out
          .city-box-item
            white-space: nowrap
            padding: 0 10px
            text-align: left
            height: 26px
            line-height: 26px
            font-size: $font-size-medium14
            &:hover
              background: $color-big-background
          .city-box-item-active
            background: $color-big-background
      .city-select-active
        color: $color-text33
        border: 2px solid rgba(102, 102, 102, .2)
        .city-show
          border: 1px solid $color-text-66

  .tag-no-top
    height: 62px

  .shade-win
    height: 100%
    width: 100%
    overflow-y: auto
    background: rgba(50, 50, 58, 0.60)
    position: absolute
    top: 0
    bottom: 0
    right: 0
    left: 0
    z-index: 888
    &.fade-enter, &.fade-leave-to
      opacity: 0
    &.fade-enter-to, &.fade-leave-to
      transition: opacity .2s ease-in-out
    .shade-detail
      all-center()
      box-shadow: 0 0 5px 0 rgba(12, 6, 14, 0.60)
      border-radius: 3px
      background: $color-white
      width: 534px

  .content-base
    padding: 20px
    flex: 1
    box-sizing: border-box
    .blank
      row-center()
      top: 55%
      text-align: center
      &.fade-enter, &.fade-leave-to
        opacity: 0
      &.fade-enter-to, &.fade-leave-to
        transition: opacity .2s ease-in-out
      .blank-icon
        icon-image('icon-null')
        width: 140px
        height: 89px
        margin-bottom: 30px
      .blank-title
        color: $color-text99

  .shade-img
    width: 500px
    height: auto
    overflow-y: hidden
    all-center()
</style>
