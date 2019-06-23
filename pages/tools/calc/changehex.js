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
        numT: "00",
        numA: "a",
        numB: "b",
        numC: "c",
        numD: "d",
        numE: "e",
        numF: "f",
        numTwo: "two",
        numEight: "eight",
        numTen: "ten",
        numSixteen: "six",
        numdo: ".",
        clear: "clear",
        screenData: "0",
        screenStr: "0",
        flag1: "",
        flag: !1,
        colT: "",
        colE: "",
        colS: "",
        colsix: "",
        modalHidden: !0
    },
    btnClick: function(a) {
        console.log(a.target.id);
        var t = a.target.id;
        if (t == this.data.dele) {
            if (0 == (e = this.data.screenData)) return;
            "" != (e = e.substring(0, e.length - 1)) && "-" != e || (e = 0), this.setData({
                screenData: e
            });
        } else if (t == this.data.clear) console.log(a.target.id), this.setData({
            screenData: "0",
            screenStr: "0"
        }); else {
            var e, s = this.data.screenData;
            if ((e = 0 == s ? t : s + t).length > 25) return void this.setData({
                screenData: "overflow"
            });
            this.setData({
                screenData: e,
                screenStr: e
            });
        }
    },
    toBinary: function(a) {
        if (console.log(a.target.id), console.log(this.data.flag), this.setData({
            colT: "red",
            colE: "",
            colS: "",
            colsix: ""
        }), 0 != this.data.flag) {
            if (1 == this.data.flag) {
                var t = this.data.screenStr;
                if (0 == t || "." == t) return;
                var e;
                "eight" == this.data.flag1 ? e = parseInt(t, 8) : "ten" == this.data.flag1 ? e = t : "six" == this.data.flag1 && (e = parseInt(t, 16));
                for (var s = new Array(), n = "", i = 0; 1; i++) {
                    if (!(e / 2 >= 1)) {
                        s[i] = 1;
                        break;
                    }
                    s[i] = e % 2, e = parseInt(e / 2);
                }
                for (i = s.length; i > 0; i--) n += s[i - 1];
                this.setData({
                    screenData: n
                });
            }
        } else this.setData({
            flag: !0,
            flag1: "two"
        });
    },
    toOctonary: function(a) {
        if (console.log(a.target.id), console.log(this.data.flag), this.setData({
            colT: "",
            colE: "red",
            colS: "",
            colsix: ""
        }), 0 != this.data.flag) {
            if (1 == this.data.flag) {
                var t = this.data.screenStr;
                if (0 == t || "." == t) return;
                var e;
                "two" == this.data.flag1 ? e = parseInt(t, 2) : "ten" == this.data.flag1 ? e = t : "six" == this.data.flag1 && (e = parseInt(t, 16));
                for (var s = [], n = ""; e > 0; ) s.push(e % 8), e = parseInt(e / 8);
                for (;s.length > 0; ) n += s.pop();
                console.log(n), this.setData({
                    screenData: n
                });
            }
        } else this.setData({
            flag: !0,
            flag1: "eight",
            colT: "red"
        });
    },
    toTenhex: function(a) {
        if (console.log(a.target.id), this.setData({
            colT: "",
            colE: "",
            colS: "red",
            colsix: ""
        }), 0 != this.data.flag) {
            if (1 == this.data.flag) {
                var t = this.data.screenStr;
                if (0 == t || "." == t) return;
                var e;
                "two" == this.data.flag1 ? e = parseInt(t, 2) : "eight" == this.data.flag1 ? e = parseInt(t, 8) : "six" == this.data.flag1 && (e = parseInt(t, 16));
            }
            this.setData({
                screenData: e
            });
        } else this.setData({
            flag: !0,
            flag1: "ten"
        });
    },
    toHexadecimal: function(a) {
        if (console.log(a.target.id), this.setData({
            colT: "",
            colE: "",
            colS: "",
            colsix: "red"
        }), 0 != this.data.flag) {
            if (1 == this.data.flag) {
                var t = this.data.screenStr;
                if (0 == t || "." == t) return;
                var e;
                "two" == this.data.flag1 ? e = parseInt(t, 2) : "eight" == this.data.flag1 ? e = parseInt(t, 8) : "ten" == this.data.flag1 && (e = t);
                var s = 15, n = e, i = -1, o = "", l = "0x";
                do {
                    switch (++i, n &= s) {
                      case 10:
                        n = "A";
                        break;

                      case 11:
                        n = "B";
                        break;

                      case 12:
                        n = "C";
                        break;

                      case 13:
                        n = "D";
                        break;

                      case 14:
                        n = "E";
                        break;

                      case 15:
                        n = "F";
                    }
                    o += n, n = e >>>= 4;
                } while (e);
                do {
                    l += o[i];
                } while (i--);
                o = i = n = s = e, this.setData({
                    screenData: l
                });
            }
        } else this.setData({
            flag: !0,
            flag1: "six"
        });
    },
    onLoad: function(a) {
        this.setData({
            modalHidden: !1
        });
    },
    modalSure: function(a) {
        this.setData({
            modalHidden: !0
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        return {
            title: "一个木函--进制计算器",
            path: "/pages/tools/calc/changehex",
            imageUrl: "https://api.isoyu.com/ARU_GIF_S.php"
        };
    }
});