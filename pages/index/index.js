const app = getApp();


Page({
  data: {
    active: 0,
    loading: true
  },
  onLoad: function () {
   
  },
  onChange(event) {
    this.setData({ active: event.detail });
  }
})
