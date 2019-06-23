App({
    onLaunch: function() {
        var n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n);
    },
    globalData: {
        userInfo: null
    }
});