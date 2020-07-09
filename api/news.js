const app = getApp();

export function getAllChannels(cb) {
  return wx.request({
    url: app.config.apiUrl + "/app/v1_0/channels",
    success: cb,
  })
}
export function getArticles(cb) {
  return wx.request({
    url: app.config.apiUrl + '/app/v1_1/articles',
    success: cb,
  })
}
export function login(code) {
  return wx.request({
    url: app.config.apiUrl + '/app/v1_0/authorizations',
    method: "post",
    data: {
      mobile: "15889671152",
      code: code
    },
    success: (res) => {
      console.log(res);
    }
  })
}
export function sendCode(cb) {
  return wx.request({
    url: app.config.apiUrl + '/app/v1_0/sms/codes/15889671152',
    success: cb
  })
}