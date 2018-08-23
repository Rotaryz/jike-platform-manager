<template>
  <div class="agent-detail">
    <div class="agent-detail-box" v-if="detail.agent">
      <div :class="project + '-line'" class="agent-text">基本信息</div>
      <div class="agent-content">
        <div class="agent-box">
          <div class="agent-item"><span class="agent-title">商家名称：</span>{{detail.name}}</div>
          <div class="agent-item"><span class="agent-title">商家账号：</span>{{detail.mobile}}</div>
          <div class="agent-item"><span class="agent-title">角色名称：</span>---</div>
          <div class="agent-item"><span class="agent-title">所在地区：</span>{{detail.address || '---'}}</div>
          <div class="agent-item"><span class="agent-title">所属行业：</span>{{detail.industry || '---'}}</div>
        </div>
        <div class="agent-box">
          <div class="agent-item"><span class="agent-title">所属代理商：</span>{{detail.agent.name}}</div>
          <div class="agent-item"><span class="agent-title">所属代理商账号：</span>{{detail.agent.mobile}}</div>
          <div class="agent-item"><span class="agent-title">推荐人名称：</span>---</div>
          <div class="agent-item"><span class="agent-title">推荐人账号：</span>---</div>
          <div class="agent-item"><span class="agent-title">使用期限：</span>{{detail.agent_merchant_end_time}}</div>
        </div>
      </div>
    </div>
    <div class="agent-detail-box" v-if="false">
      <div :class="project + '-line'" class="agent-text">商品信息</div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">商品名称：</span></div>
        <div class="agent-item"><span class="agent-title">商品数量(总进货)：</span></div>
        <div class="agent-item"><span class="agent-title">当前进货单价(元)：</span></div>
        <div class="agent-item"><span class="agent-title">商品数量(总销售)：</span></div>
      </div>
    </div>
    <div class="agent-detail-box" v-if="false">
      <div :class="project + '-line'" class="agent-text">资产信息</div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">总收入(元)：</span></div>
      </div>
      <div class="agent-box ">
        <div class="agent-item"><span class="agent-title">销货收入(元)：</span><span class="until hand" :class="project + '-text-under'">查询明细</span></div>
      </div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">总支出(元)：</span></div>
      </div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">商品进货支出(元)：</span><span class="until hand" :class="project + '-text-under'">收款凭证</span></div>
        <div class="agent-item"><span class="agent-title">年费支出(元)：</span></div>
      </div>
    </div>
    <div class="agent-detail-box" v-if="false">
      <div :class="project + '-line'" class="agent-text">团队信息</div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">自有成员(人)：</span><span class="until hand" :class="project + '-text-under'">查看列表</span></div>
        <div class="agent-item"><span class="agent-title">分销成员(人)：</span><span class="until hand" :class="project + '-text-under'">查看列表</span></div>
      </div>
    </div>
    <div class="agent-btn hand" :class="project + '-btn-blue'" @click="_back">返回</div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters, mapActions } from 'vuex'
  import BaseModel from 'components/base-model/base-model'
  import { Business } from 'api'
  import { ERR_OK } from 'common/js/config'

  export default {
    name: 'business-detail',
    data() {
      return {
        detail: {}
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    async created() {
      let id = this.$route.query.id
      await this._getDetail(id)
    },
    methods: {
      ...mapActions(['setTitleArr']),
      _back() {
        this.$router.back()
      },
      async _getDetail(id) {
        let res = await Business.getAgentMerchant({agent_merchant_id: id})
        if (res.error !== ERR_OK) {
          return
        }
        this.detail = res.data
        let arr = `商家管理,企业管理,${res.data.name}`
        this.setTitleArr(arr.split(','))
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
