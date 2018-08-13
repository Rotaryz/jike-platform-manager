<template>
  <div class="add-order">
    <div class="top-title">
      <div :class="project + '-line'">新增订单</div>
    </div>
    <div class="order-content">
      <div class="order-msg">
        <div class="msg-item">
          <div class="item-top">
            <div class="item-title">* 收货方</div>
            <input type="text" class="item-input error" placeholder="请输入商家姓名或名称">
          </div>
          <div class="item-down">收货方名称有误，请重新输入！</div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <div class="item-title">* 收货方账号</div>
            <input type="text" class="item-input error" placeholder="请输入商家账号">
          </div>
          <div class="item-down">收货方不存在，请重新输入！</div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <div class="item-title">* 商品名称</div>
            <div class="check-box">
              <div class="check-txt">{{project === 'ws'}}</div>
            </div>
          </div>
          <div class="item-down"></div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <div class="item-title">* 商品单价</div>
          </div>
          <div class="item-down"></div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <div class="item-title">* 商品数量</div>
          </div>
          <div class="item-down"></div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <div class="item-title">总金额</div>
          </div>
          <div class="item-down"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'

  export default {
    name: 'add-order',
    computed: {
      ...mapGetters(['project'])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .add-order
    width: 100%
    height: 100%
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
        border-top: 1px solid $color-line
        padding-top: 30px
        .msg-item
          width: 100%
          height: 60px
          .item-top
            width: 100%
            height: 30px
            display: flex
            align-items: center
            .item-title
              width: 82px
              font-family: $fontFamilyLight
              font-size: $font-size-medium14
              color: $color-text33
              text-align: end
              margin-right: 16px
            .item-input
              width: 338px
              height: 28px
              border: 1px solid $color-ccc
              border-radius: 4px
              text-indent: 8px
              font-family: $fontFamilyLight
              font-size: $font-size-medium14
            .item-input.error
              border: 1px solid $color-EF705D
            .item-input::-webkit-input-placeholder { /* WebKit browsers */
              color: $color-ccc
            }
            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color: $color-ccc
            }
            ::-moz-placeholder { /* Mozilla Firefox 19+ */
              color: $color-ccc
            }
            :-ms-input-placeholder { /* Internet Explorer 10+ */
              color: $color-ccc
            }
          .item-down
            width: 100%
            height: 30px
            line-height: 30px
            text-align: start
            text-indent: 98px
            font-size: $font-size-medium14
            color: $color-EF705D
            font-family: $fontFamilyLight
</style>
