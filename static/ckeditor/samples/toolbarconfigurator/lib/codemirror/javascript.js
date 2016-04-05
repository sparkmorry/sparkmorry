﻿(function (m) {
    "object" == typeof exports && "object" == typeof module ? m(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], m) : m(CodeMirror)
})(function (m) {
    m.defineMode("javascript", function (oa, p) {
        var H, l, i, t, C;

        function n(a, d, e) {
            D = a;
            I = e;
            return d
        }

        function u(a, d) {
            var e = a.next();
            if ('"' == e || "'" == e)return d.tokenize = pa(e), d.tokenize(a, d);
            if ("." == e && a.match(/^\d+(?:[eE][+\-]?\d+)?/))return n("number", "number");
            if ("." == e && a.match(".."))return n("spread", "meta");
            if (/[\[\]{}\(\),;\:\.]/.test(e))return n(e);
            if ("=" == e && a.eat(">"))return n("=>", "operator");
            if ("0" == e && a.eat(/x/i))return a.eatWhile(/[\da-f]/i), n("number", "number");
            if (/\d/.test(e))return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), n("number", "number");
            if ("/" == e) {
                if (a.eat("*"))return d.tokenize = J, J(a, d);
                if (a.eat("/"))return a.skipToEnd(), n("comment", "comment");
                if ("operator" == d.lastType || "keyword c" == d.lastType || "sof" == d.lastType || /^[\[{}\(,;:]$/.test(d.lastType)) {
                    a:for (var e = !1, c, b = !1; null != (c = a.next());) {
                        if (!e) {
                            if ("/" ==
                                c && !b)break a;
                            "[" == c ? b = !0 : b && "]" == c && (b = !1)
                        }
                        e = !e && "\\" == c
                    }
                    a.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
                    return n("regexp", "string-2")
                }
                a.eatWhile(K);
                return n("operator", "operator", a.current())
            }
            if ("`" == e)return d.tokenize = Q, Q(a, d);
            if ("#" == e)return a.skipToEnd(), n("error", "error");
            if (K.test(e))return a.eatWhile(K), n("operator", "operator", a.current());
            if (R.test(e))return a.eatWhile(R), e = a.current(), (c = ba.propertyIsEnumerable(e) && ba[e]) && "." != d.lastType ? n(c.type, c.style, e) : n("variable", "variable", e)
        }

        function pa(a) {
            return function (d,
                             e) {
                var c = !1, b;
                if (L && "@" == d.peek() && d.match(qa))return e.tokenize = u, n("jsonld-keyword", "meta");
                for (; null != (b = d.next()) && (b != a || c);)c = !c && "\\" == b;
                c || (e.tokenize = u);
                return n("string", "string")
            }
        }

        function J(a, d) {
            for (var b = !1, c; c = a.next();) {
                if ("/" == c && b) {
                    d.tokenize = u;
                    break
                }
                b = "*" == c
            }
            return n("comment", "comment")
        }

        function Q(a, d) {
            for (var b = !1, c; null != (c = a.next());) {
                if (!b && ("`" == c || "$" == c && a.eat("{"))) {
                    d.tokenize = u;
                    break
                }
                b = !b && "\\" == c
            }
            return n("quasi", "string-2", a.current())
        }

        function S(a, d) {
            d.fatArrowAt && (d.fatArrowAt =
                null);
            var b = a.string.indexOf("=>", a.start);
            if (!(0 > b)) {
                for (var c = 0, r = !1, b = b - 1; 0 <= b; --b) {
                    var T = a.string.charAt(b), f = ra.indexOf(T);
                    if (0 <= f && 3 > f) {
                        if (!c) {
                            ++b;
                            break
                        }
                        if (0 == --c)break
                    } else if (3 <= f && 6 > f)++c; else if (R.test(T))r = !0; else {
                        if (/["'\/]/.test(T))return;
                        if (r && !c) {
                            ++b;
                            break
                        }
                    }
                }
                r && !c && (d.fatArrowAt = b)
            }
        }

        function ca(a, d, b, c, r, f) {
            this.indented = a;
            this.column = d;
            this.type = b;
            this.prev = r;
            this.info = f;
            null != c && (this.align = c)
        }

        function f() {
            for (var a = arguments.length - 1; 0 <= a; a--)H.push(arguments[a])
        }

        function b() {
            f.apply(null,
                arguments);
            return !0
        }

        function v(a) {
            function d(b) {
                for (; b; b = b.next)if (b.name == a)return !0;
                return !1
            }

            var b = l;
            b.context ? (i = "def", d(b.localVars) || (b.localVars = {
                name: a,
                next: b.localVars
            })) : !d(b.globalVars) && p.globalVars && (b.globalVars = {name: a, next: b.globalVars})
        }

        function w() {
            l.context = {prev: l.context, vars: l.localVars};
            l.localVars = sa
        }

        function x() {
            l.localVars = l.context.vars;
            l.context = l.context.prev
        }

        function g(a, b) {
            var e = function () {
                var c = l, e = c.indented;
                if ("stat" == c.lexical.type)e = c.lexical.indented; else for (var f =
                    c.lexical; f && ")" == f.type && f.align; f = f.prev)e = f.indented;
                c.lexical = new ca(e, t.column(), a, null, c.lexical, b)
            };
            e.lex = !0;
            return e
        }

        function h() {
            var a = l;
            a.lexical.prev && (")" == a.lexical.type && (a.indented = a.lexical.indented), a.lexical = a.lexical.prev)
        }

        function j(a) {
            function d(e) {
                return e == a ? b() : ";" == a ? f() : b(d)
            }

            return d
        }

        function o(a, d) {
            return "var" == a ? b(g("vardef", d.length), U, j(";"), h) : "keyword a" == a ? b(g("form"), k, o, h) : "keyword b" == a ? b(g("form"), o, h) : "{" == a ? b(g("}"), V, h) : ";" == a ? b() : "if" == a ? ("else" == l.lexical.info &&
            l.cc[l.cc.length - 1] == h && l.cc.pop()(), b(g("form"), k, o, h, da)) : "function" == a ? b(s) : "for" == a ? b(g("form"), ea, o, h) : "variable" == a ? b(g("stat"), ta) : "switch" == a ? b(g("form"), k, g("}", "switch"), j("{"), V, h, h) : "case" == a ? b(k, j(":")) : "default" == a ? b(j(":")) : "catch" == a ? b(g("form"), w, j("("), W, j(")"), o, h, x) : "module" == a ? b(g("form"), w, ua, x, h) : "class" == a ? b(g("form"), va, h) : "export" == a ? b(g("form"), wa, h) : "import" == a ? b(g("form"), xa, h) : f(g("stat"), k, j(";"), h)
        }

        function k(a) {
            return fa(a, !1)
        }

        function q(a) {
            return fa(a, !0)
        }

        function fa(a,
                    d) {
            if (l.fatArrowAt == t.start) {
                var e = d ? ga : ha;
                if ("(" == a)return b(w, g(")"), E(y, ")"), h, j("=>"), e, x);
                if ("variable" == a)return f(w, y, j("=>"), e, x)
            }
            e = d ? X : M;
            return ya.hasOwnProperty(a) ? b(e) : "function" == a ? b(s, e) : "keyword c" == a ? b(d ? ia : Y) : "(" == a ? b(g(")"), Y, N, j(")"), h, e) : "operator" == a || "spread" == a ? b(d ? q : k) : "[" == a ? b(g("]"), za, h, e) : "{" == a ? F(Aa, "}", null, e) : "quasi" == a ? f(O, e) : b()
        }

        function Y(a) {
            return a.match(/[;\}\)\],]/) ? f() : f(k)
        }

        function ia(a) {
            return a.match(/[;\}\)\],]/) ? f() : f(q)
        }

        function M(a, d) {
            return "," == a ? b(k) :
                X(a, d, !1)
        }

        function X(a, d, e) {
            var c = !1 == e ? M : X, r = !1 == e ? k : q;
            if ("=>" == a)return b(w, e ? ga : ha, x);
            if ("operator" == a)return /\+\+|--/.test(d) ? b(c) : "?" == d ? b(k, j(":"), r) : b(r);
            if ("quasi" == a)return f(O, c);
            if (";" != a) {
                if ("(" == a)return F(q, ")", "call", c);
                if ("." == a)return b(Ba, c);
                if ("[" == a)return b(g("]"), Y, j("]"), h, c)
            }
        }

        function O(a, d) {
            return "quasi" != a ? f() : "${" != d.slice(d.length - 2) ? b(O) : b(k, Ca)
        }

        function Ca(a) {
            if ("}" == a)return i = "string-2", l.tokenize = Q, b(O)
        }

        function ha(a) {
            S(t, l);
            return f("{" == a ? o : k)
        }

        function ga(a) {
            S(t,
                l);
            return f("{" == a ? o : q)
        }

        function ta(a) {
            return ":" == a ? b(h, o) : f(M, j(";"), h)
        }

        function Ba(a) {
            if ("variable" == a)return i = "property", b()
        }

        function Aa(a, d) {
            if ("variable" == a || "keyword" == C)return i = "property", "get" == d || "set" == d ? b(Da) : b(G);
            if ("number" == a || "string" == a)return i = L ? "property" : C + " property", b(G);
            if ("jsonld-keyword" == a)return b(G);
            if ("[" == a)return b(k, j("]"), G)
        }

        function Da(a) {
            if ("variable" != a)return f(G);
            i = "property";
            return b(s)
        }

        function G(a) {
            if (":" == a)return b(q);
            if ("(" == a)return f(s)
        }

        function E(a,
                   d) {
            function e(c) {
                return "," == c ? (c = l.lexical, "call" == c.info && (c.pos = (c.pos || 0) + 1), b(a, e)) : c == d ? b() : b(j(d))
            }

            return function (c) {
                return c == d ? b() : f(a, e)
            }
        }

        function F(a, d, e) {
            for (var c = 3; c < arguments.length; c++)H.push(arguments[c]);
            return b(g(d, e), E(a, d), h)
        }

        function V(a) {
            return "}" == a ? b() : f(o, V)
        }

        function ja(a) {
            if (ka && ":" == a)return b(Ea)
        }

        function Ea(a) {
            if ("variable" == a)return i = "variable-3", b()
        }

        function U() {
            return f(y, ja, Z, Fa)
        }

        function y(a, d) {
            if ("variable" == a)return v(d), b();
            if ("[" == a)return F(y, "]");
            if ("{" ==
                a)return F(Ga, "}")
        }

        function Ga(a, d) {
            if ("variable" == a && !t.match(/^\s*:/, !1))return v(d), b(Z);
            "variable" == a && (i = "property");
            return b(j(":"), y, Z)
        }

        function Z(a, d) {
            if ("=" == d)return b(q)
        }

        function Fa(a) {
            if ("," == a)return b(U)
        }

        function da(a, d) {
            if ("keyword b" == a && "else" == d)return b(g("form", "else"), o, h)
        }

        function ea(a) {
            if ("(" == a)return b(g(")"), Ha, j(")"), h)
        }

        function Ha(a) {
            return "var" == a ? b(U, j(";"), P) : ";" == a ? b(P) : "variable" == a ? b(Ia) : f(k, j(";"), P)
        }

        function Ia(a, d) {
            return "in" == d || "of" == d ? (i = "keyword", b(k)) : b(M,
                P)
        }

        function P(a, d) {
            return ";" == a ? b(la) : "in" == d || "of" == d ? (i = "keyword", b(k)) : f(k, j(";"), la)
        }

        function la(a) {
            ")" != a && b(k)
        }

        function s(a, d) {
            if ("*" == d)return i = "keyword", b(s);
            if ("variable" == a)return v(d), b(s);
            if ("(" == a)return b(w, g(")"), E(W, ")"), h, o, x)
        }

        function W(a) {
            return "spread" == a ? b(W) : f(y, ja)
        }

        function va(a, d) {
            if ("variable" == a)return v(d), b(ma)
        }

        function ma(a, d) {
            if ("extends" == d)return b(k, ma);
            if ("{" == a)return b(g("}"), z, h)
        }

        function z(a, d) {
            if ("variable" == a || "keyword" == C) {
                if ("static" == d)return i = "keyword",
                    b(z);
                i = "property";
                return "get" == d || "set" == d ? b(Ja, s, z) : b(s, z)
            }
            if ("*" == d)return i = "keyword", b(z);
            if (";" == a)return b(z);
            if ("}" == a)return b()
        }

        function Ja(a) {
            if ("variable" != a)return f();
            i = "property";
            return b()
        }

        function ua(a, d) {
            if ("string" == a)return b(o);
            if ("variable" == a)return v(d), b($)
        }

        function wa(a, d) {
            return "*" == d ? (i = "keyword", b($, j(";"))) : "default" == d ? (i = "keyword", b(k, j(";"))) : f(o)
        }

        function xa(a) {
            return "string" == a ? b() : f(aa, $)
        }

        function aa(a, d) {
            if ("{" == a)return F(aa, "}");
            "variable" == a && v(d);
            "*" == d && (i =
                "keyword");
            return b(Ka)
        }

        function Ka(a, d) {
            if ("as" == d)return i = "keyword", b(aa)
        }

        function $(a, d) {
            if ("from" == d)return i = "keyword", b(k)
        }

        function za(a) {
            return "]" == a ? b() : f(q, La)
        }

        function La(a) {
            return "for" == a ? f(N, j("]")) : "," == a ? b(E(ia, "]")) : f(E(q, "]"))
        }

        function N(a) {
            if ("for" == a)return b(ea, N);
            if ("if" == a)return b(k, N)
        }

        var A = oa.indentUnit, na = p.statementIndent, L = p.jsonld, B = p.json || L, ka = p.typescript, R = p.wordCharacters || /[\w$\xa1-\uffff]/, ba = function () {
                function a(a) {
                    return {type: a, style: "keyword"}
                }

                var b = a("keyword a"),
                    e = a("keyword b"), c = a("keyword c"), f = a("operator"), h = {type: "atom", style: "atom"}, b = {
                        "if": a("if"),
                        "while": b,
                        "with": b,
                        "else": e,
                        "do": e,
                        "try": e,
                        "finally": e,
                        "return": c,
                        "break": c,
                        "continue": c,
                        "new": c,
                        "delete": c,
                        "throw": c,
                        "debugger": c,
                        "var": a("var"),
                        "const": a("var"),
                        let: a("var"),
                        "function": a("function"),
                        "catch": a("catch"),
                        "for": a("for"),
                        "switch": a("switch"),
                        "case": a("case"),
                        "default": a("default"),
                        "in": f,
                        "typeof": f,
                        "instanceof": f,
                        "true": h,
                        "false": h,
                        "null": h,
                        undefined: h,
                        NaN: h,
                        Infinity: h,
                        "this": a("this"),
                        module: a("module"),
                        "class": a("class"),
                        "super": a("atom"),
                        yield: c,
                        "export": a("export"),
                        "import": a("import"),
                        "extends": c
                    };
                if (ka) {
                    var e = {type: "variable", style: "variable-3"}, e = {
                        "interface": a("interface"),
                        "extends": a("extends"),
                        constructor: a("constructor"),
                        "public": a("public"),
                        "private": a("private"),
                        "protected": a("protected"),
                        "static": a("static"),
                        string: e,
                        number: e,
                        bool: e,
                        any: e
                    }, i;
                    for (i in e)b[i] = e[i]
                }
                return b
            }(), K = /[+\-*&%=<>!?|~^]/, qa = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,
            D, I, ra = "([{}])", ya = {
                atom: !0,
                number: !0,
                variable: !0,
                string: !0,
                regexp: !0,
                "this": !0,
                "jsonld-keyword": !0
            };
        H = i = l = null;
        C = t = void 0;
        var sa = {name: "this", next: {name: "arguments"}};
        h.lex = !0;
        return {
            startState: function (a) {
                a = {
                    tokenize: u,
                    lastType: "sof",
                    cc: [],
                    lexical: new ca((a || 0) - A, 0, "block", !1),
                    localVars: p.localVars,
                    context: p.localVars && {vars: p.localVars},
                    indented: 0
                };
                p.globalVars && "object" == typeof p.globalVars && (a.globalVars = p.globalVars);
                return a
            },
            token: function (a, b) {
                a.sol() && (b.lexical.hasOwnProperty("align") ||
                (b.lexical.align = !1), b.indented = a.indentation(), S(a, b));
                if (b.tokenize != J && a.eatSpace())return null;
                var e = b.tokenize(a, b);
                if ("comment" == D)return e;
                b.lastType = "operator" == D && ("++" == I || "--" == I) ? "incdec" : D;
                var c;
                a:{
                    var f = D, h = I, g = b.cc;
                    l = b;
                    t = a;
                    i = null;
                    H = g;
                    C = e;
                    b.lexical.hasOwnProperty("align") || (b.lexical.align = !0);
                    for (; ;)if ((g.length ? g.pop() : B ? k : o)(f, h)) {
                        for (; g.length && g[g.length - 1].lex;)g.pop()();
                        if (i) {
                            c = i;
                            break a
                        }
                        if (c = "variable" == f)b:{
                            for (c = b.localVars; c; c = c.next)if (c.name == h) {
                                c = !0;
                                break b
                            }
                            for (f = b.context; f; f =
                                f.prev)for (c = f.vars; c; c = c.next)if (c.name == h) {
                                c = !0;
                                break b
                            }
                            c = void 0
                        }
                        if (c) {
                            c = "variable-2";
                            break a
                        }
                        c = e;
                        break a
                    }
                }
                return c
            },
            indent: function (a, b) {
                if (a.tokenize == J)return m.Pass;
                if (a.tokenize != u)return 0;
                var e = b && b.charAt(0), c = a.lexical;
                if (!/^\s*else\b/.test(b))for (var f = a.cc.length - 1; 0 <= f; --f) {
                    var g = a.cc[f];
                    if (g == h)c = c.prev; else if (g != da)break
                }
                "stat" == c.type && "}" == e && (c = c.prev);
                na && (")" == c.type && "stat" == c.prev.type) && (c = c.prev);
                f = c.type;
                g = e == f;
                return "vardef" == f ? c.indented + ("operator" == a.lastType || "," ==
                a.lastType ? c.info + 1 : 0) : "form" == f && "{" == e ? c.indented : "form" == f ? c.indented + A : "stat" == f ? c.indented + ("operator" == a.lastType || "," == a.lastType || K.test(b.charAt(0)) || /[,.]/.test(b.charAt(0)) ? na || A : 0) : "switch" == c.info && !g && !1 != p.doubleIndentSwitch ? c.indented + (/^(?:case|default)\b/.test(b) ? A : 2 * A) : c.align ? c.column + (g ? 0 : 1) : c.indented + (g ? 0 : A)
            },
            electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
            blockCommentStart: B ? null : "/*",
            blockCommentEnd: B ? null : "*/",
            lineComment: B ? null : "//",
            fold: "brace",
            closeBrackets: "()[]{}''\"\"``",
            helperType: B ? "json" : "javascript",
            jsonldMode: L,
            jsonMode: B
        }
    });
    m.registerHelper("wordChars", "javascript", /[\w$]/);
    m.defineMIME("text/javascript", "javascript");
    m.defineMIME("text/ecmascript", "javascript");
    m.defineMIME("application/javascript", "javascript");
    m.defineMIME("application/x-javascript", "javascript");
    m.defineMIME("application/ecmascript", "javascript");
    m.defineMIME("application/json", {name: "javascript", json: !0});
    m.defineMIME("application/x-json", {name: "javascript", json: !0});
    m.defineMIME("application/ld+json",
        {name: "javascript", jsonld: !0});
    m.defineMIME("text/typescript", {name: "javascript", typescript: !0});
    m.defineMIME("application/typescript", {name: "javascript", typescript: !0})
});