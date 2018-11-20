<template>
  <div class="platform-expend">
    <div class="top-box">
      <div class="top-item">
        <div class="first-icon">
          <img src="./icon-payout@2x.png" class="icon-img">
        </div>
        <div class="money-box">
          <div class="top-money">{{total}}</div>
          <div class="down-txt">平台总支出(元)</div>
        </div>
      </div>
      <!--<div class="top-item">-->
      <!--<div class="money-box">-->
      <!--<div class="top-money">23,443.00</div>-->
      <!--<div class="down-txt">推荐奖励支出(元)</div>-->
      <!--</div>-->
      <!--</div>-->
      <div class="top-item">
      </div>
      <div class="top-item">
      </div>
      <div class="top-item">
      </div>
    </div>
    <div class="down-box">
      <ul class="tab" v-if="project === 'weishang'">
        <li class="tab-item hand" v-for="(item, index) in tabArr" :class="tabIndex == index ? (project + '-btn-line') : ''" :key="index" @click="checkTab(index)">{{item.title}}</li>
      </ul>
      <div class="list-container">
        <div class="list-head">
          <div class="list-item" v-for="(item, index) in headlist" :key="index" :class="item.flex">{{item.txt}}</div>
        </div>
        <div class="list-box">
          <div class="list-content" :class="project + '-list'" v-for="(item, index) in expendList" :key="index">
            <div class="list-item" v-for="(item1, index1) in headlist" :key="index1" v-if="index1 != (headlist.length - 1)" :class="item1.flex">{{item[nameObj[index1]] + '' || '---'}}</div>
            <div class="list-item hand" :class="project + '-text'" @click="upAnyImg(index, item)" v-if="tabIndex == 1">发放</div>
            <div class="list-item hand" :class="project + '-text'" @click="showImg(item)" v-if="tabIndex == 0">查看凭证</div>
          </div>
          <div class="blank" v-if="showNull">
            <div class="blank-icon"></div>
            <div class="blank-title">暂无相关数据</div>
          </div>
        </div>
        <div class="page-box">
          <page-detail @addPage="addPage" :pageDtail="pageTotal" ref="page"></page-detail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import PageDetail from 'components/page-detail/page-detail'
  import { Finance } from 'api'
  import { ERR_OK } from 'common/js/config'

  const FIRSTARR = [
    {txt: '发放时间', flex: 'flex1'},
    {txt: '商家名称', flex: 'flex1'},
    {txt: '商家帐号', flex: 'flex1'},
    {txt: '被推荐商家', flex: 'flex1'},
    {txt: '被推荐商家账号', flex: 'flex1'},
    {txt: '被推荐角色', flex: 'flex1'},
    {txt: '代理金额', flex: 'flex1'},
    {txt: '佣金比例', flex: 'flex1'},
    {txt: '奖励金额', flex: 'flex1'},
    {txt: '发放状态', flex: 'flex1'},
    {txt: '操作', flex: 'flex1'}]
  const NAME_OBJ = {'0': 'recommended_time', '1': 'name', '2': 'mobile', '3': 'recommended_name', '4': 'recommended_mobile', '5': 'recommended_role_name', '6': 'total_money', '7': 'rate', '8': 'reward_money', '9': 'status'}
  export default {
    name: 'platform-income',
    data() {
      return {
        tabArr: [{title: '已发放', status: 1}, {title: '未发放', status: 0}],
        tabIndex: 0,
        headlist: FIRSTARR,
        orderList: [1, 2, 3, 4, 5, 6],
        showCenter: false,
        expendList: [],
        page: 1,
        pageTotal: {
          total: 1,
          per_page: 10,
          total_page: 0
        },
        total: '',
        nameObj: NAME_OBJ,
        id: 0,
        showNull: false
      }
    },
    async created() {
      await this._getExpendList()
    },
    methods: {
      async _getExpendList() {
        let data = {page: this.page, status: this.tabArr[this.tabIndex].status}
        let res = await Finance.bonusApplyList(data)
        if (res.error !== ERR_OK) {
          this.showNull = true
          return
        }
        let pages = res.meta
        this.pageTotal = Object.assign({}, {
          total: pages.total,
          per_page: pages.per_page,
          total_page: pages.last_page
        })
        this.total = res.total_sum
        res.data.map((item) => {
          item.status = item.status === 0 ? '未发放' : '已发放'
          return item
        })
        this.expendList = res.data
        this.showNull = !this.expendList.length
      },
      async checkTab(idx) {
        this.tabIndex = idx * 1
        this.page = 1
        this.$refs.page.beginPage()
        await this._getExpendList()
      },
      async addPage(page) {
        this.page = page
        await this._getExpendList()
      },
      upAnyImg(index, item) {
        this.$emit('showCover', item.id, index)
      },
      showImg(item) {
        this.$emit('showImg', item.image_url)
      },
      async cutList() {
        if (this.expendList.length === 1 && this.page > 1) {
          this.page--
        }
        this.$refs.page.beginPage(this.page)
        await this._getExpendList()
      }
    },
    components: {
      PageDetail
    },
    computed: {
      ...mapGetters(['project'])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/theme'
  .platform-expend
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    .top-box
      height: 180px
      width: 100%
      box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
      background: $color-white
      border-radius: 6px
      margin-bottom: 20px
      display: flex
      align-items: center
      .top-item
        overflow: hidden
        height: 72px
        &:first-child
          margin-left: 40px
          display: flex
          margin-right: 5.8vw
          .first-icon
            width: 72px
            height: 72px
            font-size: 0
            margin-right: 20px
            .icon-img
              width: 72px
              height: 72px
          .money-box
            margin-left: 0
            height: 72px
            padding: 0
            .top-money
              font-size: 52px
            .down-txt
              color: $color-text33
        .money-box
          margin-left: 28px
          height: 62px
          padding: 4px 0
          display: flex
          flex-direction: column
          justify-content: space-between
          .top-money
            font-family: DINAlternate-Bold
            font-size: 38px
            color: $color-text33
            text-align: start
          .down-txt
            font-family: $fontFamilyRegular
            font-size: $font-size-medium14
            color: $color-text-66
            text-align: start
    .down-box
      width: 100%
      flex: 1
      overflow: hidden
      box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
      background: $color-white
      border-radius: 6px
      display: flex
      flex-direction: column
      .tab
        height: 60px
        display: flex
        align-items: center
        box-sizing: border-box
        border-bottom: 1px solid $color-line-E1
        .tab-item
          height: 100%
          line-height: 60px
          margin: 0 1.5vw
          font-size: $font-size-medium16
      .list-container
        flex: 1
        padding: 1.5vw 1.5vw 0
        overflow: hidden
        display: flex
        flex-direction: column
        .list-head
          padding-left: 40px
          height: 50px
          display: flex
          background: $color-FAFAFA
          align-items: center
          border-bottom: 1px solid $color-line
        .list-item
          flex: 1
          text-align: left
          font-family: $fontFamilyRegular
          font-size: $font-size-medium14
          color: $color-text33
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
          margin-right: 10px
        .list-item.flex1
          flex: 1
        .list-item.flex2
          flex: 1.5
        .list-item.flex3
          flex: 2
        .last-item
          width: 112px
          text-align: left
          font-family: $fontFamilyRegular
          font-size: $font-size-medium14
          color: $color-text33
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
          margin-right: 10px
        .list-box
          position :relative
          width: 100%
          flex: 1
          overflow: hidden
          display: flex
          flex-direction: column
          .list-content
            height: 60px
            padding-left: 40px
            border-bottom: 1px solid $color-line
            display: flex
            align-items: center
      .page-box
        display: flex
        align-items: center
        width: 100%
        height: 60px

    .center-box
      width: 534px
      height: 331px
      background: $color-white
      box-shadow: 0 0 5px 0 rgba(12, 6, 14, 0.60)
      border-radius: 3px
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      .cover-top
        padding: 0 20px 0 30px
        height: 60px
        display: flex
        align-items: center
        justify-content: space-between
        border-bottom: 1px solid $color-line
        font-size: 0
        .top-txt
          font-size: $font-size-medium16
          color: $color-text33
          font-family: $fontFamilyLight
        .top-icon
          width: 16px
          height: 16px
          padding: 10px
      .cover-content
        width: 100%
        height: 270px
        box-sizing: border-box
        padding: 20px 30px
        display: flex
        flex-direction: column
        justify-content: space-between
        .bottom-item
          display: flex
          .item-title
            margin-top: 10px
            font-family: $fontFamilyLight
            font-size: $font-size-medium14
            color: $color-text33
            text-align: start
            margin-right: 20px
          .item-right
            display: flex
            align-items: center
            .add-img-box
              width: 120px
              height: 96px
              margin-right: 10px
              font-size: 0
              position: relative
              .upload-icon
                width: 100%
                height: 100%
              .image-file
                width: 100%
                height: 100%
                opacity: 0
                position: absolute
                left: 0
                top: 0
            .add-img-txt
              font-family: $fontFamilyLight
              font-size: $font-size-medium14
              color: $color-ccc
        .bottom-btns
          display: flex
          justify-content: flex-end
          .btn
            width: 96px
            height: 40px
            line-height: 40px
            text-align: center
            border-radius: 3px
            font-family: $fontFamilyLight
            font-size: $font-size-medium16
          .back-btn
            box-sizing: border-box
            line-height: 38px
            border: 1px solid $color-ccc
            color: $color-text33
            margin-right: 20px
  .blank
    all-center()
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
</style>
