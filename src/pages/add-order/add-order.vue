<template>
  <div class="add-order">
    <div class="top-title">
      <div :class="project + '-line'">新增订单</div>
    </div>
    <div class="order-content">
      <div class="order-msg">
        <div class="msg-item">
          <div class="item-top">
            <label class="item-title hand" for="input1">* 收货方</label>
            <input type="text" id="input1" class="item-input error" placeholder="请输入商家姓名或名称">
          </div>
          <div class="item-down">收货方名称有误，请重新输入！</div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <label class="item-title hand" for="input2">* 收货方账号</label>
            <input type="text" id="input2" class="item-input error" placeholder="请输入商家账号">
          </div>
          <div class="item-down">收货方不存在，请重新输入！</div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <div class="item-title">* 商品名称</div>
            <div class="check-box hand">
              <div class="check-txt">{{project === 'ws' ? '赞播AI微店' : '赞播AI名片'}}</div>
              <img src="./icon-dropdown@2x.png" class="check-icon">
            </div>
          </div>
          <div class="item-down"></div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <label class="item-title hand" for="input3">* 商品单价</label>
            <input type="text" id="input3" class="item-input" placeholder="请输入商品单价">
          </div>
          <div class="item-down"></div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <label class="item-title hand" for="input4">* 商品数量</label>
            <input type="text" id="input4" class="item-input" placeholder="请输入商品数量">
          </div>
          <div class="item-down"></div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <div class="item-title">总金额</div>
            <div class="total-money">587456445</div>
          </div>
          <div class="item-down"></div>
        </div>
      </div>
      <div class="order-bottom">
        <div class="bottom-item">
          <div class="item-title">* 收款凭证</div>
          <div class="item-right">
            <div class="add-img-box hand">
              <img src="./icon-upload@2x.png" class="upload-icon">
              <input type="file" class="image-file hand" @change="_fileImage($event)" accept="image/*">
            </div>
            <div class="add-img-txt">点击查看全图</div>
          </div>
        </div>
        <div class="bottom-btns">
          <div class="back-btn btn hand" @click="backBefore">返回</div>
          <div class="btn hand" :class="project + '-btn-blue'">保存</div>
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
    methods: {
      _fileImage(e) {
        console.log(e.target.files[0])
      },
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
            .check-box
              width: 90px
              height: 28px
              border: 1px solid $color-ccc
              border-radius: 4px
              display: flex
              align-items: center
              justify-content: space-between
              padding: 0 8px
              .check-txt
                font-family: $fontFamilyLight
                font-size: $font-size-medium14
                color: $color-text-66
              .check-icon
                width: 10px
                height: 7px
            .total-money
              font-family: $fontFamilyLight
              font-size: $font-size-medium14
              color: $color-text-66
          .item-down
            width: 100%
            height: 30px
            line-height: 30px
            text-align: start
            text-indent: 98px
            font-size: $font-size-medium14
            color: $color-EF705D
            font-family: $fontFamilyLight

      .order-bottom
        border-top: 1px solid $color-line
        padding-top: 30px
        .bottom-item
          display: flex
          .item-title
            margin-top: 10px
            width: 82px
            font-family: $fontFamilyLight
            font-size: $font-size-medium14
            color: $color-text33
            text-align: end
            margin-right: 16px
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
          margin-top: 40px
          padding-left: 98px
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
</style>
