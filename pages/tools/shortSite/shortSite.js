var t = "https://api.isoyu.com/app";

Page({
    data: {
        siteList: [ "t.cn", "tinyurl.com" ],
        url: "",
        site: "t.cn",
        shortUrl: ""
    },
    onLoad: function(t) {},
    selectSite: function(t) {
        var e = this;
        wx.showActionSheet({
            itemList: e.data.siteList,
            success: function(t) {
                var a = e.data.siteList[t.tapIndex];
                e.setData({
                    site: a
                });
            }
        });
    },
    getUrl: function(e) {
        var a = this, s = e.detail.value.url, o = a.data.site;
        s ? (s.match("http") || (s = "http://" + s), console.log(s), wx.request({
            url: t + "/shortSite.php",
            method: "POST",
            data: {
                site: o,
                url: s
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                t.data && !t.data.match("An error") ? (a.setData({
                    shortUrl: t.data
                }), console.log(t)) : wx.showToast({
                    title: "凉凉，好像失败了",
                    icon: "none"
                });
            }
        })) : wx.showToast({
            title: "老哥，你还没输入网址咧",
            icon: "none"
        });
    },
    copy: function(t) {
        var e = this;
        wx.setClipboardData({
            data: e.data.shortUrl,
            success: function(t) {
                wx.showToast({
                    title: "已复制",
                    icon: "none"
                });
            }
        });
    },
    clear: function(t) {
        this.setData({
            url: "",
            shortUrl: ""
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "一个木函--短网址生成",
            path: "/pages/tools/shortSite/shortSite",
            imageUrl:"https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});