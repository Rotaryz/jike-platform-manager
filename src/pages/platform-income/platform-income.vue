<template>
  <div class="platform-income">
    <div class="top-box">
      <div class="top-item">
        <div class="first-icon">
          <img src="./icon-payout@2x.png" class="icon-img">
        </div>
        <div class="money-box">
          <div class="top-money">888,000.00</div>
          <div class="down-txt">平台总收入(元)</div>
        </div>
      </div>
      <div class="top-item">
        <div class="money-box">
          <div class="top-money">23,443.00</div>
          <div class="down-txt">加盟收入(元)</div>
        </div>
      </div>
      <div class="top-item">
        <div class="money-box">
          <div class="top-money">45,000.00</div>
          <div class="down-txt">销货收入(元)</div>
        </div>
      </div>
      <div class="top-item">
        <div class="money-box">
          <div class="top-money">65,000.00</div>
          <div class="down-txt">分销收入(元)</div>
        </div>
      </div>
      <div class="top-item">
        <div class="money-box">
          <div class="top-money">3,800.00</div>
          <div class="down-txt">年费收入(元)</div>
        </div>
      </div>
    </div>
    <div class="down-box">
      <ul class="tab" v-if="project === 'ws'">
        <li class="tab-item hand" v-for="(item, index) in wsTabArr" :class="tabIndex == item.idx ? (project + '-btn-line') : ''" :key="index" @click="checkTab(item.idx)">{{item.txt}}</li>
      </ul>
      <ul class="tab" v-if="project === 'card'">
        <li class="tab-item hand" v-for="(item, index) in cardTabArr" :class="tabIndex == item.idx ? (project + '-btn-line') : ''" :key="index" @click="checkTab(item.idx)">{{item.txt}}</li>
      </ul>
      <div class="list-container">
        <div class="list-head">
          <div class="list-item" v-for="(item, index) in listHead[tabIndex]" :key="index" :class="item.flex" v-if="index != (listHead[tabIndex].length - 1)">{{item.txt}}</div>
          <div class="last-item">操作</div>
        </div>
        <div class="list-box">
          <div class="list-content" v-for="(item, index) in orderList" :key="index">
            <div class="list-item" v-for="(item1, index1) in listHead[tabIndex]" :key="index1" v-if="index1 != (listHead[tabIndex].length - 1)" :class="item1.flex">test</div>
            <div class="last-item hand" :class="project + '-text'" @click="toDetail(item)">查看</div>
          </div>
        </div>
        <div class="page-box">
          <page-detail @addPage="addPage"></page-detail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import PageDetail from 'components/page-detail/page-detail'
  const WSTAB = [
    {txt: '加盟收入', idx: 1},
    {txt: '销货收入', idx: 2},
    {txt: '分销收入', idx: 3},
    {txt: '年费收入', idx: 5}
  ]
  const MPTAB = [
    {txt: '加盟收入', idx: 1},
    {txt: '销货收入', idx: 2},
    {txt: '年费收入', idx: 4}
  ]
  const FIRSTARR = [
    {txt: '加入时间', flex: 'flex2'},
    {txt: '商家名称', flex: 'flex2'},
    {txt: '商家账号', flex: 'flex1'},
    {txt: '角色名称', flex: 'flex1'},
    {txt: '代理金额', flex: 'flex1'},
    {txt: '操作', flex: 'flex1'}]
  const SECONDARR = [
    {txt: '支付时间', flex: 'flex2'},
    {txt: '订单编号', flex: 'flex1'},
    {txt: '收货方', flex: 'flex1'},
    {txt: '商品名称', flex: 'flex1'},
    {txt: '商品单价', flex: 'flex1'},
    {txt: '商品数量', flex: 'flex1'},
    {txt: '总金额', flex: 'flex1'},
    {txt: '操作', flex: 'flex1'}]
  const THREEARR = [
    {txt: '支付时间', flex: 'flex2'},
    {txt: '订单编号', flex: 'flex1'},
    {txt: '收货方', flex: 'flex1'},
    {txt: '商品名称', flex: 'flex1'},
    {txt: '商品单价', flex: 'flex1'},
    {txt: '商品数量', flex: 'flex1'},
    {txt: '总金额', flex: 'flex1'},
    {txt: '结算金额', flex: 'flex1'},
    {txt: '操作', flex: 'flex1'}
  ]
  const FOREARR1 = [
    {txt: '商家名称', flex: 'flex2'},
    {txt: '商家帐号', flex: 'flex1'},
    {txt: '年费', flex: 'flex1'},
    {txt: '使用期限', flex: 'flex3'},
    {txt: '操作', flex: 'flex1'}
  ]
  const FOREARR2 = [
    {txt: '支付时间', flex: 'flex2'},
    {txt: '订单编号', flex: 'flex1'},
    {txt: '客户名称', flex: 'flex1'},
    {txt: '商品名称', flex: 'flex1'},
    {txt: '总金额', flex: 'flex1'},
    {txt: '结算金额', flex: 'flex1'},
    {txt: '操作', flex: 'flex1'}
  ]

  export default {
    name: 'platform-income',
    data() {
      return {
        wsTabArr: WSTAB,
        cardTabArr: MPTAB,
        tabIndex: 1,
        listHead: {
          1: FIRSTARR,
          2: SECONDARR,
          3: THREEARR,
          4: FOREARR1,
          5: FOREARR2
        },
        orderList: [1, 2, 3, 4, 5, 6]
      }
    },
    methods: {
      checkTab(idx) {
        this.tabIndex = idx * 1
      },
      addPage(page) {
        console.log(page)
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
  .platform-income
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
        flex: 1
        overflow: hidden
        height: 72px
        border-left: 1px solid $color-line
        &:first-child
          flex: 1.4
          margin-left: 40px
          display: flex
          border: 0 none
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
        padding: 30px 30px 0
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
          width: 100%
          flex: 1
          overflow: hidden
          display: flex
          flex-direction: column
          .list-content
            flex: 1
            padding-left: 40px
            border-bottom: 1px solid $color-line
            display: flex
            align-items: center
      .page-box
        width: 100%
        height: 59px
        margin-bottom: 10px

</style>
