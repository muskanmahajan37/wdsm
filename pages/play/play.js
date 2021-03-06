var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    systemInfo: {},
    _api: {},
    list: [],
    isHideLoadMore: false,
    nextUrl: ''
  },

  onLoad(options) {
    var that = this;
    app.getSystemInfo(function (res) {
      that.setData({
        systemInfo: res
      })
    });

    let defaultUrl =  api.HOST_PLAY;
    if(options && options.url) {
        defaultUrl = options.url;
    }

    that.setData({
      _api: api,
      defaultUrl: defaultUrl
    });

    this.onPullDownRefresh()
  },

  onItemClick(e) {
    wx.navigateTo({
      url: '/pages/play-detail/play-detail?rowId=' + e.currentTarget.dataset.rowId
    })
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
      api.get(this.data.defaultUrl)
      .then(res => {
        this.setData({
          data: res.data.results,
          nextUrl: res.data.next
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      })
  },

  onReachBottom() {
    wx.showNavigationBarLoading();
    if (!!this.data.nextUrl) {
      this.setData({
        isHideLoadMore: false
      })
      api.get(this.data.nextUrl)
        .then(res => {
          wx.hideNavigationBarLoading();
          this.setData({
            data: this.data.data.concat(res.data.results),
            nextUrl: res.data.next,
            isHideLoadMore: true
          });
        })
    }
  }
});
