import request from '../common/js/request'

export default {
  /**
   * 平台收入
   * @param data
   * @returns {*}
   */
  incomeList(data) {
    let url = '/api/finance/income-list'
    return request.get(url, data)
  }, /**
   * 发放记录
   * @param data
   * @returns {*}
   */
  bonusApplyList(data) {
    let url = '/api/finance/bonus-apply-list'
    return request.get(url, data)
  }, /**
   * 审核发放凭证
   * @param data
   * @returns {*}
   */
  bonusApplyAudit(id, data) {
    let url = `/api/finance/bonus-apply-audit/${id}`
    return request.post(url, data)
  }
}