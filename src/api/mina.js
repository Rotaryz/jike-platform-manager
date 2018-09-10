import request from '../common/js/request'

export default {
  /**
   * 小程序列表
   * @param data
   * @returns {*}
   */
  miniProgramIndex(data) {
    let url = '/api/manage/mini-program-index'
    return request.get(url, data)
  }, /**
   * 撤销记录
   * @param data
   * @returns {*}
   */
  withdrawAudit(data) {
    let url = '/api/manage/withdraw-audit'
    return request.post(url, data)
  }, /**
   * 撤销记录
   * @param data
   * @returns {*}
   */
  quickPress(data) {
    let url = '/api/manage/quick-press'
    return request.post(url, data)
  }, /**
   * 撤销记录
   * @param data
   * @returns {*}
   */
  release(data) {
    let url = '/api/manage/release'
    return request.post(url, data)
  }
}
