var e = "https://api.isoyu.com/app";

getApp();

Page({
    data: {
        tools: [ {
            toolName: "截图拼接",
            url: "../tools/screenshotConnect/screenshotConnect",
            isHidden: !1
        }, {
            toolName: "手持弹幕",
            url: "../tools/danmu/danmu",
            isHidden: !1
        }, {
            toolName: "表情制作",
            url: "../tools/gifMaker/gifMaker",
            isHidden: !1
        }, {
            toolName: "文字转图片",
            url: "../tools/fontToImage/fontToImage",
            isHidden: !1
        }, {
            toolName: "文字转语音",
            url: "../tools/fontToVoice/fontToVoice",
            isHidden: !1
        }, {
            toolName: "物流查询",
            url: "../tools/queryExpress/queryExpress",
            isHidden: !1
        }, {
            toolName: "计算器",
            url: "../tools/calc/calc",
            isHidden: !1
        }, {
            toolName: "尺子",
            url: "../tools/ruler/ruler",
            isHidden: !1
        }, {
            toolName: "网络测速",
            url: "../tools/networkSpeed/networkSpeed",
            isHidden: !1
        }, {
            toolName: "B站封面下载",
            url: "../tools/bilibiliDown/bilibiliDown",
            isHidden: !1
        }, {
            toolName: "短网址生成",
            url: "../tools/shortSite/shortSite",
            isHidden: !1
        }, {
            toolName: "九宫格切图",
            url: "../tools/cuttingNine/cuttingNine",
            isHidden: !1
        }, {
            toolName: "base64加解密",
            url: "../tools/base64/base64",
            isHidden: !1
        }, {
            toolName: "随机扑克",
            url: "../tools/randomPoker/randomPoker",
            isHidden: !1
        }, {
            toolName: "翻译",
            url: "../tools/trans/trans",
            isHidden: !1
        }, {
            toolName: "更多功能",
            url: "./more",
            isHidden: !0
        } ],
        myLove: [],
        recentlyUsed: [],
        recommend: [ {
            toolName: "截图拼接",
            url: "../tools/screenshotConnect/screenshotConnect"
        }, {
            toolName: "手持弹幕",
            url: "../tools/danmu/danmu"
        }, {
            toolName: "表情制作",
            url: "../tools/gifMaker/gifMaker"
        } ],
        indicatorDots: !1,
        autoplay: !1,
        duration: 500,
        index: 0,
        isShowRecommend: !1,
        isHiddenShare: !0,
        shareTitle: "一个木函",
        sharePath: "/pages/index/index",
        hiddenConfig: {
            isHiddenSetting: !0,
            isHiddenAbout: !0,
            isHiddenNotice: !0,
            isHiddenReward: !0,
            isHiddenMoreFunction: !0
        }
    },
    onReady: function(e) {
        var t = this;
        t.requestIsHiddenConfig(), wx.getStorage({
            key: "myLove",
            success: function(e) {
                t.setData({
                    myLove: e.data
                });
            }
        });
    },
    onShow: function(e) {
        var t = this;
        wx.getStorage({
            key: "toolsConfig",
            success: function(e) {
                t.setData({
                    tools: e.data
                });
            }
        }), wx.getStorage({
            key: "isHiddenConfig",
            success: function(e) {
                t.setData({
                    hiddenConfig: e.data
                });
            }
        }), wx.getStorage({
            key: "isShowRecommend",
            success: function(e) {
                console.log(e.data), t.setData({
                    isShowRecommend: e.data
                });
            }
        }), wx.getStorage({
            key: "myLove",
            success: function(e) {
                t.setData({
                    myLove: e.data
                });
            }
        }), t.hideShare();
    },
    changeTab: function(e) {
        this.setData({
            index: e.currentTarget.dataset.index
        });
    },
    setFocus: function(e) {
        this.setData({
            index: e.detail.current
        });
    },
    toast: function(e) {
        wx.showToast({
            title: e,
            icon: "success",
            duration: 2e3
        });
    },
    goToPage: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    selectToLove: function(e) {
        var t = this, o = e.currentTarget.dataset.index, a = e.currentTarget.dataset.url, s = e.currentTarget.dataset.title, i = this.data.myLove, n = !1;
        wx.showActionSheet({
            itemList: [ "添加到喜欢列表", "转发给朋友" ],
            success: function(e) {
                if (0 == e.tapIndex) {
                    for (var d = 0; d < i.length; d++) if (t.data.tools[o].toolName == i[d].toolName) {
                        n = !0, t.toast("已存在");
                        break;
                    }
                    n || (i.splice(0, 0, t.data.tools[o]), t.setData({
                        myLove: i
                    }), wx.setStorage({
                        key: "myLove",
                        data: i
                    }), t.toast("添加成功"));
                }
                1 == e.tapIndex && t.shareFunction(s, a);
            },
            fail: function(e) {}
        });
    },
    selectRemoveLove: function(e) {
        console.log(e.currentTarget.dataset.index);
        var t = this, o = e.currentTarget.dataset.index, a = e.currentTarget.dataset.url, s = e.currentTarget.dataset.title, i = this.data.myLove;
        wx.showActionSheet({
            itemList: [ "移出喜欢列表", "转发给朋友" ],
            success: function(e) {
                0 == e.tapIndex && (i.splice(o, 1), t.setData({
                    myLove: i
                }), wx.setStorage({
                    key: "myLove",
                    data: i
                }), t.toast("移出成功")), 1 == e.tapIndex && t.shareFunction(s, a);
            },
            fail: function(e) {}
        });
    },
    shareFunction: function(e, t) {
        var o = this;
        e = "一个木函--" + e;
        var t = t.match(/..([\d\D]+)/);
        console.log(t);
        var a = "/pages" + t[1];
        o.setData({
            shareTitle: e,
            sharePath: a,
            isHiddenShare: !1
        });
    },
    hideShare: function(e) {
        this.setData({
            shareTitle: "一个木函",
            sharePath: "/pages/index/index",
            isHiddenShare: !0
        });
    },
    requestIsHiddenConfig: function(t) {
        var o = this;
        wx.request({
            url: e + "/isHiddenConfig.json",
            success: function(e) {
                o.setData({
                    hiddenConfig: e.data.isHiddenConfig,
                    tools: e.data.tools
                }), wx.setStorage({
                    key: "isHiddenConfig",
                    data: e.data.isHiddenConfig
                }), wx.setStorage({
                    key: "toolsConfig",
                    data: e.data.tools
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        var o = this.data.shareTitle, a = this.data.sharePath;
        return this.hideShare(), {
            title: o,
            path: a,
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});