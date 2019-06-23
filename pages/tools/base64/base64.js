var t = "https://api.isoyu.com/app";

Page({
    data: {
        content: "",
        selectType: "",
        result: ""
    },
    onLoad: function(t) {},
    getResult: function(e) {
        var a = this, n = e.detail.value.content.toString(), o = e.detail.target.dataset.type;
        n ? wx.request({
            url: t + "/base64.php",
            method: "POST",
            data: {
                type: o,
                content: n
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                t.data ? a.setData({
                    result: t.data
                }) : wx.showToast({
                    title: "凉凉，貌似失败了",
                    icon: "none"
                });
            }
        }) : wx.showToast({
            title: "老哥，先输入点东西再点我",
            icon: "none"
        });
    },
    copy: function(t) {
        var e = this;
        wx.setClipboardData({
            data: e.data.result,
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
            content: "",
            result: ""
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "一个木函--base64加解密",
            path: "/pages/tools/base64/base64",
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});