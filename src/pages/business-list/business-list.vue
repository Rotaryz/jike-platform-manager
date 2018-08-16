<template>
  <div class="agent-list">
    <div class="check-box">
      <!--<admin-select :select="account" ref="account" @setValue="setValue"></admin-select>-->
      <div class="search">
        <input type="text" class="search-input" placeholder="请输入商家名称或账号" v-model="keyword">
        <span class="search-btn hand" :class="project + '-btn-blue'" @click="_search">搜 索</span>
      </div>
      <div class="down-excel hand" :class="project + '-btn-blue'">导出Excel</div>
    </div>
    <div class="form-list">
      <div class="list-header">
        <div class="list-item" v-for="(item, index) in titleList" :key="index">
          {{item}}
        </div>
      </div>
      <div class="list">
        <div class="list-box" v-for="(item,index) in businessList" :key="index">
          <div class="list-item list-text">{{item.name || '---'}}</div>
          <div class="list-item list-text">{{item.mobile || '---'}}</div>
          <div class="list-item list-text">{{item.agent.name || '---'}}</div>
          <div class="list-item list-text">---</div>
          <div class="list-item list-text">---</div>
          <div class="list-item list-text">{{item.status === 1 ? '使用中' : '已过期'}}</div>
          <div class="list-item list-text">{{item.agent_merchant_end_time || '---'}}</div>
          <div class="list-item hand list-item-tap">
            <router-link tag="span" :to="'/business-management/business-list/business-detail?id=' + item.id" :class="project + '-text-under'">查看</router-link>
          </div>
        </div>
      </div>
      <div class="page">
        <page-detail :pageDtail="pageTotal" @addPage="_addPage"></page-detail>
      </div>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import BaseModel from 'components/base-model/base-model'
  import AdminSelect from 'components/admin-select/admin-select'
  import PageDetail from 'components/page-detail/page-detail'
  import { mapGetters } from 'vuex'
  import { Business } from 'api'
  import { ERR_OK } from 'common/js/config'

  const TITLELIST = ['商家名称', '商家账号', '所属代理商', '推荐人', '推荐人电话', '账户状态', '到期时间', '操作']

  export default {
    name: 'business-list',
    data() {
      return {
        titleList: TITLELIST,
        tabArr: ['代理商列表', '申请记录'],
        tabIndex: 0,
        account: [{
          select: false,
          show: false,
          children: [{content: '账户状态', data: [{title: '全部', status: 0, type: 'account'}, {title: '使用中', status: 1, type: 'account'}, {title: '已过期', status: 2, type: 'account'}]}]
        }],
        page: 1,
        keyword: '',
        status: 0,
        firstStatus: 0,
        businessList: [],
        pageTotal: {
          total: 1,
          per_page: 10,
          total_page: 0
        }
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    async created() {
      await this._getBusinessList()
    },
    methods: {
      async _search() {
        this.status = this.firstStatus
        this.page = 1
        await this._getBusinessList()
      },
      async _getBusinessList() {
        let data = {page: this.page, status: this.status, keyword: this.keyword}
        let res = await Business.managetMerchant(data)
        if (res.error !== ERR_OK) {
          return
        }
        let pages = res.meta
        this.pageTotal = Object.assign({}, {
          total: pages.total,
          per_page: pages.per_page,
          total_page: pages.last_page
        })
        this.businessList = res.data
        console.log(res.data)
      },
      setValue(item) {
        switch (item.type) {
          case 'account':
            this.account[0].children[0].content = item.title
            this.firstStatus = item.status
            break
        }
      },
      async _addPage(page) {
        this.page = page
        await this._getBusinessList()
      }
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
  .agent-list
    display: flex
    flex-direction: column
    height: 100%
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
    position: relative
    .search
      display: flex
      align-items: center
      margin-left: 10px
      .search-input
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
    .down-excel
      border-radius: 4px
      position: absolute
      right: 1.5vw
      height: 28px
      width: 84px
      line-height: 28px
      font-size: $font-size-small12

  .form-list
    font-size: $font-size-medium14
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
      .list-item-tap
        font-size: $font-size-small12
        color: rgba(0, 0, 0, .1)
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