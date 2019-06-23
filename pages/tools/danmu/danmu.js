Page({
    data: {
        color_array: [ "白", "黑", "红", "橙", "黄", "绿", "青", "蓝", "紫" ],
        font_color_index: 0,
        bg_color_index: 1
    },
    selectFontColor: function(o) {
        this.setData({
            font_color_index: o.detail.value
        });
    },
    selectBgColor: function(o) {
        this.setData({
            bg_color_index: o.detail.value
        });
    },
    createDanmu: function(o) {
        var e = o.detail.value, t = e.content;
        null != t && " " != t && "" != t || (t = "请输入弹幕内容"), console.log(e), wx.navigateTo({
            url: "show_danmu?content=" + t + "&speed=" + e.speed + "&fontSize=" + e.fontSize + "&fontColor=" + e.fontColor + "&bgColor=" + e.bgColor + "&direction=" + e.direction
        });
    },
    onShareAppMessage: function(o) {
        return {
            title: "一个木函--手持弹幕",
            path: "/pages/tools/danmu/danmu",
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});