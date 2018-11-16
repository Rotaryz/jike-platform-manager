<template>
  <div class="agent-list">
    <ul class="tab">
      <li class="tab-item hand" v-for="(item, index) in tabArr" :class="tabIndex === index ? project + '-btn-line' : ''" :key="index" @click="_checkTab(index)">{{item}}</li>
    </ul>
    <div class="check-box">
      <admin-select :select="role" ref="role" @setValue="setValue"></admin-select>
      <admin-select :select="account" ref="account" @setValue="setValue" v-if="tabIndex === 1"></admin-select>
      <div class="search">
        <input type="text" class="search-input" placeholder="请输入商家名称或账号" v-model="name">
        <span class="search-btn hand" :class="project + '-btn-blue'" @click="_search">搜 索</span>
      </div>
      <div class="btn-big">
        <router-link tag="div" to="/agent-management/agent-list/new-agent" class="down-excel hand" :class="project + '-btn-blue'">+ 新增代理商</router-link>
        <a :href="downUrl" class="down-excel hand" :class="project + '-btn-white'">导出Excel</a>
      </div>
    </div>
    <div class="form-list">
      <div class="list-header">
        <div class="list-item" v-for="(item, index) in titleList" :key="index">
          {{item}}
        </div>
      </div>
      <div class="list">
        <div class="list-box" v-for="(item, index) in agentList" :key="index">
          <div class="list-item list-text">{{item.name || '---'}}</div>
          <div class="list-item list-text">{{item.mobile || '---'}}</div>
          <div class="list-item list-text">{{item.role || '---'}}</div>
          <div class="list-item list-text">---</div>
          <div class="list-item list-text">---</div>
          <div class="list-item list-text">{{item.recomm_invite_name || '---'}}</div>
          <div class="list-item list-text">{{item.invite_mobile || '---'}}</div>
          <div class="list-item list-text" v-if="tabIndex === 0">{{item.status === 1 ? '使用中' : item.status === 2 ? '过期' : ''}}</div>
          <div class="list-item list-text" v-if="tabIndex === 1">{{item.status === 0 ? '待审核' :item.status === 1 ? '审核通过' : item.status === 2 ? '审核不通过' : '---'}}</div>
          <div class="list-item hand list-item-tap" v-if="tabIndex === 0">
            <!--<router-link tag="span" :to="'/agent-management/agent-list/new-agent?id='+ item.id" :class="project + '-text-under'">编辑</router-link>-->
            <!--|-->
            <router-link tag="span" :to="'/agent-management/agent-list/agent-detail?id='+ item.id + '&type=1'" :class="project + '-text-under'">查看</router-link>
          </div>
          <div class="list-item hand list-item-tap" v-if="tabIndex === 1">
            <div @click="_deal(item)" :class="project + '-text-under'">{{item.status === 0 ? '审核' : '查看'}}</div>
          </div>
        </div>
      </div>
      <div class="page">
        <page-detail ref="page" :pageDtail="pageTotal" @addPage="_addPage"></page-detail>
      </div>
    </div>
  </div>
</template>

<script>
  import { Agent } from 'api'
  import { ERR_OK, BASE_URL } from 'common/js/config'
  import BaseModel from 'components/base-model/base-model'
  import AdminSelect from 'components/admin-select/admin-select'
  import PageDetail from 'components/page-detail/page-detail'
  import { mapGetters } from 'vuex'
  import storage from 'storage-controller'

  const TITLELIST = ['商家名称', '商家账号', '角色名称', '上级名称', '上级电话', '推荐人', '推荐人电话', '账户状态', '操作']

  export default {
    name: 'list',
    data() {
      return {
        titleList: TITLELIST,
        tabArr: ['代理商列表', '申请记录'],
        tabIndex: 0,
        role: [{
          select: false,
          show: false,
          children: [{content: '角色名称'}]
        }],
        account: [{
          select: false,
          show: false,
          children: [{content: '账户状态', data: [{title: '全部', status: 3, type: 'status'}, {title: '待审核', status: 0, type: 'status'}, {title: '审核通过', status: 1, type: 'status'}, {title: '审核不通过', status: 2, type: 'status'}]}]
        }],
        page: 1,
        agentList: [],
        pageTotal: {
          total: 1,
          per_page: 10,
          total_page: 0
        },
        name: '',
        roleId: 0,
        endRoleId: 0,
        endName: '',
        status: 3,
        endStatus: 3,
        downUrl: ''
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    watch: {
      project(newValue) {
        if (newValue) {
          this._getAngetList()
        }
      }
    },
    async created() {
      await this._getAngetList()
      await this._roleList()
      this._getUrl()
    },
    methods: {
      _getUrl() {
        let title = storage.get('project') === 'card' ? 'zantui' : 'weishang'
        switch (this.tabIndex * 1) {
          case 0:
            this.downUrl = BASE_URL.api + `/api/manage/agent-export?access_token=${storage.get('aiToken')}&current_application=${title}&role=${this.endRoleId}&name=${this.endName}`
            break
          case 1:
            this.downUrl = BASE_URL.api + `/api/manage/apply-export?access_token=${storage.get('aiToken')}&current_application=${title}&role=${this.endRoleId}&name=${this.endName}&status=${this.endStatus}`
            break
        }
      },
      _deal(item) {
        let url = ''
        if (item.status === 0) {
          url = '/agent-management/agent-list/new-agent?id=' + item.id + '&check=1'
        } else {
          url = '/agent-management/agent-list/agent-detail?id=' + item.id + '&type=2'
        }
        this.$router.push(url)
      },
      async _search() {
        this.endRoleId = this.roleId
        this.endName = this.name
        this.page = 1
        this.endStatus = this.status
        this.$refs.page.beginPage()
        await this._getAngetList()
      },
      // 角色列表
      async _roleList() {
        let res = await Agent.roleList()
        if (res.error !== ERR_OK) {
          return
        }
        let arr = []
        res.data.forEach((item) => {
          arr.push({title: item.level_name, type: 'role', level: item.level})
        })
        arr.unshift({title: '全部', type: 'role', level: ''})
        this.role[0].children[0].data = arr
      },
      async _checkTab(index) {
        this.tabIndex = index
        this.page = 1
        this.roleId = 0
        this.role[0].children[0].content = '角色名称'
        this.name = ''
        this.endRoleId = this.roleId
        this.endName = this.name
        this.status = 3
        this.endStatus = this.status
        this.$refs.page.beginPage()
        await this._getAngetList()
      },
      async _getAngetList() {
        if (this.tabIndex === 0) {
          let data = {page: this.page, role: this.endRoleId, status: 0, name: this.endName}
          let res = await Agent.agentList(data)
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
          this.agentList = res.data
          this.$emit('setNull', !this.agentList.length)
          return
        }
        let data = {page: this.page, role: this.endRoleId, status: this.status, name: this.endName}
        let res = await Agent.applyAgent(data)
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
        this.agentList = res.data
        this.$emit('setNull', !this.agentList.length)
      },
      setValue(item) {
        switch (item.type) {
          case 'role':
            this.role[0].children[0].content = item.title
            this.roleId = item.level
            break
          case 'status':
            this.account[0].children[0].content = item.title
            this.status = item.status
            break
        }
      },
      async _addPage(page) {
        this.page = page
        await this._getAngetList()
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
        text-align: center
        font-size: $font-size-small12
        border-radius: 4px
    .btn-big
      position: absolute
      right: 1.5vw
      display: flex
    .down-excel
      border-radius: 4px
      height: 28px
      width: 84px
      line-height: 28px
      font-size: $font-size-small12
      margin-left: 9px

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

  .list-box-active
    background: $color-background

  .page
    height: 9.1%
</style>
