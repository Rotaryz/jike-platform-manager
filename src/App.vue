<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
  import storage from 'storage-controller'

  export default {
    name: 'App',
    created() {
      let project = storage.get('project', 'weishang')
      this.setProject(project)
    },
    methods: {
      ...mapActions(['setProject', 'setTitleArr'])
    },
    watch: {
      '$route'(to) {
        let title = to.meta.title
        if (!title) {
          return
        }
        let titleArr = title.split(',')
        this.setTitleArr(titleArr)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50
    width: 100vw
    height: 100vh
    overflow: hidden

  .fade-enter, .fade-leave-to
    opacity: 0

  .fade-enter-to, .fade-leave-to
    transition: opacity .2s ease-in-out
</style>
