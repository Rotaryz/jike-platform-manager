import request from '../common/js/request'

export default {
  /**
   * 订单列表
   * @param data
   * @returns {*}
   */
  agentOrderList(data) {
    let url = '/api/order/admin-sale-record'
    return request.get(url, data)
  }, /**
   * 新增订单
   * @param data
   * @returns {*}
   */
  newAgentOrder(data) {
    let url = '/api/order/admin-sale-record'
    return request.post(url, data)
  }, /**
   * 订单详情
   * @param data
   * @returns {*}
   */
  agentOrderDetail(id) {
    let url = `/api/order/admin-sale-record/${id}`
    return request.get(url)
  }
}