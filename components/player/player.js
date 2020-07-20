const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      default: false
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    default: 0,
    videos: [{
        v_id: 1,
        myVideo: 'myVideo1',
        cover: 'http://image2.pearvideo.com/cont/20181117/cont-1477753-11703578.png',
        avatar: 'http://image2.pearvideo.com/cont/20181117/cont-1477753-11703578.png',
        src: 'http://video.pearvideo.com/mp4/adshort/20181117/cont-1477753-13248875_adpkg-ad_hd.mp4',
        title: 'CNN起诉川普政府案宣判，CNN获胜CNN起诉川普政府案宣判，CNN获胜',
        writer: '看看新闻'

      },
      {
        v_id: 2,
        myVideo: 'myVideo2',
        cover: 'http://image.pearvideo.com/cont/20181116/cont-1477146-11703021.jpeg',
        avatar: 'http://image.pearvideo.com/node/19-10027896-logo.jpg',
        src: 'http://video.pearvideo.com/mp4/adshort/20181116/cont-1477146-13247738_adpkg-ad_hd.mp4',
        title: '靓声界男神陈奕迅英音读《小王子》',
        writer: '眼镜儿'
      },
      {
        v_id: 3,
        myVideo: 'myVideo3',
        cover: 'http://image1.pearvideo.com/cont/20181118/cont-1478240-11705317.png',
        avatar: 'http://image.pearvideo.com/node/1548-10523493-logo.png',
        src: 'http://video.pearvideo.com/mp4/short/20181118/cont-1478240-13253290-hd.mp4',
        title: '看看新闻',
        writer: '梨重庆'
      }
    ]
  },
  methods: {
    //点击播放按钮，封面图片隐藏,播放视频
    videoPlay: function (e) {
      var index = e.currentTarget.dataset.id + '';
      var that = this;
      this.setData({
        default: index
      })
      //停止正在播放的视频
      var videoContextPrev = wx.createVideoContext("myVideo" + that.data.default)
      videoContextPrev.seek(0)
      videoContextPrev.pause()
      setTimeout(function () {
        //将点击视频进行播放
        var videoContext = wx.createVideoContext("myVideo" + index)
        videoContext.play();
        that.data.default = index;
      }, 100)

      
    },
  },
  // 退出组件视频停止
  hide: function() {
    //离开当前页面
    VideoContext.stop()
  },
  detached() {
    console.log(1111)
  }
})