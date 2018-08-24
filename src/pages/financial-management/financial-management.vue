import finance from '../../api/finance'
<template>
  <base-model ref="baseModel" :isHide="false">
    <div slot="content" class="content-box">
      <router-view ref="finance" @showToast="showToast" @showImg="showImg" @showCover="showCover" @hideCover="hideCover"></router-view>
    </div>
    <div slot="shade-box" class="shade-box">
      <div class="center-box">
        <div class="cover-top">
          <div class="top-txt">上传付款凭证</div>
          <img src="./icon-del2@2x.png" class="top-icon hand" @click="hideCover">
        </div>
        <div class="cover-content">
          <div class="bottom-item">
            <div class="item-title">付款凭证</div>
            <div class="item-right">
              <div class="add-img-box hand">
                <img src="./icon-upload@2x.png" v-if="!image" class="upload-icon">
                <img :src="image" v-if="image" class="upload-icon">
                <input type="file" class="image-file hand" @change="_fileImage($event)" accept="image/*">
              </div>
              <div class="add-img-txt">点击上传凭证，小于10M</div>
            </div>
          </div>
          <div class="bottom-btns">
            <div class="back-btn btn hand" @click="hideCover">取消</div>
            <div class="btn hand" :class="project + '-btn-blue'" @click="submitAny">确定</div>
          </div>
        </div>
      </div>
    </div>
  </base-model>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import BaseModel from 'components/base-model/base-model'
  import { Finance, Images } from 'api'
  import { ERR_OK } from 'common/js/config'
  import { mapGetters } from 'vuex'

  export default {
    name: 'financial-management',
    data() {
      return {
        image: '',
        imageId: 0,
        id: 0,
        listIndex: null
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    methods: {
      showToast(content, time = 1000) {
        this.$refs.baseModel.showContent(content, time)
      },
      showImg(src) {
        this.$refs.baseModel.showImage(src)
      },
      showCover(id, index) {
        this.id = id
        this.listIndex = index
        this.$refs.baseModel.showShade()
      },
      hideCover() {
        this.image = ''
        this.$refs.baseModel.hideShade()
      },
      async _fileImage(e) {
        let param = this._infoImage(e.target.files[0])
        let res = await Images.upload(param)
        if (res.error !== ERR_OK) {
          this.showToast(res.message)
          return
        }
        this.image = res.data.url
        this.imageId = res.data.id
      },
      // 格式化图片流
      _infoImage(file) {
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name)// 通过append向form对象添加数据
        return param
      },
      async submitAny() {
        // this.imageId
        let res = await Finance.bonusApplyAudit(this.id, {pay_image_id: this.imageId})
        this.showToast(res.message)
        if (res.error !== ERR_OK) {
          return
        }
        this.hideCover()
        this.$refs.finance.cutList()
      }
    },
    components: {
      BaseModel
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/theme'

  .content-box
    width: 100%
    height: 100%

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
</style>
