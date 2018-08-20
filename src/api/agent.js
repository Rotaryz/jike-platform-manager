import request from '../common/js/request'

export default {
  /**
   * 代理商列表
   * @param data
   * @returns {*}
   */
  agentList(data) {
    let url = '/api/manage/admin-agent'
    return request.get(url, data)
  }, /**
   * 代理商编辑
   * @param data
   * @returns {*}
   */
  editAgent(data, id) {
    let url = `/api/manage/admin-agent/${id}`
    return request.put(url, data)
  }, /**
   * 代理商详情
   * @param data
   * @returns {*}
   */
  agentDetail(id) {
    let url = `/api/manage/admin-agent/${id}`
    return request.get(url)
  }, /**
   * 角色列表
   * @param data
   * @returns {*}
   */
  roleList() {
    let url = `/api/manage/level`
    return request.get(url)
  }, /**
   * 新建
   * @param data
   * @returns {*}
   */
  newAgent(data) {
    let url = `/api/manage/admin-agent`
    return request.post(url, data)
  }, /**
   * 申请记录
   * @param data
   * @returns {*}
   */
  applyAgent(data) {
    let url = `/api/manage/apply-agent`
    return request.get(url, data)
  }, /**
   * 代理商审核
   * @param data
   * @returns {*}
   */
  applyAgentExamine(data, id) {
    let url = `/api/manage/apply-agent/${id}`
    return request.post(url, data)
  }, /**
   * 申请代理商详情
   * @param data
   * @returns {*}
   */
  examineDetail(id) {
    let url = `/api/manage/apply-agent/${id}`
    return request.get(url)
  }
}
