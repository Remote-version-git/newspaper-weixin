const app = getApp();
module.exports = {
  sendCode(mobile, cb) {
    return  wx.request({
      url: app.config.apiUrl + '/app/v1_0/sms/codes/' + mobile,
      success: cb
    })
  }
};
