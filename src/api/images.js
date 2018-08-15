import request from '../common/js/request'

export default {
  /**
   * 上传图片
   * @param data
   * @returns {*}
   */
  upload(data) {
    let url = '/api/manage/images'
    return request.post(url, data)
  }
}