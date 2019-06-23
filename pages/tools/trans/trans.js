var a = "https://api.isoyu.com/app";

Page({
    data: {
        list: [ {
            name: "中文简体",
            code: "zh"
        }, {
            name: "英语",
            code: "en"
        }, {
            name: "日语",
            code: "jp"
        }, {
            name: "韩语",
            code: "kor"
        }, {
            name: "德语",
            code: "de"
        }, {
            name: "法语",
            code: "fra"
        }, {
            name: "俄语",
            code: "ru"
        }, {
            name: "泰语",
            code: "th"
        }, {
            name: "越南语",
            code: "vie"
        }, {
            name: "文言文",
            code: "wyw"
        }, {
            name: "粤语",
            code: "yue"
        }, {
            name: "中文繁体",
            code: "cht"
        } ],
        language: [ {
            name: "中文",
            code: "zh"
        }, {
            name: "英语",
            code: "en"
        }, {
            name: "日语",
            code: "jp"
        }, {
            name: "韩语",
            code: "kor"
        }, {
            name: "德语",
            code: "de"
        }, {
            name: "法语",
            code: "fra"
        } ],
        languageList: [],
        fromLanguage: {
            name: "英语",
            code: "en"
        },
        toLanguage: {
            name: "中文",
            code: "zh"
        },
        query: "",
        trans: "",
        voic: ""
    },
    onLoad: function(a) {
        for (var e = this, t = [], n = e.data.language, o = 0; o < n.length; o++) t.push(n[o].name);
        e.setData({
            languageList: t
        }), wx.getStorage({
            key: "fromLanguage",
            success: function(a) {
                e.setData({
                    fromLanguage: a.data
                });
            }
        }), wx.getStorage({
            key: "toLanguage",
            success: function(a) {
                e.setData({
                    toLanguage: a.data
                });
            }
        });
    },
    selectFromLanguage: function(a) {
        var e = this;
        wx.showActionSheet({
            itemList: e.data.languageList,
            success: function(a) {
                var t = e.data.language[a.tapIndex];
                e.setData({
                    fromLanguage: t
                }), wx.setStorage({
                    key: "fromLanguage",
                    data: t
                });
            }
        });
    },
    selectToLanguage: function(a) {
        var e = this;
        wx.showActionSheet({
            itemList: e.data.languageList,
            success: function(a) {
                var t = e.data.language[a.tapIndex];
                e.setData({
                    toLanguage: t
                }), wx.setStorage({
                    key: "toLanguage",
                    data: t
                });
            }
        });
    },
    trans: function(e) {
        var t = this;
        e.detail.value.query ? wx.request({
            url: a + "/trans.php",
            method: "POST",
            data: {
                type: "baidu",
                from: t.data.fromLanguage.code,
                to: t.data.toLanguage.code,
                query: e.detail.value.query
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                null == a.data.trans || void 0 == a.data.trans || "" == a.data.trans ? wx.showToast({
                    title: "凉凉，翻译失败",
                    icon: "none"
                }) : t.setData({
                    trans: a.data.trans,
                    voic: a.data.voic
                });
            }
        }) : wx.showToast({
            title: "请先输入内容",
            icon: "none"
        });
    },
    listen: function(a) {
        var e = this.data.voic, t = wx.createAudioContext("audio", this);
        t.setSrc(e), t.play();
    },
    copy: function(a) {
        var e = this;
        wx.setClipboardData({
            data: e.data.trans,
            success: function(a) {
                wx.showToast({
                    title: "已复制",
                    icon: "none"
                });
            }
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "一个木函--翻译",
            path: "/pages/tools/trans/trans",
            imageUrl:"https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});