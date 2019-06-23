Page({
    data: {
        isShowRecommend: !1,
        voiceApi: "3",
        isSetAccelerometer: !1
    },
    onLoad: function(e) {},
    onShow: function(e) {
        var t = this;
        wx.getStorage({
            key: "isShowRecommend",
            success: function(e) {
                console.log(e.data), t.setData({
                    isShowRecommend: e.data
                });
            }
        }), wx.getStorage({
            key: "fontToVoice_voiceApi",
            success: function(e) {
                console.log(e.data), t.setData({
                    voiceApi: e.data
                });
            }
        }), wx.getStorage({
            key: "randomPoker_isSetAccelerometer",
            success: function(e) {
                t.setData({
                    isSetAccelerometer: e.data
                });
            }
        });
    },
    setShowRecommend: function(e) {
        wx.setStorage({
            key: "isShowRecommend",
            data: e.detail.value
        }), this.setData({
            isShowRecommend: e.detail.value
        });
    },
    setVoiceApi: function(e) {
        var t = this.data.voiceApi;
        t = e.detail.value ? "1" : "3", wx.setStorage({
            key: "fontToVoice_voiceApi",
            data: t
        }), this.setData({
            voiceApi: t
        });
    },
    setAccelerometer: function(e) {
        var t = this;
        console.log("setAccelerometer触发，值为：" + e.detail.value), wx.setStorage({
            key: "randomPoker_isSetAccelerometer",
            data: e.detail.value
        }), t.setData({
            isSetAccelerometer: e.detail.value
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "一个木函",
            path: "/pages/index/index",
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});