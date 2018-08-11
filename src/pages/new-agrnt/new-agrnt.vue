<template>
  <base-model>
    <div slot="content" class="content-box">
      <div :class="project + '-line'" class="new-text">新增代理商</div>
      <div class="new-name-msg">
        <div class="new-input-box">
          <span class="new-input-title">* 商家名称</span>
          <input type="text" class="new-input" placeholder="请输入商家姓名或名称">
          <span class="new-tip">负责人姓名或公司名</span>
        </div>
        <div class="new-input-box">
          <span class="new-input-title">* 商家账号</span>
          <input type="text" class="new-input" placeholder="请输入商家手机号">
          <span class="new-tip">负责人手机号，用于登录商家后台</span>
        </div>
        <div class="new-input-box">
          <span class="new-input-title">* 角色名称</span>
          <admin-select></admin-select>
        </div>
        <div class="new-input-box">
          <span class="new-input-title">* 所在地区</span>
          <admin-select></admin-select>
        </div>
      </div>
      <div class="new-name-msg new-name-msg-center">
        <div class="new-input-box">
          <span class="new-input-title">所属上级</span>
          <input type="text" class="new-input" placeholder="平台直属，无需填写上级">
          <span class="new-tip">商品（雷达）由上级供货即形成上下级关系</span>
        </div>
        <div class="new-input-box">
          <span class="new-input-title">推荐人</span>
          <input type="text" class="new-input" placeholder="输入推荐人手机号">
          <span class="new-tip">被其他商家推荐即形成推荐关系</span>
        </div>
        <div class="new-input-box">
          <span class="new-input-title">* 代理期限</span>
          <!-- 修改-->
          <input type="text" class="new-input" placeholder="输入推荐人手机号">
        </div>
      </div>
      <div class="new-name-msg new-name-msg-center">
        <div class="new-input-box">
          <span class="new-input-title">* 收款金额</span>
          <input type="text" class="new-input" placeholder="输入收款金额，单位元">
        </div>
        <div class="new-input-box new-input-box-img">
          <span class="new-input-title">* 收款凭证</span>
          <img src="" class="new-add-img">
          <input type="file" class="file-input" accept="image/*">
          <span class="new-tip">点击查看全图</span>
        </div>
      </div>
      <div class="new-btn">
        <div class="new-btn-item new-btn-item-border hand">返回</div>
        <div class="new-btn-item hand" :class="project + '-btn-blue'">保存</div>
      </div>
    </div>
  </base-model>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import BaseModel from 'components/base-model/base-model'
  import AdminSelect from 'components/admin-select/admin-select'
  import { mapGetters } from 'vuex'

  export default {
    name: 'new-agrnt',
    computed: {
      ...mapGetters(['project'])
    },
    components: {
      BaseModel,
      AdminSelect
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .content-box
    height: 100%
    width: 100%
    display: flex
    flex-direction: column
    box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
    background: $color-white
    border-radius: 6px
    font-size: $font-size-medium14
    font-family: $fontFamilyLight

  .new-text
    margin: 37px 0 29px

  .new-name-msg
    border-top-1px(#EFEFEF)
    margin-left: 1.5vw
    .new-input-box
      display: flex
      align-items: center
      margin-top: 2.7vh
    .new-input-title
      width: 68px
      color: $color-text33
      text-align: right
      margin-right: 6px
    .new-input
      border: 0.5px solid $color-lineCC
      border-radius: 4px
      width: 338px
      height: 28px
      text-indent: 8px
      box-sizing: border-box
      margin-right: 10px
      margin-left: 10px
      &::placeholder
        color: $color-lineCC
        font-size: $font-size-medium14
    .new-tip
      color: $color-lineCC
    .new-input-box-img
      align-items: flex-start
      .file-input
        height: 1px
        width: 0
        opacity: 0
        transform: translateY(-300vw)
      .new-add-img
        margin-left: 10px
        width: 120px
        height: 80px
        overflow: hidden
      .new-tip
        margin-left: 10px
        line-height: 80px

  .new-name-msg-center
    margin-top: 2.7vh

  .new-btn
    display: flex
    color: $color-text33
    margin-top: 40px
    margin-left: 96px
    .new-btn-item-border
      border-1px($color-lineCC, 6px)
    .new-btn-item
      font-size: $font-size-medium16
      margin-right: 20px
      border-radius: 3px
      width: 96px
      height: 40px
      text-align: center
      line-height: 40px

</style>