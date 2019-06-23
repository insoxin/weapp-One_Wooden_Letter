Page({
    data: {
        canvasInfo: {
            id: "mycanvas",
            width: 320,
            height: 568
        },
        showInfo: {
            width: 320,
            height: 568
        },
        systemInfo: {
            width: 320,
            height: 568
        },
        img: "",
        isChoose: !1
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
        });
    },
    imageToCanvas: function(t) {
        var e = this, i = e.data.canvasInfo, s = wx.createCanvasContext(i.id, e);
        s.drawImage(t, 0, 0, i.width, i.height), s.draw();
    },
    cutImage: function(t) {
        var e = this;
        wx.getImageInfo({
            src: t,
            success: function(i) {
                var s = i.width, a = i.height;
                wx.getSystemInfo({
                    success: function(i) {
                        e.setData({
                            "systemInfo.width": i.windowWidth,
                            "systemInfo.height": i.windowHeight,
                            "canvasInfo.width": s,
                            "canvasInfo.height": a,
                            "showInfo.width": i.windowWidth,
                            "showInfo.height": i.windowWidth / s * a
                        }), e.imageToCanvas(t);
                    }
                });
            }
        });
    },
    previewImage: function(t) {
        var e = this, i = e.data.canvasInfo, s = t.currentTarget.dataset.index;
        wx.canvasToTempFilePath({
            canvasId: i.id,
            x: s % 3 * i.width / 3,
            y: parseInt(s / 3) * i.height / 3,
            width: i.width / 3,
            height: i.height / 3,
            success: function(t) {
                console.log("成功路径： " + t.tempFilePath);
                var e = [];
                e.push(t.tempFilePath), wx.previewImage({
                    urls: e
                });
            }
        }, e);
    },
    chooseImage: function(t) {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            success: function(t) {
                e.setData({
                    img: t.tempFilePaths[0],
                    isChoose: !0
                }), e.cutImage(t.tempFilePaths[0]), wx.showToast({
                    title: "点击长按即可保存",
                    icon: "none"
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "一个木函--九宫格切图",
            path: "/pages/tools/cuttingNine/cuttingNine",
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});