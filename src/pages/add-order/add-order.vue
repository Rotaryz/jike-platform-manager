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
            <input type="text" v-model="addOrder.name" @blur="showError('name', addOrder.name)" @input="_closeError('name', addOrder.name)" id="input1" class="item-input" :class="{'error': !regObj.name}" placeholder="请输入商家姓名或名称">
          </div>
          <div class="item-down" v-if="!regObj.name">收货方名称有误，请重新输入！</div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <label class="item-title hand" for="input2">* 收货方账号</label>
            <input type="text" v-model="addOrder.mobile" @blur="showError('mobile', addOrder.mobile)" @input="_closeError('mobile', addOrder.mobile)" id="input2" class="item-input" :class="{'error': !regObj.mobile}" placeholder="请输入商家账号">
          </div>
          <div class="item-down" v-if="!regObj.mobile">收货方不存在，请重新输入！</div>
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
            <input type="number" v-model="addOrder.price" @blur="showError('price', addOrder.price)" @input="_closeError('price', addOrder.price)" id="input3" class="item-input" :class="{'error': !regObj.price}" placeholder="请输入商品单价">
          </div>
          <div class="item-down" v-if="!regObj.price">商品单价有误</div>
          <div class="item-down"></div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <label class="item-title hand" for="input4">* 商品数量</label>
            <input type="number" :class="{'error': !regObj.num}" @blur="showError('num', addOrder.num)" @input="_closeError('num', addOrder.num)" v-model="addOrder.num" id="input4" class="item-input" placeholder="请输入商品数量">
          </div>
          <div class="item-down" v-if="!regObj.num">商品数量有误</div>
          <div class="item-down"></div>
        </div>
        <div class="msg-item">
          <div class="item-top">
            <div class="item-title">总金额</div>
            <div class="total-money">{{total}}</div>
          </div>
          <div class="item-down"></div>
        </div>
      </div>
      <div class="order-bottom">
        <div class="bottom-item">
          <div class="item-title">* 收款凭证</div>
          <div class="item-right">
            <div class="add-img-box hand">
              <img src="./icon-upload@2x.png" v-if="!addOrder.image_url" class="upload-icon">
              <img :src="addOrder.image_url" class="upload-icon" v-if="addOrder.image_url" @click="showImg">
              <img src="./icon-del@2x.png" class="del-icon hand" v-if="addOrder.image_url" @click="delImg">
              <input type="file" class="image-file hand" @change="_fileImage($event)" accept="image/*" v-if="!addOrder.image_url">
            </div>
            <div class="add-img-txt">点击查看全图</div>
          </div>
        </div>
        <div class="bottom-btns">
          <div class="back-btn btn hand" @click="backBefore">返回</div>
          <div class="btn hand" :class="project + '-btn-blue'" @click="_submit">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import { Order, Images } from 'api'
  import { ERR_OK } from '../../common/js/config'

  export default {
    name: 'add-order',
    data() {
      return {
        addOrder: {
          name: '',
          mobile: '',
          title: '',
          price: '',
          num: '',
          paid_image_id: '',
          image_url: ''
        },
        regObj: {
          name: true,
          mobile: true,
          price: true,
          num: true
        }
      }
    },
    methods: {
      async _fileImage(e) {
        if (e.target.files) {
          let param = this._infoImage(e.target.files[0])
          let res = await Images.upload(param)
          this.addOrder.image_url = res.data.url
          this.addOrder.paid_image_id = res.data.id
        }
      },
      _closeError(type, text) {
        this.regObj[type] = true
      },
      // 格式化图片流
      _infoImage(file) {
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name)// 通过append向form对象添加数据
        return param
      },
      showImg() {
        this.$emit('showImg', this.addOrder.image_url)
      },
      backBefore() {
        this.$router.back()
      },
      showError(type, text) {
        this.regObj[type] = text.length
      },
      delImg() {
        this.addOrder.image_url = ''
        this.addOrder.paid_image_id = ''
      },
      async _submit() {
        if (!this.addOrder.name || !this.addOrder.mobile || !this.addOrder.price || !this.addOrder.num) {
          this.regObj.name = this.addOrder.name.length
          this.regObj.mobile = this.addOrder.mobile.length
          this.regObj.price = this.addOrder.price.length
          this.regObj.num = this.addOrder.num.length
          return
        } else if (this.addOrder.paid_image_id === '') {
          this.$emit('showToast', '请上传收款凭证')
          return
        }
        this.addOrder.title = this.project === 'ws' ? '赞播AI微店' : '赞播AI名片'
        let res = await Order.newAgentOrder(this.addOrder)
        this.$emit('showToast', res.message)
        if (res.error === ERR_OK) {
          setTimeout(() => {
            this.backBefore()
          }, 1000)
        }
      }
    },
    computed: {
      ...mapGetters(['project']),
      total() {
        let price = (this.addOrder.price * this.addOrder.num).toFixed(2)
        return price
      }
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
              .del-icon
                top: -10px
                right: -10px
                width: 26px
                position: absolute
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
