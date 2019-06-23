var t = "https://api.isoyu.com/app";

Page({
    data: {
        thisExpress: {},
        expressDetail: []
    },
    onLoad: function(t) {
        console.log(t);
        var s = this;
        wx.showLoading({
            title: "正在获取快递单最新进度",
            mask: !0
        });
        var e = JSON.parse(t.thisExpress);
        s.setData({
            thisExpress: e
        }), s.getDetail(e.postid, e.code);
    },
    getDetail: function(s, e) {
        var a = this;
        wx.request({
            url: t + "/queryExpress.php?isGetType=no&type=" + e + "&postId=" + s,
            success: function(t) {
                wx.hideLoading(), "ok" == t.data.message ? (a.setData({
                    expressDetail: t.data.data
                }), console.log(t.data)) : wx.showToast({
                    title: "凉凉，快递单号查不到",
                    icon: "none"
                }), console.log(a.data.expressDetail);
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "恭喜你遇到bug了",
                    icon: "none"
                });
            }
        });
    },
    copyExpressDetail: function(t) {
        var s = this.data.expressDetail;
        wx.setClipboardData({
            data: s[t].context,
            success: function(t) {
                wx.showToast({
                    title: "已复制",
                    icon: "none"
                });
            }
        });
    },
    showMenu: function(t) {
        var s = this, e = t.currentTarget.dataset.index, a = [ "复制" ];
        wx.showActionSheet({
            itemList: a,
            success: function(t) {
                0 == t.tapIndex && s.copyExpressDetail(e);
            }
        });
    },
    onShareAppMessage: function(s) {
        return {
            title: "一个木函--我的快递进度",
            path: "/pages/tools/queryExpress/showExpressDetail?thisExpress=" + JSON.stringify(this.data.thisExpress),
          imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});