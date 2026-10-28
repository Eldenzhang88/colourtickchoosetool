const s = require('../../utils/storage');
Page({
  data: { agreed: false },
  onShow() {
    if (s.getConsent()) {
      wx.switchTab({ url: '/pages/home/home' });
    }
  },
  change(e) {
    this.setData({ agreed: e.detail.value.indexOf('adult') >= 0 });
  },
  enter() {
    if (!this.data.agreed) return;
    s.setConsent();
    wx.switchTab({ url: '/pages/home/home' });
  }
});
