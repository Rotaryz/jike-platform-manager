<template>
  <div class="order-detail">

  </div>
</template>

<script>
  // import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'

  export default {
    name: 'retailOrder-detail',
    created() {
      console.log(this)
    },
    methods: {
      _fileImage(e) {
        console.log(e.target.files[0])
      },
      backBefore() {
        this.$router.back()
      }
    },
    computed: {
      ...mapGetters(['project'])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

</style>
