var e = "https://api.isoyu.com/app";

Page({
    data: {
        letStop: !1,
        x: 125,
        y: 200,
        shakeCoefficient: .7,
        isSetAccelerometer: !1
    },
    onLoad: function(e) {
        this.setData({
            letStop: !1
        });
    },
    onShow: function(e) {
        var t = this;
        t.setData({
            letStop: !1
        }), wx.getStorage({
            key: "randomPoker_isSetAccelerometer",
            success: function(e) {
                t.setData({
                    isSetAccelerometer: e.data
                });
            }
        }), t.data.isSetAccelerometer && wx.onAccelerometerChange(function(e) {
            "pages/tools/randomPoker/randomPoker" != t.route || t.data.letStop || t.isShowPoker(e);
        });
    },
    showPoker: function(e) {
        var t = this, o = Math.floor(13 * Math.random() + 1), a = Math.floor(4 * Math.random() + 1);
        "pages/tools/randomPoker/randomPoker" != t.route || t.data.letStop || (t.setData({
            letStop: !0
        }), wx.navigateTo({
            url: "./showPoker?poker_num=" + o + "&poker_color=" + a
        }));
    },
    isShowPoker: function(t) {
        var o = this, a = o.data.shakeCoefficient;
        if (!o.data.letStop && (t.x > a && t.y > a || t.x > a && t.z > a || t.z > a && t.y > a)) {
            var r = wx.createInnerAudioContext();
            r.src = e + "/audio/shake.mp3", r.play(), o.showPoker();
        }
    },
    onHide: function(e) {
        this.setData({
            letStop: !0
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "一个木函--随机扑克",
            path: "/pages/tools/randomPoker/randomPoker",
          imageUrl:"https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});