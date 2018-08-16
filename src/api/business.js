import request from '../common/js/request'

export default {
  /**
   * 企业列表
   * @param data
   * @returns {*}
   */
  managetMerchant(data) {
    let url = '/api/manage/agent-merchant'
    return request.get(url, data)
  }, /**
   * 企业详情
   * @param data
   * @returns {*}
   */
  getAgentMerchant(data) {
    let url = '/api/manage/get-agent-merchant'
    return request.get(url, data)
  }
}