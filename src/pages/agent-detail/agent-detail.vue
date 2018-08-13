<template>
  <div class="agent-detail">
    <div class="agent-detail-box">
      <div :class="project + '-line'" class="agent-text">基本信息</div>
      <div class="agent-content">
        <div class="agent-box">
          <div class="agent-item"><span class="agent-title">商家名称：</span>XXX代理商</div>
          <div class="agent-item"><span class="agent-title">商家账号：</span>XXX代理商</div>
          <div class="agent-item"><span class="agent-title">角色名称：</span>XXX代理商</div>
          <div class="agent-item"><span class="agent-title">所在地区：</span>XXX代理商</div>
          <div class="agent-item"><span class="agent-title">所属上级名称：</span>XXX代理商</div>
          <div class="agent-item"><span class="agent-title">所属上级账号：</span>XXX代理商</div>
          <div class="agent-item"><span class="agent-title">推荐人名称：</span>XXX代理商</div>
          <div class="agent-item"><span class="agent-title">推荐人账号：</span>XXX代理商</div>
          <div class="agent-item"><span class="agent-title">代理金额(元)：</span>XXX代理商</div>
          <div class="agent-item"><span class="agent-title">代理期限：</span>XXX代理商</div>
        </div>
      </div>
    </div>
    <div class="agent-detail-box">
      <div :class="project + '-line'" class="agent-text">商品信息</div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">商品名称：</span>XXX代理商</div>
        <div class="agent-item"><span class="agent-title">商品数量(总进货)：</span>XXX代理商</div>
        <div class="agent-item"><span class="agent-title">当前进货单价(元)：</span>XXX代理商</div>
        <div class="agent-item"><span class="agent-title">商品数量(总销售)：</span>XXX代理商</div>
      </div>
    </div>
    <div class="agent-detail-box">
      <div :class="project + '-line'" class="agent-text">资产信息</div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">总收入(元)：</span>XXX代理商</div>
      </div>
      <div class="agent-box agent-box-border">
        <div class="agent-item"><span class="agent-title">销货收入(元)：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查询明细</span></div>
        <div class="agent-item"><span class="agent-title">推荐奖励收入(元)：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查询明细</span></div>
        <div class="agent-item"><span class="agent-title">团队奖励收入(元)：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查询明细</span></div>
        <div class="agent-item"><span class="agent-title">年费奖励收入(元)：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查询明细</span></div>
      </div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">总支出(元)：88888.00：</span>XXX代理商</div>
      </div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">代理支出(元)：18888.00：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">收款凭证</span></div>
        <div class="agent-item"><span class="agent-title">商品进货支出(元)：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查询明细</span></div>
      </div>
    </div>
    <div class="agent-detail-box">
      <div :class="project + '-line'" class="agent-text">团队信息</div>
      <div class="agent-box agent-box-border">
        <div class="agent-item"><span class="agent-title">自有商家(个)：12：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查看列表</span></div>
        <div class="agent-item"><span class="agent-title">自有成员(人)：220：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查看列表</span></div>
        <div class="agent-item"><span class="agent-title">分销成员(人)：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查看列表</span></div>
      </div>
      <div class="agent-box">
        <div class="agent-item"><span class="agent-title">推荐代理商(个)：12：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查看列表</span></div>
        <div class="agent-item"><span class="agent-title">推荐代理商商家(个)：220：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查看列表</span></div>
        <div class="agent-item"><span class="agent-title">推荐代理商分销成员(人)：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查看列表</span></div>
        <div class="agent-item"><span class="agent-title">推荐代理商成员(人)：</span>XXX代理商<span class="until hand" :class="project + '-text-under'">查看列表</span></div>
      </div>
    </div>
    <div class="agent-btn hand" :class="project + '-btn-blue'">返回</div>
  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import BaseModel from 'components/base-model/base-model'

  export default {
    name: 'agent-detail',
    computed: {
      ...mapGetters(['project'])
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

  .agent-box-border
    margin-bottom: 30px
    border-bottom-1px(#EFEFEF)

  .agent-btn
    border-radius: 3px
    font-family: $fontFamilyLight
    margin: 3.7vh auto 3.7vh
    line-height: 40px
    width: 96px
    height: 40px
</style>