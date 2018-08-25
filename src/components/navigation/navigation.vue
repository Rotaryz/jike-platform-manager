<template>
  <div class="navigation" :class="project + '-big'">
    <div class="big-show" :class="{'big-hide': showAnimation}">
      <div class="herder" @click.stop>
        <img src="./icon-logo@2x.png" class="icon" :class="project + '-logo'">
        <p class="header-name hand" @click="_checkRole">{{roleName}}<img src="./icon-triangle_white@2x.png" class="header-change" :class="{'header-change-active': showRole}"></p>
        <transition name="fade">
          <div class="header-list" v-if="showRole">
            <div class="header-item hand" @click="_checkPeo(0)">
              <span>赞播AI名片</span>
              <img src="./icon-blackright@2x.png" class="header-item-icon" v-if="loginRole === 0">
            </div>
            <div class="header-item-bottom hand" @click="_checkPeo(1)">
              <span>赞播AI微商</span>
              <img src="./icon-blackright@2x.png" class="header-item-icon" v-if="loginRole === 1">
            </div>
          </div>
        </transition>
      </div>
      <ul class="nav-big">
        <li class="nav-item" v-for="(item , index) in navList" :key="index" @click="showChild(index)" :style="{'height':item.showHeight+'px'}">
          <router-link :to="{path: item.url}" class="nav-tap">
            <span class="nav-icon"><img :src="item.icon" class="nav-pic"></span>
            <div class="nav-title" v-show="!showAnimation">
              <span>{{item.title}}</span>
            </div>
            <i class="nav" :class="{'nav-active': item.showHeight !== 69}" v-show="!showAnimation"></i>
          </router-link>
          <ul class="nav-big-child" v-if="item.children">
            <li class="nav-item" v-for="(items , idx) in item.children" :key="idx" @click.stop="bigChildren(idx)" v-if="items.type === project || items.type === 'normal'">
              <router-link :to="{path: items.url}" class="nav-tap">
                <span class="nav-icon"><img src=""></span>
                <div class="nav-title">
                  <span v-for="(child , index) in items.title" :key="index">{{child}}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import storage from 'storage-controller'

  const HEIGHT = 69
  const NAVLIST = [
    {
      title: '首页',
      url: '/agent-management',
      icon: require('./icon-index@2x.png'),
      childrenIndex: -1,
      children: [{
        title: '首页',
        url: '/agent-management'
      }],
      showHeight: HEIGHT
    }, {
      title: '商家管理',
      url: '/agent-management/agent-list',
      icon: require('./icon-business_manage@2x.png'),
      childrenIndex: -1,
      children: [{
        title: '代理商管理',
        url: '/agent-management/agent-list',
        type: 'normal'
      }, {
        title: '企业管理',
        url: '/business-management/business-list',
        type: 'normal'
      }, {
        title: '成员管理',
        url: '/member-management/member-list',
        type: 'ws'
      }],
      showHeight: HEIGHT
    }, {
      title: '订单管理',
      url: '/order-management/agent-order',
      icon: require('./icon-order_manage@2x.png'),
      childrenIndex: -1,
      children: [{
        title: '代理订单',
        url: '/order-management/agent-order',
        type: 'normal'
      }, {
        title: '零售订单',
        url: '/order-management/retail-order',
        type: 'ws'
      }],
      showHeight: HEIGHT
    }, {
      title: '财务管理',
      icon: require('./icon-money_manage@2x.png'),
      url: '/financial-management/platform-income',
      childrenIndex: -1,
      children: [{
        title: '平台收入',
        url: '/financial-management/platform-income',
        type: 'normal'
      }, {
        title: '发放记录',
        url: '/financial-management/platform-expend',
        type: 'ws'
      }
        // , {
        //   title: '提现管理',
        //   url: '/financial-management/cash-management',
        //   type: 'ws'
        // }
      ],
      showHeight: HEIGHT
    }]
  //   , {
  //   title: '基础设置',
  //   icon: require('./icon-basic_setting@2x.png'),
  //   url: '/role-management/role-list',
  //   childrenIndex: -1,
  //   children: [{
  //   title: '角色设置',
  //   url: '/role-management/role-list',
  //   type: 'normal'
  // }],
  //   showHeight: HEIGHT
  // }
  export default {
    data() {
      return {
        smallIndex: 0,
        navList: NAVLIST,
        bigChild: 1,
        showHeight: HEIGHT,
        timer: null,
        recodIndex: -1,
        showAnimation: false,
        sortTimer: null,
        showRole: false,
        loginRole: 0,
        roleName: '赞播AI微商'
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    created() {
      this.loginRole = this.project === 'card' ? 0 : 1
      this.roleName = this.loginRole === 0 ? '赞播AI名片' : '赞播AI微商'
      let path = this.$route.fullPath
      this.info(path)
    },
    methods: {
      ...mapActions(['setProject']),
      // 切换账户
      _checkPeo(status) {
        this.loginRole = status
        this.showRole = false
        let title = this.loginRole === 0 ? 'card' : 'ws'
        this.roleName = this.loginRole === 0 ? '赞播AI名片' : '赞播AI微商'
        this.setProject(title)
        storage.set('project', title)
        this.navList[1].showHeight = HEIGHT
        this.info('/agent-management/agent-list')
        this.navList.map((item) => {
          item.childrenIndex = -1
          item.url = item.children[0].url
          return item
        })
        this.$router.replace('/agent-management/agent-list')
      },
      hideRole() {
        this.showRole = false
      },
      _checkRole() {
        this.showRole = !this.showRole
      },
      info(path) {
        let type = path
        this.navList.forEach((item, idx) => {
          item.children.forEach((items, index) => {
            if (items.url.includes(type)) {
              this.showChild(idx)
              this.bigChildren(index)
            } else {
              item.showHeight = HEIGHT
            }
          })
        })
      },
      showChild(index, status = true) {
        this.smallIndex = index
        clearInterval(this.timer)
        let childCode = this.navList[index].childrenIndex === -1 ? 0 : this.navList[index].childrenIndex
        this.recodIndex = index
        this.navList[this.recodIndex].childrenIndex = childCode
        this.bigChild = -1
        clearInterval(this.timer)
        for (let i = 0; i < this.navList.length; i++) {
          if (i !== index && this.navList[i].showHeight > HEIGHT) {
            clearInterval(this.sortTimer)
            this.sortTimer = setInterval(() => {
              if (this.navList[i].showHeight <= HEIGHT) {
                this.navList[i].showHeight = HEIGHT
                clearInterval(this.sortTimer)
                return
              }
              this.navList[i].showHeight -= 20
            }, 30)
          } else {
            clearInterval(this.timer)
            let num = 0
            this.navList[index].children.forEach((item) => {
              if (item.type === this.project || item.type === 'normal') {
                num++
              }
            })
            if (this.navList[index].showHeight === HEIGHT) {
              let target = (num + 1) * HEIGHT
              this.timer = setInterval(() => {
                if (this.navList[index].showHeight >= target) {
                  this.navList[index].showHeight = target
                  clearInterval(this.timer)
                  return
                }
                this.navList[index].showHeight += 20
              }, 30)
            } else {
              if (status) {
                this.timer = setInterval(() => {
                  if (this.navList[index].showHeight <= HEIGHT) {
                    this.navList[index].showHeight = HEIGHT
                    clearInterval(this.timer)
                    return
                  }
                  this.navList[index].showHeight -= 20
                }, 30)
              }
            }
          }
        }
      },
      bigChildren(index) {
        this.navList[this.recodIndex].childrenIndex = index
        let num = this.recodIndex
        this.navList[num].url = this.navList[num].children[this.navList[num].childrenIndex].url
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.path === '/agent-management/agent-list/agent-detail' && from.path === '/financial-management/platform-income') {
          this.showChild(1)
        } else if (from.path === '/agent-management/agent-list/agent-detail' && to.path === '/financial-management/platform-income') {
          this.showChild(3)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .navigation
    background: $color-menu-background
    float: left
    color: $color-lineCC
    height: 100vh
    position: relative
    z-index: 1000
    white-space: nowrap
    .big-show
      width: 200px
      .herder
        font-size: $font-size-large18
        height: 150px
        position: relative
        display: flex
        flex-direction: column
        align-items: center
        padding-top: 35px
        box-sizing: border-box
        color: $color-white
        font-family: $fontFamilyRegular
        border-bottom: 1px solid #3B3B43
        .icon
          overflow: hidden
          height: 50px
          width: 50px
          margin-bottom: 14px
          border-radius: 50%
        .card-logo
          background: $color-active
          transition: all 0.5s
        .ws-logo
          background: #F94C5F
          transition: all 0.5s
        .header-change
          position: absolute
          top: 106px
          right: 40px
          width: 9px
          transform: rotate(180deg)
          transition: all 0.3s
        .header-change-active
          transform: rotate(0deg)
          transition: all 0.3s
        .header-list
          position: absolute
          top: 121px
          color: $color-text33
          font-family: $fontFamilyRegular
          font-size: $font-size-medium14
          z-index: 100
          &.fade-enter, &.fade-leave-to
            opacity: 0
          &.fade-enter-to, &.fade-leave-to
            transition: opacity .3s ease-in-out
          .header-item
            width: 164px
            height: 40px
            line-height: 40px
            display: flex
            justify-content: space-between
            align-items: center
            background: $color-white
            padding: 0 10px
            border-top-right-radius: 3px
            border-top-left-radius: 3px
            box-sizing: border-box
          .header-item-bottom
            width: 164px
            height: 40px
            line-height: 40px
            display: flex
            justify-content: space-between
            background: $color-white
            padding: 0 10px
            box-sizing: border-box
            border-bottom-right-radius: 3px
            border-bottom-left-radius: 3px
            margin-top: 1px
            align-items: center
          .header-item-icon
            width: 20px
      .nav-big
        .nav-item
          overflow: hidden
          border-bottom: 1px solid #3B3B43
          .nav-tap
            transition: all 0.2s
            align-items: center
            color: $color-lineCC
            display: flex
            height: 69px
            width: 100%
            position: relative
            box-sizing: border-box
            border-left: 6px solid $color-menu-background
            .nav-icon
              height: 100%
              width: 55px
              position: relative
              .nav-pic
                height: 17px
                col-center()
                left: 28px
            .nav-title
              width: 64px
              display: flex
              font-family: 'PingFangSC-Light'
              font-size: $font-size-medium16
              justify-content: space-between
            .nav
              col-center()
              height: 10px
              width: 10px
              right: 23px
              icon-image('icon-arrow_right')
              transform-origin: 50% 0%
              transform: rotate(0deg) translateY(-50%)
              transition: transform 0.2s
            .nav-active
              transform-origin: 50% 0%
              transform: rotate(90deg) translateY(-50%)
              transition: transform 0.2s
            &:hover
              background: rgba(255, 255, 255, 0.1)
              transition: all 0.2s
          .nav-tap-active
            border-left: 6px solid rgba(255, 255, 255, 0.1)
        .nav-big-child
          .nav-item
            border-bottom: none
            .router-link-active
              background: rgba(255, 255, 255, 0.1) !important
              border-left: 6px solid $color-active
          .nav-tap
            border-left: 6px solid $color-menu-background
            .nav-icon
              width: 46px
          .nav-title
            margin-left: 13px

      .big-hide
        width: 79px
        transition: all .2s

  /*微商*/
  .card-big
    background: $color-menu-background
    transition: all 0.5s
    .big-show .nav-big
      .nav-item
        border-bottom: 0.5px solid #3B3B43
        .nav-tap
          border-left: 6px solid transparent
          &:hover
            background: rgba(255, 255, 255, 0.1)
        .nav-big-child .nav-item .router-link-active
          background: rgba(255, 255, 255, 0.1)
          border-left: 6px solid $color-active !important
          transition: all 0.5s

  //智推
  .ws-big
    background: $color-43455C
    transition: all 0.5s
    .big-show .nav-big
      .nav-item
        border-bottom: 0.5px solid #3C3E54
        .nav-tap
          border-left: 6px solid transparent
          &:hover
            background: $color-3F4055
        .nav-big-child .nav-item .router-link-active
          transition: all 0.5s
          background: $color-3F4055
          border-left: 6px solid $color-pink-CA799A !important

</style>
