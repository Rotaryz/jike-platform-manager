import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.PROJECT](state, project) {
    state.project = project
  }
}

export default mutations
