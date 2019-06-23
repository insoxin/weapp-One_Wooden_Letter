var t = "https://api.isoyu.com/app";

Page({
    data: {
        noticeList: []
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "客观等会哈",
            mask: !0
        });
    },
    onShow: function(n) {
        var o = this;
        wx.request({
            url: t + "/notice.json",
            success: function(t) {
                wx.hideLoading(), console.log(t.data), o.setData({
                    noticeList: t.data
                });
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "服务器忙不过来了，等会儿再来吧。",
                    icon: "none"
                });
            }
        });
    },
    onShareAppMessage: function(n) {
        return {
            title: "一个木函",
            path: "/pages/notice/notice",
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});