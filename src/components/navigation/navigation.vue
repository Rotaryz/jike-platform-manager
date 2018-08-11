<template>
  <div class="navigation">
    <div class="big-show" :class="{'big-hide': showAnimation}">
      <div class="herder">
        <img src="" class="icon">
        {{title}}
      </div>
      <ul class="nav-big">
        <li class="nav-item" v-for="(item , index) in navList" :key="index"
            @click="showChild(index)" :style="{'height':item.showHeight+'px'}">
          <router-link :to="{path: item.url}" class="nav-tap" :class="{'nav-tap-active':bigChild === index,'nav-item-no-border':item.children.length > 1}">
            <span class="nav-icon"><img :src="item.icon" class="nav-pic"></span>
            <div class="nav-title" v-show="!showAnimation">
              <span>{{item.title}}</span>
            </div>
            <i class="nav" :class="{'nav-active': item.showHeight !== 69}" v-show="!showAnimation"></i>
          </router-link>
          <ul class="nav-big-child" v-if="item.children"
              v-show="item.children.length > 1">
            <li class="nav-item" v-for="(items , idx) in item.children" :key="idx" @click.stop="bigChildren(idx)" v-if="index === 0 && idx === 0 || index !== 0">
              <router-link :to="{path: items.url}" class="nav-tap" :class="item.childrenIndex === idx ? 'nav-big-active' : ''">
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
  const HEIGHT = 69
  const NAVLIST = [
    {
      title: '首页',
      url: '/',
      icon: require('./icon-index@2x.png'),
      childrenIndex: -1,
      children: [{
        title: '首页',
        url: '/'
      }],
      showHeight: HEIGHT
    }, {
      title: '商家管理',
      url: 'agent-management',
      icon: require('./icon-business_manage@2x.png'),
      childrenIndex: -1,
      children: [{
        title: '代理商管理',
        url: 'agent-management'
      }, {
        title: '企业管理',
        url: 'business-management'
      }, {
        title: '客户管理',
        url: 'product'
      }],
      showHeight: HEIGHT
    }, {
      title: '订单管理',
      url: 'agent-order',
      icon: require('./icon-order_manage@2x.png'),
      childrenIndex: -1,
      children: [{
        title: '代理订单',
        url: 'agent-order'
      }, {
        title: '零售订单',
        url: 'retail-order'
      }],
      showHeight: HEIGHT
    }, {
      title: '财务管理',
      icon: require('./icon-money_manage@2x.png'),
      url: 'platform-income',
      childrenIndex: -1,
      children: [{
        title: '平台收入',
        url: 'platform-income'
      }, {
        title: '平台支出',
        url: 'platform-expend'
      }, {
        title: '提现管理',
        url: 'cash-management'
      }],
      showHeight: HEIGHT
    }, {
      title: '基础设置',
      icon: require('./icon-basic_setting@2x.png'),
      url: 'role-management',
      childrenIndex: -1,
      children: [{
        title: '角色设置',
        url: 'role-management'
      }],
      showHeight: HEIGHT
    }]
  export default {
    data() {
      return {
        smallIndex: 0,
        title: '商家管理平台',
        navList: NAVLIST,
        hoverIndex: -1,
        hoverChildIndex: 0,
        isBig: true,
        bigChild: 1,
        showHeight: HEIGHT,
        timer: null,
        clickChild: 0,
        recodIndex: -1,
        showAnimation: false,
        sortTimer: null
      }
    },
    created() {
      let path = this.$route.matched[1].path
      this.info(path)
    },
    methods: {
      info(path) {
        let rootType = path.split('/')
        let type = rootType[rootType.length - 1]
        this.navList.forEach((item, idx) => {
          if (item.children.length > 1) {
            item.children.forEach((items, index) => {
              if (items.url.includes(type)) {
                this.showChild(idx)
                this.bigChildren(index)
              } else {
                item.showHeight = HEIGHT
              }
            })
          } else {
            if (item.url.includes(type)) {
              this.showChild(idx)
            }
          }
        })
      },
      showChild(index, status = true) {
        this.smallIndex = index
        clearInterval(this.timer)
        if (this.navList[index].children.length === 1) {
          if (this.recodIndex !== -1) {
            this.timer = setInterval(() => {
              if (this.navList[this.recodIndex].showHeight <= HEIGHT) {
                this.navList[this.recodIndex].showHeight = HEIGHT
                clearInterval(this.timer)
                return false
              }
              this.navList[this.recodIndex].showHeight -= 20
            }, 30)
          }
          this.bigChild = index
        } else if (this.navList[index].children.length > 1) {
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
              let num = index === 0 ? 1 : this.navList[index].children.length
              if (this.navList[index].showHeight === HEIGHT) {
                let target = (num + 1) * HEIGHT
                console.log(target, HEIGHT)
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
        }
      },
      bigChildren(index) {
        this.navList[this.recodIndex].childrenIndex = index
        let num = this.recodIndex
        this.navList[num].url = this.navList[num].children[this.navList[num].childrenIndex].url
      }
    },
    watch: {
      '$route'(to, form) {
        let title = to.meta.title
        // let item = this.navList.find(item => item.url)
        sessionStorage.setItem('title', title)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .navigation
    float: left
    background: $color-menu-background
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
        overflow: hidden
        background: $color-menu-select
        position: relative
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        padding-top: 35px
        box-sizing: border-box
        color: $color-white
        font-family: $fontFamilyRegular
        border-bottom: 1px solid #3B3B43
        .icon
          overflow: hidden
          background: $color-white
          height: 50px
          width: 50px
          margin-bottom: 14px
          border-radius: 50%
      .nav-big
        .nav-item
          background: $color-menu-background
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
            border-left: 8px solid $color-menu-background
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
              background: $color-menu-select
              transition: all 0.2s
          .nav-tap-active
            border-left: 8px solid $color-active
        .nav-big-child
          .nav-item
            border-bottom: none
          .nav-tap
            border-left: 8px solid $color-menu-background
            .nav-icon
              width: 46px
          .nav-title
            margin-left: 13px
          .nav-big-active
            background: rgba(255, 255, 255, 0.1) !important
            border-left: 8px solid $color-active
    .big-hide
      width: 79px
      transition: all .2s
</style>
