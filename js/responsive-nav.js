var responsiveNav = function (e, t) {
    function y(e, t) {
        g || (g = new m(e, t));
        return g
    }
    var n = !! e.getComputedStyle;
    e.getComputedStyle || (e.getComputedStyle = function (e) {
        this.el = e;
        this.getPropertyValue = function (t) {
            var n = /(\-([a-z]){1})/g;
            t === "float" && (t = "styleFloat");
            n.test(t) && (t = t.replace(n, function () {
                return arguments[2].toUpperCase()
            }));
            return e.currentStyle[t] ? e.currentStyle[t] : null
        };
        return this
    });
    var r, i, s, o = t.documentElement,
        u = t.getElementsByTagName("head")[0],
        a = t.createElement("style"),
        f = !1,
        l = function (e, t, n, r) {
            if ("addEventListener" in e) try {
                e.addEventListener(t, n, r)
            } catch (i) {
                if (typeof n != "object" || !n.handleEvent) throw i;
                e.addEventListener(t, function (e) {
                    n.handleEvent.call(n, e)
                }, r)
            } else "attachEvent" in e && (typeof n == "object" && n.handleEvent ? e.attachEvent("on" + t, function () {
                n.handleEvent.call(n)
            }) : e.attachEvent("on" + t, n))
        }, c = function (e, t, n, r) {
            if ("removeEventListener" in e) try {
                e.removeEventListener(t, n, r)
            } catch (i) {
                if (typeof n != "object" || !n.handleEvent) throw i;
                e.removeEventListener(t, function (e) {
                    n.handleEvent.call(n, e)
                }, r)
            } else "detachEvent" in e && (typeof n == "object" && n.handleEvent ? e.detachEvent("on" + t, function () {
                n.handleEvent.call(n)
            }) : e.detachEvent("on" + t, n))
        }, h = function (e) {
            var t = e.firstChild;
            while (t !== null && t.nodeType !== 1) t = t.nextSibling;
            return t
        }, p = function (e, t) {
            for (var n in t) e.setAttribute(n, t[n])
        }, d = function (e, t) {
            e.className += " " + t;
            e.className = e.className.replace(/(^\s*)|(\s*$)/g, "")
        }, v = function (e, t) {
            var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
            e.className = e.className.replace(n, " ").replace(/(^\s*)|(\s*$)/g, "")
        }, m = function (e, n) {
            var s;
            this.options = {
                transition: 400,
                label: "Menu",
                insert: "after",
                customToggle: "#nav-toggle",
                jsClass: "wf-active",
                init: function () {},
                open: function () {},
                close: function () {}
            };
            for (s in n) this.options[s] = n[s];
            this.wrapperEl = e.replace("#", "");
            if (!t.getElementById(this.wrapperEl)) throw new Error("The nav element you are trying to select doesn't exist");
            this.wrapper = t.getElementById(this.wrapperEl);
            this.wrapper.inner = h(this.wrapper);
            i = this.options;
            r = this.wrapper;
            this._init(this)
        };
    m.prototype = {
        destroy: function () {
            this._removeStyles();
            v(o, "nav-is-closed");
            v(o, "nav-is-open");
            r.removeAttribute("style");
            r.removeAttribute("aria-hidden");
            r = null;
            g = null;
            c(e, "load", this, !1);
            c(e, "resize", this, !1);
            c(s, "mousedown", this, !1);
            c(s, "touchstart", this, !1);
            c(s, "touchend", this, !1);
            c(s, "keyup", this, !1);
            c(s, "click", this, !1);
            i.customToggle ? s.removeAttribute("aria-hidden") : s.parentNode.removeChild(s)
        },
        toggle: function () {
            if (!f) {
                v(o, "nav-is-closed");
                d(o, "nav-is-open");
                p(r, {
                    "aria-hidden": "false"
                });
                f = !0;
                i.open()
            } else {
                v(o, "nav-is-open");
                d(o, "nav-is-closed");
                p(r, {
                    "aria-hidden": "true"
                });
                f = !1;
                i.close()
            }
        },
        handleEvent: function (t) {
            var n = t || e.event;
            switch (n.type) {
            case "mousedown":
                this._onmousedown(n);
                break;
            case "touchstart":
                this._ontouchstart(n);
                break;
            case "touchend":
                this._ontouchend(n);
                break;
            case "keyup":
                this._onkeyup(n);
                break;
            case "click":
                this._onclick(n);
                break;
            case "load":
                this._resize(n);
                break;
            case "resize":
                this._resize(n)
            }
        },
        _init: function () {
            d(o, "nav-is-closed");
            this._createToggle();
            l(e, "load", this, !1);
            l(e, "resize", this, !1);
            l(s, "mousedown", this, !1);
            l(s, "touchstart", this, !1);
            l(s, "touchend", this, !1);
            l(s, "keyup", this, !1);
            l(s, "click", this, !1)
        },
        _createStyles: function () {
            a.parentNode || u.appendChild(a)
        },
        _removeStyles: function () {
            a.parentNode && a.parentNode.removeChild(a)
        },
        _createToggle: function () {
            var e = i.customToggle.replace("#", "");
            if (!t.getElementById(e)) throw new Error("The custom nav toggle you are trying to select doesn't exist");
            s = t.getElementById(e)
        },
        _preventDefault: function (e) {
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation()
            } else e.returnValue = !1
        },
        _onmousedown: function (t) {
            var n = t || e.event;
            if (n.which !== 3 && n.button !== 2) {
                this._preventDefault(t);
                this.toggle(t)
            }
        },
        _ontouchstart: function (e) {
            s.onmousedown = null;
            this._preventDefault(e);
            this.toggle(e)
        },
        _ontouchend: function () {
            var e = this;
            r.addEventListener("click", e._preventDefault, !0);
            setTimeout(function () {
                r.removeEventListener("click", e._preventDefault, !0)
            }, i.transition)
        },
        _onkeyup: function (t) {
            var n = t || e.event;
            n.keyCode === 13 && this.toggle(t)
        },
        _onclick: function (e) {
            this._preventDefault(e)
        },
        _calcHeight: function () {
            var e = r.inner.offsetHeight,
                t = "." + this.options.jsClass + " ." + this.wrapperEl + "{margin-top:" + -e + "px} .nav-is-open {-webkit-transform: translateY(" + e + "px); -moz-transform: translateY(" + e + "px); -ms-transform: translateY(" + e + "px); -o-transform: translateY(" + e + "px); transform: translateY(" + e + "px); }";
            if (n) {
                a.innerHTML = t;
                t = ""
            }
        },
        _resize: function () {
            if (e.getComputedStyle(s, null).getPropertyValue("display") !== "none") {
                p(s, {
                    "aria-hidden": "false"
                });
                o.className.match(/(^|\s)nav-is-closed(\s|$)/) && p(r, {
                    "aria-hidden": "true"
                });
                this._createStyles();
                this._calcHeight()
            } else {
                p(s, {
                    "aria-hidden": "true"
                });
                p(r, {
                    "aria-hidden": "false"
                });
                this._removeStyles()
            }
            i.init()
        }
    };
    var g;
    return y
}(window, document);

responsiveNav("#nav");