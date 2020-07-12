const JSONbig = require('json-bigint');
const request = require('../utils/request');
const app = getApp();


export function getAllChannels(cb) {
  return wx.request({
    url: app.config.apiUrl + "/app/v1_0/channels",
    success: cb,
  })
}
export function getArticles(options) {
  return request({
    url: '/app/v1_1/articles',
    dataType: "string",
    ...options
  }).then((res) => {
    return JSONbig.parse(res.data).data;
  });
}

export function getArticleDetail(articleId) {
  return request({
    url: '/app/v1_0/articles/'.concat(articleId),
  })
}