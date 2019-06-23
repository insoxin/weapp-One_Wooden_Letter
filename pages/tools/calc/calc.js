Page({
    data: {
        dele: "",
        num0: 0,
        num1: 1,
        num2: 2,
        num3: 3,
        num4: 4,
        num5: 5,
        num6: 6,
        num7: 7,
        num8: 8,
        num9: 9,
        numt: "00",
        numa: "+",
        numx: "x",
        numb: "-",
        numc: "/",
        numd: ".",
        result: "=",
        fuhao: "",
        clear: "clear",
        screenData: "",
        screenStr: "",
        flag: !1,
        ans: 0,
        s3: "",
        bb: 0
    },
    btnClick: function(a) {
        console.log(a.target.id);
        var t = a.target.id, e = this.data.ans, s = this.data.s3, n = this.data.fuhao;
        this.data.flag1;
        if (s.length > 8) this.setData({
            screenData: "overflow",
            screenStr: "overflow",
            s3: ""
        }); else if (t == this.data.dele) {
            if (0 == (i = this.data.screenData) || "" == i) return void this.setData({
                screenData: "",
                s3: ""
            });
            if ("" == (i = i.substring(0, i.length - 1)) || "-" == i) return i = "", void this.setData({
                screenData: i,
                s3: ""
            });
            var o = this.data.s3;
            o = 1e8 * o / 1e7, o = parseFloat(o), o *= 1, this.setData({
                screenData: i,
                s3: o
            });
        } else {
            if (t == this.data.clear) return console.log(a.target.id), void this.setData({
                screenData: "",
                screenStr: "",
                flag: !1,
                ans: 0,
                s3: "",
                bb: 0,
                fuhao: "",
                ret: {
                    times: 1,
                    num: 0
                }
            });
            if (t == this.data.result) return console.log(e), 0 == this.data.ans && n == this.data.numb && (s = -s, 
            console.log("bb===" + s)), 0 == e ? e = s : n == this.data.numa ? (console.log("+"), 
            e = 1e9 * parseFloat(e) + 1e9 * parseFloat(s), e /= 1e9) : n == this.data.numb ? (console.log("-"), 
            e = 1e9 * parseFloat(e) - 1e9 * parseFloat(s), e /= 1e9) : n == this.data.numx ? (console.log("*"), 
            e = 1e8 * parseFloat(e) / 1e8 * (1e8 * parseFloat(s) / 1e8)) : n == this.data.numc ? (console.log("/"), 
            e = 1e9 * parseFloat(e) / (1e9 * parseFloat(s))) : e = s + 0, e *= 1, void this.setData({
                screenData: e,
                screenStr: e
            });
            if (parseInt(t) >= 0 && parseInt(t) <= 9 || t == this.data.numd) {
                var r = this.data.s3, i = r + t;
                this.setData({
                    screenData: i
                }), r += t, this.setData({
                    s3: r
                }), console.log("输入的数" + this.data.s3);
            } else t != this.data.numa && t != this.data.numb && t != this.data.numx && t != this.data.numc || (0 == this.data.ans && n == this.data.numb && (s = -s, 
            console.log("bb===" + s)), console.log("bb=" + s), console.log("ans=" + e), 0 == e ? e = s : n == this.data.numa ? (console.log("+"), 
            e = 1e9 * parseFloat(e) + 1e9 * parseFloat(s), e /= 1e9) : n == this.data.numb ? (console.log("-"), 
            e = parseFloat(e) - parseFloat(s), e = 1e9 * parseFloat(e) - 1e9 * parseFloat(s), 
            e /= 1e9) : n == this.data.numx ? (console.log("*"), e = 1e8 * parseFloat(e) / 1e8 * (1e8 * parseFloat(s) / 1e8)) : n == this.data.numc ? (console.log("/"), 
            e = 1e8 * parseFloat(e) / (1e8 * parseFloat(s))) : e = s + 0, console.log("is" + e), 
            e *= 1, this.setData({
                s3: "",
                ans: e,
                fuhao: t,
                screenData: e,
                screenStr: t
            }));
        }
    },
    toBinary: function(a) {
        var t;
        t = this.data.screenData, 1 == this.data.flag && (t = this.data.screenStr), this.setData({
            screenStr: t,
            flag: !0
        });
        var e = t, s = new Array(), n = "";
        if (0 != e && "." != e) {
            for (var o = 0; 1; o++) {
                if (!(t / 2 >= 1)) {
                    s[o] = 1;
                    break;
                }
                s[o] = t % 2, t = parseInt(t / 2);
            }
            for (o = s.length; o > 0; o--) n += s[o - 1];
            this.setData({
                screenData: n
            });
        }
    },
    toOctonary: function(a) {
        var t;
        t = this.data.screenData, 1 == this.data.flag && (t = this.data.screenStr), this.setData({
            screenStr: t,
            flag: !0
        }), console.log(t);
        var e = [], s = "";
        if (0 != t && "." != t) {
            for (;t > 0; ) e.push(t % 8), t = parseInt(t / 8);
            for (;e.length > 0; ) s += e.pop();
            this.setData({
                screenData: s
            });
        }
    },
    toHexadecimal: function(a) {
        var t;
        this.data.screenData;
        if (t = this.data.screenData, console.log(t), 1 == this.data.flag && (t = this.data.screenStr), 
        this.setData({
            screenStr: t,
            flag: !0
        }), 0 != t && "." != t) {
            var e = 15, s = t, n = -1, o = "", r = "0x";
            do {
                switch (++n, s &= e) {
                  case 10:
                    s = "A";
                    break;

                  case 11:
                    s = "B";
                    break;

                  case 12:
                    s = "C";
                    break;

                  case 13:
                    s = "D";
                    break;

                  case 14:
                    s = "E";
                    break;

                  case 15:
                    s = "F";
                }
                o += s, s = t >>>= 4;
            } while (t);
            do {
                r += o[n];
            } while (n--);
            o = n = s = e = t, this.setData({
                screenData: r
            });
        }
    },
    changeHex: function(a) {
        wx.navigateTo({
            url: "./changehex"
        });
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        return {
            title: "一个木函--计算器",
            path: "/pages/tools/calc/calc",
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});