var t = "https://api.isoyu.com/app/";

Page({
    data: {
        index: 0,
        systemInfo: {
            width: 320,
            height: 667
        },
        article: {
            title: "开发者有话说",
            time: "2017.01.01",
            author: "开发者",
            content: "\n\n\t很高兴你们能打开这个页面，这说明你对我们的努力是认可的，没有比这个让人更开心的事情了。\n\n\t虽说这小程序看起来很简单，但是花掉我们（小明和小坚）的时间并不少，一边忙着期末考试的复习，一边看着开发文档边学边做，经常凌晨两点还在调试，前前后后花了大半个月，当然，也学到了不少的东西。\n\n\t除了时间成本，服务器也是要月租的，我们不知到这个小程序上架后，服务器会不会崩掉，能抗住多大的迸发量，是否要升级服务器，这些都是要人民币的。\n\n\t不过呢，我们不打算接入广告，尽管那会很赚钱，尽管我们也很穷。但是广告太影响使用心情了，我们希望的是大家能有一个用的开心的工具箱，不管是在苹果还是在安卓。\n\n\t我们只是用心地做一个希望得到大家认同的作品。如果你们认可小明和小坚的努力，就用点小钱支持一下他们吧，即便是一毛，也是很大的鼓励。\n\n\t以上，致谢。"
        },
        images: [ "/pages/images/wechat.jpg", "/pages/images/alipay.jpg" ],
        isHiddenGeiZan: !0,
        geiZanConfig: {
            appId: "",
            path: "",
            extraData: {
                hello: "panciTools"
            },
            envVersion: "release"
        }
    },
    onLoad: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    "systemInfo.width": t.windowWidth,
                    "systemInfo.height": t.windowHeight
                });
            }
        }), e.updateImage();
    },
    onShow: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    "systemInfo.width": t.windowWidth,
                    "systemInfo.height": t.windowHeight
                });
            }
        });
    },
    changeTab: function(t) {
        this.setData({
            index: t.currentTarget.dataset.index
        });
    },
    setFocus: function(t) {
        this.setData({
            index: t.detail.current
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "一个木函",
            path: "/pages/reward/reward",
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    },
    previewImage: function(t) {
        var e = this, a = t.currentTarget.dataset.index;
        console.log(e.data.images[a]), wx.previewImage({
            urls: e.data.images,
            current: e.data.images[a]
        });
    },
    saveHttpImage: function(t, e) {
        wx.downloadFile({
            url: t,
            success: function(t) {
                200 === t.statusCode && wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    fail: function() {
                        wx.showToast({
                            title: "保存失败,请开启小程序保存相册权限,或截图",
                            icon: "none"
                        });
                    },
                    success: function() {
                        e();
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "服务器撂担子不干了，过会儿再来吧。",
                    icon: "none"
                });
            }
        });
    },
    saveLocalImage: function(t, e) {
        wx.saveImageToPhotosAlbum({
            filePath: t,
            fail: function() {
                wx.showToast({
                    title: "保存失败,请开启小程序保存相册权限,或截图",
                    icon: "none"
                });
            },
            success: function() {
                e();
            }
        });
    },
    saveImage: function(t) {
        var e = this, a = e.data.images;
        a[0].match("http") ? e.saveHttpImage(a[0], function() {
            a[1].match("http") ? e.saveHttpImage(a[1], function() {}) : e.saveLocalImage(a[1], function() {});
        }) : e.saveLocalImage(a[0], function() {
            a[1].match("http") ? e.saveHttpImage(a[0], function() {}) : e.saveLocalImage(a[0], function() {});
        });
    },
    updateImage: function(e) {
        var a = this;
        wx.request({
            url: t + "/reward.json",
            success: function(t) {
                console.log(t.data), 1 == t.data.isUpdateImage && a.setData({
                    images: t.data.images
                }), 0 == t.data.isHiddenGeiZan && a.setData({
                    isHiddenGeiZan: !1,
                    geiZanConfig: t.data.geiZanConfig
                });
            }
        });
    }
});