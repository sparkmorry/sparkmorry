﻿"function" != typeof Object.create && function () {
    var b = function () {
    };
    Object.create = function (a) {
        if (1 < arguments.length)throw Error("Second argument not supported");
        if (null === a)throw Error("Cannot set a null [[Prototype]]");
        if ("object" != typeof a)throw TypeError("Argument must be an object");
        b.prototype = a;
        return new b
    }
}();
CKEDITOR.plugins.add("toolbarconfiguratorarea", {
    afterInit: function (b) {
        b.addMode("wysiwyg", function (a) {
            var c = CKEDITOR.dom.element.createFromHtml('<div class="cke_wysiwyg_div cke_reset" hidefocus="true"></div>');
            b.ui.space("contents").append(c);
            c = b.editable(c);
            c.detach = CKEDITOR.tools.override(c.detach, function (a) {
                return function () {
                    a.apply(this, arguments);
                    this.remove()
                }
            });
            b.setData(b.getData(1), a);
            b.fire("contentDom")
        });
        b.dataProcessor.toHtml = function (a) {
            return a
        };
        b.dataProcessor.toDataFormat = function (a) {
            return a
        }
    }
});
Object.keys || (Object.keys = function () {
    var b = Object.prototype.hasOwnProperty, a = !{toString: null}.propertyIsEnumerable("toString"), c = "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "), e = c.length;
    return function (d) {
        if ("object" !== typeof d && ("function" !== typeof d || null === d))throw new TypeError("Object.keys called on non-object");
        var g = [], f;
        for (f in d)b.call(d, f) && g.push(f);
        if (a)for (f = 0; f < e; f++)b.call(d, c[f]) && g.push(c[f]);
        return g
    }
}());
(function () {
    function b(a, c) {
        this.cfg = c || {};
        this.hidden = false;
        this.editorId = a;
        this.fullToolbarEditor = new ToolbarConfigurator.FullToolbarEditor;
        this.actualConfig = this.originalConfig = this.mainContainer = null;
        this.isEditableVisible = this.waitForReady = false;
        this.toolbarContainer = null;
        this.toolbarButtons = []
    }

    ToolbarConfigurator.AbstractToolbarModifier = b;
    b.prototype.setConfig = function (a) {
        this._onInit(void 0, a, true)
    };
    b.prototype.init = function (a) {
        var c = this;
        this.mainContainer = new CKEDITOR.dom.element("div");
        if (this.fullToolbarEditor.editorInstance !== null)throw"Only one instance of ToolbarModifier is allowed";
        this.editorInstance || this._createEditor(false);
        this.editorInstance.once("loaded", function () {
            c.fullToolbarEditor.init(function () {
                c._onInit(a);
                if (typeof c.onRefresh == "function")c.onRefresh()
            }, c.editorInstance.config)
        });
        return this.mainContainer
    };
    b.prototype._onInit = function (a, c) {
        this.originalConfig = this.editorInstance.config;
        this.actualConfig = c ? JSON.parse(c) : JSON.parse(JSON.stringify(this.originalConfig));
        if (!this.actualConfig.toolbarGroups && !this.actualConfig.toolbar) {
            for (var b = this.actualConfig, d = this.editorInstance.toolbar, g = [], f = d.length, i = 0; i < f; i++) {
                var h = d[i];
                typeof h == "string" ? g.push(h) : g.push({name: h.name, groups: h.groups ? h.groups.slice() : []})
            }
            b.toolbarGroups = g
        }
        typeof a === "function" && a(this.mainContainer)
    };
    b.prototype._createModifier = function () {
        this.mainContainer.addClass("unselectable");
        this.modifyContainer && this.modifyContainer.remove();
        this.modifyContainer = new CKEDITOR.dom.element("div");
        this.modifyContainer.addClass("toolbarModifier");
        this.mainContainer.append(this.modifyContainer);
        return this.mainContainer
    };
    b.prototype.getEditableArea = function () {
        return this.editorInstance.container.findOne("#" + this.editorInstance.id + "_contents")
    };
    b.prototype._hideEditable = function () {
        var a = this.getEditableArea();
        this.isEditableVisible = false;
        this.lastEditableAreaHeight = a.getStyle("height");
        a.setStyle("height", "0")
    };
    b.prototype._showEditable = function () {
        this.isEditableVisible = true;
        this.getEditableArea().setStyle("height",
            this.lastEditableAreaHeight || "auto")
    };
    b.prototype._toggleEditable = function () {
        this.isEditableVisible ? this._hideEditable() : this._showEditable()
    };
    b.prototype._refreshEditor = function () {
        function a() {
            c.editorInstance.destroy();
            c._createEditor(true, c.getActualConfig());
            c.waitForReady = false
        }

        var c = this, b = this.editorInstance.status;
        if (!this.waitForReady)if (b == "unloaded" || b == "loaded") {
            this.waitForReady = true;
            this.editorInstance.once("instanceReady", function () {
                a()
            }, this)
        } else a()
    };
    b.prototype._createEditor = function (a,
                                          c) {
        function e() {
        }

        var d = this;
        this.editorInstance = CKEDITOR.replace(this.editorId);
        this.editorInstance.on("configLoaded", function () {
            var a = d.editorInstance.config;
            c && CKEDITOR.tools.extend(a, c, true);
            b.extendPluginsConfig(a)
        });
        this.editorInstance.on("uiSpace", function (a) {
            a.data.space != "top" && a.stop()
        }, null, null, -999);
        this.editorInstance.once("loaded", function () {
            var c = d.editorInstance.ui.instances, b;
            for (b in c)if (c[b]) {
                c[b].click = e;
                c[b].onClick = e
            }
            d.isEditableVisible || d._hideEditable();
            d.currentActive && d.currentActive.name &&
            d._highlightGroup(d.currentActive.name);
            d.hidden ? d.hideUI() : d.showUI();
            if (a && typeof d.onRefresh === "function")d.onRefresh()
        })
    };
    b.prototype.getActualConfig = function () {
        return JSON.parse(JSON.stringify(this.actualConfig))
    };
    b.prototype._createToolbar = function () {
        if (this.toolbarButtons.length) {
            this.toolbarContainer = new CKEDITOR.dom.element("div");
            this.toolbarContainer.addClass("toolbar");
            for (var a = this.toolbarButtons.length, c = 0; c < a; c = c + 1)this._createToolbarBtn(this.toolbarButtons[c])
        }
    };
    b.prototype._createToolbarBtn =
        function (a) {
            var c = ToolbarConfigurator.FullToolbarEditor.createButton(typeof a.text === "string" ? a.text : a.text.inactive, a.cssClass);
            this.toolbarContainer.append(c);
            c.data("group", a.group);
            c.addClass(a.position);
            c.on("click", function () {
                a.clickCallback.call(this, c, a)
            }, this);
            return c
        };
    b.prototype._fixGroups = function (a) {
        for (var a = a.toolbarGroups || [], c = a.length, b = 0; b < c; b = b + 1) {
            var d = a[b];
            if (d == "/") {
                d = a[b] = {};
                d.type = "separator";
                d.name = "separator" + CKEDITOR.tools.getNextNumber()
            } else {
                d.groups = d.groups || [];
                if (CKEDITOR.tools.indexOf(d.groups,
                        d.name) == -1) {
                    this.editorInstance.ui.addToolbarGroup(d.name, d.groups[d.groups.length - 1], d.name);
                    d.groups.push(d.name)
                }
                this._fixSubgroups(d)
            }
        }
    };
    b.prototype._fixSubgroups = function (a) {
        for (var a = a.groups, c = a.length, b = 0; b < c; b = b + 1) {
            var d = a[b];
            a[b] = {
                name: d,
                totalBtns: ToolbarConfigurator.ToolbarModifier.getTotalSubGroupButtonsNumber(d, this.fullToolbarEditor)
            }
        }
    };
    b.stringifyJSONintoOneLine = function (a, b) {
        var b = b || {}, e = JSON.stringify(a, null, ""), e = e.replace(/\n/g, "");
        if (b.addSpaces) {
            e = e.replace(/(\{|:|,|\[|\])/g,
                function (a) {
                    return a + " "
                });
            e = e.replace(/(\])/g, function (a) {
                return " " + a
            })
        }
        b.noQuotesOnKey && (e = e.replace(/"(\w*)":/g, function (a, b) {
            return b + ":"
        }));
        b.singleQuotes && (e = e.replace(/\"/g, "'"));
        return e
    };
    b.prototype.hideUI = function () {
        this.hidden = true;
        this.mainContainer.hide();
        this.editorInstance.container && this.editorInstance.container.hide()
    };
    b.prototype.showUI = function () {
        this.hidden = false;
        this.mainContainer.show();
        this.editorInstance.container && this.editorInstance.container.show()
    };
    b.extendPluginsConfig =
        function (a) {
            var b = a.extraPlugins, e = a.removePlugins;
            a.extraPlugins = (b ? b + "," : "") + "toolbarconfiguratorarea";
            a.removePlugins = (e ? e + "," : "") + "autogrow,dialogadvtab,elementspath,enterkey,floatingspace,htmlwriter,magicline,resize,sharedspace,tab,wysiwygarea"
        }
})();