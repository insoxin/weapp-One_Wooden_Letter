Page({
    data: {
        tools: [ {
            toolName: "二维码生成",
            url: "../tools/createQrcode/createQrcode"
        }, {
            toolName: "二维码转字符",
            url: "../tools/scanQrcode/scanQrcode"
        } ],
        myLove: [],
        isHiddenShare: !0,
        shareTitle: "一个木函",
        sharePath: "/pages/index/index"
    },
    onLoad: function(t) {
        var e = this;
        wx.getStorage({
            key: "myLove",
            success: function(t) {
                e.setData({
                    myLove: t.data
                });
            }
        });
    },
    goToPage: function(t) {
        var e = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: e
        });
    },
    selectToLove: function(t) {
        var e = this, a = t.currentTarget.dataset.index, o = t.currentTarget.dataset.url, s = t.currentTarget.dataset.title, n = this.data.myLove, r = !1;
        wx.showActionSheet({
            itemList: [ "添加到喜欢列表", "转发给朋友" ],
            success: function(t) {
                if (0 == t.tapIndex) {
                    for (var i = 0; i < n.length; i++) if (e.data.tools[a].toolName == n[i].toolName) {
                        r = !0, e.toast("已存在");
                        break;
                    }
                    r || (n.splice(0, 0, e.data.tools[a]), e.setData({
                        myLove: n
                    }), wx.setStorage({
                        key: "myLove",
                        data: n
                    }), e.toast("添加成功"));
                }
                1 == t.tapIndex && e.shareFunction(s, o);
            }
        });
    },
    toast: function(t) {
        wx.showToast({
            title: t,
            icon: "success",
            duration: 2e3
        });
    },
    alert: function(t) {
        wx.showModal({
            title: "致·信封",
            confirmText: "前程似锦",
            confirmColor: "#08e037",
            cancelText: "支持一下",
            content: "感谢使用我们的作品\n\n毕业在即，说真的，压力很大，也许再也没有那么多时间和热情去开发它了，再好的情怀也得面对柴米油盐的。\n\n这是个纯粹为了好用而生的小程序，现在不会有广告，以后也不会有，若某年某日还有空，我们会继续照顾它，更新它。\n\n嘘，现在它睡了，让它安静的躺在理想小溪里，别打扰它。",
            success: function(t) {
                t.confirm ? wx.showToast({
                    title: "你也是~嘻嘻~",
                    icon: "none"
                }) : wx.navigateTo({
                    url: "../reward/reward"
                });
            }
        });
    },
    shareFunction: function(t, e) {
        var a = this;
        t = "一个木函--" + t;
        var e = e.match(/..([\d\D]+)/);
        console.log(e);
        var o = "/pages" + e[1];
        a.setData({
            shareTitle: t,
            sharePath: o,
            isHiddenShare: !1
        });
    },
    hideShare: function(t) {
        this.setData({
            shareTitle: "一个木函",
            sharePath: "/pages/index/index",
            isHiddenShare: !0
        });
    },
    onShareAppMessage: function(t) {
        var e = this.data.shareTitle, a = this.data.sharePath;
        return this.hideShare(), {
            title: e,
            path: a,
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});