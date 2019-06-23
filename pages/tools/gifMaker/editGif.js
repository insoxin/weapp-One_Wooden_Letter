var t = "https://api.isoyu.com/app";

Page({
    data: {
        id: 0,
        gifInfo: [],
        gifUrl: ""
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        }), this.getGifInfo(t.id);
    },
    getGifInfo: function(a) {
        var i = this;
        wx.request({
            url: t + "/getGifList.php?id=" + a,
            success: function(t) {
                console.log(t.data), i.setData({
                    gifInfo: t.data
                });
            }
        });
    },
    makeGif: function(a) {
        var i = this, e = a.detail.value, o = JSON.stringify(e);
        console.log(i.data.gifInfo.dir), console.log(o), wx.showLoading({
            title: "努力合成中",
            mask: !0
        }), wx.request({
            url: t + "/gifmake.php",
            method: "POST",
            data: {
                dir: i.data.gifInfo.dir,
                data: o
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), i.setData({
                    gifUrl: t.data
                }), wx.navigateTo({
                    url: "./showGif?gifUrl=" + t.data
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: "一个木函--表情制作",
            path: "/pages/tools/gifMaker/editGif?id=" + this.data.id,
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});