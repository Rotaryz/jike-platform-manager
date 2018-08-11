<template>
  <base-model>
    <div slot="content" class="content-box">
      <ul class="tab" v-if="project !== 'card'">
        <li class="tab-item hand" v-for="(item, index) in tabArr" :class="{'ws-btn-line': tabIndex === index}" :key="index">{{item}}</li>
      </ul>
      <div class="check-box">
        <admin-select :select="role" ref="role"></admin-select>
        <admin-select :select="account" ref="account"></admin-select>
        <div class="search">
          <input type="text" class="search-input" placeholder="请输入商家名称或账号">
          <span class="search-btn" :class="project + '-btn-blue'">搜 索</span>
        </div>
      </div>
      <div class="form-list">
        <div class="list-header">
          <div class="list-item" v-for="(item, index) in titleList" :key="index">
            {{item}}
          </div>
        </div>
        <div class="list">
          <div class="list-box" v-for="item in 10">
            <div class="list-item list-text">撒谎反馈绝对会分开的时候放开手撒发放撒法</div>
            <div class="list-item list-text">撒谎反馈绝对会分开的时候放开手撒发放撒法</div>
            <div class="list-item list-text">撒谎反馈绝对会分开的时候放开手撒发放撒法</div>
            <div class="list-item list-text">撒谎反馈绝对会分开的时候放开手撒发放撒法</div>
            <div class="list-item list-text">撒谎反馈绝对会分开的时候放开手撒发放撒法</div>
            <div class="list-item list-text">撒谎反馈绝对会分开的时候放开手撒发放撒法</div>
            <div class="list-item list-text">撒谎反馈绝对会分开的时候放开手撒发放撒法</div>
            <div class="list-item list-text">撒谎反馈绝对会分开的时候放开手撒发放撒法</div>
            <div class="list-item list-text">撒谎反馈绝对会分开的时候放开手撒发放撒法</div>
            <div class="list-item hand" :class="project + '-text-under'">编辑</div>
          </div>
        </div>
        <div class="page">
          <page-detail></page-detail>
        </div>
      </div>
    </div>
  </base-model>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import BaseModel from 'components/base-model/base-model'
  import AdminSelect from 'components/admin-select/admin-select'
  import PageDetail from 'components/page-detail/page-detail'
  import { mapGetters } from 'vuex'

  const TITLELIST = ['申请时间', '商家名称', '商家账号', '角色名称', '上级名称', '上级电话', '推荐人', '推荐人电话', '账户状态', '操作']

  export default {
    name: 'agent-management',
    data() {
      return {
        titleList: TITLELIST,
        tabArr: ['代理商列表', '申请记录'],
        tabIndex: 0,
        role: [{
          select: false,
          show: false,
          children: [{content: '角色名称', data: [{title: 'ss'}, {title: '999'}]}]
        }],
        account: [{
          select: false,
          show: false,
          children: [{content: '账户状态', data: []}]
        }]
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    components: {
      BaseModel,
      AdminSelect,
      PageDetail
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

  .check-box
    align-items: center
    display: flex
    padding: 1.5vw 0 1.5vw 10px
    .search
      display: flex
      align-items: center
      margin-left: 10px
      .search-input
        box-sizing: border-box
        height: 28px
        width: 224px
        border-radius: 4px
        border: 1px solid $color-textD9
        text-indent: 8px
        font-size: $font-size-small12
        color: $color-text33
        &::placeholder
          font-size: $font-size-small12
          color: $color-lineCC
      .search-btn
        margin-left: 20px
        width: 52px
        height: 28px
        line-height: 28px
        font-size: $font-size-small12
        border-radius: 4px

  .form-list
    font-family: $fontFamilyRegular
    padding: 0 1.5vw 10px
    flex: 1

  .list-header, .list-box
    width: 100%
    display: flex
    align-items: center
    padding-left: 2vw
    box-sizing: border-box

  .list-header
    width: 100%
    height: 9.1%
    white-space: nowrap
    border-bottom: 1px solid $color-line
    background: $color-big-background

  .list
    height: 81.8%
    display: flex
    flex-direction: column
    .list-box
      height: 10%
      border-bottom: 1px solid $color-line
      .list-item
        line-height: 16px
        color: $color-text33
        font-size: $font-size-medium14

      .list-text
        no-wrap()
        width: 90%
        color: $color-text-66
    no-wrap()

  .list-item-img
    width: 60px
    height: 40px
    border: none
    display: block

  .check-box
    width: 85px
    .check-item
      margin-left: 1.5vw
      display: inline-block
      width: 14px
      box-sizing: border-box
      height: 14px
      border: 1px solid #D9D9D9
    .check-ok
      border: none

  .list-item
    color: $color-text
    flex: 1
    position: relative
    text-align: left
    overflow: hidden
    .showDetail
      cursor: pointer
      font-size: $font-size-small
      color: $color-nomal
      border-radius: 3px
      .audit-disable
        color: $color-text-little
      .audit
        color: $color-nomal
    &:nth-child(1)
      flex: 1.5
    &:last-child
      flex: 0.7

  .list-box-active
    background: $color-background

  .page
    height: 9.1%

</style>
