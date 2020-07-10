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
