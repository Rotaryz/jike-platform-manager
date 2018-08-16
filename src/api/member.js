import request from '../common/js/request'

export default {
  /**
   * 成员列表
   * @param data
   * @returns {*}
   */
  memberList(data) {
    let url = '/api/manage/employee'
    return request.get(url, data)
  }, /**
   * 新增订单
   * @param data
   * @returns {*}
   */
  memberDetail(data) {
    let url = '/api/manage/get-employee'
    return request.get(url, data)
  }
}