<template>
  <div class="login" @click="hideFocus">
    <div class="bk"></div>
    <div class="logo-box">
      <img src="./pic-logo@2x.png" class="logo">
      <h2 class="title">赞播管理平台</h2>
    </div>
    <div class="login-box">
      <p class="login-title">智慧改变销售</p>
      <div class="login-content">
        <div class="user input-box">
          <span class="input-icon"></span>
          <input class="inputs" value="asd" type="text"
                 placeholder="请输入用户名" v-model="user" />
        </div>
        <div class="passward input-box">
          <span class="input-icon"></span>
          <input class="inputs" type="password"
                 placeholder="请输入密码" v-model="password" />
        </div>
        <div class="input-box shop hand" @click="_showMore">
          <span class="input-icon"></span>
          <div class="inputs">赞播AI微店</div>
          <span class="input-way" :class="{'input-way-active': isShowMore}"></span>
          <transition name="fade">
            <ul class="shop-list" v-if="isShowMore" @click.stop>
              <li class="shop-item" v-for="(item, index) in shopArr" :key="index">
                {{item}}
                <span class="shop-icon"></span>
              </li>
            </ul>
          </transition>
        </div>
      </div>
      <!--<div class="remenber hand" @click="remenberPassWord">-->
      <!--<i class="check" :class="{'check-yes' : remenber}"></i>-->
      <!--<span class="tip">记住密码</span>-->
      <!--</div>-->
      <div class="submit-no hand ws-btn-blue" :class="{'submit-disable': !isLogin}" @click="login">
        登录
      </div>
    </div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  // import { Admin } from 'api'
  import Toast from 'components/toast/toast'

  export default {
    data() {
      return {
        focusPass: false,
        focusPhone: false,
        user: '',
        password: '',
        remenber: true,
        isShowMore: false,
        shopArr: ['赞播AI微店', '赞播AI智推']
      }
    },
    created() {
      let token = localStorage.getItem('business-token') || false
      if (token) {
        this.$router.push('container/officialNetwork')
      }
      window.onkeydown = (e) => {
        if (e.keyCode === 13) {
          this.login()
        }
      }
    },
    computed: {
      isLogin() {
        return this.user && this.password
      }
    },
    methods: {
      _showMore() {
        this.isShowMore = !this.isShowMore
      },
      hideFocus() {
        this.focusPhone = false
        this.focusPass = false
      },
      remenberPassWord() {
        this.remenber = !this.remenber
      },
      login() {
        if (this.user === '') {
          this.$refs.toast.show('请输入用户名')
          return false
        } else if (this.password === '') {
          this.$refs.toast.show('请输入密码')
          return false
        }
        // let data = {mobile: this.user, password: this.password}
        // Admin.adminLogin(data).then((res) => {
        //   if (!res.error) {
        //     let data = res.data
        //     this.$refs.toast.show('登陆成功')
        //     localStorage.setItem('business-token', data.access_token)
        //     localStorage.setItem('userName', data.merchant_info.name)
        //     setTimeout(() => {
        //       this.$router.push('container/officialNetwork')
        //     }, 500)
        //   } else if (res.error) {
        //     this.$refs.toast.show(res.message)
        //   }
        // })
      }
    },
    components: {
      'toast': Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/theme'
  .login
    height: 100vh
    width: 100vw
    display: flex
    align-items: center
    justify-content: center
    .bk
      height: 100vh
      width: 100vw
      position: absolute
      bottom: 0
      left: 0
      background-size: cover
      background-image: url('./bg-login@1x.png')
      background-repeat: no-repeat
    .logo-box
      position: absolute
      left: 100px
      top: 58.2px
      display: flex
      align-items: center
      .logo
        width: 41px
        height: auto
      .title
        font-family: PingFangSC-Semibold
        color: rgba(255, 255, 255, 0.4)
        margin-left: 10px
        font-size: 36px
    .login-box
      .login-title
        font-size: 32px
        font-family: $fontFamilyLight
        color: $color-white
        position: relative
        display: inline-block
        &:before, &:after
          col-center()
          content: ''
          height: 1px
          width: 39px
          background: $color-white
        &:before
          left: -54px
        &:after
          right: -54px
      .login-content
        position: relative
        z-index: 200
        width: 468px
        box-shadow: 0 0 10px 0 rgba(12, 6, 14, 0.10)
        background: $color-white
        border-radius: 3px
        margin: 62px 0 30px
        height: 240px
      .input-box
        width: 100%
        height: 80px
        font-size: $font-size-small
        position: relative
        &:first-child
          border-bottom: 1px solid $color-icon-line
        .inputs
          text-indent: 65px
          height: 100%
          width: 100%
          color: $color-text
          font-size: $font-size-medium14
          font-family: $fontFamilyLight
          &::placeholder
            opacity: 1
            color: $color-text-little
        .input-icon
          height: 20px
          width: @height
          icon-image('icon-tel')
          col-center()
          left: 35px
          z-index: 100
      .passward
        .input-icon
          icon-image('icon-shape')
      .user
        border-top-right-radius: 3px
        border-top-left-radius: 3px
        overflow: hidden
      .shop
        position: relative
        .inputs
          text-align: left
          line-height: 80px
        .input-icon
          icon-image('icon-option_login')
        .input-way
          height: 8px
          width: 13px
          col-center()
          right: 35px
          icon-image('icon-triangle_gray')
          transform-origin: 50% 0%
          transform: rotate(0deg) translateY(-50%)
          transition: transform 0.3s
        .input-way-active
          transform-origin: 50% 0%
          transform: rotate(180deg) translateY(-50%)
          transition: transform 0.3s
        .shop-list
          margin-top: 5px
          text-align: left
          background: $color-white
          width: 100%
          text-indent: 35px
          position: absolute
          color: $color-text33
          font-family: $fontFamilyLight
          font-size: $font-size-medium14
          z-index: 200
          border-radius: 3px
          &.fade-enter, &.fade-leave-to
            opacity: 0
          &.fade-enter-to, &.fade-leave-to
            transition: all .3s ease-in-out
          .shop-item
            height: 80px
            line-height: 80px
            &:last-child
              border-top: 1px solid #EFEFEF
      .remenber
        display: flex
        justify-content: right
        margin-left: 13.7795%
        height: 1.0416vw
        position: relative
        .check
          position: absolute
          left: 2px
          top: 0px
          cursor: pointer
          height: 12px
          width: 12px
          border: 1px solid #979797
          border-radius: 4px
        .check-yes
          border: none
        .tip
          display: inline-block
          position: absolute
          left: 10px
          top: 0px
          margin-left: 2.853%
          line-height: 1
          font-size: $font-size-small
          color: #9B9B9B

  .submit-no
    display: flex
    height: 50px
    width: 468px
    border-radius: 4px
    position: relative
    z-index: 100
    align-items: center
    justify-content: center
    font-size: $font-size-medium16
    font-family: $fontFamilyLight

  .submit-disable
    background: $color-active
</style>
