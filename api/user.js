const app = getApp();
// 发送验证码
module.exports = {
  sendCode(mobile, cb) {
    return  wx.request({
      url: app.config.apiUrl + '/app/v1_0/sms/codes/' + mobile,
      success: cb
    })
  },
  // 刷新 token
  refreshToken(refreshToken, cb) {
    return wx.request({
      url: "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
      method: "PUT",
      header: {
        Authorization: `Bearer ${refreshToken}`
      },
      success: cb
    })
  }
};