<template>
  <div class="agentOrder-detail">
    <div class="order-detail">
      <div class="top-title">
        <div :class="project + '-line'">订单详情</div>
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
        <div class="msg-bottom">
          <div class="msg-title">付款凭证：</div>
          <div class="msg-right">
            <div class="img-box hand">
              <img src="" class="image hand" @click="showImg">
            </div>
            <div class="msg-right-txt">点击查看全图</div>
          </div>
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
    name: 'agentOrder-detail',
    created() {
      console.log(this.$route.query.id)
    },
    methods: {
      backBefore() {
        this.$router.back()
      },
      showImg() {
        this.$emit('showImg', '')
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
        padding-left: 12px
        padding-bottom: 15px
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
      .msg-bottom
        border-top: 1px solid $color-line
        height: 136px
        display: flex
        padding-top: 20px
        .msg-title
          padding-left: 12px
          font-family: $fontFamilyLight
          font-size: $font-size-medium14
          color: $color-text33
          margin-top: 10px
        .msg-right
          height: 96px
          display: flex
          align-items: center
          font-size: 0
          .img-box
            width: 120px
            height: 96px
            border: 1px solid $color-line
            margin-right: 10px
            overflow: hidden
            position: relative
            .image
              width: 100%
              all-center()
          .msg-right-txt
            font-family: $fontFamilyLight
            font-size: $font-size-medium14
            color: $color-ccc

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
