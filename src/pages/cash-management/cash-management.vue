<template>
  <div class="retail-order">
    <div class="top-box">
      <div class="top-left">
        <admin-select :select="statusType" ref="status"></admin-select>
        <div class="block"></div>
        <search @search="search"></search>
      </div>
      <div class="top-right">
        <div class="add-btn hand" :class="project + '-btn-blue'" @click="">导出Excel</div>
      </div>
    </div>
    <div class="list-head">
      <div class="list-item" v-for="(item, index) in headList" :key="index">{{item}}</div>
      <div class="last-item">操作</div>
    </div>
    <div class="list-box">
      <div class="list-content" v-for="(item, index) in orderList" :key="index">
        <div class="list-item" v-for="(item1, index1) in headList" :key="index1">test</div>
        <div class="last-item hand" :class="project + '-text'" @click="toDetail(item)">查看</div>
      </div>
    </div>
    <div class="page-box">
      <page-detail @addPage="addPage"></page-detail>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import Search from 'components/search/search'
  import PageDetail from 'components/page-detail/page-detail'
  import AdminSelect from 'components/admin-select/admin-select'
  import { mapGetters } from 'vuex'
  const HEADLIST = ['申请时间', '商品名称', '商家账号', '可提现金额', '申请提现金额', '提现类型', '处理状态']

  export default {
    name: 'cash-management',
    data() {
      return {
        headList: HEADLIST,
        orderList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        statusType: [{
          select: false,
          show: false,
          children: [{content: '角色名称', data: [{title: 'ss'}, {title: '999'}]}]
        }]
      }
    },
    methods: {
      addPage(page) {
        console.log(page)
      },
      search(txt) {
        console.log(txt)
      },
      toDetail(item) {
        console.log(item)
        this.$router.push({ path: `/order-management/retailOrder-detail`, query: {id: 2} })
      }
    },
    components: {
      Search,
      PageDetail,
      AdminSelect
    },
    computed: {
      ...mapGetters(['project'])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/theme'
  .retail-order
    height: 100%
    width: 100%
    box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
    background: $color-white
    border-radius: 6px
    display: flex
    flex-direction: column
    padding: 0 30px
    box-sizing: border-box
    .top-box
      width: 100%
      height: 88px
      display: flex
      justify-content: space-between
      align-items: center
      .top-left
        display: flex
        height: 100%
        align-items: center
      .block
        width: 10px
      .top-right
        display: flex
        height: 100%
        align-items: center
        .add-btn
          font-family: $fontFamilyRegular
          font-size: $font-size-small12
          color: $color-white
          width: 94px
          height: 28px
          text-align: center
          line-height: 28px
          border-radius: 4px
        .excel-btn
          font-family: $fontFamilyRegular
          font-size: $font-size-small12
          width: 94px
          height: 28px
          text-align: center
          line-height: 26px
          border-radius: 4px
          box-sizing: border-box
          margin-left: 20px


    .list-head
      width: 100%
      height: 50px
      display: flex
      background: $color-FAFAFA
      align-items: center
      border-bottom: 1px solid $color-line
    .list-item
      flex: 1
      text-align: left
      font-family: $fontFamilyRegular
      font-size: $font-size-medium14
      color: $color-text33
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      margin-right: 10px
      &:nth-child(1)
        flex: 1.5
        margin-left: 40px
    .last-item
      width: 112px
      text-align: center
      font-family: $fontFamilyRegular
      font-size: $font-size-medium14
      color: $color-text33
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      margin-right: 10px
    .list-box
      width: 100%
      flex: 1
      overflow: hidden
      display: flex
      flex-direction: column
      .list-content
        flex: 1
        width: 100%
        border-bottom: 1px solid $color-line
        display: flex
        align-items: center
    .page-box
      width: 100%
      height: 59px
      margin-bottom: 10px

</style>
