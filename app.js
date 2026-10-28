const storage = require('./utils/storage');
App({
  onLaunch() {
    // pages/notice is first entry; consented users jump to home from notice.onShow
  },
  ensureConsent() {
    if (!storage.getConsent()) {
      wx.reLaunch({ url: '/pages/notice/notice' });
      return false;
    }
    return true;
  }
});
