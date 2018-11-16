<template>
  <div class="platform-income">
    <div class="top-box">
      <div class="top-item">
        <div class="first-icon">
          <img src="./icon-payout@2x.png" class="icon-img">
        </div>
        <div class="money-box">
          <div class="top-money">{{detail.total}}</div>
          <div class="down-txt">平台总收入(元)</div>
        </div>
      </div>
      <div class="top-item">
        <div class="money-box">
          <div class="top-money">{{detail.join_income}}</div>
          <div class="down-txt">加盟收入(元)</div>
        </div>
      </div>
      <div class="top-item">
        <div class="money-box">
          <div class="top-money">{{detail.sale_income}}</div>
          <div class="down-txt">销货收入(元)</div>
        </div>
      </div>
      <div class="top-item" v-if="project === 'weishang'">
        <div class="money-box">
          <div class="top-money">{{detail.distribute_income}}</div>
          <div class="down-txt">分销收入(元)</div>
        </div>
      </div>
      <!--<div class="top-item">-->
      <!--<div class="money-box">-->
      <!--<div class="top-money">3,800.00</div>-->
      <!--<div class="down-txt">年费收入(元)</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <div class="down-box">
      <ul class="tab" v-if="project === 'zantui'">
        <li class="tab-item hand" v-for="(item, index) in wsTabArr" :class="tabIndex == item.idx ? (project + '-btn-line') : ''" :key="index" @click="checkTab(item.idx)">{{item.txt}}</li>
      </ul>
      <ul class="tab" v-if="project === 'zantui'">
        <li class="tab-item hand" v-for="(item, index) in cardTabArr" :class="tabIndex == item.idx ? (project + '-btn-line') : ''" :key="index" @click="checkTab(item.idx)">{{item.txt}}</li>
      </ul>
      <div class="list-container">
        <div class="list-head">
          <div class="list-item" v-for="(item, index) in listHead[tabIndex]" :key="index" :class="item.flex" v-if="index != (listHead[tabIndex].length - 1)">{{item.txt}}</div>
          <div class="last-item">操作</div>
        </div>
        <div class="list-box">
          <div class="list-content" :class="project + '-list'" v-for="(item, index) in orderList" :key="index">
            <!---->
            <div class="list-item" v-for="(item1, index1) in listHead[tabIndex]" :key="index1" v-if="index1 != (listHead[tabIndex].length - 1)" :class="item1.flex">{{item[contentName[tabIndex][index1]] + '' || '---'}}</div>
            <div class="last-item hand" :class="project + '-text'" @click="_toDetail(item)">查看</div>
          </div>
        </div>
        <div class="page-box">
          <page-detail @addPage="addPage" ref="page" :pageDtail="pageTotal"></page-detail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import {mapGetters} from 'vuex'
  import PageDetail from 'components/page-detail/page-detail'
  import {Finance} from 'api'
  import {ERR_OK} from 'common/js/config'

  const WSTAB = [
    {txt: '加盟收入', idx: 1, status: 32},
    {txt: '销货收入', idx: 2, status: 33},
    {txt: '分销收入', idx: 3, status: 31}
    // {txt: '年费收入', idx: 5}
  ]
  const MPTAB = [
    {txt: '加盟收入', idx: 1, status: 32},
    {txt: '销货收入', idx: 2, status: 33}
    // {txt: '年费收入', idx: 4}
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

  const FIRST_NAME = {'0': 'created_at', '1': 'name', '2': 'mobile', '3': 'role_name', '4': 'money'}
  const SECOND_NAME = {'0': 'created_at', '1': 'order_sn', '2': 'name', '3': 'good_name', '4': 'price', '5': 'num', '6': 'money'}
  const THREE_NAME = {'0': 'created_at', '1': 'order_sn', '2': 'name', '3': 'good_name', '4': 'price', '5': 'num', '6': 'money', '7': 'total'}
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
        contentName: {
          1: FIRST_NAME,
          2: SECOND_NAME,
          3: THREE_NAME
        },
        orderList: [],
        page: 1,
        pageTotal: {
          total: 1,
          per_page: 10,
          total_page: 0
        },
        detail: {join_income: '0.00', sale_income: '0.00', distribute_income: '0.00', total: '0.00'}
      }
    },
    async created() {
      await this._getExpendList()
    },
    methods: {
      _toDetail(item) {
        switch (this.tabIndex * 1) {
          case 1:
            this.$router.push({path: '/agent-management/agent-list/agent-detail?id=', query: {id: item.admin_agent_id, type: 1}})
            break
          case 2:
            this.$router.push({path: '/order-management/agent-order/agentOrder-detail?id=', query: {id: item.order_sn}})
            break
          case 3:
            this.$router.push({path: '/order-management/retail-order/retailOrder-detail?id=', query: {id: item.order_sn}})
            break
        }
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
      async _getExpendList() {
        let data = {page: this.page, type: this.wsTabArr[this.tabIndex - 1].status}
        let res = await Finance.incomeList(data)
        if (res.error !== ERR_OK) {
          this.$emit('setNull', true)
          return
        }
        let pages = res.meta
        this.pageTotal = Object.assign({}, {
          total: pages.total,
          per_page: pages.per_page,
          total_page: pages.last_page
        })
        this.orderList = res.data
        this.$emit('setNull', !this.orderList.length)
        // console.log(res.data)
        this.detail = Object.assign({}, {join_income: res.join_income, sale_income: res.sale_income, distribute_income: res.distribute_income, total: res.total})
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
          width: 100%
          flex: 1
          overflow: hidden
          display: flex
          flex-direction: column
          .list-content
            height: 16.66%
            padding-left: 40px
            border-bottom: 1px solid $color-line
            display: flex
            align-items: center
      .page-box
        width: 100%
        height: 59px
        margin-bottom: 10px

</style>
