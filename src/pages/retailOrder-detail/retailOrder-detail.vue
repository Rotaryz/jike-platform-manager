<template>
  <div class="order-detail">
    <div class="order-msg-box">
      <div class="top-title">
        <div :class="project + '-line'">订单信息</div>
      </div>
      <div class="order-content">
        <div class="order-msg">
          <div class="msg-item">收货方：XXX代理商</div>
          <div class="msg-item">收货方账号:15833333333</div>
          <div class="msg-item">商品名称：赞播AI微店</div>
          <div class="msg-item">商品单价(元)：298.00</div>
          <div class="msg-item">商品数量：200</div>
          <div class="msg-item">商品总价(元)：59600.00</div>
          <div class="msg-item">订单编号：s6545513211558</div>
          <div class="msg-item">订单状态：已付款</div>
          <div class="msg-item">下单时间：2018-06-20 13:54:45</div>
          <div class="msg-item">支付时间：2018-06-20 13:54:45</div>
        </div>
        <div class="order-msg borderTop">
          <div class="msg-item">发货方：平台</div>
          <div class="msg-item">发货方账号：——</div>
        </div>
      </div>
    </div>
    <div class="order-msg-box second">
      <div class="top-title">
        <div :class="project + '-line'">结算信息</div>
      </div>
      <div class="order-content">
        <div class="bottom-msg-item">
          <div class="msg-item">结算方1(发货方)：平台</div>
          <div class="msg-item">结算金额：99.00</div>
        </div>
        <div class="bottom-msg-item">
          <div class="msg-item">结算方1(发货方)：平台</div>
          <div class="msg-item">结算金额：99.00</div>
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

  export default {
    name: 'retailOrder-detail',
    created() {
      console.log(this.$route.query.id)
    },
    methods: {
      backBefore() {
        this.$router.back()
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
