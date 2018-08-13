<template>
  <base-model>
    <div slot="content" class="content-box">
      <router-view></router-view>
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
    methods: {},
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

</style>
