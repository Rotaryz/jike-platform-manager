import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.PROJECT](state, project) {
    state.project = project
  },
  [TYPES.SET_TITLE_ARR](state, arr) {
    state.titleArr = arr
  }
}

export default mutations
