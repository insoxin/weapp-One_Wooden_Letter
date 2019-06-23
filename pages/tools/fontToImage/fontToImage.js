Page({
    data: {
        width: 320,
        height: 500,
        imageUrl: "",
        imageList: [],
        isChangeHeight: !1,
        text: "",
        isHiddenCanvas: !0,
        textConfig: {
            fontSize: 15,
            fontColor: "#000000",
            lineHeight: 30,
            fontStyle: "normal",
            bgColor: "#ffffff",
            padding: 30
        },
        color_array: [ "白", "黑", "红", "橙", "黄", "绿", "青", "蓝", "紫" ],
        color: [ "#ffffff", "#000000", "#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00fff0", "#0000ff", "#ff00ff" ],
        fontColorIndex: 1,
        bgColorIndex: 0,
        testwidth: 320,
        testheight: 500,
        isHiddenTestCanvas: !0
    },
    onLoad: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    width: t.windowWidth,
                    height: t.screenHeight
                });
            }
        }), e.saveAndGetData("", !0);
    },
    createImage: function(t) {
        var e = this, a = t.detail.value.text, n = e.data.textConfig;
        n.fontSize = t.detail.value.fontSize, n.lineHeight = t.detail.value.lineHeight, 
        n.padding = t.detail.value.padding, e.saveAndGetData(a, !1), wx.showLoading({
            title: "努力生成中...",
            mask: !0
        }), e.setData({
            isHiddenCanvas: !1
        }), e.drawCanvas("canvas", a, n.fontSize, n.fontColor, n.bgColor, n.lineHeight, n.padding, n.fontStyle), 
        setTimeout(function(t) {
            wx.canvasToTempFilePath({
                canvasId: "canvas",
                success: function(t) {
                    wx.hideLoading(), console.log(t.tempFilePath);
                    var a = [];
                    a.push(t.tempFilePath), e.setData({
                        imageUrl: t.tempFilePath,
                        imageList: a
                    }), wx.previewImage({
                        urls: a,
                        current: t.tempFilePath,
                        success: function(t) {
                            e.setData({
                                isHiddenCanvas: !0
                            });
                        }
                    });
                }
            }, e);
        }, 500);
    },
    drawCanvas: function(t, e) {
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 15, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "#000000", o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "yellow", i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 30, s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 30, l = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "normal", f = this, d = f.data.width, r = f.returnTestCanvasHeight("testCanvas", e, a, i, s, l);
        f.setData({
            height: r
        }), console.log("获得高度" + r);
        var g = wx.createCanvasContext(t, f);
        console.log("开始"), g.setFillStyle(o), g.fillRect(0, 0, d, r), g.setTextBaseline("top"), 
        g.font = l + " " + a + "px sans-serif", g.setFillStyle(n);
        for (var h = e.split(/\n/), v = (f.data.height, 0), c = s; v < h.length; v++) {
            var u = h[v].split(""), x = "", C = "", p = s;
            v > 0 && (c += i);
            for (var w = 0; w < u.length; w++) C = x + u[w], g.measureText(C).width > d - 2 * s && w > 0 ? (g.fillText(x, p, c), 
            x = u[w], c += i) : x = C;
            g.fillText(x, p, c);
        }
        g.draw();
    },
    returnTestCanvasHeight: function(t, e) {
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 15, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 30, o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 30, i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "normal", s = this;
        s.setData({
            isHiddenTestCanvas: !1
        });
        var l = s.data.testwidth, f = (s.data.testheight, wx.createCanvasContext(t, s));
        f.setTextBaseline("top"), f.font = i + " " + a + "px sans-serif";
        var d = e.split(/\n/);
        console.log(d);
        for (var r = s.data.testheight, g = 0, h = o; g < d.length; g++) {
            var v = d[g].split(""), c = "", u = "", x = o;
            g > 0 && (h += n);
            for (var C = 0; C < v.length; C++) u = c + v[C], f.measureText(u).width > l - 2 * o && C > 0 ? (f.fillText(c, x, h), 
            c = v[C], h += n) : c = u;
            if (f.fillText(c, x, h), g == d.length - 1) return r = h + n + o, console.log("成功返回高度" + r), 
            s.setData({
                isHiddenTestCanvas: !0
            }), r;
        }
    },
    clear: function(t) {
        var e = this;
        wx.showModal({
            title: "暖心提示",
            content: "真的要清空吗？",
            confirmColor: "#08e037",
            success: function(t) {
                t.confirm && (e.setData({
                    text: ""
                }), wx.showToast({
                    title: "已清空",
                    icon: "none"
                })), t.cancel && console.log("用户取消了清空");
            }
        }), e.saveAndGetData("", !1);
    },
    paste: function(t) {
        var e = this;
        console.log("粘贴"), wx.getClipboardData({
            success: function(t) {
                e.setData({
                    text: t.data
                }), e.saveAndGetData(t.data, !1);
            }
        });
    },
    setTextStyle: function(t) {
        this.setData({
            "textConfig.fontStyle": t.detail.value
        });
    },
    selectFontColor: function(t) {
        var e = this, a = e.data.color;
        e.setData({
            fontColorIndex: t.detail.value,
            "textConfig.fontColor": a[t.detail.value]
        });
    },
    selectBgColor: function(t) {
        var e = this, a = e.data.color;
        e.setData({
            bgColorIndex: t.detail.value,
            "textConfig.bgColor": a[t.detail.value]
        });
    },
    saveAndGetData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = this;
        0 == (arguments.length > 1 && void 0 !== arguments[1] && arguments[1]) ? wx.setStorage({
            key: "fontToImage_text",
            data: t
        }) : wx.getStorage({
            key: "fontToImage_text",
            success: function(t) {
                e.setData({
                    text: t.data
                });
            }
        });
    },
    inputSave: function(t) {
        this.saveAndGetData(t.detail.value, !1);
    },
    onShareAppMessage: function(t) {
        return {
            title: "一个木函--文字转图片",
            path: "/pages/tools/fontToImage/fontToImage",
          imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});