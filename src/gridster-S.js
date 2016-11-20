(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        root.GridsterS = factory(root.$ || root.jQuery);
    }
}(this, function($) {
    var Gridster = function(id, option) {
        this.id = id;
        this.gridsterDom = $('#' + id);
        this.gridsterDom.css('list-style-type', 'none');
        this.gridsterDom.addClass('gridsterS');
        this.defaultOption = {
            "widgetBase": [50, 50],
            "widgetMargin": [10, 10],
            "namespace": id,
            "drag": {
                "draggable": true
            },
            "resize": {
                "resizeable": true
            },
            "maxRows": Number.POSITIVE_INFINITY,
            "maxCols": Number.POSITIVE_INFINITY,
            "minRows": 1,
            "minCols": 1,
            "maxWidgetWidth": Number.POSITIVE_INFINITY,
            "minWidgetWidth": 1,
            "maxWidgetHeight": Number.POSITIVE_INFINITY,
            "minWidgetHeight": 1,
            "isAutoIncreaseGrid": false
        };
        this.option = $.extend(true, {}, this.defaultOption, option);

        this.get_gridster();
    };

    Gridster.prototype = {
        get_gridster: function() {
            this.init_gridster();
            this.get_dom_msg();
        },

        init_gridster: function(id, option) {
            this.widgetBase = this.option.widgetBase;
            this.widgetMargin = this.option.widgetMargin;
            this.maxRows = this.option.maxRows;
            this.maxCols = this.option.maxCols;
            this.minRows = this.option.minRows;
            this.minCols = this.option.minCols;
            this.maxWidgetWidth = this.option.maxWidgetWidth;
            this.minWidgetWidth = this.option.minWidgetWidth;
            this.maxWidgetHeight = this.option.maxWidgetHeight;
            this.minWidgetHeight = this.option.minWidgetHeight;
            this.namespace = this.option.namespace;
        },

        generate_styleSheets: function() {

        },

        add_style_tag: function(css) {
            var tag = document.createElement('style');
            document.getElementsByTagName('head')[0].appendChild(tag);
            tag.setAttribute('type', 'text/css');
            if (tag.styleSheet) {
                tag.styleSheet.cssText = css;
            } else {
                tag.appendChild(document.createTextNode(css));
            }
        },

        get_dom_msg: function() {
            var domWidth = this.gridsterDom.width();
            var domHeight = this.gridsterDom.height();
            this.baseWidgetHeight = this.widgetBase[1] + this.widgetMargin[1];
            this.baseWidgetWidth = this.widgetBase[0] + this.widgetMargin[0];
            var canContainRows = domHeight / this.baseWidgetHeight;
            var canContainCols = domWidth / this.baseWidgetWidth;
            this.curRows = canContainRows > 1 ? parseInt(canContainRows) : this.baseWidgetHeight;
            this.curCols = canContainCols > 1 ? parseInt(canContainCols) : this.baseWidgetWidth;
            this.gridsterDom.css('width', this.curCols * this.baseWidgetWidth + 'px');
            this.gridsterDom.css('height', this.curRows + this.baseWidgetHeight + 'px');
            this.generate_styleSheets();
        }
    };

    var GridsterS = function(id, option) {
        Gridster.apply(this, arguments);
    };
    return Gridster;
}));
