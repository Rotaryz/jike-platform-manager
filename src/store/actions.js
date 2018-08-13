import * as TYPES from './mutation-types'

export const setProject = function ({commit, state}, project) {
  commit(TYPES.PROJECT, project)
}

export const setTitleArr = function ({commit, state}, arr) {
  commit(TYPES.SET_TITLE_ARR, arr)
}
