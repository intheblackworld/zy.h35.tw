/*!
 * animsition v4.0.2
 * A simple and easy jQuery plugin for CSS animated page transitions.
 * http://blivesta.github.io/animsition
 * License : MIT
 * Author : blivesta (http://blivesta.com/)
 */
! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var n = "animsition",
        i = {
            init: function(a) {
                a = t.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    loadingInner: "",
                    timeout: !1,
                    timeoutCountdown: 5e3,
                    onLoadEvent: !0,
                    browser: ["animation-duration", "-webkit-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body",
                    transition: function(t) {
                        window.location.href = t
                    }
                }, a), i.settings = {
                    timer: !1,
                    data: {
                        inClass: "animsition-in-class",
                        inDuration: "animsition-in-duration",
                        outClass: "animsition-out-class",
                        outDuration: "animsition-out-duration",
                        overlay: "animsition-overlay"
                    },
                    events: {
                        inStart: "animsition.inStart",
                        inEnd: "animsition.inEnd",
                        outStart: "animsition.outStart",
                        outEnd: "animsition.outEnd"
                    }
                };
                var o = i.supportCheck.call(this, a);
                if (!o && a.browser.length > 0 && (!o || !this.length)) return "console" in window || (window.console = {}, window.console.log = function(t) {
                    return t
                }), this.length || console.log("Animsition: Element does not exist on page."), o || console.log("Animsition: Does not support this browser."), i.destroy.call(this);
                var e = i.optionCheck.call(this, a);
                return e && t("." + a.overlayClass).length <= 0 && i.addOverlay.call(this, a), a.loading && t("." + a.loadingClass).length <= 0 && i.addLoading.call(this, a), this.each(function() {
                    var o = this,
                        e = t(this),
                        s = t(window),
                        r = t(document),
                        l = e.data(n);
                    l || (a = t.extend({}, a), e.data(n, {
                        options: a
                    }), a.timeout && i.addTimer.call(o), a.onLoadEvent && s.on("load." + n, function() {
                        i.settings.timer && clearTimeout(i.settings.timer), i["in"].call(o)
                    }), s.on("pageshow." + n, function(t) {
                        t.originalEvent.persisted && i["in"].call(o)
                    }), s.on("unload." + n, function() {}), r.on("click." + n, a.linkElement, function(n) {
                        n.preventDefault();
                        var a = t(this),
                            e = a.attr("href");
                        2 === n.which || n.metaKey || n.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && n.ctrlKey ? window.open(e, "_blank") : i.out.call(o, a, e)
                    }))
                })
            },
            addOverlay: function(n) {
                t(n.overlayParentElement).prepend('<div class="' + n.overlayClass + '"></div>')
            },
            addLoading: function(n) {
                t(n.loadingParentElement).append('<div class="' + n.loadingClass + '">' + n.loadingInner + "</div>")
            },
            removeLoading: function() {
                var i = t(this),
                    a = i.data(n).options,
                    o = t(a.loadingParentElement).children("." + a.loadingClass);
                o.fadeOut().remove()
            },
            addTimer: function() {
                var a = this,
                    o = t(this),
                    e = o.data(n).options;
                i.settings.timer = setTimeout(function() {
                    i["in"].call(a), t(window).off("load." + n)
                }, e.timeoutCountdown)
            },
            supportCheck: function(n) {
                var i = t(this),
                    a = n.browser,
                    o = a.length,
                    e = !1;
                0 === o && (e = !0);
                for (var s = 0; o > s; s++)
                    if ("string" == typeof i.css(a[s])) {
                        e = !0;
                        break
                    }
                return e
            },
            optionCheck: function(n) {
                var a, o = t(this);
                return a = n.overlay || o.data(i.settings.data.overlay) ? !0 : !1
            },
            animationCheck: function(i, a, o) {
                var e = t(this),
                    s = e.data(n).options,
                    r = typeof i,
                    l = !a && "number" === r,
                    d = a && "string" === r && i.length > 0;
                return l || d ? i = i : a && o ? i = s.inClass : !a && o ? i = s.inDuration : a && !o ? i = s.outClass : a || o || (i = s.outDuration), i
            },
            "in": function() {
                var a = this,
                    o = t(this),
                    e = o.data(n).options,
                    s = o.data(i.settings.data.inDuration),
                    r = o.data(i.settings.data.inClass),
                    l = i.animationCheck.call(a, s, !1, !0),
                    d = i.animationCheck.call(a, r, !0, !0),
                    u = i.optionCheck.call(a, e),
                    c = o.data(n).outClass;
                e.loading && i.removeLoading.call(a), c && o.removeClass(c), u ? i.inOverlay.call(a, d, l) : i.inDefault.call(a, d, l)
            },
            inDefault: function(n, a) {
                var o = t(this);
                o.css({
                    "animation-duration": a + "ms"
                }).addClass(n).trigger(i.settings.events.inStart).animateCallback(function() {
                    o.removeClass(n).css({
                        opacity: 1
                    }).trigger(i.settings.events.inEnd)
                })
            },
            inOverlay: function(a, o) {
                var e = t(this),
                    s = e.data(n).options;
                e.css({
                    opacity: 1
                }).trigger(i.settings.events.inStart), t(s.overlayParentElement).children("." + s.overlayClass).css({
                    "animation-duration": o + "ms"
                }).addClass(a).animateCallback(function() {
                    e.trigger(i.settings.events.inEnd)
                })
            },
            out: function(a, o) {
                var e = this,
                    s = t(this),
                    r = s.data(n).options,
                    l = a.data(i.settings.data.outClass),
                    d = s.data(i.settings.data.outClass),
                    u = a.data(i.settings.data.outDuration),
                    c = s.data(i.settings.data.outDuration),
                    m = l ? l : d,
                    g = u ? u : c,
                    f = i.animationCheck.call(e, m, !0, !1),
                    v = i.animationCheck.call(e, g, !1, !1),
                    h = i.optionCheck.call(e, r);
                s.data(n).outClass = f, h ? i.outOverlay.call(e, f, v, o) : i.outDefault.call(e, f, v, o)
            },
            outDefault: function(a, o, e) {
                var s = t(this),
                    r = s.data(n).options;
                s.css({
                    "animation-duration": o + 1 + "ms"
                }).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                    s.trigger(i.settings.events.outEnd), r.transition(e)
                })
            },
            outOverlay: function(a, o, e) {
                var s = this,
                    r = t(this),
                    l = r.data(n).options,
                    d = r.data(i.settings.data.inClass),
                    u = i.animationCheck.call(s, d, !0, !0);
                t(l.overlayParentElement).children("." + l.overlayClass).css({
                    "animation-duration": o + 1 + "ms"
                }).removeClass(u).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                    r.trigger(i.settings.events.outEnd), l.transition(e)
                })
            },
            destroy: function() {
                return this.each(function() {
                    var i = t(this);
                    t(window).off("." + n), i.css({
                        opacity: 1
                    }).removeData(n)
                })
            }
        };
    t.fn.animateCallback = function(n) {
        var i = "animationend webkitAnimationEnd";
        return this.each(function() {
            var a = t(this);
            a.on(i, function() {
                return a.off(i), n.call(this)
            })
        })
    }, t.fn.animsition = function(a) {
        return i[a] ? i[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void t.error("Method " + a + " does not exist on jQuery." + n) : i.init.apply(this, arguments)
    }
});
/*jquery easing*/
! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        return n(e)
    }) : "object" == typeof module && "object" == typeof module.exports ? exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    function e(n) {
        var e = 7.5625,
            t = 2.75;
        return n < 1 / t ? e * n * n : n < 2 / t ? e * (n -= 1.5 / t) * n + .75 : n < 2.5 / t ? e * (n -= 2.25 / t) * n + .9375 : e * (n -= 2.625 / t) * n + .984375
    }
    n.easing.jswing = n.easing.swing;
    var t = Math.pow,
        u = Math.sqrt,
        r = Math.sin,
        i = Math.cos,
        a = Math.PI,
        c = 1.70158,
        o = 1.525 * c,
        s = 2 * a / 3,
        f = 2 * a / 4.5;
    n.extend(n.easing, {
        def: "easeOutQuad",
        swing: function(e) {
            return n.easing[n.easing.def](e)
        },
        easeInQuad: function(n) {
            return n * n
        },
        easeOutQuad: function(n) {
            return 1 - (1 - n) * (1 - n)
        },
        easeInOutQuad: function(n) {
            return n < .5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2
        },
        easeInCubic: function(n) {
            return n * n * n
        },
        easeOutCubic: function(n) {
            return 1 - t(1 - n, 3)
        },
        easeInOutCubic: function(n) {
            return n < .5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2
        },
        easeInQuart: function(n) {
            return n * n * n * n
        },
        easeOutQuart: function(n) {
            return 1 - t(1 - n, 4)
        },
        easeInOutQuart: function(n) {
            return n < .5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2
        },
        easeInQuint: function(n) {
            return n * n * n * n * n
        },
        easeOutQuint: function(n) {
            return 1 - t(1 - n, 5)
        },
        easeInOutQuint: function(n) {
            return n < .5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2
        },
        easeInSine: function(n) {
            return 1 - i(n * a / 2)
        },
        easeOutSine: function(n) {
            return r(n * a / 2)
        },
        easeInOutSine: function(n) {
            return -(i(a * n) - 1) / 2
        },
        easeInExpo: function(n) {
            return 0 === n ? 0 : t(2, 10 * n - 10)
        },
        easeOutExpo: function(n) {
            return 1 === n ? 1 : 1 - t(2, -10 * n)
        },
        easeInOutExpo: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? t(2, 20 * n - 10) / 2 : (2 - t(2, -20 * n + 10)) / 2
        },
        easeInCirc: function(n) {
            return 1 - u(1 - t(n, 2))
        },
        easeOutCirc: function(n) {
            return u(1 - t(n - 1, 2))
        },
        easeInOutCirc: function(n) {
            return n < .5 ? (1 - u(1 - t(2 * n, 2))) / 2 : (u(1 - t(-2 * n + 2, 2)) + 1) / 2
        },
        easeInElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : -t(2, 10 * n - 10) * r((10 * n - 10.75) * s)
        },
        easeOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : t(2, -10 * n) * r((10 * n - .75) * s) + 1
        },
        easeInOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? -(t(2, 20 * n - 10) * r((20 * n - 11.125) * f)) / 2 : t(2, -20 * n + 10) * r((20 * n - 11.125) * f) / 2 + 1
        },
        easeInBack: function(n) {
            return (c + 1) * n * n * n - c * n * n
        },
        easeOutBack: function(n) {
            return 1 + (c + 1) * t(n - 1, 3) + c * t(n - 1, 2)
        },
        easeInOutBack: function(n) {
            return n < .5 ? t(2 * n, 2) * (7.189819 * n - o) / 2 : (t(2 * n - 2, 2) * ((o + 1) * (2 * n - 2) + o) + 2) / 2
        },
        easeInBounce: function(n) {
            return 1 - e(1 - n)
        },
        easeOutBounce: e,
        easeInOutBounce: function(n) {
            return n < .5 ? (1 - e(1 - 2 * n)) / 2 : (1 + e(2 * n - 1)) / 2
        }
    })
});
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.alert");
            n || i.data("bs.alert", n = new o(this)), "string" == typeof e && n[e].call(i)
        })
    }
    var i = '[data-dismiss="alert"]',
        o = function(e) {
            t(e).on("click", i, this.close)
        };
    o.VERSION = "3.3.7", o.TRANSITION_DURATION = 150, o.prototype.close = function(e) {
        function i() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        var n = t(this),
            s = n.attr("data-target");
        s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t("#" === s ? [] : s);
        e && e.preventDefault(), a.length || (a = n.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i())
    };
    var n = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = o, t.fn.alert.noConflict = function() {
        return t.fn.alert = n, this
    }, t(document).on("click.bs.alert.data-api", i, o.prototype.close)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.button"),
                s = "object" == typeof e && e;
            n || o.data("bs.button", n = new i(this, s)), "toggle" == e ? n.toggle() : e && n.setState(e)
        })
    }
    var i = function(e, o) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1
    };
    i.VERSION = "3.3.7", i.DEFAULTS = {
        loadingText: "loading..."
    }, i.prototype.setState = function(e) {
        var i = "disabled",
            o = this.$element,
            n = o.is("input") ? "val" : "html",
            s = o.data();
        e += "Text", null == s.resetText && o.data("resetText", o[n]()), setTimeout(t.proxy(function() {
            o[n](null == s[e] ? this.options[e] : s[e]), "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i).prop(i, !1))
        }, this), 0)
    }, i.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), t && i.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var o = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
        return t.fn.button = o, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var o = t(i.target).closest(".btn");
        e.call(o, "toggle"), t(i.target).is('input[type="radio"], input[type="checkbox"]') || (i.preventDefault(), o.is("input,button") ? o.trigger("focus") : o.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.carousel"),
                s = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e),
                a = "string" == typeof e ? e : s.slide;
            n || o.data("bs.carousel", n = new i(this, s)), "number" == typeof e ? n.to(e) : a ? n[a]() : s.interval && n.pause().cycle()
        })
    }
    var i = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e),
            o = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (o && !this.options.wrap) return e;
        var n = "prev" == t ? -1 : 1,
            s = (i + n) % this.$items.length;
        return this.$items.eq(s)
    }, i.prototype.to = function(t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function(e, o) {
        var n = this.$element.find(".item.active"),
            s = o || this.getItemForDirection(e, n),
            a = this.interval,
            r = "next" == e ? "left" : "right",
            l = this;
        if (s.hasClass("active")) return this.sliding = !1;
        var h = s[0],
            d = t.Event("slide.bs.carousel", {
                relatedTarget: h,
                direction: r
            });
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var p = t(this.$indicators.children()[this.getItemIndex(s)]);
                p && p.addClass("active")
            }
            var c = t.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: r
            });
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e), s[0].offsetWidth, n.addClass(r), s.addClass(r), n.one("bsTransitionEnd", function() {
                s.removeClass([e, r].join(" ")).addClass("active"), n.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(c)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger(c)), a && this.cycle(), this
        }
    };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = o, this
    };
    var n = function(i) {
        var o, n = t(this),
            s = t(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var a = t.extend({}, s.data(), n.data()),
                r = n.attr("data-slide-to");
            r && (a.interval = !1), e.call(s, a), r && s.data("bs.carousel").to(r), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent()
    }

    function i(i) {
        i && 3 === i.which || (t(n).remove(), t(s).each(function() {
            var o = t(this),
                n = e(o),
                s = {
                    relatedTarget: this
                };
            n.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(n[0], i.target) || (n.trigger(i = t.Event("hide.bs.dropdown", s)), i.isDefaultPrevented() || (o.attr("aria-expanded", "false"), n.removeClass("open").trigger(t.Event("hidden.bs.dropdown", s)))))
        }))
    }

    function o(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new a(this)), "string" == typeof e && o[e].call(i)
        })
    }
    var n = ".dropdown-backdrop",
        s = '[data-toggle="dropdown"]',
        a = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    a.VERSION = "3.3.7", a.prototype.toggle = function(o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = e(n),
                a = s.hasClass("open");
            if (i(), !a) {
                "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var r = {
                    relatedTarget: this
                };
                if (s.trigger(o = t.Event("show.bs.dropdown", r)), o.isDefaultPrevented()) return;
                n.trigger("focus").attr("aria-expanded", "true"), s.toggleClass("open").trigger(t.Event("shown.bs.dropdown", r))
            }
            return !1
        }
    }, a.prototype.keydown = function(i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var o = t(this);
            if (i.preventDefault(), i.stopPropagation(), !o.is(".disabled, :disabled")) {
                var n = e(o),
                    a = n.hasClass("open");
                if (!a && 27 != i.which || a && 27 == i.which) return 27 == i.which && n.find(s).trigger("focus"), o.trigger("click");
                var r = " li:not(.disabled):visible a",
                    l = n.find(".dropdown-menu" + r);
                if (l.length) {
                    var h = l.index(i.target);
                    38 == i.which && h > 0 && h--, 40 == i.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
                }
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = o, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r, this
    }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", s, a.prototype.toggle).on("keydown.bs.dropdown.data-api", s, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown)
}(jQuery), + function(t) {
    "use strict";

    function e(e, o) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.modal"),
                a = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            s || n.data("bs.modal", s = new i(this, a)), "string" == typeof e ? s[e](o) : a.show && s.show(o)
        })
    }
    var i = function(e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function(e) {
        var o = this,
            n = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            o.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var n = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.adjustDialog(), n && o.$element[0].offsetWidth, o.$element.addClass("in"), o.enforceFocus();
            var s = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            n ? o.$dialog.one("bsTransitionEnd", function() {
                o.$element.trigger("focus").trigger(s)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(s)
        }))
    }, i.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function(e) {
        var o = this,
            n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + n).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                o.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a()
        } else e && e()
    }, i.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
        return t.fn.modal = o, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var o = t(this),
            n = o.attr("href"),
            s = t(o.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
            a = s.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(n) && n
            }, s.data(), o.data());
        o.is("a") && i.preventDefault(), s.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function() {
                o.is(":visible") && o.trigger("focus")
            })
        }), e.call(s, a, this)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.tooltip"),
                s = "object" == typeof e && e;
            !n && /destroy|hide/.test(e) || (n || o.data("bs.tooltip", n = new i(this, s)), "string" == typeof e && n[e]())
        })
    }
    var i = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, i.prototype.init = function(e, i, o) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var a = n[s];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter" : "focusin",
                    l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o)
        }), e
    }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide())
    }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o) return;
            var n = this,
                s = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), s.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && s.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                h = l.test(r);
            h && (r = r.replace(l, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var d = this.getPosition(),
                p = s[0].offsetWidth,
                c = s[0].offsetHeight;
            if (h) {
                var f = r,
                    u = this.getPosition(this.$viewport);
                r = "bottom" == r && d.bottom + c > u.bottom ? "top" : "top" == r && d.top - c < u.top ? "bottom" : "right" == r && d.right + p > u.width ? "left" : "left" == r && d.left - p < u.left ? "right" : r, s.removeClass(f).addClass(r)
            }
            var g = this.getCalculatedOffset(r, d, p, c);
            this.applyPlacement(g, r);
            var v = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v()
        }
    }, i.prototype.applyPlacement = function(e, i) {
        var o = this.tip(),
            n = o[0].offsetWidth,
            s = o[0].offsetHeight,
            a = parseInt(o.css("margin-top"), 10),
            r = parseInt(o.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(r) && (r = 0), e.top += a, e.left += r, t.offset.setOffset(o[0], t.extend({
            using: function(t) {
                o.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth,
            h = o[0].offsetHeight;
        "top" == i && h != s && (e.top = e.top + s - h);
        var d = this.getViewportAdjustedDelta(i, e, l, h);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(i),
            c = p ? 2 * d.left - n + l : 2 * d.top - s + h,
            f = p ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(c, o[0][f], p)
    }, i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function(e) {
        function o() {
            "in" != n.hoverState && s.detach(), n.$element && n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), e && e()
        }
        var n = this,
            s = t(this.$tip),
            a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function() {
        return this.getTitle()
    }, i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0],
            o = "BODY" == i.tagName,
            n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var s = window.SVGElement && i instanceof window.SVGElement,
            a = o ? {
                top: 0,
                left: 0
            } : s ? null : e.offset(),
            r = {
                scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            l = o ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, n, r, l, a)
    }, i.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0,
            a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - s - a.scroll,
                l = e.top + s - a.scroll + o;
            r < a.top ? n.top = a.top - r : l > a.top + a.height && (n.top = a.top + a.height - l)
        } else {
            var h = e.left - s,
                d = e.left + s + i;
            h < a.left ? n.left = a.left - h : d > a.right && (n.left = a.left + a.width - d)
        }
        return n
    }, i.prototype.getTitle = function() {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function() {
        this.enabled = !0
    }, i.prototype.disable = function() {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
        })
    };
    var o = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = o, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.popover"),
                s = "object" == typeof e && e;
            !n && /destroy|hide/.test(e) || (n || o.data("bs.popover", n = new i(this, s)), "string" == typeof e && n[e]())
        })
    }
    var i = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.7", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var o = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function() {
        return t.fn.popover = o, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.tab");
            n || o.data("bs.tab", n = new i(this)), "string" == typeof e && n[e]()
        })
    }
    var i = function(e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a"),
                s = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                a = t.Event("show.bs.tab", {
                    relatedTarget: n[0]
                });
            if (n.trigger(s), e.trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var r = t(o);
                this.activate(e.closest("li"), i), this.activate(r, r.parent(), function() {
                    n.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function(e, o, n) {
        function s() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), n && n()
        }
        var a = o.find("> .active"),
            r = n && t.support.transition && (a.length && a.hasClass("fade") || !!o.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(), a.removeClass("in")
    };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
        return t.fn.tab = o, this
    };
    var n = function(i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.affix"),
                s = "object" == typeof e && e;
            n || o.data("bs.affix", n = new i(this, s)), "string" == typeof e && n[e]()
        })
    }
    var i = function(e, o) {
        this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.7", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function(t, e, i, o) {
        var n = this.$target.scrollTop(),
            s = this.$element.offset(),
            a = this.$target.height();
        if (null != i && "top" == this.affixed) return i > n ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? n + this.unpin <= s.top ? !1 : "bottom" : t - o >= n + a ? !1 : "bottom";
        var r = null == this.affixed,
            l = r ? n : s.top,
            h = r ? a : e;
        return null != i && i >= n ? "top" : null != o && l + h >= t - o ? "bottom" : !1
    }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                o = this.options.offset,
                n = o.top,
                s = o.bottom,
                a = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof o && (s = n = o), "function" == typeof n && (n = o.top(this.$element)), "function" == typeof s && (s = o.bottom(this.$element));
            var r = this.getState(a, e, n, s);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (r ? "-" + r : ""),
                    h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == r && this.$element.offset({
                top: a - e - s
            })
        }
    };
    var o = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
        return t.fn.affix = o, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this),
                o = i.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o)
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o)
    }

    function i(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.collapse"),
                s = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !n && s.toggle && /show|hide/.test(e) && (s.toggle = !1), n || i.data("bs.collapse", n = new o(this, s)), "string" == typeof e && n[e]()
        })
    }
    var o = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    o.VERSION = "3.3.7", o.TRANSITION_DURATION = 350, o.DEFAULTS = {
        toggle: !0
    }, o.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, o.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse"), e && e.transitioning))) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s), !s.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"), e || n.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var r = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return r.call(this);
                    var l = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l])
                }
            }
        }
    }, o.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : n.call(this)
            }
        }
    }, o.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, o.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, o) {
            var n = t(o);
            this.addAriaAndCollapsedClass(e(n), n)
        }, this)).end()
    }, o.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var n = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = n, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(o) {
        var n = t(this);
        n.attr("data-target") || o.preventDefault();
        var s = e(n),
            a = s.data("bs.collapse"),
            r = a ? "toggle" : n.data();
        i.call(s, r)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(i, o) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.scrollspy"),
                s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this, s)), "string" == typeof i && n[i]()
        })
    }
    e.VERSION = "3.3.7", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function() {
        var e = this,
            i = "offset",
            o = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var e = t(this),
                n = e.data("target") || e.attr("href"),
                s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [
                [s[i]().top + o, n]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            o = this.options.offset + i - this.$scrollElement.height(),
            n = this.offsets,
            s = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o) return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0]) return this.activeTarget = null, this.clear();
        for (t = n.length; t--;) a != s[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(s[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = o, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in e)
            if (void 0 !== t.style[i]) return {
                end: e[i]
            };
        return !1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1,
            o = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0
        });
        var n = function() {
            i || t(o).trigger(t.support.transition.end)
        };
        return setTimeout(n, e), this
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery);
/*! jRespond.js v 0.10 | Author: Jeremy Fields [jeremy.fields@viget.com], 2013 | License: MIT */
! function(a, b, c) {
    "object" == typeof module && module && "object" == typeof module.exports ? module.exports = c : (a[b] = c, "function" == typeof define && define.amd && define(b, [], function() {
        return c
    }))
}(this, "jRespond", function(a, b, c) {
    "use strict";
    return function(a) {
        var b = [],
            d = [],
            e = a,
            f = "",
            g = "",
            i = 0,
            j = 100,
            k = 500,
            l = k,
            m = function() {
                var a = 0;
                return a = "number" != typeof window.innerWidth ? 0 !== document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth : window.innerWidth
            },
            n = function(a) {
                if (a.length === c) o(a);
                else
                    for (var b = 0; b < a.length; b++) o(a[b])
            },
            o = function(a) {
                var e = a.breakpoint,
                    h = a.enter || c;
                b.push(a), d.push(!1), r(e) && (h !== c && h.call(null, {
                    entering: f,
                    exiting: g
                }), d[b.length - 1] = !0)
            },
            p = function() {
                for (var a = [], e = [], h = 0; h < b.length; h++) {
                    var i = b[h].breakpoint,
                        j = b[h].enter || c,
                        k = b[h].exit || c;
                    "*" === i ? (j !== c && a.push(j), k !== c && e.push(k)) : r(i) ? (j === c || d[h] || a.push(j), d[h] = !0) : (k !== c && d[h] && e.push(k), d[h] = !1)
                }
                for (var l = {
                        entering: f,
                        exiting: g
                    }, m = 0; m < e.length; m++) e[m].call(null, l);
                for (var n = 0; n < a.length; n++) a[n].call(null, l)
            },
            q = function(a) {
                for (var b = !1, c = 0; c < e.length; c++)
                    if (a >= e[c].enter && a <= e[c].exit) {
                        b = !0;
                        break
                    }
                b && f !== e[c].label ? (g = f, f = e[c].label, p()) : b || "" === f || (f = "", p())
            },
            r = function(a) {
                if ("object" == typeof a) {
                    if (a.join().indexOf(f) >= 0) return !0
                } else {
                    if ("*" === a) return !0;
                    if ("string" == typeof a && f === a) return !0
                }
            },
            s = function() {
                var a = m();
                a !== i ? (l = j, q(a)) : l = k, i = a, setTimeout(s, l)
            };
        return s(), {
            addFunc: function(a) {
                n(a)
            },
            getBreakpoint: function() {
                return f
            }
        }
    }
}(this, this.document));
/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
(function(e) {
    e.fn.appear = function(t, n) {
        var r = e.extend({
            data: undefined,
            one: true,
            accX: 0,
            accY: 0
        }, n);
        return this.each(function() {
            var n = e(this);
            n.appeared = false;
            if (!t) {
                n.trigger("appear", r.data);
                return
            }
            var i = e(window);
            var s = function() {
                if (!n.is(":visible")) {
                    n.appeared = false;
                    return
                }
                var e = i.scrollLeft();
                var t = i.scrollTop();
                var s = n.offset();
                var o = s.left;
                var u = s.top;
                var a = r.accX;
                var f = r.accY;
                var l = n.height();
                var c = i.height();
                var h = n.width();
                var p = i.width();
                if (u + l + f >= t && u <= t + c + f && o + h + a >= e && o <= e + p + a) {
                    if (!n.appeared) n.trigger("appear", r.data)
                } else {
                    n.appeared = false
                }
            };
            var o = function() {
                n.appeared = true;
                if (r.one) {
                    i.unbind("scroll", s);
                    var o = e.inArray(s, e.fn.appear.checks);
                    if (o >= 0) e.fn.appear.checks.splice(o, 1)
                }
                t.apply(this, arguments)
            };
            if (r.one) n.one("appear", r.data, o);
            else n.bind("appear", r.data, o);
            i.scroll(s);
            e.fn.appear.checks.push(s);
            s()
        })
    };
    e.extend(e.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var t = e.fn.appear.checks.length;
            if (t > 0)
                while (t--) e.fn.appear.checks[t]()
        },
        run: function() {
            if (e.fn.appear.timeout) clearTimeout(e.fn.appear.timeout);
            e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20)
        }
    });
    e.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(t, n) {
        var r = e.fn[n];
        if (r) {
            e.fn[n] = function() {
                var t = r.apply(this, arguments);
                e.fn.appear.run();
                return t
            }
        }
    })
})(jQuery);
/*!
 * Isotope PACKAGED v3.0.4
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */

! function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, s, a) {
        function u(t, e, o) {
            var n, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, o);
                n = void 0 === n ? l : n
            }), void 0 !== n ? n : t
        }

        function h(t, e) {
            t.each(function(t, o) {
                var n = a.data(o, i);
                n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = n.call(arguments, 1);
                return u(this, t, e)
            }
            return h(this, t), this
        }, o(a))
    }

    function o(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var n = Array.prototype.slice,
        s = t.console,
        r = "undefined" == typeof s ? function() {} : function(t) {
            s.error(t)
        };
    return o(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                o = i[t] = i[t] || [];
            return o.indexOf(e) == -1 && o.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                o = i[t] = i[t] || {};
            return o[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = i.indexOf(e);
            return o != -1 && i.splice(o, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = 0,
                n = i[o];
            e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t]; n;) {
                var r = s && s[n];
                r && (this.off(t, n), delete s[n]), n.apply(this, e), o += r ? 0 : 1, n = i[o]
            }
            return this
        }
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < h; e++) {
            var i = u[e];
            t[i] = 0
        }
        return t
    }

    function o(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function n() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var n = o(e);
            s.isBoxSizeOuter = r = 200 == t(n.width), i.removeChild(e)
        }
    }

    function s(e) {
        if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = o(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
                var f = u[l],
                    c = s[f],
                    m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight,
                y = a.paddingTop + a.paddingBottom,
                g = a.marginLeft + a.marginRight,
                v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                I = a.borderTopWidth + a.borderBottomWidth,
                z = d && r,
                x = t(s.width);
            x !== !1 && (a.width = x + (z ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = u.length,
        d = !1;
    return s
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var o = e[i],
                n = o + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function(t, e) {
        return (t % e + e) % e
    }, i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "object" == typeof t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, o) {
        t = i.makeArray(t);
        var n = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!o) return void n.push(t);
                e(t, o) && n.push(t);
                for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s])
            }
        }), n
    }, i.debounceMethod = function(t, e, i) {
        var o = t.prototype[e],
            n = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[n];
            t && clearTimeout(t);
            var e = arguments,
                s = this;
            this[n] = setTimeout(function() {
                o.apply(s, e), delete s[n]
            }, i || 100)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var s = i.toDashed(n),
                r = "data-" + s,
                a = document.querySelectorAll("[" + r + "]"),
                u = document.querySelectorAll(".js-" + s),
                h = i.makeArray(a).concat(i.makeArray(u)),
                d = r + "-options",
                l = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try {
                    i = s && JSON.parse(s)
                } catch (a) {
                    return void(o && o.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var u = new e(t, i);
                l && l.data(t, n, u)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function o(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function n(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }
    var s = document.documentElement.style,
        r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        u = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[r],
        h = {
            transform: a,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        },
        d = o.prototype = Object.create(t.prototype);
    d.constructor = o, d._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function() {
        this.size = e(this.element)
    }, d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var o = h[i] || i;
            e[o] = t[i]
        }
    }, d.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            o = t[e ? "left" : "right"],
            n = t[i ? "top" : "bottom"],
            s = this.layout.size,
            r = o.indexOf("%") != -1 ? parseFloat(o) / 100 * s.width : parseInt(o, 10),
            a = n.indexOf("%") != -1 ? parseFloat(n) / 100 * s.height : parseInt(n, 10);
        r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
    }, d.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"),
            n = i ? "paddingLeft" : "paddingRight",
            s = i ? "left" : "right",
            r = i ? "right" : "left",
            a = this.position.x + t[n];
        e[s] = this.getXValue(a), e[r] = "";
        var u = o ? "paddingTop" : "paddingBottom",
            h = o ? "top" : "bottom",
            d = o ? "bottom" : "top",
            l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            o = this.position.y,
            n = parseInt(t, 10),
            s = parseInt(e, 10),
            r = n === this.position.x && s === this.position.y;
        if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i,
            u = e - o,
            h = {};
        h.transform = this.getTranslate(a, u), this.transition({
            to: h,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, d.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop");
        return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, d._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + n(a);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(u, this, !1)
        }
    }, d.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var f = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                o = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                var n = e.onEnd[o];
                n.call(this), delete e.onEnd[o]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
        this.css(c)
    }, d.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, d.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, d.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, s) {
        return e(t, i, o, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, o, n) {
    "use strict";

    function s(t, e) {
        var i = o.getQueryElement(t);
        if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
        var n = ++l;
        this.element.outlayerGUID = n, f[n] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            o = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var n = m[o] || 1;
        return i * n
    }
    var u = t.console,
        h = t.jQuery,
        d = function() {},
        l = 0,
        f = {};
    s.namespace = "outlayer", s.Item = n, s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var c = s.prototype;
    o.extend(c, e.prototype), c.option = function(t) {
        o.extend(this.options, t)
    }, c._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, c.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, c._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
            var s = e[n],
                r = new i(s, this);
            o.push(r)
        }
        return o
    }, c._filterFindItemElements = function(t) {
        return o.filterFindElements(t, this.options.itemSelector)
    }, c.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, c.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function() {
        this.getSize()
    }, c.getSize = function() {
        this.size = i(this.element)
    }, c._getMeasurement = function(t, e) {
        var o, n = this.options[t];
        n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0
    }, c.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, c._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, c._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, c._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, c.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, c._positionItem = function(t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
    }, c._postLayout = function() {
        this.resizeContainer()
    }, c.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, c._emitCompleteOnItems = function(t, e) {
        function i() {
            n.dispatchEvent(t + "Complete", null, [e])
        }

        function o() {
            r++, r == s && i()
        }
        var n = this,
            s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function(e) {
            e.once(t, o)
        })
    }, c.dispatchEvent = function(t, e, i) {
        var o = e ? [e].concat(i) : i;
        if (this.emitEvent(t, o), h)
            if (this.$element = this.$element || h(this.element), e) {
                var n = h.Event(e);
                n.type = t, this.$element.trigger(n, i)
            } else this.$element.trigger(t, i)
    }, c.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, c.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, c.stamp = function(t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, c.unstamp = function(t) {
        t = this._find(t), t && t.forEach(function(t) {
            o.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, c._find = function(t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)
    }, c._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, c._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, c._manageStamp = d, c._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            o = this._boundingRect,
            n = i(t),
            s = {
                left: e.left - o.left - n.marginLeft,
                top: e.top - o.top - n.marginTop,
                right: o.right - e.right - n.marginRight,
                bottom: o.bottom - e.bottom - n.marginBottom
            };
        return s
    }, c.handleEvent = o.handleEvent, c.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, c.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, c.onresize = function() {
        this.resize()
    }, o.debounceMethod(s, "onresize", 100), c.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, c.needsResizeLayout = function() {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, c.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, c.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, c.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, c.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, c.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, c.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, c.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, c.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, c.getItems = function(t) {
        t = o.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, c.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), o.removeFrom(this.items, t)
        }, this)
    }, c.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
    }, s.data = function(t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e]
    }, s.create = function(t, e) {
        var i = r(s);
        return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
    };
    var m = {
        ms: 1,
        s: 1e3
    };
    return s.Item = n, s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype),
        o = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, o.call(this), this.sortData = {}
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var o = e[i];
                this.sortData[i] = o(this.element, this)
            }
        }
    };
    var n = i.destroy;
    return i.destroy = function() {
        n.apply(this, arguments), this.css({
            display: ""
        })
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }
    var o = i.prototype,
        n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return n.forEach(function(t) {
        o[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), o.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element),
            i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, o.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, o.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, o.getSegmentSize = function(t, e) {
        var i = t + e,
            o = "outer" + e;
        if (this._getMeasurement(i, o), !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[o] || this.isotope.size["inner" + e]
        }
    }, o.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, o.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, o.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function(t, e) {
        function n() {
            i.apply(this, arguments)
        }
        return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return o._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, o.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            s = n / o,
            r = o - n % o,
            a = r && r < 1 ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1)
    }, o.getContainerWidth = function() {
        var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            o = e(i);
        this.containerWidth = o && o.innerWidth
    }, o._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = e && e < 1 ? "round" : "ceil",
            o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
                x: this.columnWidth * s.col,
                y: s.y
            }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;
        return r
    }, o._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }, o._getTopColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);
        return e
    }, o._getColGroupY = function(t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, o._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols,
            o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }, o._manageStamp = function(t) {
        var i = e(t),
            o = this._getElementOffset(t),
            n = this._getOption("originLeft"),
            s = n ? o.left : o.right,
            r = s + i.outerWidth,
            a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, o._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, o._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, o.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"),
        o = i.prototype,
        n = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function() {
        this.items = this.isotope.filteredItems, r.call(this)
    };
    var a = o._getOption;
    return o._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var o = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
    }, i._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
            horizontalAlignment: 0
        }),
        i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, i._getContainerSize = function() {
        return {
            height: this.y
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, o, n, s, r, a) {
        return e(t, i, o, n, s, r, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, i, o, n, s, r) {
    function a(t, e) {
        return function(i, o) {
            for (var n = 0; n < t.length; n++) {
                var s = t[n],
                    r = i.sortData[s],
                    a = o.sortData[s];
                if (r > a || r < a) {
                    var u = void 0 !== e[s] ? e[s] : e,
                        h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }
    var u = t.jQuery,
        h = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        d = e.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    d.Item = s, d.LayoutMode = r;
    var l = d.prototype;
    l._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in r.modes) this._initLayoutMode(t)
    }, l.reloadItems = function() {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, l._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var o = t[i];
            o.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, l._initLayoutMode = function(t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, l.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, l._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, l.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, l._init = l.arrange, l._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, l._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, l._bindArrangeComplete = function() {
        function t() {
            e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
        }
        var e, i, o, n = this;
        this.once("layoutComplete", function() {
            e = !0, t()
        }), this.once("hideComplete", function() {
            i = !0, t()
        }), this.once("revealComplete", function() {
            o = !0, t()
        })
    }, l._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
            }
        }
        return {
            matches: i,
            needReveal: o,
            needHide: n
        }
    }, l._getFilterTest = function(t) {
        return u && this.options.isJQueryFiltering ? function(e) {
            return u(e.element).is(t)
        } : "function" == typeof t ? function(e) {
            return t(e.element)
        } : function(e) {
            return o(e.element, t)
        }
    }, l.updateSortData = function(t) {
        var e;
        t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, l._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i)
        }
    }, l._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            var o = t[i];
            o.updateSortData()
        }
    };
    var f = function() {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "),
                o = i[0],
                n = o.match(/^\[(.+)\]$/),
                s = n && n[1],
                r = e(s, o),
                a = d.sortDataParsers[i[1]];
            return t = a ? function(t) {
                return t && a(r(t))
            } : function(t) {
                return t && r(t)
            }
        }

        function e(t, e) {
            return t ? function(e) {
                return e.getAttribute(t)
            } : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }
        return t
    }();
    d.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    }, l._sort = function() {
        if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = a(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }, l._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, l._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, l._resetLayout = function() {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, l._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }, l._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }, l._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, l.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, l.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, l._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, l.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, o, n = e.length;
            for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
            var s = this._filter(e).matches;
            for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var c = l.remove;
    return l.remove = function(t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
            var s = e[o];
            n.removeFrom(this.filteredItems, s)
        }
    }, l.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, l._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return this.options.transitionDuration = i, o
    }, l.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }, d
});
/*! OWL Carousel - v2 (beta.2.4) */
! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Pipe, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }

    function f(a) {
        if (a.touches !== d) return {
            x: a.touches[0].pageX,
            y: a.touches[0].pageY
        };
        if (a.touches === d) {
            if (a.pageX !== d) return {
                x: a.pageX,
                y: a.pageY
            };
            if (a.pageX === d) return {
                x: a.clientX,
                y: a.clientY
            }
        }
    }

    function g(a) {
        var b, d, e = c.createElement("div"),
            f = a;
        for (b in f)
            if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b];
        return [!1]
    }

    function h() {
        return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function i() {
        return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function j() {
        return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function k() {
        return "ontouchstart" in b || !!navigator.msMaxTouchPoints
    }

    function l() {
        return b.navigator.msPointerEnabled
    }
    var m, n, o;
    m = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }, n = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    }, o = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    }, e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Plugins = {}, e.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var a = this._clones,
                b = this.$stage.children(".cloned");
            (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var a, b, c = this._clones,
                d = this._items,
                e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
            for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a, b, c, d = this.settings.rtl ? 1 : -1,
                e = (this.width() / this.settings.items).toFixed(3),
                f = 0;
            for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var b, c, d = (this.width() / this.settings.items).toFixed(3),
                e = {
                    width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                    "padding-left": this.settings.stagePadding || "",
                    "padding-right": this.settings.stagePadding || ""
                };
            if (this.$stage.css(e), e = {
                    width: this.settings.autoWidth ? "auto" : d - this.settings.margin
                }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function(a) {
                    return a > 1
                }).length > 0)
                for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);
            else this.$stage.children().css(e)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current && this.reset(this.$stage.children().index(a.current))
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], e.prototype.initialize = function() {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
            var b, c, e;
            if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1
        }
        this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) {
            b >= a && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function(a, b) {
            return b.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, e.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
                return this[a]
            }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        if (0 === this._items.length) return !1;
        (new Date).getTime();
        this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed")
    }, e.prototype.eventsCall = function() {
        this.e._onDragStart = a.proxy(function(a) {
            this.onDragStart(a)
        }, this), this.e._onDragMove = a.proxy(function(a) {
            this.onDragMove(a)
        }, this), this.e._onDragEnd = a.proxy(function(a) {
            this.onDragEnd(a)
        }, this), this.e._onResize = a.proxy(function(a) {
            this.onResize(a)
        }, this), this.e._transitionEnd = a.proxy(function(a) {
            this.transitionEnd(a)
        }, this), this.e._preventClick = a.proxy(function(a) {
            this.preventClick(a)
        }, this)
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
    }, e.prototype.eventsRouter = function(a) {
        var b = a.type;
        "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a)
    }, e.prototype.internalEvents = function() {
        var c = (k(), l());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function(a) {
            this.eventsRouter(a)
        }, this)), this.$stage.on("dragstart", function() {
            return !1
        }), this.$stage.get(0).onselectstart = function() {
            return !1
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function(a) {
            this.eventsRouter(a)
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
    }, e.prototype.onDragStart = function(d) {
        var e, g, h, i;
        if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
        if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
        this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function(a) {
            this.eventsRouter(a)
        }, this))
    }, e.prototype.onDragMove = function(a) {
        var c, e, g, h, i, j;
        this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, e.prototype.onDragEnd = function(b) {
        var d, e, f;
        if (this.state.isTouch) {
            if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
            this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
        }
    }, e.prototype.removeClick = function(c) {
        this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function() {
            a(c).off("click.preventClick")
        }, 300)
    }, e.prototype.preventClick = function(b) {
        b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick")
    }, e.prototype.getTransformProperty = function() {
        var a, c;
        return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12]
    }, e.prototype.closest = function(b) {
        var c = -1,
            d = 30,
            e = this.width(),
            f = this.coordinates();
        return this.settings.freeDrag || a.each(f, a.proxy(function(a, g) {
            return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c
        }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
    }, e.prototype.animate = function(b) {
        this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: b + "px"
        }) : this.$stage.animate({
            left: b
        }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function() {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function(a) {
        this._invalidated[a] = !0
    }, e.prototype.reset = function(a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(b, c) {
        var e = c ? this._items.length : this._items.length + this._clones.length;
        return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b))
    }, e.prototype.relative = function(a) {
        return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
        var b, c, d, e = 0,
            f = this.settings;
        if (a) return this._items.length - 1;
        if (!f.loop && f.center) b = this._items.length - 1;
        else if (f.loop || f.center)
            if (f.loop || f.center) b = this._items.length + f.items;
            else {
                if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
                for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width();
                    (d = this.coordinates(e)) && !(d * revert >= c);) b = ++e
            }
        else b = this._items.length - f.items;
        return b
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
        var c = null;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
    }, e.prototype.duration = function(a, b, c) {
        return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(c, d) {
        if (this.settings.loop) {
            var e = c - this.relative(this.current()),
                f = this.current(),
                g = this.current(),
                h = this.current() + e,
                i = 0 > g - h ? !0 : !1,
                j = this._clones.length + this._items.length;
            h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function() {
                this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update()
            }, this), 30)
        } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.transitionEnd = function(a) {
        return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
    }, e.prototype.viewport = function() {
        var d;
        if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
        else if (b.innerWidth) d = b.innerWidth;
        else {
            if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth
        }
        return d
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(a, b) {
        b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
            content: a,
            position: b
        }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
            content: a,
            position: b
        })
    }, e.prototype.remove = function(a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.addTriggerableEvents = function() {
        var b = a.proxy(function(b, c) {
            return a.proxy(function(a) {
                a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]))
            }, this)
        }, this);
        a.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, a.proxy(function(a, c) {
            this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
        }, this))
    }, e.prototype.watchVisibility = function() {
        function c(a) {
            return a.offsetWidth > 0 && a.offsetHeight > 0
        }

        function d() {
            c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile))
        }
        c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        var c, d, e, f;
        c = 0, d = this, b.each(function(g, h) {
            e = a(h), f = new Image, f.onload = function() {
                c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize())
            }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
        })
    }, e.prototype.destroy = function() {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var d in this._plugins) this._plugins[d].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
            return !1
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : c > a;
            case ">":
                return d ? c > a : a > c;
            case ">=":
                return d ? c >= a : a >= c;
            case "<=":
                return d ? a >= c : c >= a
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d) {
        var e = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            f = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase()),
            g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, e, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(g)
        }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.browserSupport = function() {
        if (this.support3d = j(), this.support3d) {
            this.transformVendor = i();
            var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = b.orientation
    }, a.fn.owlCarousel = function(b) {
        return this.each(function() {
            a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b))
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b) {
    var c = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function(a, b) {
                            this.load(b)
                        }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    c.Defaults = {
        lazyLoad: !1
    }, c.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
                f.css({
                    "background-image": "url(" + g + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, c.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
}(window.Zepto || window.jQuery, window, document),
function(a) {
    var b = function(c) {
        this._core = c, this._handlers = {
            "initialized.owl.carousel": a.proxy(function() {
                this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    b.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, b.prototype.update = function() {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }, b.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
}(window.Zepto || window.jQuery, window, document),
function(a, b, c) {
    var d = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
            "resize.owl.carousel": a.proxy(function(a) {
                this._core.settings.video && !this.isInFullScreen() && a.preventDefault()
            }, this),
            "refresh.owl.carousel changed.owl.carousel": a.proxy(function() {
                this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                var c = a(b.content).find(".owl-video");
                c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
            }, this)
        }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    d.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, d.prototype.fetch = function(a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else {
            if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            c = "vimeo"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, d.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(a) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
            };
        return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large, l(f)
            }
        }))
    }, d.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
    }, d.prototype.play = function(b) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var c, d, e = a(b.target || b.srcElement),
            f = e.closest("." + this._core.settings.itemClass),
            g = this._videos[f.attr("data-video")],
            h = g.width || "100%",
            i = g.height || this._core.$stage.height();
        "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
    }, d.prototype.isInFullScreen = function() {
        var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0
    }, d.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = d
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                this.swapping = "translated" == a.type
            }, this),
            "translate.owl.carousel": a.proxy(function() {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
        }
    }, e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c) {
    var d = function(b) {
        this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": a.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function() {
                this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    d.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, d.prototype.autoplay = function() {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function() {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
    }, d.prototype.play = function() {
        return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }, d.prototype.stop = function() {
        b.clearInterval(this.interval)
    }, d.prototype.pause = function() {
        b.clearInterval(this.interval)
    }, d.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this.interval);
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
}(window.Zepto || window.jQuery, window, document),
function(a) {
    "use strict";
    var b = function(c) {
        this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "add.owl.carousel": a.proxy(function(b) {
                this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "remove.owl.carousel prepared.owl.carousel": a.proxy(function(a) {
                this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "change.owl.carousel": a.proxy(function(a) {
                if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var b = this._core.current(),
                        c = this._core.maximum(),
                        d = this._core.minimum();
                    a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                "position" == a.property.name && this.draw()
            }, this),
            "refreshed.owl.carousel": a.proxy(function() {
                this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
            }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    b.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    }, b.prototype.initialize = function() {
        var b, c, d = this._core.settings;
        d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function(b) {
            var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(c, d.dotsSpeed)
        }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function() {
            this.prev(d.navSpeed)
        }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function() {
            this.next(d.navSpeed)
        }, this));
        for (c in this._overrides) this._core[c] = a.proxy(this[c], this)
    }, b.prototype.destroy = function() {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, b.prototype.update = function() {
        var a, b, c, d = this._core.settings,
            e = this._core.clones().length / 2,
            f = e + this._core.items().length,
            g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)
            for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({
                start: a - e,
                end: a - e + g - 1
            }), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
    }, b.prototype.draw = function() {
        var b, c, d = "",
            e = this._core.settings,
            f = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) {
            if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
                for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
                this._controls.$indicators.html(d)
            } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(e.dots)
    }, b.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
        }
    }, b.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, function(a) {
            return a.start <= b && a.end >= b
        }).pop()
    }, b.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, b.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, b.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, b.prototype.to = function(b, c, d) {
        var e;
        d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
}(window.Zepto || window.jQuery, window, document),
function(a, b) {
    "use strict";
    var c = function(d) {
        this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function() {
                "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[c] = b.content
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function() {
            var a = b.location.hash.substring(1),
                c = this._core.$stage.children(),
                d = this._hashes[a] && c.index(this._hashes[a]) || 0;
            return a ? void this._core.to(d, !1, !0) : !1
        }, this))
    };
    c.Defaults = {
        URLhashListener: !1
    }, c.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = c
}(window.Zepto || window.jQuery, window, document);
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
! function(t) {
    "use strict";
    t.fn.fitVids = function(e) {
        var i = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.head || document.getElementsByTagName("head")[0],
                a = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                d = document.createElement("div");
            d.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + "</style>", r.appendChild(d.childNodes[1])
        }
        return e && t.extend(i, e), this.each(function() {
            var e = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var r = ".fitvidsignore";
            i.ignore && (r = r + ", " + i.ignore);
            var a = t(this).find(e.join(","));
            a = a.not("object object"), a = a.not(r), a.each(function(e) {
                var i = t(this);
                if (!(i.parents(r).length > 0 || "embed" === this.tagName.toLowerCase() && i.parent("object").length || i.parent(".fluid-width-video-wrapper").length)) {
                    i.css("height") || i.css("width") || !isNaN(i.attr("height")) && !isNaN(i.attr("width")) || (i.attr("height", 9), i.attr("width", 16));
                    var a = "object" === this.tagName.toLowerCase() || i.attr("height") && !isNaN(parseInt(i.attr("height"), 10)) ? parseInt(i.attr("height"), 10) : i.height(),
                        d = isNaN(parseInt(i.attr("width"), 10)) ? i.width() : parseInt(i.attr("width"), 10),
                        o = a / d;
                    if (!i.attr("id")) {
                        var h = "fitvid" + e;
                        i.attr("id", h)
                    }
                    i.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * o + "%"), i.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto);
/*
 *  Vide - v0.5.1
 *  Easy as hell jQuery plugin for video backgrounds.
 *  http://vodkabears.github.io/vide/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : b("object" == typeof exports ? require("jquery") : a.jQuery)
}(this, function(a) {
    "use strict";

    function b(a) {
        var b, c, d, e, f, g, h, i = {};
        for (f = a.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","), h = 0, g = f.length; h < g && (c = f[h], c.search(/^(http|https|ftp):\/\//) === -1 && c.search(":") !== -1); h++) b = c.indexOf(":"), d = c.substring(0, b), e = c.substring(b + 1), e || (e = void 0), "string" == typeof e && (e = "true" === e || "false" !== e && e), "string" == typeof e && (e = isNaN(e) ? e : +e), i[d] = e;
        return null == d && null == e ? a : i
    }

    function c(a) {
        a = "" + a;
        var b, c, d, e = a.split(/\s+/),
            f = "50%",
            g = "50%";
        for (d = 0, b = e.length; d < b; d++) c = e[d], "left" === c ? f = "0%" : "right" === c ? f = "100%" : "top" === c ? g = "0%" : "bottom" === c ? g = "100%" : "center" === c ? 0 === d ? f = "50%" : g = "50%" : 0 === d ? f = c : g = c;
        return {
            x: f,
            y: g
        }
    }

    function d(b, c) {
        var d = function() {
            c(this.src)
        };
        a('<img src="' + b + '.gif">').on("load", d), a('<img src="' + b + '.jpg">').on("load", d), a('<img src="' + b + '.jpeg">').on("load", d), a('<img src="' + b + '.png">').on("load", d)
    }

    function e(c, d, e) {
        if (this.$element = a(c), "string" == typeof d && (d = b(d)), e ? "string" == typeof e && (e = b(e)) : e = {}, "string" == typeof d) d = d.replace(/\.\w*$/, "");
        else if ("object" == typeof d)
            for (var f in d) d.hasOwnProperty(f) && (d[f] = d[f].replace(/\.\w*$/, ""));
        this.settings = a.extend({}, g, e), this.path = d;
        try {
            this.init()
        } catch (i) {
            if (i.message !== h) throw i
        }
    }
    var f = "vide",
        g = {
            volume: 1,
            playbackRate: 1,
            muted: !0,
            loop: !0,
            autoplay: !0,
            position: "50% 50%",
            posterType: "detect",
            resizing: !0,
            bgColor: "transparent",
            className: ""
        },
        h = "Not implemented";
    e.prototype.init = function() {
        var b, e, f = this,
            g = f.path,
            i = g,
            j = "",
            k = f.$element,
            l = f.settings,
            m = c(l.position),
            n = l.posterType;
        e = f.$wrapper = a("<div>").addClass(l.className).css({
            position: "absolute",
            "z-index": -1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "background-color": l.bgColor,
            "background-repeat": "no-repeat",
            "background-position": m.x + " " + m.y
        }), "object" == typeof g && (g.poster ? i = g.poster : g.mp4 ? i = g.mp4 : g.webm ? i = g.webm : g.ogv && (i = g.ogv)), "detect" === n ? d(i, function(a) {
            e.css("background-image", "url(" + a + ")")
        }) : "none" !== n && e.css("background-image", "url(" + i + "." + n + ")"), "static" === k.css("position") && k.css("position", "relative"), k.prepend(e), "object" == typeof g ? (g.mp4 && (j += '<source src="' + g.mp4 + '.mp4" type="video/mp4">'), g.webm && (j += '<source src="' + g.webm + '.webm" type="video/webm">'), g.ogv && (j += '<source src="' + g.ogv + '.ogv" type="video/ogg">'), b = f.$video = a("<video>" + j + "</video>")) : b = f.$video = a('<video><source src="' + g + '.mp4" type="video/mp4"><source src="' + g + '.webm" type="video/webm"><source src="' + g + '.ogv" type="video/ogg"></video>');
        try {
            b.prop({
                autoplay: l.autoplay,
                loop: l.loop,
                volume: l.volume,
                muted: l.muted,
                defaultMuted: l.muted,
                playbackRate: l.playbackRate,
                defaultPlaybackRate: l.playbackRate
            })
        } catch (o) {
            throw new Error(h)
        }
        b.css({
            margin: "auto",
            position: "absolute",
            "z-index": -1,
            top: m.y,
            left: m.x,
            "-webkit-transform": "translate(-" + m.x + ", -" + m.y + ")",
            "-ms-transform": "translate(-" + m.x + ", -" + m.y + ")",
            "-moz-transform": "translate(-" + m.x + ", -" + m.y + ")",
            transform: "translate(-" + m.x + ", -" + m.y + ")",
            visibility: "hidden",
            opacity: 0
        }).one("canplaythrough.vide", function() {
            f.resize()
        }).one("playing.vide", function() {
            b.css({
                visibility: "visible",
                opacity: 1
            }), e.css("background-image", "none")
        }), k.on("resize.vide", function() {
            l.resizing && f.resize()
        }), e.append(b)
    }, e.prototype.getVideoObject = function() {
        return this.$video[0]
    }, e.prototype.resize = function() {
        if (this.$video) {
            var a = this.$wrapper,
                b = this.$video,
                c = b[0],
                d = c.videoHeight,
                e = c.videoWidth,
                f = a.height(),
                g = a.width();
            g / e > f / d ? b.css({
                width: g + 2,
                height: "auto"
            }) : b.css({
                width: "auto",
                height: f + 2
            })
        }
    }, e.prototype.destroy = function() {
        delete a[f].lookup[this.index], this.$video && this.$video.off(f), this.$element.off(f).removeData(f), this.$wrapper.remove()
    }, a[f] = {
        lookup: []
    }, a.fn[f] = function(b, c) {
        var d;
        return this.each(function() {
            d = a.data(this, f), d && d.destroy(), d = new e(this, b, c), d.index = a[f].lookup.push(d) - 1, a.data(this, f, d)
        }), this
    }, a(document).ready(function() {
        var b = a(window);
        b.on("resize.vide", function() {
            for (var b, c = a[f].lookup.length, d = 0; d < c; d++) b = a[f].lookup[d], b && b.settings.resizing && b.resize()
        }), b.on("unload.vide", function() {
            return !1
        }), a(document).find("[data-vide-bg]").each(function(b, c) {
            var d = a(c),
                e = d.data("vide-options"),
                g = d.data("vide-bg");
            d[f](g, e)
        })
    })
});
/*jquery.mb.YTPlayer 09-05-2017
 _ jquery.mb.components 
 _ email: matteo@open-lab.com 
 _ Copyright (c) 2001-2017. Matteo Bicocchi (Pupunzi); 
 _ blog: http://pupunzi.open-lab.com 
 _ Open Lab s.r.l., Florence - Italy 
 */
function onYouTubeIframeAPIReady() {
    ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}

function uncamel(a) {
    return a.replace(/([A-Z])/g, function(a) {
        return "-" + a.toLowerCase()
    })
}

function setUnit(a, b) {
    return "string" != typeof a || a.match(/^[\-0-9\.]+jQuery/) ? "" + a + b : a
}

function setFilter(a, b, c) {
    var d = uncamel(b),
        e = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
    a[e + "filter"] = a[e + "filter"] || "", c = setUnit(c > jQuery.CSS.filters[b].max ? jQuery.CSS.filters[b].max : c, jQuery.CSS.filters[b].unit), a[e + "filter"] += d + "(" + c + ") ", delete a[b]
}
var ytp = ytp || {},
    getYTPVideoID = function(a) {
        var b, c;
        return a.indexOf("youtu.be") > 0 ? (b = a.substr(a.lastIndexOf("/") + 1, a.length), c = b.indexOf("?list=") > 0 ? b.substr(b.lastIndexOf("="), b.length) : null, b = c ? b.substr(0, b.lastIndexOf("?")) : b) : a.indexOf("http") > -1 ? (b = a.match(/[\\?&]v=([^&#]*)/)[1], c = a.indexOf("list=") > 0 ? a.match(/[\\?&]list=([^&#]*)/)[1] : null) : (b = a.length > 15 ? null : a, c = b ? null : a), {
            videoID: b,
            playlistID: c
        }
    };
! function(jQuery, ytp) {
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "3.0.18",
        build: "6220",
        author: "Matteo Bicocchi (pupunzi)",
        apiKey: "",
        defaults: {
            containment: "body",
            ratio: "auto",
            videoURL: null,
            playlistURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: !0,
            vol: 50,
            addRaster: !1,
            mask: !1,
            opacity: 1,
            quality: "default",
            mute: !1,
            loop: !0,
            fadeOnStartTime: 500,
            showControls: !0,
            showAnnotations: !1,
            showYTLogo: !0,
            stopMovieOnBlur: !0,
            realfullscreen: !0,
            mobileFallbackImage: null,
            gaTrack: !0,
            optimizeDisplay: !0,
            remember_last_time: !1,
            anchor: "center,center",
            onReady: function(a) {},
            onError: function(a, b) {}
        },
        controls: {
            play: "P",
            pause: "p",
            mute: "M",
            unmute: "A",
            onlyYT: "O",
            showSite: "R",
            ytLogo: "Y"
        },
        controlBar: null,
        loading: null,
        locationProtocol: "https:",
        filters: {
            grayscale: {
                value: 0,
                unit: "%"
            },
            hue_rotate: {
                value: 0,
                unit: "deg"
            },
            invert: {
                value: 0,
                unit: "%"
            },
            opacity: {
                value: 0,
                unit: "%"
            },
            saturate: {
                value: 0,
                unit: "%"
            },
            sepia: {
                value: 0,
                unit: "%"
            },
            brightness: {
                value: 0,
                unit: "%"
            },
            contrast: {
                value: 0,
                unit: "%"
            },
            blur: {
                value: 0,
                unit: "px"
            }
        },
        buildPlayer: function(options) {
            return this.each(function() {
                var YTPlayer = this,
                    $YTPlayer = jQuery(YTPlayer);
                YTPlayer.loop = 0, YTPlayer.opt = {}, YTPlayer.state = {}, YTPlayer.filters = jQuery.mbYTPlayer.filters, YTPlayer.filtersEnabled = !0, YTPlayer.id = YTPlayer.id || "YTP_" + (new Date).getTime(), $YTPlayer.addClass("mb_YTPlayer");
                var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                "undefined" != typeof property && "undefined" != typeof property.vol && (property.vol = 0 === property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.hasChanged || (YTPlayer.defaultOpt = {}, jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options)), "true" == YTPlayer.opt.loop && (YTPlayer.opt.loop = 9999), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
                var isIframe = function() {
                    var a = !1;
                    try {
                        self.location.href != top.location.href && (a = !0)
                    } catch (b) {
                        a = !0
                    }
                    return a
                };
                YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "ytp_" + (new Date).getTime());
                var playerID = "iframe_" + YTPlayer.id;
                YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0, YTPlayer.videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).videoID : !1, YTPlayer.playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).playlistID : !1, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "1" : "3";
                var start_from_last = 0;
                jQuery.mbCookie.get("YTPlayer_" + YTPlayer.videoID) && (start_from_last = parseFloat(jQuery.mbCookie.get("YTPlayer_" + YTPlayer.videoID))), YTPlayer.opt.remember_last_time && start_from_last && (YTPlayer.start_from_last = start_from_last, jQuery.mbCookie.remove("YTPlayer_" + YTPlayer.videoID));
                var playerVars = {
                    modestbranding: 1,
                    autoplay: 0,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    enablejsapi: 1,
                    version: 3,
                    playerapiid: playerID,
                    origin: "*",
                    allowfullscreen: !0,
                    wmode: "transparent",
                    iv_load_policy: YTPlayer.opt.showAnnotations
                };
                if (document.createElement("video").canPlayType && jQuery.extend(playerVars, {
                        html5: 1
                    }), jQuery.browser.msie && jQuery.browser.version < 9 && (this.opt.opacity = 1), YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = jQuery("self" == YTPlayer.opt.containment ? this : YTPlayer.opt.containment), YTPlayer.isBackground = YTPlayer.opt.containment.is("body"), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
                    var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
                    YTPlayer.canPlayOnMobile = isPlayer && 0 === jQuery(this).children().length, YTPlayer.isPlayer = !1, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide();
                    var overlay = jQuery("<div/>").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }).addClass("YTPOverlay");
                    YTPlayer.isPlayer && overlay.on("click", function() {
                        $YTPlayer.YTPTogglePlay()
                    });
                    var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + YTPlayer.id);
                    wrapper.css({
                        position: "absolute",
                        zIndex: 0,
                        minWidth: "100%",
                        minHeight: "100%",
                        left: 0,
                        top: 0,
                        overflow: "hidden",
                        opacity: 0
                    });
                    var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox");
                    if (playerBox.css({
                            position: "absolute",
                            zIndex: 0,
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            overflow: "hidden"
                        }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function() {
                            "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative")
                        }), YTPlayer.isBackground ? (jQuery("body").css({
                            boxSizing: "border-box"
                        }), wrapper.css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 0
                        }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({
                            position: "relative"
                        }), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({
                            opacity: 1
                        }), jQuery.browser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function() {
                            YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.addClass("visible")
                        }).on("mouseleave", function() {
                            YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.removeClass("visible")
                        }), ytp.YTAPIReady) setTimeout(function() {
                        jQuery(document).trigger("YTAPIReady")
                    }, 100);
                    else {
                        jQuery("#YTAPI").remove();
                        var tag = jQuery("<script></script>").attr({
                            src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
                            id: "YTAPI"
                        });
                        jQuery("head").prepend(tag)
                    }
                    if (jQuery.browser.mobile && !YTPlayer.canPlayOnMobile) return YTPlayer.opt.mobileFallbackImage && wrapper.css({
                        backgroundImage: "url(" + YTPlayer.opt.mobileFallbackImage + ")",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        opacity: 1
                    }), $YTPlayer.remove(), void jQuery(document).trigger("YTPUnavailable");
                    jQuery(document).on("YTAPIReady", function() {
                        YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = "undefined" == typeof YTPlayer.opt.autoPlay ? YTPlayer.isBackground ? !0 : !1 : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function() {
                            if (!YTPlayer.isInit) {
                                if (YTPlayer.isInit = !0, jQuery.browser.mobile && YTPlayer.canPlayOnMobile) {
                                    if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                                        YTPlayer.opt.containment.css({
                                            maxWidth: "100%"
                                        });
                                        var h = .563 * YTPlayer.opt.containment.outerWidth();
                                        YTPlayer.opt.containment.css({
                                            maxHeight: h
                                        })
                                    }
                                    return void new YT.Player(playerID, {
                                        videoId: YTPlayer.videoID.toString(),
                                        width: "100%",
                                        height: h,
                                        playerVars: playerVars,
                                        events: {
                                            onReady: function(a) {
                                                YTPlayer.player = a.target, playerBox.css({
                                                    opacity: 1
                                                }), YTPlayer.wrapper.css({
                                                    opacity: 1
                                                })
                                            }
                                        }
                                    })
                                }
                                new YT.Player(playerID, {
                                    videoId: YTPlayer.videoID.toString(),
                                    playerVars: playerVars,
                                    events: {
                                        onReady: function(a) {
                                            YTPlayer.player = a.target, YTPlayer.isReady || (YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? !1 : !0, YTPlayer.playerEl = YTPlayer.player.getIframe(), jQuery(YTPlayer.playerEl).unselectable(), $YTPlayer.optimizeDisplay(), jQuery(window).off("resize.YTP_" + YTPlayer.id).on("resize.YTP_" + YTPlayer.id, function() {
                                                $YTPlayer.optimizeDisplay()
                                            }), YTPlayer.opt.remember_last_time && jQuery(window).on("unload.YTP_" + YTPlayer.id, function() {
                                                var a = YTPlayer.player.getCurrentTime();
                                                jQuery.mbCookie.set("YTPlayer_" + YTPlayer.videoID, a, 1)
                                            }), jQuery.mbYTPlayer.checkForState(YTPlayer))
                                        },
                                        onStateChange: function(event) {
                                            if ("function" == typeof event.target.getPlayerState) {
                                                var state = event.target.getPlayerState();
                                                if (YTPlayer.preventTrigger) return void(YTPlayer.preventTrigger = !1);
                                                YTPlayer.state = state;
                                                var eventType;
                                                switch (state) {
                                                    case -1:
                                                        eventType = "YTPUnstarted";
                                                        break;
                                                    case 0:
                                                        eventType = "YTPEnd";
                                                        break;
                                                    case 1:
                                                        eventType = "YTPPlay", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString());
                                                        break;
                                                    case 2:
                                                        eventType = "YTPPause", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                        break;
                                                    case 3:
                                                        YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                        break;
                                                    case 5:
                                                        eventType = "YTPCued"
                                                }
                                                var YTPEvent = jQuery.Event(eventType);
                                                YTPEvent.time = YTPlayer.currentTime, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPEvent)
                                            }
                                        },
                                        onPlaybackQualityChange: function(a) {
                                            var b = a.target.getPlaybackQuality(),
                                                c = jQuery.Event("YTPQualityChange");
                                            c.quality = b, jQuery(YTPlayer).trigger(c)
                                        },
                                        onError: function(a) {
                                            150 == a.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == a.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, a)
                                        }
                                    }
                                })
                            }
                        }))
                    }), $YTPlayer.off("YTPTime.mask"), jQuery.mbYTPlayer.applyMask(YTPlayer)
                }
            })
        },
        getDataFromAPI: function(a) {
            if (a.videoData = jQuery.mbStorage.get("YTPlayer_data_" + a.videoID), jQuery(a).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function() {
                    if (a.hasData && a.isPlayer && !a.opt.autoPlay) {
                        var b = a.videoData.thumb_max || a.videoData.thumb_high || a.videoData.thumb_medium;
                        a.opt.containment.css({
                            background: "rgba(0,0,0,0.5) url(" + b + ") center center",
                            backgroundSize: "cover"
                        }), a.opt.backgroundUrl = b
                    }
                }), a.videoData) setTimeout(function() {
                a.opt.ratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio, a.dataReceived = !0, jQuery(a).trigger("YTPChanged");
                var b = jQuery.Event("YTPData");
                b.prop = {};
                for (var c in a.videoData) b.prop[c] = a.videoData[c];
                jQuery(a).trigger(b)
            }, a.opt.fadeOnStartTime), a.hasData = !0;
            else if (jQuery.mbYTPlayer.apiKey) jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + a.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function(b) {
                function c(b) {
                    a.videoData = {}, a.videoData.id = a.videoID, a.videoData.channelTitle = b.channelTitle, a.videoData.title = b.title, a.videoData.description = b.description.length < 400 ? b.description : b.description.substring(0, 400) + " ...", a.videoData.aspectratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio, a.opt.ratio = a.videoData.aspectratio, a.videoData.thumb_max = b.thumbnails.maxres ? b.thumbnails.maxres.url : null, a.videoData.thumb_high = b.thumbnails.high ? b.thumbnails.high.url : null, a.videoData.thumb_medium = b.thumbnails.medium ? b.thumbnails.medium.url : null, jQuery.mbStorage.set("YTPlayer_data_" + a.videoID, a.videoData)
                }
                a.dataReceived = !0, jQuery(a).trigger("YTPChanged"), c(b.items[0].snippet), a.hasData = !0;
                var d = jQuery.Event("YTPData");
                d.prop = {};
                for (var e in a.videoData) d.prop[e] = a.videoData[e];
                jQuery(a).trigger(d)
            });
            else {
                if (setTimeout(function() {
                        jQuery(a).trigger("YTPChanged")
                    }, 50), a.isPlayer && !a.opt.autoPlay) {
                    var b = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + a.videoID + "/hqdefault.jpg";
                    b && a.opt.containment.css({
                        background: "rgba(0,0,0,0.5) url(" + b + ") center center",
                        backgroundSize: "cover"
                    }), a.opt.backgroundUrl = b
                }
                a.videoData = null, a.opt.ratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio
            }!a.isPlayer || a.opt.autoPlay || jQuery.browser.mobile || (a.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(a).append(a.loading), a.loading.fadeIn())
        },
        removeStoredData: function() {
            jQuery.mbStorage.remove()
        },
        getVideoData: function() {
            var a = this.get(0);
            return a.videoData
        },
        getVideoID: function() {
            var a = this.get(0);
            return a.videoID || !1
        },
        setVideoQuality: function(a) {
            var b = this.get(0);
            b.player.setPlaybackQuality(a)
        },
        playlist: function(a, b, c, d) {
            var e = this,
                f = e.get(0);
            return f.isPlayList = !0, b && (a = jQuery.shuffle(a)), f.videoID || (f.videos = a, f.videoCounter = 0, f.videoLength = a.length, jQuery(f).data("property", a[0]), jQuery(f).mb_YTPlayer()), "function" == typeof c && jQuery(f).one("YTPChanged", function() {
                c(f)
            }), jQuery(f).on("YTPEnd", function() {
                d = "undefined" == typeof d ? !0 : d, jQuery(f).playNext(d)
            }), this
        },
        playNext: function(a) {
            var b = this.get(0);
            return b.checkForStartAt && (clearTimeout(b.checkForStartAt), clearInterval(b.getState)), b.videoCounter++, b.videoCounter >= b.videoLength && a && (b.videoCounter = 0), b.videoCounter < b.videoLength ? jQuery(b).YTPChangeMovie(b.videos[b.videoCounter]) : b.videoCounter--, this
        },
        playPrev: function() {
            var a = this.get(0);
            return a.checkForStartAt && (clearInterval(a.checkForStartAt), clearInterval(a.getState)), a.videoCounter--, a.videoCounter < 0 && (a.videoCounter = a.videoLength - 1), jQuery(a).YTPChangeMovie(a.videos[a.videoCounter]), this
        },
        playIndex: function(a) {
            var b = this.get(0);
            return a -= 1, b.checkForStartAt && (clearInterval(b.checkForStartAt), clearInterval(b.getState)), b.videoCounter = a, b.videoCounter >= b.videoLength - 1 && (b.videoCounter = b.videoLength - 1), jQuery(b).YTPChangeMovie(b.videos[b.videoCounter]), this
        },
        changeMovie: function(a) {
            var b = this,
                c = b.get(0);
            c.opt.startAt = 0, c.opt.stopAt = 0, c.opt.mask = !1, c.opt.mute = !0, c.hasData = !1, c.hasChanged = !0, c.player.loopTime = void 0, a && jQuery.extend(c.opt, a), c.videoID = getYTPVideoID(c.opt.videoURL).videoID, "true" == c.opt.loop && (c.opt.loop = 9999), jQuery(c.playerEl).CSSAnimate({
                opacity: 0
            }, c.opt.fadeOnStartTime, function() {
                var a = jQuery.Event("YTPChangeMovie");
                a.time = c.currentTime, a.videoId = c.videoID, jQuery(c).trigger(a), jQuery(c).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + c.videoID), 1, c.opt.quality), jQuery(c).optimizeDisplay(), jQuery.mbYTPlayer.checkForState(c), jQuery.mbYTPlayer.getDataFromAPI(c)
            }), jQuery.mbYTPlayer.applyMask(c)
        },
        getPlayer: function() {
            return jQuery(this).get(0).player
        },
        playerDestroy: function() {
            var a = this.get(0);
            ytp.YTAPIReady = !0, ytp.backgroundIsInited = !1, a.isInit = !1, a.videoID = null, a.isReady = !1;
            var b = a.wrapper;
            return b.remove(), jQuery("#controlBar_" + a.id).remove(), clearInterval(a.checkForStartAt), clearInterval(a.getState), this
        },
        fullscreen: function(real) {
            function hideMouse() {
                YTPlayer.overlay.css({
                    cursor: "none"
                })
            }

            function RunPrefixMethod(a, b) {
                for (var c, d, e = ["webkit", "moz", "ms", "o", ""], f = 0; f < e.length && !a[c];) {
                    if (c = b, "" == e[f] && (c = c.substr(0, 1).toLowerCase() + c.substr(1)), c = e[f] + c, d = typeof a[c], "undefined" != d) return e = [e[f]], "function" == d ? a[c]() : a[c];
                    f++
                }
            }

            function launchFullscreen(a) {
                RunPrefixMethod(a, "RequestFullScreen")
            }

            function cancelFullscreen() {
                (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
            }
            var YTPlayer = this.get(0);
            "undefined" == typeof real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
            var controls = jQuery("#controlBar_" + YTPlayer.id),
                fullScreenBtn = controls.find(".mb_OnlyYT"),
                videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
            if (real) {
                var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(fullscreenchange).on(fullscreenchange, function() {
                    var a = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
                    a ? (jQuery(YTPlayer).YTPSetVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("YTPFullscreen"), videoWrapper.CSSAnimate({
                        opacity: YTPlayer.opt.opacity
                    }, YTPlayer.opt.fadeOnStartTime), videoWrapper.css({
                        zIndex: 0
                    }), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
                })
            }
            return YTPlayer.isAlone ? (jQuery(document).off("mousemove.YTPlayer"), clearTimeout(YTPlayer.hideCursor), YTPlayer.overlay.css({
                cursor: "auto"
            }), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({
                opacity: YTPlayer.opt.opacity
            }, YTPlayer.opt.fadeOnStartTime), videoWrapper.css({
                zIndex: 0
            })), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (jQuery(document).on("mousemove.YTPlayer", function(a) {
                YTPlayer.overlay.css({
                    cursor: "auto"
                }), clearTimeout(YTPlayer.hideCursor), jQuery(a.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
            }), hideMouse(), real ? (videoWrapper.css({
                opacity: 0
            }), videoWrapper.addClass("YTPFullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function() {
                videoWrapper.CSSAnimate({
                    opacity: 1
                }, 2 * YTPlayer.opt.fadeOnStartTime), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
            }, YTPlayer.opt.fadeOnStartTime)) : videoWrapper.css({
                zIndex: 1e4
            }).CSSAnimate({
                opacity: 1
            }, 2 * YTPlayer.opt.fadeOnStartTime), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0), this
        },
        toggleLoops: function() {
            var a = this.get(0),
                b = a.opt;
            return 1 == b.loop ? b.loop = 0 : (b.startAt ? a.player.seekTo(b.startAt) : a.player.playVideo(), b.loop = 1), this
        },
        play: function() {
            var a = this.get(0);
            if (!a.isReady) return this;
            a.player.playVideo(), a.wrapper.CSSAnimate({
                opacity: a.isAlone ? 1 : a.opt.opacity
            }, 4 * a.opt.fadeOnStartTime), jQuery(a.playerEl).CSSAnimate({
                opacity: 1
            }, 2 * a.opt.fadeOnStartTime);
            var b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPPlaypause");
            return c.html(jQuery.mbYTPlayer.controls.pause), a.state = 1, a.orig_background = jQuery(a).css("background-image"), this
        },
        togglePlay: function(a) {
            var b = this.get(0);
            return 1 == b.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof a && a(b.state), this
        },
        stop: function() {
            var a = this.get(0),
                b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPPlaypause");
            return c.html(jQuery.mbYTPlayer.controls.play), a.player.stopVideo(), this
        },
        pause: function() {
            var a = this.get(0);
            return a.player.pauseVideo(), a.state = 2, this
        },
        seekTo: function(a) {
            var b = this.get(0);
            return b.player.seekTo(a, !0), this
        },
        setVolume: function(a) {
            var b = this.get(0);
            return a || b.opt.vol || 0 != b.player.getVolume() ? !a && b.player.getVolume() > 0 || a && b.opt.vol == a ? b.isMute ? jQuery(b).YTPUnmute() : jQuery(b).YTPMute() : (b.opt.vol = a, b.player.setVolume(b.opt.vol), b.volumeBar && b.volumeBar.length && b.volumeBar.updateSliderVal(a)) : jQuery(b).YTPUnmute(), this
        },
        toggleVolume: function() {
            var a = this.get(0);
            if (a) return a.player.isMuted() ? (jQuery(a).YTPUnmute(), !0) : (jQuery(a).YTPMute(), !1)
        },
        mute: function() {
            var a = this.get(0);
            if (!a.isMute) {
                a.player.mute(), a.isMute = !0, a.player.setVolume(0), a.volumeBar && a.volumeBar.length && a.volumeBar.width() > 10 && a.volumeBar.updateSliderVal(0);
                var b = jQuery("#controlBar_" + a.id),
                    c = b.find(".mb_YTPMuteUnmute");
                c.html(jQuery.mbYTPlayer.controls.unmute), jQuery(a).addClass("isMuted"), a.volumeBar && a.volumeBar.length && a.volumeBar.addClass("muted");
                var d = jQuery.Event("YTPMuted");
                return d.time = a.currentTime, a.canTrigger && jQuery(a).trigger(d), this
            }
        },
        unmute: function() {
            var a = this.get(0);
            if (a.isMute) {
                a.player.unMute(), a.isMute = !1, a.player.setVolume(a.opt.vol), a.volumeBar && a.volumeBar.length && a.volumeBar.updateSliderVal(a.opt.vol > 10 ? a.opt.vol : 10);
                var b = jQuery("#controlBar_" + a.id),
                    c = b.find(".mb_YTPMuteUnmute");
                c.html(jQuery.mbYTPlayer.controls.mute), jQuery(a).removeClass("isMuted"), a.volumeBar && a.volumeBar.length && a.volumeBar.removeClass("muted");
                var d = jQuery.Event("YTPUnmuted");
                return d.time = a.currentTime, a.canTrigger && jQuery(a).trigger(d), this
            }
        },
        applyFilter: function(a, b) {
            return this.each(function() {
                var c = this;
                c.filters[a].value = b, c.filtersEnabled && jQuery(c).YTPEnableFilters()
            })
        },
        applyFilters: function(a) {
            return this.each(function() {
                var b = this;
                if (!b.isReady) return void jQuery(b).on("YTPReady", function() {
                    jQuery(b).YTPApplyFilters(a)
                });
                for (var c in a) jQuery(b).YTPApplyFilter(c, a[c]);
                jQuery(b).trigger("YTPFiltersApplied")
            })
        },
        toggleFilter: function(a, b) {
            return this.each(function() {
                var c = this;
                c.filters[a].value ? c.filters[a].value = 0 : c.filters[a].value = b, c.filtersEnabled && jQuery(this).YTPEnableFilters()
            })
        },
        toggleFilters: function(a) {
            return this.each(function() {
                var b = this;
                b.filtersEnabled ? (jQuery(b).trigger("YTPDisableFilters"), jQuery(b).YTPDisableFilters()) : (jQuery(b).YTPEnableFilters(), jQuery(b).trigger("YTPEnableFilters")), "function" == typeof a && a(b.filtersEnabled)
            })
        },
        disableFilters: function() {
            return this.each(function() {
                var a = this,
                    b = jQuery(a.playerEl);
                b.css("-webkit-filter", ""), b.css("filter", ""), a.filtersEnabled = !1
            })
        },
        enableFilters: function() {
            return this.each(function() {
                var a = this,
                    b = jQuery(a.playerEl),
                    c = "";
                for (var d in a.filters) a.filters[d].value && (c += d.replace("_", "-") + "(" + a.filters[d].value + a.filters[d].unit + ") ");
                b.css("-webkit-filter", c), b.css("filter", c), a.filtersEnabled = !0
            })
        },
        removeFilter: function(a, b) {
            return this.each(function() {
                var c = this;
                if ("function" == typeof a && (b = a, a = null), a) jQuery(this).YTPApplyFilter(a, 0), "function" == typeof b && b(a);
                else
                    for (var d in c.filters) jQuery(this).YTPApplyFilter(d, 0), "function" == typeof b && b(d)
            })
        },
        getFilters: function() {
            var a = this.get(0);
            return a.filters
        },
        addMask: function(a) {
            var b = this.get(0),
                c = b.overlay;
            a || (a = b.actualMask);
            var d = jQuery("<img/>").attr("src", a).on("load", function() {
                c.CSSAnimate({
                    opacity: 0
                }, b.opt.fadeOnStartTime, function() {
                    b.hasMask = !0, d.remove(), c.css({
                        backgroundImage: "url(" + a + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover"
                    }), c.CSSAnimate({
                        opacity: 1
                    }, b.opt.fadeOnStartTime)
                })
            });
            return this
        },
        removeMask: function() {
            var a = this.get(0),
                b = a.overlay;
            return b.CSSAnimate({
                opacity: 0
            }, a.opt.fadeOnStartTime, function() {
                a.hasMask = !1, b.css({
                    backgroundImage: "",
                    backgroundRepeat: "",
                    backgroundPosition: "",
                    backgroundSize: ""
                }), b.CSSAnimate({
                    opacity: 1
                }, a.opt.fadeOnStartTime)
            }), this
        },
        applyMask: function(a) {
            var b = jQuery(a);
            if (b.off("YTPTime.mask"), a.opt.mask)
                if ("string" == typeof a.opt.mask) b.YTPAddMask(a.opt.mask), a.actualMask = a.opt.mask;
                else if ("object" == typeof a.opt.mask) {
                for (var c in a.opt.mask)
                    if (a.opt.mask[c]) {
                        jQuery("<img/>").attr("src", a.opt.mask[c])
                    }
                a.opt.mask[0] && b.YTPAddMask(a.opt.mask[0]), b.on("YTPTime.mask", function(c) {
                    for (var d in a.opt.mask) c.time == d && (a.opt.mask[d] ? (b.YTPAddMask(a.opt.mask[d]), a.actualMask = a.opt.mask[d]) : b.YTPRemoveMask())
                })
            }
        },
        toggleMask: function() {
            var a = this.get(0),
                b = $(a);
            return a.hasMask ? b.YTPRemoveMask() : b.YTPAddMask(), this
        },
        manageProgress: function() {
            var a = this.get(0),
                b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPProgress"),
                d = b.find(".mb_YTPLoaded"),
                e = b.find(".mb_YTPseekbar"),
                f = c.outerWidth(),
                g = Math.floor(a.player.getCurrentTime()),
                h = Math.floor(a.player.getDuration()),
                i = g * f / h,
                j = 0,
                k = 100 * a.player.getVideoLoadedFraction();
            return d.css({
                left: j,
                width: k + "%"
            }), e.css({
                left: 0,
                width: i
            }), {
                totalTime: h,
                currentTime: g
            }
        },
        buildControls: function(YTPlayer) {
            var data = YTPlayer.opt;
            if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
                YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
                    whiteSpace: "noWrap",
                    position: YTPlayer.isBackground ? "fixed" : "absolute",
                    zIndex: YTPlayer.isBackground ? 1e4 : 1e3
                }).hide();
                var buttonBar = jQuery("<div/>").addClass("buttonBar"),
                    playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function() {
                        1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).YTPPause() : jQuery(YTPlayer).YTPPlay()
                    }),
                    MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function() {
                        0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).YTPUnmute() : jQuery(YTPlayer).YTPMute()
                    }),
                    volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({
                        display: "inline-block"
                    });
                YTPlayer.volumeBar = volumeBar;
                var idx = jQuery("<span/>").addClass("mb_YTPTime"),
                    vURL = data.videoURL ? data.videoURL : "";
                vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
                var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function() {
                        window.open(vURL, "viewOnYT")
                    }),
                    onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function() {
                        jQuery(YTPlayer).YTPFullscreen(data.realfullscreen)
                    }),
                    progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function(a) {
                        timeBar.css({
                            width: a.clientX - timeBar.offset().left
                        }), YTPlayer.timeW = a.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({
                            width: 0
                        });
                        var b = Math.floor(YTPlayer.player.getDuration());
                        YTPlayer["goto"] = timeBar.outerWidth() * b / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer["goto"]), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({
                            width: 0
                        })
                    }),
                    loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
                    timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
                progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
                    initialval: YTPlayer.opt.vol,
                    scale: 100,
                    orientation: "h",
                    callback: function(a) {
                        0 == a.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(a.value), YTPlayer.isMute || (YTPlayer.opt.vol = a.value)
                    }
                })
            }
        },
        checkForState: function(YTPlayer) {
            var interval = YTPlayer.opt.showControls ? 100 : 400;
            return clearInterval(YTPlayer.getState), jQuery.contains(document, YTPlayer) ? (jQuery.mbYTPlayer.checkForStart(YTPlayer), void(YTPlayer.getState = setInterval(function() {
                var prog = jQuery(YTPlayer).YTPManageProgress(),
                    $YTPlayer = jQuery(YTPlayer),
                    data = YTPlayer.opt,
                    startAt = YTPlayer.opt.startAt ? YTPlayer.start_from_last ? YTPlayer.start_from_last : YTPlayer.opt.startAt : 1;
                YTPlayer.start_from_last = null;
                var stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.currentTime != prog.currentTime) {
                    var YTPEvent = jQuery.Event("YTPTime");
                    YTPEvent.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(YTPEvent)
                }
                if (YTPlayer.currentTime = prog.currentTime, YTPlayer.totalTime = YTPlayer.player.getDuration(), 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.YTPPause())), YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - .5) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
                    if (YTPlayer.isEnded) return;
                    if (YTPlayer.isEnded = !0, setTimeout(function() {
                            YTPlayer.isEnded = !1
                        }, 1e3), YTPlayer.isPlayList) {
                        if (!data.loop || data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1) {
                            YTPlayer.player.loopTime = void 0, clearInterval(YTPlayer.getState);
                            var YTPEnd = jQuery.Event("YTPEnd");
                            return YTPEnd.time = YTPlayer.currentTime, void jQuery(YTPlayer).trigger(YTPEnd)
                        }
                    } else if (!data.loop || data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1) return YTPlayer.player.loopTime = void 0, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, jQuery(YTPlayer).YTPPause(), void YTPlayer.wrapper.CSSAnimate({
                        opacity: 0
                    }, YTPlayer.opt.fadeOnStartTime, function() {
                        YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                        var a = jQuery.Event("YTPEnd");
                        a.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(a), YTPlayer.player.seekTo(startAt, !0), YTPlayer.isBackground ? YTPlayer.orig_background && jQuery(YTPlayer).css("background-image", YTPlayer.orig_background) : YTPlayer.opt.backgroundUrl && YTPlayer.isPlayer && (YTPlayer.opt.backgroundUrl = YTPlayer.opt.backgroundUrl || YTPlayer.orig_background, YTPlayer.opt.containment.css({
                            background: "url(" + YTPlayer.opt.backgroundUrl + ") center center",
                            backgroundSize: "cover"
                        }))
                    });
                    YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1, startAt = startAt || 1, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, jQuery(YTPlayer).YTPPause(), YTPlayer.player.seekTo(startAt, !0), $YTPlayer.YTPPlay()
                }
            }, interval))) : (jQuery(YTPlayer).YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt))
        },
        getTime: function() {
            var a = this.get(0);
            return jQuery.mbYTPlayer.formatTime(a.currentTime)
        },
        getTotalTime: function() {
            var a = this.get(0);
            return jQuery.mbYTPlayer.formatTime(a.totalTime)
        },
        checkForStart: function(a) {
            var b = jQuery(a);
            if (!jQuery.contains(document, a)) return void jQuery(a).YTPPlayerDestroy();
            if (a.preventTrigger = !0, a.state = 2, jQuery(a).YTPPause(), jQuery(a).muteYTPVolume(), jQuery("#controlBar_" + a.id).remove(), a.controlBar = !1, a.opt.showControls && jQuery.mbYTPlayer.buildControls(a), a.opt.addRaster) {
                var c = "dot" == a.opt.addRaster ? "raster-dot" : "raster";
                a.overlay.addClass(a.isRetina ? c + " retina" : c)
            } else a.overlay.removeClass(function(a, b) {
                var c = b.split(" "),
                    d = [];
                return jQuery.each(c, function(a, b) {
                    /raster.*/.test(b) && d.push(b)
                }), d.push("retina"), d.join(" ")
            });
            var d = a.opt.startAt ? a.start_from_last ? a.start_from_last : a.opt.startAt : 1;
            a.start_from_last = null, a.player.playVideo(), a.player.seekTo(d, !0), a.checkForStartAt = setInterval(function() {
                jQuery(a).YTPMute();
                var c = a.player.getVideoLoadedFraction() >= d / a.player.getDuration();
                if (a.player.getDuration() > 0 && a.player.getCurrentTime() >= d && c) {
                    clearInterval(a.checkForStartAt), "function" == typeof a.opt.onReady && a.opt.onReady(a), a.isReady = !0;
                    var e = jQuery.Event("YTPReady");
                    if (e.time = a.currentTime, jQuery(a).trigger(e), a.preventTrigger = !0, a.state = 2, jQuery(a).YTPPause(), a.opt.mute || jQuery(a).YTPUnmute(), a.canTrigger = !0, a.opt.autoPlay) {
                        var f = jQuery.Event("YTPStart");
                        f.time = a.currentTime, jQuery(a).trigger(f), jQuery(a.playerEl).CSSAnimate({
                            opacity: 1
                        }, 1e3), b.YTPPlay(), a.wrapper.CSSAnimate({
                            opacity: a.isAlone ? 1 : a.opt.opacity
                        }, 2 * a.opt.fadeOnStartTime), "mac" == jQuery.browser.os.name && jQuery.browser.safari && jQuery.browser.versionCompare(jQuery.browser.fullVersion, "10.1") < 0 && (a.safariPlay = setInterval(function() {
                            1 != a.state ? b.YTPPlay() : clearInterval(a.safariPlay)
                        }, 10)), b.one("YTPReady", function() {
                            b.YTPPlay()
                        })
                    } else a.player.pauseVideo(), a.isPlayer || (jQuery(a.playerEl).CSSAnimate({
                        opacity: 1
                    }, a.opt.fadeOnStartTime), a.wrapper.CSSAnimate({
                        opacity: a.isAlone ? 1 : a.opt.opacity
                    }, a.opt.fadeOnStartTime)), a.controlBar.length && a.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                    a.isPlayer && !a.opt.autoPlay && a.loading && a.loading.length && (a.loading.html("Ready"), setTimeout(function() {
                        a.loading.fadeOut()
                    }, 100)), a.controlBar && a.controlBar.length && a.controlBar.slideDown(1e3)
                } else "mac" == jQuery.browser.os.name && jQuery.browser.safari && jQuery.browser.fullVersion && jQuery.browser.versionCompare(jQuery.browser.fullVersion, "10.1") < 0 && (a.player.playVideo(), d >= 0 && a.player.seekTo(d, !0))
            }, 10)
        },
        setAnchor: function(a) {
            var b = this;
            b.optimizeDisplay(a)
        },
        getAnchor: function() {
            var a = this.get(0);
            return a.opt.anchor
        },
        formatTime: function(a) {
            var b = Math.floor(a / 60),
                c = Math.floor(a - 60 * b);
            return (9 >= b ? "0" + b : b) + " : " + (9 >= c ? "0" + c : c)
        }
    }, jQuery.fn.optimizeDisplay = function(anchor) {
        var YTPlayer = this.get(0),
            playerBox = jQuery(YTPlayer.playerEl),
            vid = {};
        YTPlayer.opt.anchor = anchor || YTPlayer.opt.anchor, YTPlayer.opt.anchor = "undefined " != typeof YTPlayer.opt.anchor ? YTPlayer.opt.anchor : "center,center";
        var YTPAlign = YTPlayer.opt.anchor.split(",");
        if (YTPlayer.opt.optimizeDisplay) {
            var abundance = YTPlayer.isPlayer ? 0 : 80,
                win = {},
                el = YTPlayer.wrapper;
            win.width = el.outerWidth(), win.height = el.outerHeight() + abundance, YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio), vid.width = win.width, vid.height = Math.ceil(vid.width / YTPlayer.opt.ratio), vid.marginTop = Math.ceil(-((vid.height - win.height) / 2)), vid.marginLeft = 0;
            var lowest = vid.height < win.height;
            lowest && (vid.height = win.height, vid.width = Math.ceil(vid.height * YTPlayer.opt.ratio), vid.marginTop = 0, vid.marginLeft = Math.ceil(-((vid.width - win.width) / 2)));
            for (var a in YTPAlign)
                if (YTPAlign.hasOwnProperty(a)) {
                    var al = YTPAlign[a].replace(/ /g, "");
                    switch (al) {
                        case "top":
                            vid.marginTop = lowest ? -((vid.height - win.height) / 2) : 0;
                            break;
                        case "bottom":
                            vid.marginTop = lowest ? 0 : -(vid.height - win.height);
                            break;
                        case "left":
                            vid.marginLeft = 0;
                            break;
                        case "right":
                            vid.marginLeft = lowest ? -(vid.width - win.width) : 0;
                            break;
                        default:
                            vid.width > win.width && (vid.marginLeft = -((vid.width - win.width) / 2))
                    }
                }
        } else vid.width = "100%", vid.height = "100%", vid.marginTop = 0, vid.marginLeft = 0;
        playerBox.css({
            width: vid.width,
            height: vid.height,
            marginTop: vid.marginTop,
            marginLeft: vid.marginLeft,
            maxWidth: "initial"
        })
    }, jQuery.shuffle = function(a) {
        for (var b = a.slice(), c = b.length, d = c; d--;) {
            var e = parseInt(Math.random() * c),
                f = b[d];
            b[d] = b[e], b[e] = f
        }
        return b
    }, jQuery.fn.unselectable = function() {
        return this.each(function() {
            jQuery(this).css({
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "user-select": "none"
            }).attr("unselectable", "on")
        })
    }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters, jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime, jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime, jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask, jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask, jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask, jQuery.fn.YTPSetAnchor = jQuery.mbYTPlayer.setAnchor, jQuery.fn.YTPGetAnchor = jQuery.mbYTPlayer.getAnchor, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.play, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData
}(jQuery, ytp), jQuery.support.CSStransition = function() {
    var a = document.body || document.documentElement,
        b = a.style;
    return void 0 !== b.transition || void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.MsTransition || void 0 !== b.OTransition
}(), jQuery.CSS = {
    name: "mb.CSSAnimate",
    author: "Matteo Bicocchi",
    version: "2.0.0",
    transitionEnd: "transitionEnd",
    sfx: "",
    filters: {
        blur: {
            min: 0,
            max: 100,
            unit: "px"
        },
        brightness: {
            min: 0,
            max: 400,
            unit: "%"
        },
        contrast: {
            min: 0,
            max: 400,
            unit: "%"
        },
        grayscale: {
            min: 0,
            max: 100,
            unit: "%"
        },
        hueRotate: {
            min: 0,
            max: 360,
            unit: "deg"
        },
        invert: {
            min: 0,
            max: 100,
            unit: "%"
        },
        saturate: {
            min: 0,
            max: 400,
            unit: "%"
        },
        sepia: {
            min: 0,
            max: 100,
            unit: "%"
        }
    },
    normalizeCss: function(a) {
        var b = jQuery.extend(!0, {}, a);
        jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-");
        for (var c in b) {
            "transform" === c && (b[jQuery.CSS.sfx + "transform"] = b[c], delete b[c]), "transform-origin" === c && (b[jQuery.CSS.sfx + "transform-origin"] = a[c], delete b[c]), "filter" !== c || jQuery.browser.mozilla || (b[jQuery.CSS.sfx + "filter"] = a[c], delete b[c]), "blur" === c && setFilter(b, "blur", a[c]), "brightness" === c && setFilter(b, "brightness", a[c]), "contrast" === c && setFilter(b, "contrast", a[c]), "grayscale" === c && setFilter(b, "grayscale", a[c]), "hueRotate" === c && setFilter(b, "hueRotate", a[c]), "invert" === c && setFilter(b, "invert", a[c]), "saturate" === c && setFilter(b, "saturate", a[c]), "sepia" === c && setFilter(b, "sepia", a[c]);
            var d = "";
            "x" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateX(" + setUnit(a[c], "px") + ")", delete b[c]), "y" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateY(" + setUnit(a[c], "px") + ")", delete b[c]), "z" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateZ(" + setUnit(a[c], "px") + ")", delete b[c]), "rotate" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotate(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateX(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateY(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateZ" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateZ(" + setUnit(a[c], "deg") + ")", delete b[c]), "scale" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scale(" + setUnit(a[c], "") + ")", delete b[c]), "scaleX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleX(" + setUnit(a[c], "") + ")", delete b[c]), "scaleY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleY(" + setUnit(a[c], "") + ")", delete b[c]), "scaleZ" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleZ(" + setUnit(a[c], "") + ")", delete b[c]), "skew" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skew(" + setUnit(a[c], "deg") + ")", delete b[c]), "skewX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skewX(" + setUnit(a[c], "deg") + ")", delete b[c]), "skewY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skewY(" + setUnit(a[c], "deg") + ")", delete b[c]), "perspective" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " perspective(" + setUnit(a[c], "px") + ")", delete b[c])
        }
        return b
    },
    getProp: function(a) {
        var b = [];
        for (var c in a) b.indexOf(c) < 0 && b.push(uncamel(c));
        return b.join(",")
    },
    animate: function(a, b, c, d, e) {
        return this.each(function() {
            function f() {
                g.called = !0, g.CSSAIsRunning = !1, h.off(jQuery.CSS.transitionEnd + "." + g.id), clearTimeout(g.timeout), h.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof e && e.apply(g), "function" == typeof g.CSSqueue && (g.CSSqueue(), g.CSSqueue = null)
            }
            var g = this,
                h = jQuery(this);
            g.id = g.id || "CSSA_" + (new Date).getTime();
            var i = i || {
                type: "noEvent"
            };
            if (g.CSSAIsRunning && g.eventType == i.type && !jQuery.browser.msie && jQuery.browser.version <= 9) return void(g.CSSqueue = function() {
                h.CSSAnimate(a, b, c, d, e)
            });
            if (g.CSSqueue = null, g.eventType = i.type, 0 !== h.length && a) {
                if (a = jQuery.normalizeCss(a), g.CSSAIsRunning = !0, "function" == typeof b && (e = b, b = jQuery.fx.speeds._default), "function" == typeof c && (d = c, c = 0), "string" == typeof c && (e = c, c = 0), "function" == typeof d && (e = d, d = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof b)
                    for (var j in jQuery.fx.speeds) {
                        if (b == j) {
                            b = jQuery.fx.speeds[j];
                            break
                        }
                        b = jQuery.fx.speeds._default
                    }
                if (b || (b = jQuery.fx.speeds._default), "string" == typeof e && (d = e, e = null), !jQuery.support.CSStransition) {
                    for (var k in a) {
                        if ("transform" === k && delete a[k], "filter" === k && delete a[k], "transform-origin" === k && delete a[k], "auto" === a[k] && delete a[k], "x" === k) {
                            var l = a[k],
                                m = "left";
                            a[m] = l, delete a[k]
                        }
                        if ("y" === k) {
                            var l = a[k],
                                m = "top";
                            a[m] = l, delete a[k]
                        }("-ms-transform" === k || "-ms-filter" === k) && delete a[k]
                    }
                    return void h.delay(c).animate(a, b, e)
                }
                var n = {
                    "default": "ease",
                    "in": "ease-in",
                    out: "ease-out",
                    "in-out": "ease-in-out",
                    snap: "cubic-bezier(0,1,.5,1)",
                    easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                    easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                    easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                    easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                    easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                    easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                    easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                    easeInOutExpo: "cubic-bezier(1,0,0,1)",
                    easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                    easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                    easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                    easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                    easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                    easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                    easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                    easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                    easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                    easeInSine: "cubic-bezier(.47,0,.745,.715)",
                    easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                    easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                    easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                    easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                    easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
                };
                n[d] && (d = n[d]), h.off(jQuery.CSS.transitionEnd + "." + g.id);
                var o = jQuery.CSS.getProp(a),
                    p = {};
                jQuery.extend(p, a), p[jQuery.CSS.sfx + "transition-property"] = o, p[jQuery.CSS.sfx + "transition-duration"] = b + "ms", p[jQuery.CSS.sfx + "transition-delay"] = c + "ms", p[jQuery.CSS.sfx + "transition-timing-function"] = d, setTimeout(function() {
                    h.one(jQuery.CSS.transitionEnd + "." + g.id, f), h.css(p)
                }, 1), g.timeout = setTimeout(function() {
                    return g.called || !e ? (g.called = !1, void(g.CSSAIsRunning = !1)) : (h.css(jQuery.CSS.sfx + "transition", ""), e.apply(g), g.CSSAIsRunning = !1, void("function" == typeof g.CSSqueue && (g.CSSqueue(), g.CSSqueue = null)))
                }, b + c + 10)
            }
        })
    }
}, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function(a) {
    return this.each(function() {
        var b = jQuery(this),
            c = jQuery.normalizeCss(a);
        b.css(c)
    })
};
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
    var isTouchSupported = function() {
        var a = nAgt.msMaxTouchPoints,
            b = "ontouchstart" in document.createElement("div");
        return a || b ? !0 : !1
    };
    jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.androidStock = !1, jQuery.browser.msie = !1, jQuery.browser.edge = !1;
    var getOS = function() {
        var a = {
            version: "Unknown version",
            name: "Unknown OS"
        };
        return -1 != navigator.appVersion.indexOf("Win") && (a.name = "Windows"), -1 == navigator.appVersion.indexOf("Mac") || navigator.appVersion.indexOf("Mobile") || (a.name = "Mac"), -1 != navigator.appVersion.indexOf("Linux") && (a.name = "Linux"), a.name = a.name.toLowerCase(), "mac" == a.name && (a.version = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1], a.version = a.version.replace(/_/g, ".").substring(0, 5)), "windows" == a.name && (a.version = "Unknown.Unknown"), /Windows NT 5.1/.test(nAgt) && (a.version = "5.1"), /Windows NT 6.0/.test(nAgt) && (a.version = "6.0"), /Windows NT 6.1/.test(nAgt) && (a.version = "6.1"), /Windows NT 6.2/.test(nAgt) && (a.version = "6.2"), /Windows NT 10.0/.test(nAgt) && (a.version = "10.0"), /Linux/.test(nAgt) && /Linux/.test(nAgt) && (a.version = "Unknown.Unknown"), a.major_version = "Unknown", a.minor_version = "Unknown", "Unknown.Unknown" != a.version && (a.major_version = parseFloat(a.version.split(".")[0]), a.minor_version = parseFloat(a.version.split(".")[1])), a
    };
    jQuery.browser.ua = nAgt, jQuery.browser.os = getOS(), jQuery.browser.hasTouch = isTouchSupported(), jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
    else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4);
    else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
    else if (-1 != nAgt.indexOf("Trident")) {
        jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
        var start = nAgt.indexOf("rv:") + 3,
            end = start + 4;
        jQuery.browser.fullVersion = nAgt.substring(start, end)
    } else -1 != (verOffset = nAgt.indexOf("Edge")) ? (jQuery.browser.edge = !0, jQuery.browser.name = "Microsoft Edge", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5)) : -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 < nAgt.indexOf("mozilla/5.0") && -1 < nAgt.indexOf("android ") && -1 < nAgt.indexOf("applewebkit") && !(-1 < nAgt.indexOf("chrome")) ? (verOffset = nAgt.indexOf("Chrome"), jQuery.browser.webkit = !0, jQuery.browser.androidStock = !0, jQuery.browser.name = "androidStock", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName)); - 1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion, jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && 765 < jQuery(window).width(), jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt)
}
jQuery.browser.versionCompare = function(a, b) {
        if ("stringstring" != typeof a + typeof b) return !1;
        for (var c = a.split("."), d = b.split("."), e = 0, f = Math.max(c.length, d.length); f > e; e++) {
            if (c[e] && !d[e] && 0 < parseInt(c[e]) || parseInt(c[e]) > parseInt(d[e])) return 1;
            if (d[e] && !c[e] && 0 < parseInt(d[e]) || parseInt(c[e]) < parseInt(d[e])) return -1
        }
        return 0
    },
    function(a) {
        a.simpleSlider = {
            defaults: {
                initialval: 0,
                scale: 100,
                orientation: "h",
                readonly: !1,
                callback: !1
            },
            events: {
                start: a.browser.mobile ? "touchstart" : "mousedown",
                end: a.browser.mobile ? "touchend" : "mouseup",
                move: a.browser.mobile ? "touchmove" : "mousemove"
            },
            init: function(b) {
                return this.each(function() {
                    var c = this,
                        d = a(c);
                    d.addClass("simpleSlider"), c.opt = {}, a.extend(c.opt, a.simpleSlider.defaults, b), a.extend(c.opt, d.data());
                    var e = "h" == c.opt.orientation ? "horizontal" : "vertical",
                        e = a("<div/>").addClass("level").addClass(e);
                    d.prepend(e), c.level = e, d.css({
                        cursor: "default"
                    }), "auto" == c.opt.scale && (c.opt.scale = a(c).outerWidth()), d.updateSliderVal(), c.opt.readonly || (d.on(a.simpleSlider.events.start, function(b) {
                        a.browser.mobile && (b = b.changedTouches[0]), c.canSlide = !0, d.updateSliderVal(b), "h" == c.opt.orientation ? d.css({
                            cursor: "col-resize"
                        }) : d.css({
                            cursor: "row-resize"
                        }), b.preventDefault(), b.stopPropagation()
                    }), a(document).on(a.simpleSlider.events.move, function(b) {
                        a.browser.mobile && (b = b.changedTouches[0]), c.canSlide && (a(document).css({
                            cursor: "default"
                        }), d.updateSliderVal(b), b.preventDefault(), b.stopPropagation())
                    }).on(a.simpleSlider.events.end, function() {
                        a(document).css({
                            cursor: "auto"
                        }), c.canSlide = !1, d.css({
                            cursor: "auto"
                        })
                    }))
                })
            },
            updateSliderVal: function(b) {
                var c = this.get(0);
                if (c.opt) {
                    c.opt.initialval = "number" == typeof c.opt.initialval ? c.opt.initialval : c.opt.initialval(c);
                    var d = a(c).outerWidth(),
                        e = a(c).outerHeight();
                    c.x = "object" == typeof b ? b.clientX + document.body.scrollLeft - this.offset().left : "number" == typeof b ? b * d / c.opt.scale : c.opt.initialval * d / c.opt.scale, c.y = "object" == typeof b ? b.clientY + document.body.scrollTop - this.offset().top : "number" == typeof b ? (c.opt.scale - c.opt.initialval - b) * e / c.opt.scale : c.opt.initialval * e / c.opt.scale, c.y = this.outerHeight() - c.y, c.scaleX = c.x * c.opt.scale / d, c.scaleY = c.y * c.opt.scale / e, c.outOfRangeX = c.scaleX > c.opt.scale ? c.scaleX - c.opt.scale : 0 > c.scaleX ? c.scaleX : 0, c.outOfRangeY = c.scaleY > c.opt.scale ? c.scaleY - c.opt.scale : 0 > c.scaleY ? c.scaleY : 0, c.outOfRange = "h" == c.opt.orientation ? c.outOfRangeX : c.outOfRangeY, c.value = "undefined" != typeof b ? "h" == c.opt.orientation ? c.x >= this.outerWidth() ? c.opt.scale : 0 >= c.x ? 0 : c.scaleX : c.y >= this.outerHeight() ? c.opt.scale : 0 >= c.y ? 0 : c.scaleY : "h" == c.opt.orientation ? c.scaleX : c.scaleY, "h" == c.opt.orientation ? c.level.width(Math.floor(100 * c.x / d) + "%") : c.level.height(Math.floor(100 * c.y / e)), "function" == typeof c.opt.callback && c.opt.callback(c)
                }
            }
        }, a.fn.simpleSlider = a.simpleSlider.init, a.fn.updateSliderVal = a.simpleSlider.updateSliderVal
    }(jQuery),
    function(a) {
        a.mbCookie = {
            set: function(a, b, c, d) {
                "object" == typeof b && (b = JSON.stringify(b)), c || (c = 7), d = d ? "; domain=" + d : "";
                var e = new Date;
                e.setTime(e.getTime() + 864e5 * c), c = "; expires=" + e.toGMTString(), document.cookie = a + "=" + b + c + "; path=/" + d
            },
            get: function(a) {
                a += "=";
                for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
                    for (var d = b[c];
                        " " == d.charAt(0);) d = d.substring(1, d.length);
                    if (0 == d.indexOf(a)) try {
                        return JSON.parse(d.substring(a.length, d.length))
                    } catch (e) {
                        return d.substring(a.length, d.length)
                    }
                }
                return null
            },
            remove: function(b) {
                a.mbCookie.set(b, "", -1)
            }
        }, a.mbStorage = {
            set: function(a, b) {
                "object" == typeof b && (b = JSON.stringify(b)), localStorage.setItem(a, b)
            },
            get: function(a) {
                if (!localStorage[a]) return null;
                try {
                    return JSON.parse(localStorage[a])
                } catch (b) {
                    return localStorage[a]
                }
            },
            remove: function(a) {
                a ? localStorage.removeItem(a) : localStorage.clear()
            }
        }
    }(jQuery);
/*
 *  Project: Scrolly : parallax is easy as a matter of fact !
 *  Description: Based on jQuery boilerplate
 *  Author: Victor C. / Octave & Octave web agency
 *  Licence: MIT
 */
! function(t, i) {
    "function" == typeof define && define.amd ? define(["jquery"], i) : i(t.jQuery)
}(this, function(t) {
    "use strict";

    function i(i, o) {
        this.element = i, this.$element = t(this.element), this.options = t.extend({}, e, o), this._defaults = e, this._name = s, this.init()
    }
    var s = "scrolly",
        e = {
            bgParallax: !1
        };
    i.prototype.init = function() {
        var i = this;
        this.startPosition = this.$element.position().top, this.offsetTop = this.$element.offset().top, this.height = this.$element.outerHeight(!0), this.velocity = this.$element.attr("data-velocity"), this.bgStart = parseInt(this.$element.attr("data-fit"), 10), t(document).scroll(function() {
            i.didScroll = !0
        }), setInterval(function() {
            i.didScroll && (i.didScroll = !1, i.scrolly())
        }, 10)
    }, i.prototype.scrolly = function() {
        var i = t(window).scrollTop(),
            s = t(window).height(),
            e = this.startPosition;
        this.offsetTop >= i + s ? this.$element.addClass("scrolly-invisible") : e = this.$element.hasClass("scrolly-invisible") ? this.startPosition + (i + (s - this.offsetTop)) * this.velocity : this.startPosition + i * this.velocity, this.bgStart && (e += this.bgStart), this.options.bgParallax === !0 ? this.$element.css({
            backgroundPositionY: e + "px"
        }) : this.$element.css({
            top: e
        })
    }, t.fn[s] = function(e) {
        return this.each(function() {
            t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new i(this, e))
        })
    }
});

/**
 * jQuery gMap - Google Maps API V3
 *
 * @license MIT License; http://www.opensource.org/licenses/mit-license.php
 * @url   http://github.com/marioestrada/jQuery-gMap
 * @author  Mario Estrada <me@mario.ec> based on original plugin by Cedric Kastner <cedric@nur-text.de>
 * @version 2.2
 */
/* global google */
! function(e) {
    e.fn.gMap = function(o, a) {
        switch (o) {
            case "addMarker":
                return e(this).trigger("gMap.addMarker", [a.latitude, a.longitude, a.content, a.icon, a.popup]);
            case "centerAt":
                return e(this).trigger("gMap.centerAt", [a.latitude, a.longitude, a.zoom]);
            case "clearMarkers":
                return e(this).trigger("gMap.clearMarkers")
        }
        var n = e.extend({}, e.fn.gMap.defaults, o);
        return this.each(function() {
            var o = new google.maps.Map(this);
            e(this).data("gMap.reference", o);
            var a = new google.maps.Geocoder;
            n.address ? a.geocode({
                address: n.address
            }, function(e) {
                e && e.length && o.setCenter(e[0].geometry.location)
            }) : n.latitude && n.longitude ? o.setCenter(new google.maps.LatLng(n.latitude, n.longitude)) : e.isArray(n.markers) && n.markers.length > 0 ? n.markers[0].address ? a.geocode({
                address: n.markers[0].address
            }, function(e) {
                e && e.length > 0 && o.setCenter(e[0].geometry.location)
            }) : o.setCenter(new google.maps.LatLng(n.markers[0].latitude, n.markers[0].longitude)) : o.setCenter(new google.maps.LatLng(34.885931, 9.84375)), o.setZoom(n.zoom), o.setMapTypeId(google.maps.MapTypeId[n.maptype]);
            var s = {
                scrollwheel: n.scrollwheel,
                disableDoubleClickZoom: !n.doubleclickzoom
            };
            n.controls === !1 ? e.extend(s, {
                disableDefaultUI: !0
            }) : 0 !== n.controls.length && e.extend(s, n.controls, {
                disableDefaultUI: !0
            }), o.setOptions(s), o.setOptions({
                styles: n.styles
            });
            var t, r, i = new google.maps.Marker;
            t = new google.maps.MarkerImage(n.icon.image), t.size = new google.maps.Size(n.icon.iconsize[0], n.icon.iconsize[1]), t.anchor = new google.maps.Point(n.icon.iconanchor[0], n.icon.iconanchor[1]), i.setIcon(t), n.icon.shadow && (r = new google.maps.MarkerImage(n.icon.shadow), r.size = new google.maps.Size(n.icon.shadowsize[0], n.icon.shadowsize[1]), r.anchor = new google.maps.Point(n.icon.shadowanchor[0], n.icon.shadowanchor[1]), i.setShadow(r)), e(this).bind("gMap.centerAt", function(e, a, n, s) {
                s && o.setZoom(s), o.panTo(new google.maps.LatLng(parseFloat(a), parseFloat(n)))
            });
            var g = [];
            e(this).bind("gMap.clearMarkers", function() {
                for (; g[0];) g.pop().setMap(null)
            });
            var l;
            e(this).bind("gMap.addMarker", function(e, a, s, t, r, d) {
                var c, p, m = new google.maps.LatLng(parseFloat(a), parseFloat(s)),
                    h = new google.maps.Marker({
                        position: m
                    });
                if (r ? (c = new google.maps.MarkerImage(r.image), c.size = new google.maps.Size(r.iconsize[0], r.iconsize[1]), c.anchor = new google.maps.Point(r.iconanchor[0], r.iconanchor[1]), h.setIcon(c), r.shadow && (p = new google.maps.MarkerImage(r.shadow), p.size = new google.maps.Size(r.shadowsize[0], r.shadowsize[1]), p.anchor = new google.maps.Point(r.shadowanchor[0], r.shadowanchor[1]), i.setShadow(p))) : (h.setIcon(i.getIcon()), h.setShadow(i.getShadow())), t) {
                    "_latlng" === t && (t = a + ", " + s);
                    var w = new google.maps.InfoWindow({
                        content: n.html_prepend + t + n.html_append
                    });
                    google.maps.event.addListener(h, "click", function() {
                        l && l.close(), w.open(o, h), l = w
                    }), d && google.maps.event.addListenerOnce(o, "tilesloaded", function() {
                        w.open(o, h)
                    })
                }
                h.setMap(o), g.push(h)
            });
            for (var d, c = this, p = function(o) {
                    return function(a) {
                        a && a.length > 0 && e(c).trigger("gMap.addMarker", [a[0].geometry.location.lat(), a[0].geometry.location.lng(), o.html, o.icon, o.popup])
                    }
                }, m = 0; m < n.markers.length; m++) d = n.markers[m], d.address ? ("_address" === d.html && (d.html = d.address), a.geocode({
                address: d.address
            }, p(d))) : e(this).trigger("gMap.addMarker", [d.latitude, d.longitude, d.html, d.icon, d.popup])
        })
    }, e.fn.gMap.defaults = {
        address: "",
        latitude: 0,
        longitude: 0,
        zoom: 1,
        markers: [],
        controls: [],
        styles: [],
        scrollwheel: !1,
        doubleclickzoom: !0,
        maptype: "ROADMAP",
        html_prepend: '<div class="gmap_marker">',
        html_append: "</div>",
        icon: {
            image: "http://www.google.com/mapfiles/marker.png",
            shadow: "http://www.google.com/mapfiles/shadow50.png",
            iconsize: [20, 34],
            shadowsize: [37, 34],
            iconanchor: [9, 34],
            shadowanchor: [6, 34]
        }
    }
}(jQuery);
/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(a) {
    var b, c, d, e, f, g, h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function() {},
        u = !!window.jQuery,
        v = a(window),
        w = function(a, c) {
            b.ev.on(o + a + p, c)
        },
        x = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        y = function(c, d) {
            b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        },
        z = function(c) {
            return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
        },
        A = function() {
            a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
        },
        B = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    t.prototype = {
        constructor: t,
        init: function() {
            var c = navigator.appVersion;
            b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
        },
        open: function(c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++)
                    if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                        b.index = e;
                        break
                    }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                b.close()
            }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                b._checkIfClose(a.target) && b.close()
            }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
            }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: v.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: d.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
                27 === a.keyCode && b.close()
            }), v.on("resize" + p, function() {
                b.updateSize()
            }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
            var k = b.wH = v.height(),
                n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function() {
                b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
            }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
        },
        close: function() {
            b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function() {
                b._close()
            }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
        },
        appendContent: function(a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {
                    el: a(e)
                } : (d = e.type, e = {
                    data: e,
                    src: e.src
                }), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break
                    }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0
                    } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0
                } else if (e && a.contains(document, c)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
        },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(c, d) {
                if (void 0 === d || d === !1) return !0;
                if (e = c.split("_"), e.length > 1) {
                    var f = b.find(p + "-" + e[0]);
                    if (f.length > 0) {
                        var g = e[1];
                        "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                    }
                } else b.find(p + "-" + c).html(d)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function(b, c) {
            return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function(c) {
        A();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                    mfpEl: e
                }, d, f)
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var C, D, E, F = "inline",
        G = function() {
            E && (D.after(E.addClass(C)).detach(), E = null)
        };
    a.magnificPopup.registerModule(F, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(F), w(h + "." + F, function() {
                    G()
                })
            },
            getInline: function(c, d) {
                if (G(), c.src) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var H, I = "ajax",
        J = function() {
            H && a(document.body).removeClass(H)
        },
        K = function() {
            J(), b.req && b.req.abort()
        };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
            },
            getAjax: function(c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function() {
                            b.wrap.addClass(q)
                        }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d), ""
            }
        }
    });
    var L, M = function(c) {
        if (c.data && void 0 !== c.data.title) return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var c = b.st.image,
                    d = ".image";
                b.types.push("image"), w(m + d, function() {
                    "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
                }), w(h + d, function() {
                    c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
                }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var c = 0,
                    d = a.img[0],
                    e = function(f) {
                        L && clearInterval(L), L = setInterval(function() {
                            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                        }, f)
                    };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0,
                    f = function() {
                        c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                    },
                    g = function() {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                    },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var N, O = function() {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration,
                        j = function(a) {
                            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                f = "transition";
                            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                        },
                        k = function() {
                            b.content.css("visibility", "visible")
                        };
                    w("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                f.css(b._getOffset(!0)), e = setTimeout(function() {
                                    k(), setTimeout(function() {
                                        f.remove(), a = f = null, y("ZoomAnimationEnded")
                                    }, 16)
                                }, g)
                            }, 16)
                        }
                    }), w(i + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = j(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() {
                                f.css(b._getOffset())
                            }, 16)
                        }
                    }), w(h + d, function() {
                        b._allowZoom() && (k(), f && f.remove(), a = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === b.currItem.type
            },
            _getItemToZoom: function() {
                return b.currItem.hasSize ? b.currItem.img : !1
            },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
                };
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function(a) {
            if (b.currTemplate[P]) {
                var c = b.currTemplate[P].find("iframe");
                c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                b.types.push(P), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(h + "." + P, function() {
                    R()
                })
            },
            getIframe: function(c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var S = function(a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a
        },
        T = function(a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = b.st.gallery,
                    e = ".mfp-gallery";
                return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() {
                    c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), d.on("keydown" + e, function(a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), w("UpdateStatus" + e, function(a, c) {
                    c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
                }), w(l + e, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                }), w("BuildControls" + e, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                        e.click(function() {
                            b.prev()
                        }), f.click(function() {
                            b.next()
                        }), b.container.append(e.add(f))
                    }
                }), w(n + e, function() {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), void w(h + e, function() {
                    d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null
                })) : !1
            },
            next: function() {
                b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
            },
            prev: function() {
                b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
            },
            goTo: function(a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = S(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0
                    }).on("error.mfploader", function() {
                        d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function(a) {
                return a.src.replace(/\.\w+$/, function(a) {
                    return "@2x" + a
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina,
                        c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) {
                        b.img.css({
                            "max-width": b.img[0].naturalWidth / c,
                            width: "100%"
                        })
                    }), w("ElementParse." + U, function(b, d) {
                        d.src = a.replaceSrc(d, c)
                    }))
                }
            }
        }
    }), A()
});
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    function n(e) {
        return u.raw ? e : encodeURIComponent(e)
    }

    function o(e) {
        return u.raw ? e : decodeURIComponent(e)
    }

    function i(e) {
        return n(u.json ? JSON.stringify(e) : String(e))
    }

    function t(e) {
        0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return e = decodeURIComponent(e.replace(c, " ")), u.json ? JSON.parse(e) : e
        } catch (n) {}
    }

    function r(n, o) {
        var i = u.raw ? n : t(n);
        return e.isFunction(o) ? o(i) : i
    }
    var c = /\+/g,
        u = e.cookie = function(t, c, s) {
            if (arguments.length > 1 && !e.isFunction(c)) {
                if (s = e.extend({}, u.defaults, s), "number" == typeof s.expires) {
                    var a = s.expires,
                        d = s.expires = new Date;
                    d.setMilliseconds(d.getMilliseconds() + 864e5 * a)
                }
                return document.cookie = [n(t), "=", i(c), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("")
            }
            for (var f = t ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], l = 0, m = p.length; m > l; l++) {
                var x = p[l].split("="),
                    g = o(x.shift()),
                    j = x.join("=");
                if (t === g) {
                    f = r(j, c);
                    break
                }
                t || void 0 === (j = r(j)) || (f[g] = j)
            }
            return f
        };
    u.defaults = {}, e.removeCookie = function(n, o) {
        return e.cookie(n, "", e.extend({}, o, {
            expires: -1
        })), !e.cookie(n)
    }
});
/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("undefined" != typeof jQuery ? jQuery : window.Zepto)
}(function(e) {
    "use strict";

    function t(t) {
        var r = t.data;
        t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r))
    }

    function r(t) {
        var r = t.target,
            a = e(r);
        if (!a.is("[type=submit],[type=image]")) {
            var n = a.closest("[type=submit]");
            if (0 === n.length) return;
            r = n[0]
        }
        var i = this;
        if (i.clk = r, "image" == r.type)
            if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;
            else if ("function" == typeof e.fn.offset) {
            var o = a.offset();
            i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
        } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
        setTimeout(function() {
            i.clk = i.clk_x = i.clk_y = null
        }, 100)
    }

    function a() {
        if (e.fn.ajaxSubmit.debug) {
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
        }
    }
    var n = {};
    n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData;
    var i = !!e.fn.prop;
    e.fn.attr2 = function() {
        if (!i) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }, e.fn.ajaxSubmit = function(t) {
        function r(r) {
            var a, n, i = e.param(r, t.traditional).split("&"),
                o = i.length,
                s = [];
            for (a = 0; o > a; a++) i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
            return s
        }

        function o(a) {
            for (var n = new FormData, i = 0; i < a.length; i++) n.append(a[i].name, a[i].value);
            if (t.extraData) {
                var o = r(t.extraData);
                for (i = 0; i < o.length; i++) o[i] && n.append(o[i][0], o[i][1])
            }
            t.data = null;
            var s = e.extend(!0, {}, e.ajaxSettings, t, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: u || "POST"
            });
            t.uploadProgress && (s.xhr = function() {
                var r = e.ajaxSettings.xhr();
                return r.upload && r.upload.addEventListener("progress", function(e) {
                    var r = 0,
                        a = e.loaded || e.position,
                        n = e.total;
                    e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r)
                }, !1), r
            }), s.data = null;
            var c = s.beforeSend;
            return s.beforeSend = function(e, r) {
                r.data = t.formData ? t.formData : n, c && c.call(this, e, r)
            }, e.ajax(s)
        }

        function s(r) {
            function n(e) {
                var t = null;
                try {
                    e.contentWindow && (t = e.contentWindow.document)
                } catch (r) {
                    a("cannot get iframe.contentWindow document: " + r)
                }
                if (t) return t;
                try {
                    t = e.contentDocument ? e.contentDocument : e.document
                } catch (r) {
                    a("cannot get iframe.contentDocument: " + r), t = e.document
                }
                return t
            }

            function o() {
                function t() {
                    try {
                        var e = n(g).readyState;
                        a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
                    } catch (r) {
                        a("Server abort: ", r, " (", r.name, ")"), s(k), j && clearTimeout(j), j = void 0
                    }
                }
                var r = f.attr2("target"),
                    i = f.attr2("action"),
                    o = "multipart/form-data",
                    c = f.attr("enctype") || f.attr("encoding") || o;
                w.setAttribute("target", p), (!u || /post/i.test(u)) && w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), m.timeout && (j = setTimeout(function() {
                    T = !0, s(D)
                }, m.timeout));
                var l = [];
                try {
                    if (m.extraData)
                        for (var d in m.extraData) m.extraData.hasOwnProperty(d) && l.push(e.isPlainObject(m.extraData[d]) && m.extraData[d].hasOwnProperty("name") && m.extraData[d].hasOwnProperty("value") ? e('<input type="hidden" name="' + m.extraData[d].name + '">').val(m.extraData[d].value).appendTo(w)[0] : e('<input type="hidden" name="' + d + '">').val(m.extraData[d]).appendTo(w)[0]);
                    m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15);
                    try {
                        w.submit()
                    } catch (h) {
                        var x = document.createElement("form").submit;
                        x.apply(w)
                    }
                } finally {
                    w.setAttribute("action", i), w.setAttribute("enctype", c), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(l).remove()
                }
            }

            function s(t) {
                if (!x.aborted && !F) {
                    if (M = n(g), M || (a("cannot access response document"), t = k), t === D && x) return x.abort("timeout"), void S.reject(x, "timeout");
                    if (t == k && x) return x.abort("server abort"), void S.reject(x, "error", "server abort");
                    if (M && M.location.href != m.iframeSrc || T) {
                        g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);
                        var r, i = "success";
                        try {
                            if (T) throw "timeout";
                            var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);
                            if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);
                            var u = M.body ? M.body : M.documentElement;
                            x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function(e) {
                                var t = {
                                    "content-type": m.dataType
                                };
                                return t[e.toLowerCase()]
                            }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
                            var c = (m.dataType || "").toLowerCase(),
                                l = /(json|script|text)/.test(c);
                            if (l || m.textarea) {
                                var f = M.getElementsByTagName("textarea")[0];
                                if (f) x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText;
                                else if (l) {
                                    var p = M.getElementsByTagName("pre")[0],
                                        h = M.getElementsByTagName("body")[0];
                                    p ? x.responseText = p.textContent ? p.textContent : p.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText)
                                }
                            } else "xml" == c && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText));
                            try {
                                E = _(x, c, m)
                            } catch (y) {
                                i = "parsererror", x.error = r = y || i
                            }
                        } catch (y) {
                            a("error caught: ", y), i = "error", x.error = r = y || i
                        }
                        x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])), d && e.event.trigger("ajaxComplete", [x, m]), d && !--e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function() {
                            m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), x.responseXML = null
                        }, 100)
                    }
                }
            }
            var c, l, m, d, p, v, g, x, y, b, T, j, w = f[0],
                S = e.Deferred();
            if (S.abort = function(e) {
                    x.abort(e)
                }, r)
                for (l = 0; l < h.length; l++) c = e(h[l]), i ? c.prop("disabled", !1) : c.removeAttr("disabled");
            if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, p = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (v = e(m.iframeTarget), b = v.attr2("name"), b ? p = b : v.attr2("name", p)) : (v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />'), v.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })), g = v[0], x = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(t) {
                        var r = "timeout" === t ? "timeout" : "aborted";
                        a("aborting upload... " + r), this.aborted = 1;
                        try {
                            g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop")
                        } catch (n) {}
                        v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r)
                    }
                }, d = m.global, d && 0 === e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) return m.global && e.active--, S.reject(), S;
            if (x.aborted) return S.reject(), S;
            y = w.clk, y && (b = y.name, b && !y.disabled && (m.extraData = m.extraData || {}, m.extraData[b] = y.value, "image" == y.type && (m.extraData[b + ".x"] = w.clk_x, m.extraData[b + ".y"] = w.clk_y)));
            var D = 1,
                k = 2,
                A = e("meta[name=csrf-token]").attr("content"),
                L = e("meta[name=csrf-param]").attr("content");
            L && A && (m.extraData = m.extraData || {}, m.extraData[L] = A), m.forceSync ? o() : setTimeout(o, 10);
            var E, M, F, O = 50,
                X = e.parseXML || function(e, t) {
                    return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                },
                C = e.parseJSON || function(e) {
                    return window.eval("(" + e + ")")
                },
                _ = function(t, r, a) {
                    var n = t.getResponseHeader("content-type") || "",
                        i = "xml" === r || !r && n.indexOf("xml") >= 0,
                        o = i ? t.responseXML : t.responseText;
                    return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o
                };
            return S
        }
        if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
        var u, c, l, f = this;
        "function" == typeof t ? t = {
            success: t
        } : void 0 === t && (t = {}), u = t.type || this.attr2("method"), c = t.url || this.attr2("action"), l = "string" == typeof c ? e.trim(c) : "", l = l || window.location.href || "", l && (l = (l.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
            url: l,
            success: e.ajaxSettings.success,
            type: u || e.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, t);
        var m = {};
        if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var d = t.traditional;
        void 0 === d && (d = e.ajaxSettings.traditional);
        var p, h = [],
            v = this.formToArray(t.semantic, h);
        if (t.data && (t.extraData = t.data, p = e.param(t.data, d)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var g = e.param(v, d);
        p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;
        var x = [];
        if (t.resetForm && x.push(function() {
                f.resetForm()
            }), t.clearForm && x.push(function() {
                f.clearForm(t.includeHidden)
            }), !t.dataType && t.target) {
            var y = t.success || function() {};
            x.push(function(r) {
                var a = t.replaceTarget ? "replaceWith" : "html";
                e(t.target)[a](r).each(y, arguments)
            })
        } else t.success && x.push(t.success);
        if (t.success = function(e, r, a) {
                for (var n = t.context || this, i = 0, o = x.length; o > i; i++) x[i].apply(n, [e, r, a || f, f])
            }, t.error) {
            var b = t.error;
            t.error = function(e, r, a) {
                var n = t.context || this;
                b.apply(n, [e, r, a, f])
            }
        }
        if (t.complete) {
            var T = t.complete;
            t.complete = function(e, r) {
                var a = t.context || this;
                T.apply(a, [e, r, f])
            }
        }
        var j = e("input[type=file]:enabled", this).filter(function() {
                return "" !== e(this).val()
            }),
            w = j.length > 0,
            S = "multipart/form-data",
            D = f.attr("enctype") == S || f.attr("encoding") == S,
            k = n.fileapi && n.formdata;
        a("fileAPI :" + k);
        var A, L = (w || D) && !k;
        t.iframe !== !1 && (t.iframe || L) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function() {
            A = s(v)
        }) : A = s(v) : A = (w || D) && k ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", A);
        for (var E = 0; E < h.length; E++) h[E] = null;
        return this.trigger("form-submit-notify", [this, t]), this
    }, e.fn.ajaxForm = function(n) {
        if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
            var i = {
                s: this.selector,
                c: this.context
            };
            return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function() {
                e(i.s, i.c).ajaxForm(n)
            }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
        }
        return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
    }, e.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    }, e.fn.formToArray = function(t, r) {
        var a = [];
        if (0 === this.length) return a;
        var i, o = this[0],
            s = this.attr("id"),
            u = t ? o.getElementsByTagName("*") : o.elements;
        if (u && !/MSIE [678]/.test(navigator.userAgent) && (u = e(u).get()), s && (i = e(':input[form="' + s + '"]').get(), i.length && (u = (u || []).concat(i))), !u || !u.length) return a;
        var c, l, f, m, d, p, h;
        for (c = 0, p = u.length; p > c; c++)
            if (d = u[c], f = d.name, f && !d.disabled)
                if (t && o.clk && "image" == d.type) o.clk == d && (a.push({
                    name: f,
                    value: e(d).val(),
                    type: d.type
                }), a.push({
                    name: f + ".x",
                    value: o.clk_x
                }, {
                    name: f + ".y",
                    value: o.clk_y
                }));
                else if (m = e.fieldValue(d, !0), m && m.constructor == Array)
            for (r && r.push(d), l = 0, h = m.length; h > l; l++) a.push({
                name: f,
                value: m[l]
            });
        else if (n.fileapi && "file" == d.type) {
            r && r.push(d);
            var v = d.files;
            if (v.length)
                for (l = 0; l < v.length; l++) a.push({
                    name: f,
                    value: v[l],
                    type: d.type
                });
            else a.push({
                name: f,
                value: "",
                type: d.type
            })
        } else null !== m && "undefined" != typeof m && (r && r.push(d), a.push({
            name: f,
            value: m,
            type: d.type,
            required: d.required
        }));
        if (!t && o.clk) {
            var g = e(o.clk),
                x = g[0];
            f = x.name, f && !x.disabled && "image" == x.type && (a.push({
                name: f,
                value: g.val()
            }), a.push({
                name: f + ".x",
                value: o.clk_x
            }, {
                name: f + ".y",
                value: o.clk_y
            }))
        }
        return a
    }, e.fn.formSerialize = function(t) {
        return e.param(this.formToArray(t))
    }, e.fn.fieldSerialize = function(t) {
        var r = [];
        return this.each(function() {
            var a = this.name;
            if (a) {
                var n = e.fieldValue(this, t);
                if (n && n.constructor == Array)
                    for (var i = 0, o = n.length; o > i; i++) r.push({
                        name: a,
                        value: n[i]
                    });
                else null !== n && "undefined" != typeof n && r.push({
                    name: this.name,
                    value: n
                })
            }
        }), e.param(r)
    }, e.fn.fieldValue = function(t) {
        for (var r = [], a = 0, n = this.length; n > a; a++) {
            var i = this[a],
                o = e.fieldValue(i, t);
            null === o || "undefined" == typeof o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
        }
        return r
    }, e.fieldValue = function(t, r) {
        var a = t.name,
            n = t.type,
            i = t.tagName.toLowerCase();
        if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;
        if ("select" == i) {
            var o = t.selectedIndex;
            if (0 > o) return null;
            for (var s = [], u = t.options, c = "select-one" == n, l = c ? o + 1 : u.length, f = c ? o : 0; l > f; f++) {
                var m = u[f];
                if (m.selected) {
                    var d = m.value;
                    if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), c) return d;
                    s.push(d)
                }
            }
            return s
        }
        return e(t).val()
    }, e.fn.clearForm = function(t) {
        return this.each(function() {
            e("input,select,textarea", this).clearFields(t)
        })
    }, e.fn.clearFields = e.fn.clearInputs = function(t) {
        var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var a = this.type,
                n = this.tagName.toLowerCase();
            r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
        })
    }, e.fn.resetForm = function() {
        return this.each(function() {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }, e.fn.enable = function(e) {
        return void 0 === e && (e = !0), this.each(function() {
            this.disabled = !e
        })
    }, e.fn.selected = function(t) {
        return void 0 === t && (t = !0), this.each(function() {
            var r = this.type;
            if ("checkbox" == r || "radio" == r) this.checked = t;
            else if ("option" == this.tagName.toLowerCase()) {
                var a = e(this).parent("select");
                t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t
            }
        })
    }, e.fn.ajaxSubmit.debug = !1
});
/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 JÃ¶rn Zaefferer; Licensed MIT */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) {
                c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0)
            }), this.on("submit.validate", function(b) {
                function d() {
                    var d, e;
                    return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        },
        valid: function() {
            var b, c, d;
            return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() {
                b = c.element(this) && b, d = d.concat(c.errorList)
            }), c.errorList = d), b
        },
        rules: function(b, c) {
            var d, e, f, g, h, i, j = this[0];
            if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                case "add":
                    a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                    break;
                case "remove":
                    return c ? (i = {}, a.each(c.split(/\s/), function(b, c) {
                        i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required")
                    }), i) : (delete e[j.name], f)
            }
            return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                required: h
            }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                remote: h
            })), g
        }
    }), a.extend(a.expr[":"], {
        blank: function(b) {
            return !a.trim("" + a(b).val())
        },
        filled: function(b) {
            return !!a.trim("" + a(b).val())
        },
        unchecked: function(b) {
            return !a(b).prop("checked")
        }
    }), a.validator = function(b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function(b, c) {
        return 1 === arguments.length ? function() {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c)
        } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
                return c
            })
        }), b)
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) {
                this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
            },
            onfocusout: function(a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
            },
            onkeyup: function(b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b === this.lastElement) && this.element(b)
            },
            onclick: function(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            },
            unhighlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function b(b) {
                    var c = a.data(this.form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;
                    e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b)
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.groups = {};
                a.each(this.settings.groups, function(b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
                        d[c] = b
                    })
                }), c = this.settings.rules, a.each(c, function(b, d) {
                    c[b] = a.validator.normalizeRule(d)
                }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function(b) {
                var c = this.clean(b),
                    d = this.validationTargetFor(c),
                    e = !0;
                return this.lastElement = d, void 0 === d ? delete this.invalid[c.name] : (this.prepareElement(d), this.currentElements = a(d), e = this.check(d) !== !1, e ? delete this.invalid[d.name] : this.invalid[d.name] = !0), a(b).attr("aria-invalid", !e), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e
            },
            showErrors: function(b) {
                if (b) {
                    a.extend(this.errorMap, b), this.errorList = [];
                    for (var c in b) this.errorList.push({
                        message: b[c],
                        element: this.findByName(c)[0]
                    });
                    this.successList = a.grep(this.successList, function(a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors();
                var b, c = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                if (this.settings.unhighlight)
                    for (b = 0; c[b]; b++) this.settings.unhighlight.call(this, c[b], this.settings.errorClass, "");
                else c.removeClass(this.settings.errorClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(a) {
                var b, c = 0;
                for (b in a) c++;
                return c
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (b) {}
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function(a) {
                    return a.element.name === b.name
                }).length && b
            },
            elements: function() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0)
                })
            },
            clean: function(b) {
                return a(b)[0]
            },
            errors: function() {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(a) {
                this.reset(), this.toHide = this.errorsFor(a)
            },
            elementValue: function(b) {
                var c, d = a(b),
                    e = b.type;
                return "radio" === e || "checkbox" === e ? this.findByName(b.name).filter(":checked").val() : "number" === e && "undefined" != typeof b.validity ? b.validity.badInput ? !1 : d.val() : (c = d.val(), "string" == typeof c ? c.replace(/\r/g, "") : c)
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f = a(b).rules(),
                    g = a.map(f, function(a, b) {
                        return b
                    }).length,
                    h = !1,
                    i = this.elementValue(b);
                for (d in f) {
                    e = {
                        method: d,
                        parameters: f[d]
                    };
                    try {
                        if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                            h = !0;
                            continue
                        }
                        if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1
                    } catch (j) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j
                    }
                }
                if (!h) return this.objectLength(f) && this.successList.push(b), !0
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
            },
            customMessage: function(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a];
                return void 0
            },
            defaultMessage: function(b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
            },
            formatAndAdd: function(b, c) {
                var d = this.defaultMessage(b, c.method),
                    e = /\$?\{(\d+)\}/g;
                "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({
                    message: d,
                    element: b,
                    method: c.method
                }), this.errorMap[b.name] = d, this.submitted[b.name] = d
            },
            addWrapper: function(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
            },
            defaultShowErrors: function() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(b, c) {
                var d, e, f, g = this.errorsFor(b),
                    h = this.idOrName(b),
                    i = a(b).attr("aria-describedby");
                g.length ? (g.removeClass(this.settings.validClass).addClass(this.settings.errorClass), g.html(c)) : (g = a("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(c || ""), d = g, this.settings.wrapper && (d = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), g.is("label") ? g.attr("for", h) : 0 === g.parents("label[for='" + h + "']").length && (f = g.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1"), i ? i.match(new RegExp("\\b" + f + "\\b")) || (i += " " + f) : i = f, a(b).attr("aria-describedby", i), e = this.groups[b.name], e && a.each(this.groups, function(b, c) {
                    c === e && a("[name='" + b + "']", this.currentForm).attr("aria-describedby", g.attr("id"))
                }))), !c && this.settings.success && (g.text(""), "string" == typeof this.settings.success ? g.addClass(this.settings.success) : this.settings.success(g, b)), this.toShow = this.toShow.add(g)
            },
            errorsFor: function(b) {
                var c = this.idOrName(b),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + d.replace(/\s+/g, ", #")), this.errors().filter(e)
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function(b) {
                return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0]
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function(b) {
                return a(this.currentForm).find("[name='" + b + "']")
            },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function(a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
            },
            dependTypes: {
                "boolean": function(a) {
                    return a
                },
                string: function(b, c) {
                    return !!a(b, c.form).length
                },
                "function": function(a, b) {
                    return a(b)
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function(a) {
                this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
            },
            stopRequest: function(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, "remote")
                })
            },
            destroy: function() {
                this.resetForm(), a(this.currentForm).off(".validate").removeData("validator")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function() {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            }), c
        },
        normalizeAttributeRule: function(a, b, c, d) {
            /min|max/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0)
        },
        attributeRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        },
        dataRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
            return e
        },
        staticRules: function(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 !== e.param ? e.param : !0 : delete b[d]
                }
            }), a.each(b, function(d, e) {
                b[d] = a.isFunction(e) ? e(c) : e
            }), a.each(["minlength", "maxlength"], function() {
                b[this] && (b[this] = Number(b[this]))
            }), a.each(["rangelength", "range"], function() {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        },
        normalizeRule: function(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function() {
                    c[this] = !0
                }), b = c
            }
            return b
        },
        addMethod: function(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        },
        methods: {
            required: function(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0
            },
            email: function(a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
            },
            url: function(a, b) {
                return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)
            },
            date: function(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
            },
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
            },
            number: function(a, b) {
                return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            creditcard: function(a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(a)) return !1;
                var c, d, e = 0,
                    f = 0,
                    g = !1;
                if (a = a.replace(/\D/g, ""), a.length < 13 || a.length > 19) return !1;
                for (c = a.length - 1; c >= 0; c--) d = a.charAt(c), f = parseInt(d, 10), g && (f *= 2) > 9 && (f -= 9), e += f, g = !g;
                return e % 10 === 0
            },
            minlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d
            },
            maxlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || d >= e
            },
            rangelength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d[0] && e <= d[1]
            },
            min: function(a, b, c) {
                return this.optional(b) || a >= c
            },
            max: function(a, b, c) {
                return this.optional(b) || c >= a
            },
            range: function(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            },
            equalTo: function(b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.off(".validate-equalTo").on("blur.validate-equalTo", function() {
                    a(c).valid()
                }), b === e.val()
            },
            remote: function(b, c, d) {
                if (this.optional(c)) return "dependency-mismatch";
                var e, f, g = this.previousValue(c);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), g.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = g.message, d = "string" == typeof d && {
                    url: d
                } || d, g.old === b ? g.valid : (g.old = b, e = this, this.startRequest(c), f = {}, f[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: f,
                    context: e.currentForm,
                    success: function(d) {
                        var f, h, i, j = d === !0 || "true" === d;
                        e.settings.messages[c.name].remote = g.originalMessage, j ? (i = e.formSubmitted, e.prepareElement(c), e.formSubmitted = i, e.successList.push(c), delete e.invalid[c.name], e.showErrors()) : (f = {}, h = d || e.defaultMessage(c, "remote"), f[c.name] = g.message = a.isFunction(h) ? h(b) : h, e.invalid[c.name] = !0, e.showErrors(f)), g.valid = j, e.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    });
    var b, c = {};
    a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) {
        var e = a.port;
        "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
    }) : (b = a.ajax, a.ajax = function(d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port;
        return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
    })
});
/*
 * Project: Bootstrap Notify = v3.1.5
 * Description: Turns standard Bootstrap alerts into "Growl-like" notifications.
 * Author: Mouse0270 aka Robert McIntosh
 * License: MIT License
 * Website: https://github.com/mouse0270/bootstrap-growl
 */
! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function(t) {
    function s(s) {
        var i = !1;
        return t('[data-notify="container"]').each(function(e, n) {
            var a = t(n),
                o = a.find('[data-notify="title"]').html().trim(),
                r = a.find('[data-notify="message"]').html().trim(),
                l = o === t("<div>" + s.settings.content.title + "</div>").html().trim(),
                d = r === t("<div>" + s.settings.content.message + "</div>").html().trim(),
                c = a.hasClass("alert-" + s.settings.type);
            return l && d && c && (i = !0), !i
        }), i
    }

    function i(i, n, a) {
        var o = {
            content: {
                message: "object" == typeof n ? n.message : n,
                title: n.title ? n.title : "",
                icon: n.icon ? n.icon : "",
                url: n.url ? n.url : "#",
                target: n.target ? n.target : "-"
            }
        };
        a = t.extend(!0, {}, o, a), this.settings = t.extend(!0, {}, e, a), this._defaults = e, "-" === this.settings.content.target && (this.settings.content.target = this.settings.url_target), this.animations = {
            start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart",
            end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend"
        }, "number" == typeof this.settings.offset && (this.settings.offset = {
            x: this.settings.offset,
            y: this.settings.offset
        }), (this.settings.allow_duplicates || !this.settings.allow_duplicates && !s(this)) && this.init()
    }
    var e = {
        element: "body",
        position: null,
        type: "info",
        allow_dismiss: !0,
        allow_duplicates: !0,
        newest_on_top: !1,
        showProgressbar: !1,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5e3,
        timer: 1e3,
        url_target: "_blank",
        mouse_over: null,
        animate: {
            enter: "animated fadeInDown",
            exit: "animated fadeOutUp"
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        onClick: null,
        icon_type: "class",
        template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    };
    String.format = function() {
        var t = arguments,
            s = arguments[0];
        return s.replace(/(\{\{\d\}\}|\{\d\})/g, function(s) {
            if ("{{" === s.substring(0, 2)) return s;
            var i = parseInt(s.match(/\d/)[0]);
            return t[i + 1]
        })
    }, t.extend(i.prototype, {
        init: function() {
            var t = this;
            this.buildNotify(), this.settings.content.icon && this.setIcon(), "#" != this.settings.content.url && this.styleURL(), this.styleDismiss(), this.placement(), this.bind(), this.notify = {
                $ele: this.$ele,
                update: function(s, i) {
                    var e = {};
                    "string" == typeof s ? e[s] = i : e = s;
                    for (var n in e) switch (n) {
                        case "type":
                            this.$ele.removeClass("alert-" + t.settings.type), this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + t.settings.type), t.settings.type = e[n], this.$ele.addClass("alert-" + e[n]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-" + e[n]);
                            break;
                        case "icon":
                            var a = this.$ele.find('[data-notify="icon"]');
                            "class" === t.settings.icon_type.toLowerCase() ? a.removeClass(t.settings.content.icon).addClass(e[n]) : (a.is("img") || a.find("img"), a.attr("src", e[n])), t.settings.content.icon = e[s];
                            break;
                        case "progress":
                            var o = t.settings.delay - t.settings.delay * (e[n] / 100);
                            this.$ele.data("notify-delay", o), this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", e[n]).css("width", e[n] + "%");
                            break;
                        case "url":
                            this.$ele.find('[data-notify="url"]').attr("href", e[n]);
                            break;
                        case "target":
                            this.$ele.find('[data-notify="url"]').attr("target", e[n]);
                            break;
                        default:
                            this.$ele.find('[data-notify="' + n + '"]').html(e[n])
                    }
                    var r = this.$ele.outerHeight() + parseInt(t.settings.spacing) + parseInt(t.settings.offset.y);
                    t.reposition(r)
                },
                close: function() {
                    t.close()
                }
            }
        },
        buildNotify: function() {
            var s = this.settings.content;
            this.$ele = t(String.format(this.settings.template, this.settings.type, s.title, s.message, s.url, s.target)), this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align), this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none"), (this.settings.delay <= 0 && !this.settings.showProgressbar || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove()
        },
        setIcon: function() {
            "class" === this.settings.icon_type.toLowerCase() ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').is("img") ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />')
        },
        styleDismiss: function() {
            this.$ele.find('[data-notify="dismiss"]').css({
                position: "absolute",
                right: "10px",
                top: "5px",
                zIndex: this.settings.z_index + 2
            })
        },
        styleURL: function() {
            this.$ele.find('[data-notify="url"]').css({
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: this.settings.z_index + 1
            })
        },
        placement: function() {
            var s = this,
                i = this.settings.offset.y,
                e = {
                    display: "inline-block",
                    margin: "0px auto",
                    position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                    transition: "all .5s ease-in-out",
                    zIndex: this.settings.z_index
                },
                n = !1,
                a = this.settings;
            switch (t('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function() {
                i = Math.max(i, parseInt(t(this).css(a.placement.from)) + parseInt(t(this).outerHeight()) + parseInt(a.spacing))
            }), this.settings.newest_on_top === !0 && (i = this.settings.offset.y), e[this.settings.placement.from] = i + "px", this.settings.placement.align) {
                case "left":
                case "right":
                    e[this.settings.placement.align] = this.settings.offset.x + "px";
                    break;
                case "center":
                    e.left = 0, e.right = 0
            }
            this.$ele.css(e).addClass(this.settings.animate.enter), t.each(Array("webkit-", "moz-", "o-", "ms-", ""), function(t, i) {
                s.$ele[0].style[i + "AnimationIterationCount"] = 1
            }), t(this.settings.element).append(this.$ele), this.settings.newest_on_top === !0 && (i = parseInt(i) + parseInt(this.settings.spacing) + this.$ele.outerHeight(), this.reposition(i)), t.isFunction(s.settings.onShow) && s.settings.onShow.call(this.$ele), this.$ele.one(this.animations.start, function() {
                n = !0
            }).one(this.animations.end, function() {
                s.$ele.removeClass(s.settings.animate.enter), t.isFunction(s.settings.onShown) && s.settings.onShown.call(this)
            }), setTimeout(function() {
                n || t.isFunction(s.settings.onShown) && s.settings.onShown.call(this)
            }, 600)
        },
        bind: function() {
            var s = this;
            if (this.$ele.find('[data-notify="dismiss"]').on("click", function() {
                    s.close()
                }), t.isFunction(s.settings.onClick) && this.$ele.on("click", function(t) {
                    t.target != s.$ele.find('[data-notify="dismiss"]')[0] && s.settings.onClick.call(this, t)
                }), this.$ele.mouseover(function() {
                    t(this).data("data-hover", "true")
                }).mouseout(function() {
                    t(this).data("data-hover", "false")
                }), this.$ele.data("data-hover", "false"), this.settings.delay > 0) {
                s.$ele.data("notify-delay", s.settings.delay);
                var i = setInterval(function() {
                    var t = parseInt(s.$ele.data("notify-delay")) - s.settings.timer;
                    if ("false" === s.$ele.data("data-hover") && "pause" === s.settings.mouse_over || "pause" != s.settings.mouse_over) {
                        var e = (s.settings.delay - t) / s.settings.delay * 100;
                        s.$ele.data("notify-delay", t), s.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", e).css("width", e + "%")
                    }
                    t <= -s.settings.timer && (clearInterval(i), s.close())
                }, s.settings.timer)
            }
        },
        close: function() {
            var s = this,
                i = parseInt(this.$ele.css(this.settings.placement.from)),
                e = !1;
            this.$ele.attr("data-closing", "true").addClass(this.settings.animate.exit), s.reposition(i), t.isFunction(s.settings.onClose) && s.settings.onClose.call(this.$ele), this.$ele.one(this.animations.start, function() {
                e = !0
            }).one(this.animations.end, function() {
                t(this).remove(), t.isFunction(s.settings.onClosed) && s.settings.onClosed.call(this)
            }), setTimeout(function() {
                e || (s.$ele.remove(), s.settings.onClosed && s.settings.onClosed(s.$ele))
            }, 600)
        },
        reposition: function(s) {
            var i = this,
                e = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                n = this.$ele.nextAll(e);
            this.settings.newest_on_top === !0 && (n = this.$ele.prevAll(e)), n.each(function() {
                t(this).css(i.settings.placement.from, s), s = parseInt(s) + parseInt(i.settings.spacing) + t(this).outerHeight()
            })
        }
    }), t.notify = function(t, s) {
        var e = new i(this, t, s);
        return e.notify
    }, t.notifyDefaults = function(s) {
        return e = t.extend(!0, {}, e, s)
    }, t.notifyClose = function(s) {
        "undefined" == typeof s || "all" === s ? t("[data-notify]").find('[data-notify="dismiss"]').trigger("click") : "success" === s || "info" === s || "warning" === s || "danger" === s ? t(".alert-" + s + "[data-notify]").find('[data-notify="dismiss"]').trigger("click") : s ? t(s + "[data-notify]").find('[data-notify="dismiss"]').trigger("click") : t('[data-notify-position="' + s + '"]').find('[data-notify="dismiss"]').trigger("click")
    }, t.notifyCloseExcept = function(s) {
        "success" === s || "info" === s || "warning" === s || "danger" === s ? t("[data-notify]").not(".alert-" + s).find('[data-notify="dismiss"]').trigger("click") : t("[data-notify]").not(s).find('[data-notify="dismiss"]').trigger("click")
    }
});

/* Scrollify */
! function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function(c) {
        return b(c, a, a.document)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery"), a, a.document) : b(jQuery, a, a.document)
}("undefined" != typeof window ? window : this, function(a, b, c, d) {
    "use strict";

    function e(c, d, e, f) {
        if (r === c && (e = !1), z === !0) return !0;
        if (n[c]) {
            if (w = !1, e && G.before(c, o), s = 1, E = m[c], C === !1 && r > c && f === !1 && p[c] && (s = parseInt(o[c].outerHeight() / u.height()), E = parseInt(m[c]) + (o[c].outerHeight() - u.height())), G.updateHash && G.sectionName && (C !== !0 || 0 !== c))
                if (history.pushState) try {
                    history.replaceState(null, null, n[c])
                } catch (a) {
                    b.console && console.warn("Scrollify warning: Page must be hosted to manipulate the hash value.")
                } else b.location.hash = n[c];
            if (C && (G.afterRender(), C = !1), r = c, d) a(G.target).stop().scrollTop(E), e && G.after(c, o);
            else {
                if (x = !0, a().velocity ? a(G.target).stop().velocity("scroll", {
                        duration: G.scrollSpeed,
                        easing: G.easing,
                        offset: E,
                        mobileHA: !1
                    }) : a(G.target).stop().animate({
                        scrollTop: E
                    }, G.scrollSpeed, G.easing), b.location.hash.length && G.sectionName && b.console) try {
                    a(b.location.hash).length && console.warn("Scrollify warning: ID matches hash value - this will cause the page to anchor.")
                } catch (a) {}
                a(G.target).promise().done(function() {
                    x = !1, C = !1, e && G.after(c, o)
                })
            }
        }
    }

    function f(a) {
        function b(b) {
            for (var c = 0, d = a.slice(Math.max(a.length - b, 1)), e = 0; e < d.length; e++) c += d[e];
            return Math.ceil(c / b)
        }
        var c = b(10),
            d = b(70);
        return c >= d
    }

    function g(a, b) {
        for (var c = n.length; c >= 0; c--) "string" == typeof a ? n[c] === a && (q = c, e(c, b, !0, !0)) : c === a && (q = c, e(c, b, !0, !0))
    }
    var h, i, j, k, l, m = [],
        n = [],
        o = [],
        p = [],
        q = 0,
        r = 0,
        s = 1,
        t = !1,
        u = a(b),
        v = u.scrollTop(),
        w = !1,
        x = !1,
        y = !1,
        z = !1,
        A = [],
        B = (new Date).getTime(),
        C = !0,
        D = !1,
        E = 0,
        F = "onwheel" in c ? "wheel" : c.onmousewheel !== d ? "mousewheel" : "DOMMouseScroll",
        G = {
            section: ".section",
            sectionName: "section-name",
            interstitialSection: "",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset: 0,
            scrollbars: !0,
            target: "html,body",
            standardScrollElements: !1,
            setHeights: !0,
            overflowScroll: !0,
            updateHash: !0,
            touchScroll: !0,
            before: function() {},
            after: function() {},
            afterResize: function() {},
            afterRender: function() {}
        },
        H = function(d) {
            function g(b) {
                a().velocity ? a(G.target).stop().velocity("scroll", {
                    duration: G.scrollSpeed,
                    easing: G.easing,
                    offset: b,
                    mobileHA: !1
                }) : a(G.target).stop().animate({
                    scrollTop: b
                }, G.scrollSpeed, G.easing)
            }

            function r(b) {
                b && (v = u.scrollTop());
                var c = G.section;
                p = [], G.interstitialSection.length && (c += "," + G.interstitialSection), G.scrollbars === !1 && (G.overflowScroll = !1), a(c).each(function(b) {
                    var c = a(this);
                    G.setHeights ? c.is(G.interstitialSection) ? p[b] = !1 : c.css("height", "auto").outerHeight() < u.height() || "hidden" === c.css("overflow") ? (c.css({
                        height: u.height()
                    }), p[b] = !1) : (c.css({
                        height: c.height()
                    }), G.overflowScroll ? p[b] = !0 : p[b] = !1) : c.outerHeight() < u.height() || G.overflowScroll === !1 ? p[b] = !1 : p[b] = !0
                }), b && u.scrollTop(v)
            }

            function C(c, d) {
                var f = G.section;
                G.interstitialSection.length && (f += "," + G.interstitialSection), m = [], n = [], o = [], a(f).each(function(c) {
                    var d = a(this);
                    c > 0 ? m[c] = parseInt(d.offset().top) + G.offset : m[c] = parseInt(d.offset().top), G.sectionName && d.data(G.sectionName) ? n[c] = "#" + d.data(G.sectionName).toString().replace(/ /g, "-") : d.is(G.interstitialSection) === !1 ? n[c] = "#" + (c + 1) : (n[c] = "#", c === a(f).length - 1 && c > 1 && (m[c] = m[c - 1] + (parseInt(a(a(f)[c - 1]).outerHeight()) - parseInt(a(b).height())) + parseInt(d.outerHeight()))), o[c] = d;
                    try {
                        a(n[c]).length && b.console && console.warn("Scrollify warning: Section names can't match IDs - this will cause the browser to anchor.")
                    } catch (a) {}
                    b.location.hash === n[c] && (q = c, t = !0)
                }), !0 === c && e(q, !1, !1, !1)
            }

            function E() {
                return !p[q] || (v = u.scrollTop(), !(v > parseInt(m[q])))
            }

            function H() {
                return !p[q] || (v = u.scrollTop(), !(v < parseInt(m[q]) + (o[q].outerHeight() - u.height()) - 28))
            }
            D = !0, a.easing.easeOutExpo = function(a, b, c, d, e) {
                return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
            }, j = {
                handleMousedown: function() {
                    return z === !0 || (w = !1, void(y = !1))
                },
                handleMouseup: function() {
                    return z === !0 || (w = !0, void(y && j.calculateNearest(!1, !0)))
                },
                handleScroll: function() {
                    return z === !0 || (h && clearTimeout(h), void(h = setTimeout(function() {
                        return y = !0, w !== !1 && (w = !1, void j.calculateNearest(!1, !0))
                    }, 200)))
                },
                calculateNearest: function(a, b) {
                    v = u.scrollTop();
                    for (var c, d = 1, f = m.length, g = 0, h = Math.abs(m[0] - v); d < f; d++) c = Math.abs(m[d] - v), c < h && (h = c, g = d);
                    (H() && g > q || E()) && (q = g, e(g, a, b, !1))
                },
                wheelHandler: function(c) {
                    if (z === !0) return !0;
                    if (G.standardScrollElements && (a(c.target).is(G.standardScrollElements) || a(c.target).closest(G.standardScrollElements).length)) return !0;
                    p[q] || c.preventDefault();
                    var d = (new Date).getTime();
                    c = c || b.event;
                    var g = c.originalEvent.wheelDelta || -c.originalEvent.deltaY || -c.originalEvent.detail,
                        h = Math.max(-1, Math.min(1, g));
                    if (A.length > 149 && A.shift(), A.push(Math.abs(g)), d - B > 200 && (A = []), B = d, x) return !1;
                    if (h < 0) {
                        if (q < m.length - 1 && H()) {
                            if (!f(A)) return !1;
                            c.preventDefault(), q++, x = !0, e(q, !1, !0, !1)
                        }
                    } else if (h > 0 && q > 0 && E()) {
                        if (!f(A)) return !1;
                        c.preventDefault(), q--, x = !0, e(q, !1, !0, !1)
                    }
                },
                keyHandler: function(a) {
                    return z === !0 || x !== !0 && void(38 == a.keyCode || 33 == a.keyCode ? q > 0 && E() && (a.preventDefault(), q--, e(q, !1, !0, !1)) : 40 != a.keyCode && 34 != a.keyCode || q < m.length - 1 && H() && (a.preventDefault(), q++, e(q, !1, !0, !1)))
                },
                init: function() {
                    G.scrollbars ? (u.on("mousedown", j.handleMousedown), u.on("mouseup", j.handleMouseup), u.on("scroll", j.handleScroll)) : a("body").css({
                        overflow: "hidden"
                    }), u.on(F, j.wheelHandler), u.on("keydown", j.keyHandler)
                }
            }, k = {
                touches: {
                    touchstart: {
                        y: -1,
                        x: -1
                    },
                    touchmove: {
                        y: -1,
                        x: -1
                    },
                    touchend: !1,
                    direction: "undetermined"
                },
                options: {
                    distance: 30,
                    timeGap: 800,
                    timeStamp: (new Date).getTime()
                },
                touchHandler: function(b) {
                    if (z === !0) return !0;
                    if (G.standardScrollElements && (a(b.target).is(G.standardScrollElements) || a(b.target).closest(G.standardScrollElements).length)) return !0;
                    var c;
                    if ("undefined" != typeof b && "undefined" != typeof b.touches) switch (c = b.touches[0], b.type) {
                        case "touchstart":
                            k.touches.touchstart.y = c.pageY, k.touches.touchmove.y = -1, k.touches.touchstart.x = c.pageX, k.touches.touchmove.x = -1, k.options.timeStamp = (new Date).getTime(), k.touches.touchend = !1;
                        case "touchmove":
                            k.touches.touchmove.y = c.pageY, k.touches.touchmove.x = c.pageX, k.touches.touchstart.y !== k.touches.touchmove.y && Math.abs(k.touches.touchstart.y - k.touches.touchmove.y) > Math.abs(k.touches.touchstart.x - k.touches.touchmove.x) && (b.preventDefault(), k.touches.direction = "y", k.options.timeStamp + k.options.timeGap < (new Date).getTime() && 0 == k.touches.touchend && (k.touches.touchend = !0, k.touches.touchstart.y > -1 && Math.abs(k.touches.touchmove.y - k.touches.touchstart.y) > k.options.distance && (k.touches.touchstart.y < k.touches.touchmove.y ? k.up() : k.down())));
                            break;
                        case "touchend":
                            k.touches[b.type] === !1 && (k.touches[b.type] = !0, k.touches.touchstart.y > -1 && k.touches.touchmove.y > -1 && "y" === k.touches.direction && (Math.abs(k.touches.touchmove.y - k.touches.touchstart.y) > k.options.distance && (k.touches.touchstart.y < k.touches.touchmove.y ? k.up() : k.down()), k.touches.touchstart.y = -1, k.touches.touchstart.x = -1, k.touches.direction = "undetermined"))
                    }
                },
                down: function() {
                    q < m.length - 1 && (H() && q < m.length - 1 ? (q++, e(q, !1, !0, !1)) : Math.floor(o[q].height() / u.height()) > s ? (g(parseInt(m[q]) + u.height() * s), s += 1) : g(parseInt(m[q]) + (o[q].outerHeight() - u.height())))
                },
                up: function() {
                    q >= 0 && (E() && q > 0 ? (q--, e(q, !1, !0, !1)) : s > 2 ? (s -= 1, g(parseInt(m[q]) + u.height() * s)) : (s = 1, g(parseInt(m[q]))))
                },
                init: function() {
                    c.addEventListener && G.touchScroll && (c.addEventListener("touchstart", k.touchHandler, !1), c.addEventListener("touchmove", k.touchHandler, !1), c.addEventListener("touchend", k.touchHandler, !1))
                }
            }, l = {
                refresh: function(a, b) {
                    clearTimeout(i), i = setTimeout(function() {
                        r(!0), C(b, !1), a && G.afterResize()
                    }, 400)
                },
                handleUpdate: function() {
                    l.refresh(!1, !1)
                },
                handleResize: function() {
                    l.refresh(!0, !1)
                },
                handleOrientation: function() {
                    l.refresh(!0, !0)
                }
            }, G = a.extend(G, d), r(!1), C(!1, !0), !0 === t ? e(q, !1, !0, !0) : setTimeout(function() {
                j.calculateNearest(!0, !1)
            }, 200), m.length && (j.init(), k.init(), u.on("resize", l.handleResize), c.addEventListener && b.addEventListener("orientationchange", l.handleOrientation, !1))
        };
    return H.move = function(b) {
        return b !== d && (b.originalEvent && (b = a(this).attr("href")), void g(b, !1))
    }, H.instantMove = function(a) {
        return a !== d && void g(a, !0)
    }, H.next = function() {
        q < n.length && (q += 1, e(q, !1, !0, !0))
    }, H.previous = function() {
        q > 0 && (q -= 1, e(q, !1, !0, !0))
    }, H.instantNext = function() {
        q < n.length && (q += 1, e(q, !0, !0, !0))
    }, H.instantPrevious = function() {
        q > 0 && (q -= 1, e(q, !0, !0, !0))
    }, H.destroy = function() {
        return !!D && (G.setHeights && a(G.section).each(function() {
            a(this).css("height", "auto")
        }), u.off("resize", l.handleResize), G.scrollbars && (u.off("mousedown", j.handleMousedown), u.off("mouseup", j.handleMouseup), u.off("scroll", j.handleScroll)), u.off(F, j.wheelHandler), u.off("keydown", j.keyHandler), c.addEventListener && G.touchScroll && (c.removeEventListener("touchstart", k.touchHandler, !1), c.removeEventListener("touchmove", k.touchHandler, !1), c.removeEventListener("touchend", k.touchHandler, !1)), m = [], n = [], o = [], void(p = []))
    }, H.update = function() {
        return !!D && void l.handleUpdate()
    }, H.current = function() {
        return o[q]
    }, H.disable = function() {
        z = !0
    }, H.enable = function() {
        z = !1, D && j.calculateNearest(!1, !1)
    }, H.isDisabled = function() {
        return z
    }, H.setOptions = function(c) {
        return !!D && void("object" == typeof c ? (G = a.extend(G, c), l.handleUpdate()) : b.console && console.warn("Scrollify warning: setOptions expects an object."))
    }, a.scrollify = H, H
});
/**
 * Tweetie: A simple Twitter feed plugin
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */
! function(e) {
    "use strict";
    e.fn.twittie = function() {
        var t = arguments[0] instanceof Object ? arguments[0] : {},
            a = "function" == typeof arguments[0] ? arguments[0] : arguments[1],
            r = e.extend({
                username: null,
                list: null,
                hashtag: null,
                count: 10,
                hideReplies: !1,
                dateFormat: "%b/%d/%Y",
                template: "{{date}} - {{tweet}}",
                apiPath: "api/tweet.php",
                loadingText: "Loading..."
            }, t);
        r.list && !r.username && e.error("If you want to fetch tweets from a list, you must define the username of the list owner.");
        var n = function(e) {
                var t = e.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, '<a href="$1" target="_blank" title="Visit this link">$1</a>').replace(/#([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/search?q=%23$1&amp;src=hash" target="_blank" title="Search for #$1">#$1</a>').replace(/@([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/$1" target="_blank" title="$1 on Twitter">@$1</a>');
                return t
            },
            s = function(e) {
                var t = e.split(" ");
                e = new Date(Date.parse(t[1] + " " + t[2] + ", " + t[5] + " " + t[3] + " UTC"));
                for (var a = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], n = {
                        "%d": e.getDate(),
                        "%m": e.getMonth() + 1,
                        "%b": a[e.getMonth()].substr(0, 3),
                        "%B": a[e.getMonth()],
                        "%y": String(e.getFullYear()).slice(-2),
                        "%Y": e.getFullYear()
                    }, s = r.dateFormat, u = r.dateFormat.match(/%[dmbByY]/g), i = 0, l = u.length; l > i; i++) s = s.replace(u[i], n[u[i]]);
                return s
            },
            u = function(e) {
                for (var t = r.template, a = ["date", "tweet", "avatar", "url", "retweeted", "screen_name", "user_name"], n = 0, s = a.length; s > n; n++) t = t.replace(new RegExp("{{" + a[n] + "}}", "gi"), e[a[n]]);
                return t
            };
        this.html("<span>" + r.loadingText + "</span>");
        var i = this;
        e.getJSON(r.apiPath, {
            username: r.username,
            list: r.list,
            hashtag: r.hashtag,
            count: r.count,
            exclude_replies: r.hideReplies
        }, function(e) {
            i.find("span").fadeOut("fast", function() {
                i.html("<ul></ul>");
                for (var t = 0; t < r.count; t++) {
                    var l = !1;
                    if (e[t]) l = e[t];
                    else {
                        if (void 0 === e.statuses || !e.statuses[t]) break;
                        l = e.statuses[t]
                    }
                    var o = {
                        user_name: l.user.name,
                        date: s(l.created_at),
                        tweet: n(l.retweeted ? "RT @" + l.user.screen_name + ": " + l.retweeted_status.text : l.text),
                        avatar: '<img src="' + l.user.profile_image_url + '" />',
                        url: "https://twitter.com/" + l.user.screen_name + "/status/" + l.id_str,
                        retweeted: l.retweeted,
                        screen_name: n("@" + l.user.screen_name)
                    };
                    i.find("ul").append("<li>" + u(o) + "</li>")
                }
                "function" == typeof a && a()
            })
        })
    }
}(jQuery);
/*
 * Copyright (C) 2009 Joel Sutherland
 * Licenced under the MIT license
 * http://www.newmediacampaigns.com/page/jquery-flickr-plugin
 *
 * Available tags for templates:
 * title, link, date_taken, description, published, author, author_id, tags, image*
 */
(function($) {
    $.fn.jflickrfeed = function(settings, callback) {
        settings = $.extend(true, {
            flickrbase: 'http://api.flickr.com/services/feeds/',
            feedapi: 'photos_public.gne',
            limit: 20,
            qstrings: {
                lang: 'en-us',
                format: 'json',
                jsoncallback: '?'
            },
            cleanDescription: true,
            useTemplate: true,
            itemTemplate: '',
            itemCallback: function() {}
        }, settings);
        var url = settings.flickrbase + settings.feedapi + '?';
        var first = true;
        for (var key in settings.qstrings) {
            if (!first)
                url += '&';
            url += key + '=' + settings.qstrings[key];
            first = false;
        }
        return $(this).each(function() {
            var $container = $(this);
            var container = this;
            $.getJSON(url, function(data) {
                $.each(data.items, function(i, item) {
                    if (i < settings.limit) {
                        if (settings.cleanDescription) {
                            var regex = /<p>(.*?)<\/p>/g;
                            var input = item.description;
                            if (regex.test(input)) {
                                item.description = input.match(regex)[2]
                                if (item.description != undefined)
                                    item.description = item.description.replace('<p>', '').replace('</p>', '');
                            }
                        }
                        item['image_s'] = item.media.m.replace('_m', '_s');
                        item['image_t'] = item.media.m.replace('_m', '_t');
                        item['image_m'] = item.media.m.replace('_m', '_m');
                        item['image'] = item.media.m.replace('_m', '');
                        item['image_b'] = item.media.m.replace('_m', '_b');
                        delete item.media;
                        if (settings.useTemplate) {
                            var template = settings.itemTemplate;
                            for (var key in item) {
                                var rgx = new RegExp('{{' + key + '}}', 'g');
                                template = template.replace(rgx, item[key]);
                            }
                            $container.append(template)
                        }
                        settings.itemCallback.call(container, item);
                    }
                });
                if ($.isFunction(callback)) {
                    callback.call(container, data);
                }
            });
        });
    }
})(jQuery);
/* https://github.com/mhuggins/jquery-countTo */
(function(e) {
    function t(e, t) {
        return e.toFixed(t.decimals)
    }
    e.fn.countTo = function(t) {
        t = t || {};
        return e(this).each(function() {
            function l() {
                a += i;
                u++;
                c(a);
                if (typeof n.onUpdate == "function") {
                    n.onUpdate.call(s, a)
                }
                if (u >= r) {
                    o.removeData("countTo");
                    clearInterval(f.interval);
                    a = n.to;
                    if (typeof n.onComplete == "function") {
                        n.onComplete.call(s, a)
                    }
                }
            }

            function c(e) {
                var t = n.formatter.call(s, e, n);
                o.text(t)
            }
            var n = e.extend({}, e.fn.countTo.defaults, {
                from: e(this).data("from"),
                to: e(this).data("to"),
                speed: e(this).data("speed"),
                refreshInterval: e(this).data("refresh-interval"),
                decimals: e(this).data("decimals")
            }, t);
            var r = Math.ceil(n.speed / n.refreshInterval),
                i = (n.to - n.from) / r;
            var s = this,
                o = e(this),
                u = 0,
                a = n.from,
                f = o.data("countTo") || {};
            o.data("countTo", f);
            if (f.interval) {
                clearInterval(f.interval)
            }
            f.interval = setInterval(l, n.refreshInterval);
            c(a)
        })
    };
    e.fn.countTo.defaults = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: t,
        onUpdate: null,
        onComplete: null
    }
})(jQuery);
/*! Morphext - v2.4.7 - 2016-11-04 */
! function(a) {
    "use strict";

    function b(b, c) {
        this.element = a(b), this.settings = a.extend({}, d, c), this._defaults = d, this._init()
    }
    var c = "Morphext",
        d = {
            animation: "bounceIn",
            separator: ",",
            speed: 2e3,
            complete: a.noop
        };
    b.prototype = {
        _init: function() {
            var b = this;
            this.phrases = [], this.element.addClass("morphext"), a.each(this.element.text().split(this.settings.separator), function(c, d) {
                b.phrases.push(a.trim(d))
            }), this.index = -1, this.animate(), this.start()
        },
        animate: function() {
            this.index = ++this.index % this.phrases.length, this.element[0].innerHTML = '<span class="animated ' + this.settings.animation + '">' + this.phrases[this.index] + "</span>", a.isFunction(this.settings.complete) && this.settings.complete.call(this)
        },
        start: function() {
            var a = this;
            this._interval = setInterval(function() {
                a.animate()
            }, this.settings.speed)
        },
        stop: function() {
            this._interval = clearInterval(this._interval)
        }
    }, a.fn[c] = function(d) {
        return this.each(function() {
            a.data(this, "plugin_" + c) || a.data(this, "plugin_" + c, new b(this, d))
        })
    }
}(jQuery);
/**!
 * easy-pie-chart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.7
 **/
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    var b = function(a, b) {
            var c, d = document.createElement("canvas");
            a.appendChild(d), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
            var e = d.getContext("2d");
            d.width = d.height = b.size;
            var f = 1;
            window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
            var g = (b.size - b.lineWidth) / 2;
            b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function() {
                return +new Date
            };
            var h = function(a, b, c) {
                    c = Math.min(Math.max(-1, c || 0), 1);
                    var d = 0 >= c ? !0 : !1;
                    e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
                },
                i = function() {
                    var a, c;
                    e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
                    for (var d = 24; d > 0; --d) d % 6 === 0 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
                    e.restore()
                },
                j = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                        window.setTimeout(a, 1e3 / 60)
                    }
                }(),
                k = function() {
                    b.scaleColor && i(), b.trackColor && h(b.trackColor, b.trackWidth || b.lineWidth, 1)
                };
            this.getCanvas = function() {
                return d
            }, this.getCtx = function() {
                return e
            }, this.clear = function() {
                e.clearRect(b.size / -2, b.size / -2, b.size, b.size)
            }, this.draw = function(a) {
                b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
                var d;
                d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
            }.bind(this), this.animate = function(a, c) {
                var d = Date.now();
                b.onStart(a, c);
                var e = function() {
                    var f = Math.min(Date.now() - d, b.animate.duration),
                        g = b.easing(this, f, a, c - a, b.animate.duration);
                    this.draw(g), b.onStep(a, c, g), f >= b.animate.duration ? b.onStop(a, c) : j(e)
                }.bind(this);
                j(e)
            }.bind(this)
        },
        c = function(a, c) {
            var d = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                trackWidth: void 0,
                size: 110,
                rotate: 0,
                animate: {
                    duration: 1e3,
                    enabled: !0
                },
                easing: function(a, b, c, d, e) {
                    return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
                },
                onStart: function(a, b) {},
                onStep: function(a, b, c) {},
                onStop: function(a, b) {}
            };
            if ("undefined" != typeof b) d.renderer = b;
            else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                d.renderer = SVGRenderer
            }
            var e = {},
                f = 0,
                g = function() {
                    this.el = a, this.options = e;
                    for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
                    "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? e.easing = jQuery.easing[e.easing] : e.easing = d.easing, "number" == typeof e.animate && (e.animate = {
                        duration: e.animate,
                        enabled: !0
                    }), "boolean" != typeof e.animate || e.animate || (e.animate = {
                        duration: 1e3,
                        enabled: e.animate
                    }), this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
                }.bind(this);
            this.update = function(a) {
                return a = parseFloat(a), e.animate.enabled ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this
            }.bind(this), this.disableAnimation = function() {
                return e.animate.enabled = !1, this
            }, this.enableAnimation = function() {
                return e.animate.enabled = !0, this
            }, g()
        };
    a.fn.easyPieChart = function(b) {
        return this.each(function() {
            var d;
            a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
        })
    }
});
/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 */
! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    "use strict";

    function b(a) {
        if (a instanceof Date) return a;
        if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a);
        throw new Error("Couldn't cast `" + a + "` to a date object.")
    }

    function c(a) {
        var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(b)
    }

    function d(a) {
        return function(b) {
            var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (d)
                for (var f = 0, g = d.length; f < g; ++f) {
                    var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        j = c(h[0]),
                        k = h[1] || "",
                        l = h[3] || "",
                        m = null;
                    h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && m < 10 && (m = "0" + m.toString()), b = b.replace(j, m.toString()))
                }
            return b = b.replace(/%%/, "%")
        }
    }

    function e(a, b) {
        var c = "s",
            d = "";
        return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), Math.abs(b) > 1 ? c : d
    }
    var f = [],
        g = [],
        h = {
            precision: 100,
            elapse: !1,
            defer: !1
        };
    g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|"));
    var i = {
            Y: "years",
            m: "months",
            n: "daysToMonth",
            d: "daysToWeek",
            w: "weeks",
            W: "weeksToMonth",
            H: "hours",
            M: "minutes",
            S: "seconds",
            D: "totalDays",
            I: "totalHours",
            N: "totalMinutes",
            T: "totalSeconds"
        },
        j = function(b, c, d) {
            this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.options = a.extend({}, h), this.firstTick = !0, this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && ("function" == typeof d ? (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)) : this.options = a.extend({}, h, d)), this.setFinalDate(c), this.options.defer === !1 && this.start()
        };
    a.extend(j.prototype, {
        start: function() {
            null !== this.interval && clearInterval(this.interval);
            var a = this;
            this.update(), this.interval = setInterval(function() {
                a.update.call(a)
            }, this.options.precision)
        },
        stop: function() {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        },
        toggle: function() {
            this.interval ? this.stop() : this.start()
        },
        pause: function() {
            this.stop()
        },
        resume: function() {
            this.start()
        },
        remove: function() {
            this.stop.call(this), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        },
        setFinalDate: function(a) {
            this.finalDate = b(a)
        },
        update: function() {
            if (0 === this.$el.closest("html").length) return void this.remove();
            var a, b = new Date;
            return a = this.finalDate.getTime() - b.getTime(), a = Math.ceil(a / 1e3), a = !this.options.elapse && a < 0 ? 0 : Math.abs(a), this.totalSecsLeft === a || this.firstTick ? void(this.firstTick = !1) : (this.totalSecsLeft = a, this.elapsed = b >= this.finalDate, this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - b.getFullYear()),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                totalSeconds: this.totalSecsLeft
            }, void(this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish"))))
        },
        dispatchEvent: function(b) {
            var c = a.Event(b + ".countdown");
            c.finalDate = this.finalDate, c.elapsed = this.elapsed, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c)
        }
    }), a.fn.countdown = function() {
        var b = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var c = a(this).data("countdown-instance");
            if (void 0 !== c) {
                var d = f[c],
                    e = b[0];
                j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))
            } else new j(this, b[0], b[1])
        })
    }
});
/*!
   --------------------------------
   Infinite Scroll
   --------------------------------
   + https://github.com/paulirish/infinite-scroll
   + version 2.1.0
   + Copyright 2011/12 Paul Irish & Luke Shumard
   + Licensed under the MIT license

   + Documentation: http://infinite-scroll.com/
*/

(function(e, t, n) {
    "use strict";
    t.infinitescroll = function(n, r, i) {
        this.element = t(i);
        if (!this._create(n, r)) {
            this.failed = true
        }
    };
    t.infinitescroll.defaults = {
        loading: {
            finished: n,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.44</em>",
            img: "",
            msg: null,
            msgText: "<em>Loading the next set of posts...</em>",
            selector: null,
            speed: "fast",
            start: n
        },
        state: {
            isDuringAjax: false,
            isInvalidPage: false,
            isDestroyed: false,
            isDone: false,
            isPaused: false,
            isBeyondMaxPage: false,
            currPage: 1
        },
        debug: false,
        behavior: n,
        binder: t(e),
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null,
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: false,
        pathParse: n,
        dataType: "html",
        appendCallback: true,
        bufferPx: 40,
        errorCallback: function() {},
        infid: 0,
        pixelsFromNavToBottom: n,
        path: n,
        prefill: false,
        maxPage: n
    };
    t.infinitescroll.prototype = {
        _binding: function(t) {
            var r = this,
                i = r.options;
            i.v = "2.0b2.120520";
            if (!!i.behavior && this["_binding_" + i.behavior] !== n) {
                this["_binding_" + i.behavior].call(this);
                return
            }
            if (t !== "bind" && t !== "unbind") {
                this._debug("Binding value  " + t + " not valid");
                return false
            }
            if (t === "unbind") {
                this.options.binder.unbind("smartscroll.infscr." + r.options.infid)
            } else {
                this.options.binder[t]("smartscroll.infscr." + r.options.infid, function() {
                    r.scroll()
                })
            }
            this._debug("Binding", t)
        },
        _create: function(i, s) {
            var o = t.extend(true, {}, t.infinitescroll.defaults, i);
            this.options = o;
            var u = t(e);
            var a = this;
            if (!a._validate(i)) {
                return false
            }
            var f = t(o.nextSelector).attr("href");
            if (!f) {
                this._debug("Navigation selector not found");
                return false
            }
            o.path = o.path || this._determinepath(f);
            o.contentSelector = o.contentSelector || this.element;
            o.loading.selector = o.loading.selector || o.contentSelector;
            o.loading.msg = o.loading.msg || t('<div id="infscr-loading"><img alt="Loading..." src="' + o.loading.img + '" /><div>' + o.loading.msgText + "</div></div>");
            (new Image).src = o.loading.img;
            if (o.pixelsFromNavToBottom === n) {
                o.pixelsFromNavToBottom = t(document).height() - t(o.navSelector).offset().top;
                this._debug("pixelsFromNavToBottom: " + o.pixelsFromNavToBottom)
            }
            var l = this;
            o.loading.start = o.loading.start || function() {
                t(o.navSelector).hide();
                o.loading.msg.appendTo(o.loading.selector).show(o.loading.speed, t.proxy(function() {
                    this.beginAjax(o)
                }, l))
            };
            o.loading.finished = o.loading.finished || function() {
                if (!o.state.isBeyondMaxPage) o.loading.msg.fadeOut(o.loading.speed)
            };
            o.callback = function(e, r, i) {
                if (!!o.behavior && e["_callback_" + o.behavior] !== n) {
                    e["_callback_" + o.behavior].call(t(o.contentSelector)[0], r, i)
                }
                if (s) {
                    s.call(t(o.contentSelector)[0], r, o, i)
                }
                if (o.prefill) {
                    u.bind("resize.infinite-scroll", e._prefill)
                }
            };
            if (i.debug) {
                if (Function.prototype.bind && (typeof console === "object" || typeof console === "function") && typeof console.log === "object") {
                    ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function(e) {
                        console[e] = this.call(console[e], console)
                    }, Function.prototype.bind)
                }
            }
            this._setup();
            if (o.prefill) {
                this._prefill()
            }
            return true
        },
        _prefill: function() {
            function s() {
                return r.options.contentSelector.height() <= i.height()
            }
            var r = this;
            var i = t(e);
            this._prefill = function() {
                if (s()) {
                    r.scroll()
                }
                i.bind("resize.infinite-scroll", function() {
                    if (s()) {
                        i.unbind("resize.infinite-scroll");
                        r.scroll()
                    }
                })
            };
            this._prefill()
        },
        _debug: function() {
            if (true !== this.options.debug) {
                return
            }
            if (typeof console !== "undefined" && typeof console.log === "function") {
                if (Array.prototype.slice.call(arguments).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === "string") {
                    console.log(Array.prototype.slice.call(arguments).toString())
                } else {
                    console.log(Array.prototype.slice.call(arguments))
                }
            } else if (!Function.prototype.bind && typeof console !== "undefined" && typeof console.log === "object") {
                Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments))
            }
        },
        _determinepath: function(t) {
            var r = this.options;
            if (!!r.behavior && this["_determinepath_" + r.behavior] !== n) {
                return this["_determinepath_" + r.behavior].call(this, t)
            }
            if (!!r.pathParse) {
                this._debug("pathParse manual");
                return r.pathParse(t, this.options.state.currPage + 1)
            } else if (t.match(/^(.*?)\b2\b(.*?$)/)) {
                t = t.match(/^(.*?)\b2\b(.*?$)/).slice(1)
            } else if (t.match(/^(.*?)2(.*?$)/)) {
                if (t.match(/^(.*?page=)2(\/.*|$)/)) {
                    t = t.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                    return t
                }
                t = t.match(/^(.*?)2(.*?$)/).slice(1)
            } else {
                if (t.match(/^(.*?page=)1(\/.*|$)/)) {
                    t = t.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                    return t
                } else {
                    this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");
                    r.state.isInvalidPage = true
                }
            }
            this._debug("determinePath", t);
            return t
        },
        _error: function(t) {
            var r = this.options;
            if (!!r.behavior && this["_error_" + r.behavior] !== n) {
                this["_error_" + r.behavior].call(this, t);
                return
            }
            if (t !== "destroy" && t !== "end") {
                t = "unknown"
            }
            this._debug("Error", t);
            if (t === "end" || r.state.isBeyondMaxPage) {
                this._showdonemsg()
            }
            r.state.isDone = true;
            r.state.currPage = 1;
            r.state.isPaused = false;
            r.state.isBeyondMaxPage = false;
            this._binding("unbind")
        },
        _loadcallback: function(i, s, o) {
            var u = this.options,
                a = this.options.callback,
                f = u.state.isDone ? "done" : !u.appendCallback ? "no-append" : "append",
                l;
            if (!!u.behavior && this["_loadcallback_" + u.behavior] !== n) {
                this["_loadcallback_" + u.behavior].call(this, i, s);
                return
            }
            switch (f) {
                case "done":
                    this._showdonemsg();
                    return false;
                case "no-append":
                    if (u.dataType === "html") {
                        s = "<div>" + s + "</div>";
                        s = t(s).find(u.itemSelector)
                    }
                    break;
                case "append":
                    var c = i.children();
                    if (c.length === 0) {
                        return this._error("end")
                    }
                    l = document.createDocumentFragment();
                    while (i[0].firstChild) {
                        l.appendChild(i[0].firstChild)
                    }
                    this._debug("contentSelector", t(u.contentSelector)[0]);
                    t(u.contentSelector)[0].appendChild(l);
                    s = c.get();
                    break
            }
            u.loading.finished.call(t(u.contentSelector)[0], u);
            if (u.animate) {
                var h = t(e).scrollTop() + t(u.loading.msg).height() + u.extraScrollPx + "px";
                t("html,body").animate({
                    scrollTop: h
                }, 800, function() {
                    u.state.isDuringAjax = false
                })
            }
            if (!u.animate) {
                u.state.isDuringAjax = false
            }
            a(this, s, o);
            if (u.prefill) {
                this._prefill()
            }
        },
        _nearbottom: function() {
            var i = this.options,
                s = 0 + t(document).height() - i.binder.scrollTop() - t(e).height();
            if (!!i.behavior && this["_nearbottom_" + i.behavior] !== n) {
                return this["_nearbottom_" + i.behavior].call(this)
            }
            this._debug("math:", s, i.pixelsFromNavToBottom);
            return s - i.bufferPx < i.pixelsFromNavToBottom
        },
        _pausing: function(t) {
            var r = this.options;
            if (!!r.behavior && this["_pausing_" + r.behavior] !== n) {
                this["_pausing_" + r.behavior].call(this, t);
                return
            }
            if (t !== "pause" && t !== "resume" && t !== null) {
                this._debug("Invalid argument. Toggling pause value instead")
            }
            t = t && (t === "pause" || t === "resume") ? t : "toggle";
            switch (t) {
                case "pause":
                    r.state.isPaused = true;
                    break;
                case "resume":
                    r.state.isPaused = false;
                    break;
                case "toggle":
                    r.state.isPaused = !r.state.isPaused;
                    break
            }
            this._debug("Paused", r.state.isPaused);
            return false
        },
        _setup: function() {
            var t = this.options;
            if (!!t.behavior && this["_setup_" + t.behavior] !== n) {
                this["_setup_" + t.behavior].call(this);
                return
            }
            this._binding("bind");
            return false
        },
        _showdonemsg: function() {
            var r = this.options;
            if (!!r.behavior && this["_showdonemsg_" + r.behavior] !== n) {
                this["_showdonemsg_" + r.behavior].call(this);
                return
            }
            r.loading.msg.find("img").hide().parent().find("div").html(r.loading.finishedMsg).animate({
                opacity: 1
            }, 2e3, function() {
                t(this).parent().fadeOut(r.loading.speed)
            });
            r.errorCallback.call(t(r.contentSelector)[0], "done")
        },
        _validate: function(n) {
            for (var r in n) {
                if (r.indexOf && r.indexOf("Selector") > -1 && t(n[r]).length === 0) {
                    this._debug("Your " + r + " found no elements.");
                    return false
                }
            }
            return true
        },
        bind: function() {
            this._binding("bind")
        },
        destroy: function() {
            this.options.state.isDestroyed = true;
            this.options.loading.finished();
            return this._error("destroy")
        },
        pause: function() {
            this._pausing("pause")
        },
        resume: function() {
            this._pausing("resume")
        },
        beginAjax: function(r) {
            var i = this,
                s = r.path,
                o, u, a, f;
            r.state.currPage++;
            if (r.maxPage != n && r.state.currPage > r.maxPage) {
                r.state.isBeyondMaxPage = true;
                this.destroy();
                return
            }
            o = t(r.contentSelector).is("table, tbody") ? t("<tbody/>") : t("<div/>");
            u = typeof s === "function" ? s(r.state.currPage) : s.join(r.state.currPage);
            i._debug("heading into ajax", u);
            a = r.dataType === "html" || r.dataType === "json" ? r.dataType : "html+callback";
            if (r.appendCallback && r.dataType === "html") {
                a += "+callback"
            }
            switch (a) {
                case "html+callback":
                    i._debug("Using HTML via .load() method");
                    o.load(u + " " + r.itemSelector, n, function(t) {
                        i._loadcallback(o, t, u)
                    });
                    break;
                case "html":
                    i._debug("Using " + a.toUpperCase() + " via $.ajax() method");
                    t.ajax({
                        url: u,
                        dataType: r.dataType,
                        complete: function(t, n) {
                            f = typeof t.isResolved !== "undefined" ? t.isResolved() : n === "success" || n === "notmodified";
                            if (f) {
                                i._loadcallback(o, t.responseText, u)
                            } else {
                                i._error("end")
                            }
                        }
                    });
                    break;
                case "json":
                    i._debug("Using " + a.toUpperCase() + " via $.ajax() method");
                    t.ajax({
                        dataType: "json",
                        type: "GET",
                        url: u,
                        success: function(e, t, s) {
                            f = typeof s.isResolved !== "undefined" ? s.isResolved() : t === "success" || t === "notmodified";
                            if (r.appendCallback) {
                                if (r.template !== n) {
                                    var a = r.template(e);
                                    o.append(a);
                                    if (f) {
                                        i._loadcallback(o, a)
                                    } else {
                                        i._error("end")
                                    }
                                } else {
                                    i._debug("template must be defined.");
                                    i._error("end")
                                }
                            } else {
                                if (f) {
                                    i._loadcallback(o, e, u)
                                } else {
                                    i._error("end")
                                }
                            }
                        },
                        error: function() {
                            i._debug("JSON ajax request failed.");
                            i._error("end")
                        }
                    });
                    break
            }
        },
        retrieve: function(r) {
            r = r || null;
            var i = this,
                s = i.options;
            if (!!s.behavior && this["retrieve_" + s.behavior] !== n) {
                this["retrieve_" + s.behavior].call(this, r);
                return
            }
            if (s.state.isDestroyed) {
                this._debug("Instance is destroyed");
                return false
            }
            s.state.isDuringAjax = true;
            s.loading.start.call(t(s.contentSelector)[0], s)
        },
        scroll: function() {
            var t = this.options,
                r = t.state;
            if (!!t.behavior && this["scroll_" + t.behavior] !== n) {
                this["scroll_" + t.behavior].call(this);
                return
            }
            if (r.isDuringAjax || r.isInvalidPage || r.isDone || r.isDestroyed || r.isPaused) {
                return
            }
            if (!this._nearbottom()) {
                return
            }
            this.retrieve()
        },
        toggle: function() {
            this._pausing()
        },
        unbind: function() {
            this._binding("unbind")
        },
        update: function(n) {
            if (t.isPlainObject(n)) {
                this.options = t.extend(true, this.options, n)
            }
        }
    };
    t.fn.infinitescroll = function(n, r) {
        var i = typeof n;
        switch (i) {
            case "string":
                var s = Array.prototype.slice.call(arguments, 1);
                this.each(function() {
                    var e = t.data(this, "infinitescroll");
                    if (!e) {
                        return false
                    }
                    if (!t.isFunction(e[n]) || n.charAt(0) === "_") {
                        return false
                    }
                    e[n].apply(e, s)
                });
                break;
            case "object":
                this.each(function() {
                    var e = t.data(this, "infinitescroll");
                    if (e) {
                        e.update(n)
                    } else {
                        e = new t.infinitescroll(n, r, this);
                        if (!e.failed) {
                            t.data(this, "infinitescroll", e)
                        }
                    }
                });
                break
        }
        return this
    };
    var r = t.event,
        i;
    r.special.smartscroll = {
        setup: function() {
            t(this).bind("scroll", r.special.smartscroll.handler)
        },
        teardown: function() {
            t(this).unbind("scroll", r.special.smartscroll.handler)
        },
        handler: function(e, n) {
            var r = this,
                s = arguments;
            e.type = "smartscroll";
            if (i) {
                clearTimeout(i)
            }
            i = setTimeout(function() {
                t(r).trigger("smartscroll", s)
            }, n === "execAsap" ? 0 : 100)
        }
    };
    t.fn.smartscroll = function(e) {
        return e ? this.bind("smartscroll", e) : this.trigger("smartscroll", ["execAsap"])
    }
})(window, jQuery);
/*
jQuery Hover3d
Version: 1.1.0
Author: Rian Ariona
Repo: http://github.com/ariona/hover3d
*/
! function(e) {
    e.fn.hover3d = function(t) {
        var r = e.extend({
            selector: null,
            perspective: 1e3,
            sensitivity: 20,
            invert: !1,
            shine: !1,
            hoverInClass: "hover-in",
            hoverOutClass: "hover-out",
            hoverClass: "hover-3d"
        }, t);
        return this.each(function() {
            function t(e) {
                i.addClass(r.hoverInClass + " " + r.hoverClass), currentX = currentY = 0, setTimeout(function() {
                    i.removeClass(r.hoverInClass)
                }, 1e3)
            }

            function s(e) {
                var t = i.innerWidth(),
                    s = i.innerHeight(),
                    n = Math.round(e.pageX - i.offset().left),
                    o = Math.round(e.pageY - i.offset().top),
                    v = r.invert ? (t / 2 - n) / r.sensitivity : -(t / 2 - n) / r.sensitivity,
                    c = r.invert ? -(s / 2 - o) / r.sensitivity : (s / 2 - o) / r.sensitivity,
                    u = n - t / 2,
                    p = o - s / 2,
                    f = Math.atan2(p, u),
                    h = 180 * f / Math.PI - 90;
                0 > h && (h += 360), i.css({
                    perspective: r.perspective + "px",
                    transformStyle: "preserve-3d",
                    transform: "rotateY(" + v + "deg) rotateX(" + c + "deg)"
                }), a.css("background", "linear-gradient(" + h + "deg, rgba(255,255,255," + e.offsetY / s * .5 + ") 0%,rgba(255,255,255,0) 80%)")
            }

            function n() {
                i.addClass(r.hoverOutClass + " " + r.hoverClass), i.css({
                    perspective: r.perspective + "px",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(0) rotateY(0)"
                }), setTimeout(function() {
                    i.removeClass(r.hoverOutClass + " " + r.hoverClass), currentX = currentY = 0
                }, 1e3)
            }
            var o = e(this),
                i = o.find(r.selector);
            currentX = 0, currentY = 0, r.shine && i.append('<div class="shine"></div>');
            var a = e(this).find(".shine");
            o.css({
                perspective: r.perspective + "px",
                transformStyle: "preserve-3d"
            }), i.css({
                perspective: r.perspective + "px",
                transformStyle: "preserve-3d"
            }), a.css({
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                transform: "translateZ(1px)",
                "z-index": 9
            }), o.on("mouseenter", function() {
                return t()
            }), o.on("mousemove", function(e) {
                return s(e)
            }), o.on("mouseleave", function() {
                return n()
            })
        })
    }
}(jQuery);