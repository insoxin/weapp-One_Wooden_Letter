Page({
    data: {
        gifUrl: "",
        urlList: []
    },
    onLoad: function(t) {
        var a = t.gifUrl, r = [];
        console.log("接收到" + a), r.push(a), this.setData({
            gifUrl: t.gifUrl,
            urlList: r
        });
    },
    previewImage: function(t) {
        var a = this;
        wx.previewImage({
            urls: a.data.urlList,
            current: a.data.gifUrl
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "一个木函--表情制作",
            path: "/pages/tools/gifMaker/showGif?gifUrl=" + this.data.gifUrl,
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});