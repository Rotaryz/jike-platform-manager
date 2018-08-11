<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
  import storage from 'storage-controller'

  export default {
    name: 'App',
    created() {
      let project = storage.get('project', 'ws')
      this.setProject(project)
    },
    methods: {
      ...mapActions(['setProject'])
    },
    watch: {
      '$route'(to) {
        let title = to.meta.title
        sessionStorage.setItem('title', title)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
</style>
