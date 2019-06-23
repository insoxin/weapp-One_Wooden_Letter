Page({
    data: {
        poker_num_list: [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ],
        poker_color_list: [ "方块", "梅花", "红桃", "黑桃" ],
        poker_num: "A",
        poker_color: "方块",
        color: "black"
    },
    onLoad: function(o) {
        var r = this, n = r.data.poker_num_list, e = r.data.poker_color_list, t = r.data.color;
        t = 1 == o.poker_color || 3 == o.poker_color ? "red" : "black", r.setData({
            poker_num: n[o.poker_num - 1],
            poker_color: e[o.poker_color - 1],
            color: t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(o) {
        return {
            title: "一个木函--随机扑克",
            path: "/pages/tools/randomPoker/showPoker?poker_num=" + this.data.poker_num + "&poker_color=" + this.data.poker_color,
          imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});