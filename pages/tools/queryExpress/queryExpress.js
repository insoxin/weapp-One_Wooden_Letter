var e = "https://api.isoyu.com/app";

Page({
    data: {
        selectExpressIndex: 0,
        expressList: [ {
            name: "自动识别",
            code: "auto"
        }, {
            name: "京东快递",
            code: "jd"
        }, {
            name: "圆通快递",
            code: "yuantong"
        }, {
            name: "申通快递",
            code: "shentong"
        }, {
            name: "顺丰快递",
            code: "shunfeng"
        }, {
            name: "韵达快递",
            code: "yunda"
        }, {
            name: "中通快递",
            code: "zhongtong"
        }, {
            name: "百世快递",
            code: "huitongkuaidi"
        }, {
            name: "邮政包裹",
            code: "youzhengguonei"
        }, {
            name: "EMS",
            code: "ems"
        }, {
            name: "天天快递",
            code: "tiantian"
        }, {
            name: "德邦物流",
            code: "debangwuliu"
        }, {
            name: "宅急送",
            code: "zhaijisong"
        }, {
            name: "其他快递",
            code: "auto"
        } ],
        expressArray: [],
        myExpressList: [],
        isShowAddPanel: !0,
        isShowRemarksPanel: !0,
        updatRemarksIndex: 0
    },
    onLoad: function(e) {
        var s = this;
        wx.getStorage({
            key: "myExpressList",
            success: function(e) {
                s.setData({
                    myExpressList: e.data
                });
            }
        });
        var t = this.data.expressList.map(function(e, s) {
            return e.name;
        });
        this.setData({
            expressArray: t
        });
    },
    selectExpress: function(e) {
        this.data.expressArray;
        this.setData({
            selectExpressIndex: e.detail.value
        });
    },
    addExpress: function(s) {
        var t = this, a = t.data.expressList, n = t.data.selectExpressIndex, i = a[n].name, o = a[n].code, r = s.detail.value.postid, d = s.detail.value.remarks;
        d || (d = "暂无备注"), "auto" == o ? wx.request({
            url: e + "/queryExpress.php?type=auto&isGetType=yes&postId=" + r,
            success: function(e) {
                if (e.data) {
                    for (var s = !1, n = 0; n < a.length; n++) a[n].code == e.data && (i = a[n].name.slice(0, 2), 
                    o = e.data, t.myExpressPush(i, o, d, r), s = !0);
                    s || (i = "快递", o = e.data, t.myExpressPush(i, o, d, r));
                } else wx.showToast({
                    title: "呃，查不到这个快递单号",
                    icon: "none"
                });
            }
        }) : (i = i.slice(0, 2), t.myExpressPush(i, o, d, r));
    },
    myExpressPush: function(e, s, t, a) {
        var n = this, i = new Object(), o = this.data.myExpressList, r = new Date(), d = r.getFullYear() + "/" + (r.getMonth() + 1) + "/" + r.getDate() + " " + r.getHours() + ":" + r.getMinutes();
        i.name = e, i.code = s, i.remarks = t, i.postid = a, i.time = d, o.push(i), this.setData({
            myExpressList: o
        }), console.log(this.data.myExpressList), wx.setStorage({
            key: "myExpressList",
            data: o
        }), n.hideAddPanel(), wx.showToast({
            title: "添加成功",
            icon: "success"
        });
    },
    showAddPanel: function(e) {
        console.log("show"), this.setData({
            isShowAddPanel: !1
        });
    },
    hideAddPanel: function(e) {
        console.log("hide"), this.setData({
            isShowAddPanel: !0
        });
    },
    showMenu: function(e) {
        var s = this, t = [ "删除此单", "复制单号", "修改备注" ], a = e.currentTarget.dataset.index;
        wx.showActionSheet({
            itemList: t,
            success: function(e) {
                0 == e.tapIndex ? s.removeExpress(a) : 1 == e.tapIndex ? s.copyExpressPostid(a) : 2 == e.tapIndex && s.changeRemarks(a);
            }
        });
    },
    removeExpress: function(e) {
        var s = this, t = s.data.myExpressList;
        t.splice(e, 1), s.setData({
            myExpressList: t
        }), wx.showToast({
            title: "删除成功",
            icon: "success"
        }), wx.setStorage({
            key: "myExpressList",
            data: t
        });
    },
    copyExpressPostid: function(e) {
        var s = this.data.myExpressList[e].postid;
        wx.setClipboardData({
            data: s,
            success: function(e) {
                wx.showToast({
                    title: "复制成功",
                    icon: "success"
                });
            }
        });
    },
    changeRemarks: function(e) {
        this.setData({
            isShowRemarksPanel: !1,
            updateRemarksIndex: e
        });
    },
    updateRemarks: function(e) {
        var s = this, t = e.detail.value.remarks, a = s.data.updateRemarksIndex, n = s.data.myExpressList;
        n[a].remarks = t, s.setData({
            myExpressList: n
        }), wx.setStorage({
            key: "myExpressList",
            data: n
        }), wx.showToast({
            title: "修改成功",
            icon: "success"
        }), s.hideRemarksPanel();
    },
    showRemarksPanel: function(e) {
        this.setData({
            isShowRemarksPanel: !1
        });
    },
    hideRemarksPanel: function(e) {
        this.setData({
            isShowRemarksPanel: !0
        });
    },
    goToDetailPage: function(e) {
        var s = e.currentTarget.dataset.index, t = this.data.myExpressList;
        wx.navigateTo({
            url: "./showExpressDetail?thisExpress=" + JSON.stringify(t[s])
        });
    },
    onShareAppMessage: function(s) {
        return {
            title: "一个木函--快递查询",
            path: "/pages/tools/queryExpress/queryExpress",
            imageUrl:"https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});