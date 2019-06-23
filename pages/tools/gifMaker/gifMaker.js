var t = "https://api.isoyu.com/app";

Page({
    data: {
        gifList: []
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "等会，别急",
            mask: !0
        }), this.getGifList();
    },
    getGifList: function(i) {
        var a = this;
        wx.request({
            url: t + "/getGifList.php",
            success: function(t) {
                wx.hideLoading(), console.log(t.data), a.setData({
                    gifList: t.data
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "服务器炸掉了，过会再来吧。"
                });
            }
        });
    },
    toEditPage: function(t) {
        var i = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "./editGif?id=" + i
        });
    },
    onShareAppMessage: function(i) {
        return {
            title: "一个木函--表情制作",
            path: "/pages/tools/gifMaker/gifMaker",
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});