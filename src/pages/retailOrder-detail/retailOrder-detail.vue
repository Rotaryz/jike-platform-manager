<template>
  <div class="order-detail">
    <div class="order-msg-box">
      <div class="top-title">
        <div :class="project + '-line'">订单信息</div>
      </div>
      <div class="order-content">
        <div class="order-msg">
          <div class="msg-item">收货方：{{orderDetail.shop_name}}</div>
          <div class="msg-item">收货方账号：{{orderDetail.mobile}}</div>
          <div class="msg-item">商品名称：{{orderDetail.title}}</div>
          <div class="msg-item">商品单价(元)：{{orderDetail.price}}</div>
          <div class="msg-item">商品数量：{{orderDetail.num}}</div>
          <div class="msg-item">商品总价(元)：{{orderDetail.total}}</div>
          <div class="msg-item">订单编号：{{orderDetail.order_sn}}</div>
          <div class="msg-item">订单状态：{{orderDetail.status}}</div>
          <div class="msg-item">下单时间：{{orderDetail.created_at}}</div>
          <div class="msg-item">支付时间：{{orderDetail.pay_at}}</div>
        </div>
        <div class="order-msg borderTop">
          <div class="msg-item">发货方：{{orderDetail.delivery}}</div>
          <div class="msg-item">发货方账号：{{orderDetail.delivery_mobile}}</div>
        </div>
      </div>
    </div>
    <div class="order-msg-box second">
      <div class="top-title">
        <div :class="project + '-line'">结算信息</div>
      </div>
      <div class="order-content">
        <div class="bottom-msg-item">
          <div class="msg-item">结算方1(发货方)：{{orderDetail.delivery_name}}</div>
          <div class="msg-item">结算金额：{{orderDetail.delivery_money}}</div>
        </div>
        <div class="bottom-msg-item">
          <div class="msg-item">结算方2(推荐人)：{{orderDetail.recommend}}</div>
          <div class="msg-item">结算金额：{{orderDetail.recommend_money}}</div>
        </div>
        <div class="bottom-msg-item">
          <div class="msg-item">结算方3(所属团队)：{{orderDetail.belongs_team}}</div>
          <div class="msg-item">结算金额：{{orderDetail.belongs_team_money}}</div>
        </div>
        <div class="bottom-msg-item">
          <div class="msg-item">结算方4(推荐团队)：{{orderDetail.recommend_team}}</div>
          <div class="msg-item">结算金额：{{orderDetail.recommend_team_money}}</div>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <div class="back-btn hand" :class="project + '-btn-blue'" @click="backBefore">返回</div>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import { Order } from 'api'
  import { ERR_OK } from 'common/js/config'

  export default {
    name: 'retailOrder-detail',
    data() {
      return {
        orderDetail: {}
      }
    },
    async created() {
      let id = this.$route.query.id
      await this._getDetail(id)
    },
    methods: {
      backBefore() {
        this.$router.back()
      },
      async _getDetail(id) {
        let res = await Order.retailOrderDetail(id)
        if (res.error !== ERR_OK) {
          return
        }
        this.orderDetail = res.data
      }
    },
    computed: {
      ...mapGetters(['project'])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .order-detail
    width: 100%
    height: 100%
    .second
      margin-top: 20px
    .order-msg-box
      width: 100%
      box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
      background: $color-white
      border-radius: 6px
      .top-title
        width: 100%
        height: 84px
        display: flex
        align-items: center
      .order-content
        padding: 0 30px
        .order-msg
          padding-bottom: 15px
          padding-left: 12px
          display: flex
          flex-wrap: wrap
          .msg-item
            width: 33.3333%
            line-height: 44px
            text-align: start
            font-family: $fontFamilyLight
            font-size: $font-size-medium14
            color: $color-text33
        .borderTop
          border-top: 1px solid $color-line
          height: 74px
          align-items: center
      .bottom-msg-item
        height: 74px
        display: flex
        padding-left: 12px
        border-bottom: 1px solid $color-line
        &:last-child
          border: 0 none
        .msg-item
          width: 33.3333%
          line-height: 44px
          text-align: start
          font-family: $fontFamilyLight
          font-size: $font-size-medium14
          color: $color-text33

  .bottom-box
    height: 40px
    display: flex
    align-items: center
    margin-top: 40px
    justify-content: center
    .back-btn
      width: 96px
      height: 40px
      line-height: 40px
      text-align: center
      border-radius: 3px
      font-family: $fontFamilyLight
      font-size: $font-size-medium16
</style>
