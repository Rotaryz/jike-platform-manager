<template>
  <div class="content-box">
    <ul class="tab" v-if="false">
      <li class="tab-item hand" v-for="(item, index) in tabArr" :class="tabIndex === index ? (project + '-btn-line') : ''" :key="index" @click="checkTab(index)">{{item}}</li>
    </ul>
    <div class="container-box">
      <div class="top-box">
        <search @search="search"></search>
        <div class="top-right">
          <!--<div class="add-btn hand" :class="project + '-btn-blue'" @click="addOrderMsg">+ 新增订单</div>-->
          <a :href="downUrl" class="excel-btn hand" :class="project + '-btn-white'">导出Excel</a>
        </div>
      </div>
      <div class="list-head">
        <div class="list-item" v-for="(item, index) in headList" :key="index">{{item}}</div>
      </div>
      <div class="list-box">
        <div class="list-content" :class="project + '-list'" v-for="(item, index) in agentList" :key="index">
          <div class="list-item">{{item.order_sn || '---'}}</div>
          <div class="list-item">{{item.name || '---'}}</div>
          <div class="list-item">{{item.mobile || '---'}}</div>
          <div class="list-item">{{item.num}}</div>
          <div class="list-item">{{item.price || '---'}}</div>
          <div class="list-item">{{item.total_price || '---'}}</div>
          <div class="list-item">{{item.pay_at || '---'}}</div>
          <div class="list-item hand" :class="project + '-text'" @click="toDetail(item)">查看</div>
        </div>
      </div>
      <div class="page-box">
        <page-detail @addPage="addPage" :pageDtail="pageTotal" ref="page"></page-detail>
      </div>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import Search from 'components/search/search'
  import PageDetail from 'components/page-detail/page-detail'
  import { mapGetters } from 'vuex'
  import { Order } from 'api'
  import { ERR_OK, BASE_URL } from 'common/js/config'
  import storage from 'storage-controller'
  import {WEI_SHANG} from 'common/js/constants'

  const HEADLIST = ['订单编号', '商家名称', '商家账号', '账号数量', '账号单价', '总金额', '支付时间', '操作']
  const OBJ = {'0': 'order_sn', '1': 'name', '2': 'mobile', '3': 'num', '4': 'price', '5': 'total_price', '6': 'pay_at'}

  export default {
    name: 'agent-order',
    data() {
      return {
        tabArr: ['销售记录', '申请记录'],
        tabIndex: 0,
        headList: HEADLIST,
        orderList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        agentList: [],
        pageTotal: {
          total: 1,
          per_page: 10,
          total_page: 0
        },
        orderSn: '',
        page: 1,
        nameObj: OBJ,
        downUrl: ''
      }
    },
    async created() {
      this._getUrl()
      await this._getAgentOrderList()
    },
    methods: {
      _getUrl() {
        let title = storage.get('project')
        this.downUrl = BASE_URL.api + `/api/order/export-record?access_token=${storage.get('aiToken')}&current_application=${title}&order_sn=${this.orderSn}`
      },
      addPage(page) {
        this.page = page
        this._getAgentOrderList()
      },
      checkTab(idx) {
        if (idx * 1 === 1) {
          this.$emit('showToast', '研发中, 待上线')
        }
      },
      async _getAgentOrderList() {
        let data = {page: this.page, order_sn: this.orderSn}
        let res = await Order.agentOrderList(data)
        this._getUrl()
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
        this.agentList = res.data
        this.$emit('setNull', !this.agentList.length)
      },
      async search(txt) {
        this.page = 1
        this.orderSn = txt
        this.$refs.page.beginPage()
        await this._getAgentOrderList()
      },
      addOrderMsg() {
        this.$router.push({path: `/order-management/agent-order/add-order`})
      },
      toDetail(item) {
        this.$router.push({path: `/order-management/agent-order/agentOrder-detail`, query: {id: item.order_sn}})
      }
    },
    components: {
      Search,
      PageDetail
    },
    computed: {
      ...mapGetters(['project']),
      isWD() {
        return this.project === WEI_SHANG.project
      }
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

  .container-box
    flex: 1
    padding: 0 1.5vw
    display: flex
    flex-direction: column
    .top-box
      width: 100%
      height: 88px
      display: flex
      justify-content: space-between
      align-items: center
      .top-right
        display: flex
        height: 100%
        align-items: center
        .add-btn
          font-family: $fontFamilyRegular
          font-size: $font-size-small12
          color: $color-white
          width: 94px
          height: 28px
          text-align: center
          line-height: 28px
          border-radius: 4px
        .excel-btn
          font-family: $fontFamilyRegular
          font-size: $font-size-small12
          width: 94px
          height: 28px
          text-align: center
          line-height: 26px
          border-radius: 4px
          box-sizing: border-box
          margin-left: 20px

    .list-head
      width: 100%
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
      &:nth-child(2), &:nth-child(7)
        flex: 2
        margin-left: 40px
    .list-box
      width: 100%
      flex: 1
      overflow: hidden
      display: flex
      flex-direction: column
      .list-content
        height: 60px
        width: 100%
        border-bottom: 1px solid $color-line
        display: flex
        align-items: center
    .page-box
      width: 100%
      height: 59px
      margin-bottom: 10px
</style>
