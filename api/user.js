const app = getApp();
// 发送验证码
module.exports = {
  sendCode(mobile, cb) {
    return wx.request({
      url: app.config.apiUrl + '/app/v1_0/sms/codes/' + mobile,
      success: cb
    })
  }
};