const app = getApp();


Page({
  data: {
    active: 3,
    loading: true
  },
  onLoad: function () {
   
  },
  onChange(event) {
    this.setData({ active: event.detail });
  }
})
