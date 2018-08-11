import * as TYPES from './mutation-types'

export const setProject = function ({commit, state}, project) {
  commit(TYPES.PROJECT, project)
}
