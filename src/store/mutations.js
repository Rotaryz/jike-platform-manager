import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.PROJECT](state, project) {
    console.log(state)
    state.project = project
  },
  [TYPES.SET_TITLE_ARR](state, arr) {
    state.titleArr = arr
  }
}

export default mutations
