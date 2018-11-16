<template>
  <div class="agent-list">
    <ul class="tab" v-if="project !== 'card'">
      <li class="tab-item hand" v-for="(item, index) in tabArr" :class="{'ws-btn-line': tabIndex === index}" :key="index" @click="_checkTab(index)">{{item.title}}</li>
    </ul>
    <div class="check-box">
      <admin-select :select="openType" ref="openType" v-if="tabIndex === 0" @setValue="setValue"></admin-select>
      <div class="search">
        <input type="text" class="search-input" placeholder="请输入商家名称或账号" v-model="word">
        <span class="search-btn hand" :class="project + '-btn-blue'" @click="_search">搜 索</span>
      </div>
      <a :href="downUrl" class="down-excel hand" :class="project + '-btn-blue'">导出Excel</a>
    </div>
    <div class="form-list">
      <div class="list-header">
        <div class="list-item" v-for="(item, index) in titleList" :key="index" v-if="tabIndex === 0 || (index !== 6 && tabIndex === 1)">
          {{item}}
        </div>
      </div>
      <div class="list">
        <div class="list-box" :class="project + '-list'" v-for="(item, index) in memberList" :key="index">
          <div class="list-item list-text">{{item.name || '---'}}</div>
          <div class="list-item list-text">{{item.mobile || '---'}}</div>
          <div class="list-item list-text">{{item.agent_name || '---'}}</div>
          <div class="list-item list-text">{{item.merchant_name || '---'}}</div>
          <div class="list-item list-text">{{item.relation_employee_name || '---'}}</div>
          <div class="list-item list-text">{{item.relation_employee_mobile || '---'}}</div>
          <div class="list-item list-text" v-if="tabIndex === 0">{{item.open_type}}</div>
          <div class="list-item list-text">{{item.role}}</div>
          <div class="list-item list-text">{{item.expiration_time}}</div>
          <div class="list-item hand list-item-tap">
            <router-link tag="span" :to="'/member-management/member-list/member-detail?id='+ item.id" :class="project + '-text-under'">查看</router-link>
          </div>
        </div>
      </div>
      <div class="page">
        <page-detail :pageDtail="pageTotal" @addPage="_addPage" ref="page"></page-detail>
      </div>
    </div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import BaseModel from 'components/base-model/base-model'
  import AdminSelect from 'components/admin-select/admin-select'
  import PageDetail from 'components/page-detail/page-detail'
  import {mapGetters} from 'vuex'
  import {Member} from 'api'
  import {ERR_OK, BASE_URL} from 'common/js/config'
  import storage from 'storage-controller'

  const TITLELIST = ['成员名称', '成员账号', '所属代理商', '所属企业', '推荐人', '推荐人电话', '开通方式', '职位', '到期时间', '操作']

  export default {
    name: 'member-list',
    data() {
      return {
        titleList: TITLELIST,
        tabArr: [{title: '正式版', status: 1}, {title: '试用版', status: 0}],
        tabIndex: 0,
        openType: [{
          select: false,
          show: false,
          children: [{content: '开通方式', data: [{title: '全部', status: 5, type: 'open'}, {title: '自费开通', status: 0, type: 'open'}, {title: '激活码开通', status: 1, type: 'open'}, {title: '代理商开通', status: 2, type: 'open'}, {title: '后台开通', status: 3, type: 'open'}, {title: '平台开通', status: 4, type: 'open'}]}]
        }],
        page: 1,
        keyword: '',
        word: '',
        status: 5,
        firstStatus: 5,
        memberList: [],
        pageTotal: {
          total: 1,
          per_page: 10,
          total_page: 0
        },
        downUrl: ''
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    async created() {
      this._getUrl()
      await this._getBusinessList()
    },
    methods: {
      _getUrl() {
        let title = storage.get('project') === 'card' ? 'zantui' : 'weishang'
        this.downUrl = BASE_URL.api + `/api/manage/export-employee-record?access_token=${storage.get('aiToken')}&current-application=${title}&open_type=${this.status}&keyword=${this.keyword}&service_version=${this.tabArr[this.tabIndex].status}`
      },
      async _checkTab(index) {
        this.tabIndex = index
        this.keyword = ''
        this.word = ''
        this.status = 2
        this.firstStatus = 2
        this.page = 1
        this.$refs.page.beginPage()
        await this._getBusinessList()
      },
      async _search() {
        this.keyword = this.word
        this.status = this.firstStatus
        this.page = 1
        this.$refs.page.beginPage()
        await this._getBusinessList()
      },
      async _getBusinessList() {
        let data = {page: this.page, open_type: this.status, keyword: this.keyword, service_version: this.tabArr[this.tabIndex].status}
        let res = await Member.memberList(data)
        this._getUrl()
        if (res.error !== ERR_OK) {
          this.$emit('setNull', true)
          return
        }
        let pages = res.meta
        this.pageTotal = Object.assign({}, {
          total: pages.total,
          per_page: pages.per_page,
          total_page: pages.last_page
        })
        this.memberList = res.data
        this.$emit('setNull', !this.memberList.length)
      },
      setValue(item) {
        switch (item.type) {
          case 'open':
            this.openType[0].children[0].content = item.title
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
    &:last-child
      flex: 0.7

  .list-box-active
    background: $color-background

  .page
    height: 9.1%

  .down-excel
    border-radius: 4px
    position: absolute
    right: 1.5vw
    height: 28px
    width: 84px
    line-height: 28px
    font-size: $font-size-small12
</style>
