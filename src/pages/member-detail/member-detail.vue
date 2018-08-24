<template>
  <div class="agent-detail">
    <div class="agent-detail-box">
      <div :class="project + '-line'" class="agent-text">基本信息</div>
      <div class="agent-content">
        <div class="agent-box">
          <div class="agent-item"><span class="agent-title">商家名称：</span>{{detail.name || '---'}}</div>
          <div class="agent-item"><span class="agent-title">商家账号：</span>{{detail.mobile|| '---'}}</div>
          <div class="agent-item"><span class="agent-title">角色名称：</span>{{detail.role === 'boss' ? '团长' : '成员'}}</div>
          <div class="agent-item"><span class="agent-title">职位：</span>{{detail.position || '---'}}</div>
          <div class="agent-item"><span class="agent-title">所属企业：</span>{{detail.merchant_name|| '---'}}</div>
          <div class="agent-item"><span class="agent-title">所属企业账号：</span>{{detail.merchant_mobile|| '---'}}</div>
          <div class="agent-item"><span class="agent-title">所属代理商：</span>{{detail.agent_name || '---'}}</div>
          <div class="agent-item"><span class="agent-title">所属代理商账号：</span>{{detail.agent_mobile || '---'}}</div>
          <div class="agent-item"><span class="agent-title">推荐人名称：</span>{{detail.relation_employee_name|| '---'}}</div>
          <div class="agent-item"><span class="agent-title">推荐人账号：</span>{{detail.relation_employee_mobile|| '---'}}</div>
          <div class="agent-item"><span class="agent-title">使用期限：</span>{{detail.expiration_time|| '---'}}</div>
          <div class="agent-item"><span class="agent-title">开通方式：</span>{{detail.open_type === 0 ? '自费开通' : '激活码开通'}}</div>
        </div>
      </div>
    </div>
    <div class="agent-detail-box" v-if="false">
      <div :class="project + '-line'" class="agent-text">资产信息</div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">总收入(元)：</span></div>
      </div>
      <div class="agent-box ">
        <div class="agent-item"><span class="agent-title">推荐奖励收入(元)：</span><span class="until hand" :class="project + '-text-under'">查询明细</span></div>
      </div>
    </div>
    <div class="agent-detail-box" v-if="false">
      <div :class="project + '-line'" class="agent-text">团队信息</div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">直接推荐(人)：</span>{{detail.relation_employee_mobile|| '---'}}<span class="until hand" :class="project + '-text-under'">查看列表</span></div>
      </div>
    </div>
    <div class="agent-btn hand" :class="project + '-btn-blue'" @click="_back">返回</div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import BaseModel from 'components/base-model/base-model'
  import { Member } from 'api'
  import { ERR_OK } from 'common/js/config'

  export default {
    name: 'member-detail',
    data() {
      return {
        detail: {}
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    created() {
      let id = this.$route.query.id
      this._memberDetail(id)
    },
    methods: {
      _back() {
        this.$router.back()
      },
      async _memberDetail(id) {
        let res = await Member.memberDetail({employee_id: id})
        if (res.error !== ERR_OK) {
          return
        }
        this.detail = res.data
        console.log(res.data)
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
  .agent-detail-box
    box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
    border-radius: 6px
    background: $color-white
    padding: 40px 3.9vh 10px
    margin-bottom: 20px
    &:last-child
      margin-bottom: 0

  .agent-text
    transform: translateX(-3.9vh)
    margin-bottom: 40px

  .agent-box
    display: flex
    flex-wrap: wrap
    white-space: nowrap
    .agent-item
      text-align: left
      font-size: $font-size-medium14
      font-family: $fontFamilyLight
      width: (100 / 3) %
      color: $color-text-66
      margin-bottom: 30px
      .agent-title
        color: #2A2A2A
      .until
        margin-left: 40px

  .agent-btn
    border-radius: 3px
    font-family: $fontFamilyLight
    margin: 3.7vh auto 3.7vh
    line-height: 40px
    width: 96px
    height: 40px
</style>
