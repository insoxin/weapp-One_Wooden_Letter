var t;

Page({
    data: {
        color_array: [ "白", "黑", "红", "橙", "黄", "绿", "青", "蓝", "紫" ],
        color: [ "#ffffff", "#000000", "#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00fff0", "#0000ff", "#ff00ff" ],
        content: "请输入弹幕",
        speed: "5",
        fontSize: "200",
        fontColor: "0",
        bgColor: "1",
        direction: "leftToRight",
        pageH: 0,
        pageW: 0
    },
    onLoad: function(a) {
        t && clearInterval(t);
        var e = this;
        e.setData({
            content: a.content,
            speed: a.speed,
            fontSize: a.fontSize,
            fontColor: a.fontColor,
            bgColor: a.bgColor,
            direction: a.direction
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    pageH: t.windowHeight,
                    pageW: t.windowWidth
                });
            }
        });
        var o = e.data.color[parseInt(e.data.bgColor)], n = wx.createCanvasContext("bgCanvas", this);
        n.setFillStyle(o), n.fillRect(0, 0, e.data.pageW, e.data.pageH), n.draw(!0), wx.setNavigationBarColor && wx.setNavigationBarColor({
            frontColor: o,
            backgroundColor: o
        });
        var r = 0, i = 0, d = parseInt(20 - 2 * e.data.speed + 1), s = parseInt(e.data.fontSize * e.data.pageW / 200), l = e.data.color[parseInt(e.data.fontColor)];
        t = setInterval(function() {
            var t = wx.createCanvasContext("textCanvas", this);
            t.setFontSize(s);
            var a = t.measureText(e.data.content).width;
            t.setFillStyle(l), "rightToLeft" == e.data.direction && (t.translate(parseInt(.45 * e.data.pageW), 0), 
            t.rotate(-.5 * Math.PI), t.save(), r < -a - e.data.pageH && (r = 0), t.setTextBaseline("middle"), 
            t.fillText(e.data.content, r--, 0), t.stroke(), t.draw(), t.restore()), "leftToRight" == e.data.direction && (t.translate(parseInt(.45 * e.data.pageW), e.data.pageH), 
            t.rotate(-.5 * Math.PI), t.save(), i > e.data.pageH && (i = -a), t.setTextBaseline("middle"), 
            t.fillText(e.data.content.split("").reverse().join(""), i++, 0), t.stroke(), t.draw(), 
            t.restore());
        }, d);
    },
    stopDanmu: function() {
        clearInterval(t);
    },
    onUnload: function() {
        clearInterval(t);
    },
    onHide: function() {
        clearInterval(t);
    },
    onShareAppMessage: function(t) {
        var a = this;
        return {
            title: "一个木函--你收到一条弹幕",
            path: "/pages/tools/danmu/show_danmu?content=" + a.data.content + " & speed=" + a.data.speed + "&fontSize=" + a.data.fontSize + "&fontColor=" + a.data.fontColor + "&bgColor=" + a.data.bgColor + "&direction=" + a.data.direction,
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});