var t = "https://api.isoyu.com/app";

Page({
    data: {
        speed: 5,
        personIndex: 0,
        personList: [ {
            id: 0,
            person: "标准女声"
        }, {
            id: 2,
            person: "标准男声"
        }, {
            id: 3,
            person: "大哥哥"
        }, {
            id: 4,
            person: "小姐姐"
        } ],
        personArr: [],
        text: "",
        voiceUrl: "",
        voicShortUrl: "",
        voiceApi: "3"
    },
    onLoad: function(t) {
        var e = this, o = e.data.personList.map(function(t, e) {
            return t.person;
        });
        wx.getStorage({
            key: "fontToVoice_voiceApi",
            success: function(t) {
                e.setData({
                    voiceApi: t.data
                });
            }
        }), e.setData({
            personArr: o
        }), e.saveAndGetData("", !0);
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
    copyUrl: function(t) {
        var e = this;
        wx.setClipboardData({
            data: e.data.voiceUrl,
            success: function(t) {
                wx.showToast({
                    title: "已复制",
                    icon: "none"
                });
            }
        });
    },
    saveFile: function(t) {
        var e = this;
        wx.downloadFile({
            url: e.data.voiceUrl,
            success: function(t) {
                200 === t.statusCode && wx.saveFile({
                    tempFilePath: t.tempFilePath,
                    success: function(t) {
                        wx.showModal({
                            title: "保存成功",
                            content: "已保存到" + t.savedFilePath
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "哎呀，保存失败",
                            icon: "none"
                        });
                    }
                });
            }
        });
    },
    setPerson: function(t) {
        var e = this;
        wx.showActionSheet({
            itemList: e.data.personArr,
            success: function(t) {
                e.setData({
                    personIndex: t.tapIndex
                });
            }
        });
    },
    saveAndGetData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = this;
        0 == (arguments.length > 1 && void 0 !== arguments[1] && arguments[1]) ? wx.setStorage({
            key: "fontToVoice_text",
            data: t
        }) : wx.getStorage({
            key: "fontToVoice_text",
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
    createVoice: function(e) {
        var o = this, a = encodeURIComponent(e.detail.value.text), n = e.detail.value.speed, s = o.data.personList[o.data.personIndex].id;
        console.log("\n" + n + "\n" + s + "\n" + a), wx.request({
            url: t + "/fontToVoice.php?speed=" + n + "&person=" + s + "&text=" + a + "&type=" + o.data.voiceApi,
            success: function(t) {
                console.log(t.data), o.setData({
                    voiceUrl: t.data
                }), wx.showToast({
                    title: "耶~成功了",
                    icon: "none"
                }), o.audioPlay();
            },
            fail: function(t) {
                wx.showToast({
                    title: "凉凉，合成失败，过段时间再试吧",
                    icon: "none"
                });
            }
        });
    },
    audioPlay: function(t) {
        var e = this, o = wx.createInnerAudioContext();
        o.src = e.data.voiceUrl, o.play();
    },
    onShareAppMessage: function(e) {
        return {
            title: "一个木函--文字转语音",
            path: "/pages/tools/fontToVoice/fontToVoice",
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});