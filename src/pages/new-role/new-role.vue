<template>
  <div class="new-role">
    <div :class="project + '-line'" class="agent-text">基本信息</div>
    <div class="new-name-msg">
      <div class="new-input-box">
        <span class="new-input-title">* 角色名称</span>
        <input type="text" class="new-input" placeholder="请输入角色名称">
      </div>
      <div class="new-input-box">
        <span class="new-input-title">* 等级</span>
        <admin-select></admin-select>
      </div>
    </div>
    <div class="new-name-msg">
      <div class="new-input-box">
        <span class="new-input-title">* 代理金额</span>
        <input type="text" class="new-input" placeholder="请输入商家姓名或名称">
      </div>
      <div class="new-input-box">
        <span class="new-input-title">* 进货单价</span>
        <input type="text" class="new-input" placeholder="请输入商家手机号">
      </div>
    </div>
    <div class="new-btn">
      <div class="new-btn-item new-btn-item-border hand">返回</div>
      <div class="new-btn-item hand" :class="project + '-btn-blue'">保存</div>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import AdminSelect from 'components/admin-select/admin-select'

  export default {
    name: 'new-role',
    computed: {
      ...mapGetters(['project'])
    },
    components: {
      AdminSelect
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .new-role
    padding: 40px 3.9vh 10px
    box-sizing: border-box
    height: 100%
    box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
    background: $color-white
    border-radius: 6px
    font-size: $font-size-medium14
    font-family: $fontFamilyLight

  .agent-text
    transform: translateX(-3.9vh)
    margin-bottom: 40px

  .new-name-msg
    border-top-1px(#EFEFEF)
    margin-left: 1.5vw
    padding-top: 2.4vh
    .new-input-box
      display: flex
      align-items: center
      margin-bottom: 2.4vh
      &:first-child
        margin-top: 0
    .new-input-title
      width: 68px
      color: $color-text33
      text-align: right
      margin-right: 6px
      white-space: nowrap
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
  .new-btn
    display: flex
    color: $color-text33
    padding-top: 2.7vh
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