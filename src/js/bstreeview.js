/*! @preserve
 * bstreeview.js
 * Version: 1.2.1
 * Authors: Sami CHNITER <sami.chniter@gmail.com>, Andrea Fini <andrea.fini@gmail.com>
 * Copyright 2020
 * License: Apache License 2.0
 *
 * Project: https://github.com/chniter/bstreeview
 * Project: https://github.com/nhmvienna/bs5treeview (bootstrap 5)
 */
; (function ($, window, document, undefined) {
    "use strict";
    /**
     * Default bstreeview  options.
     */
    let pluginName = "bstreeview",
        defaults = {
            expandIcon: 'fa fa-angle-down fa-fw',
            collapseIcon: 'fa fa-angle-right fa-fw',
            expandClass: 'show',
            indent: 1.25,
			chevronIntent: 1,
            parentsMarginLeft: 1.25,
            openNodeLinkOnNewTab: true

        };
    /**
     * bstreeview HTML templates.
     */
    let templates = {    
        treeviewItem: '<div class="lh-lg" data-bs-toggle="collapse"></div>',
        treeviewGroupItem: '<div class="lh-lg collapse" id="itemid"></div>',
        treeviewItemStateIcon: '<i class="state-icon"></i>',
        treeviewItemIcon: '<i class="item-icon"></i>'
    };

    let _tree;

    /**
     * BsTreeview Plugin constructor.
     * @param {*} element
     * @param {*} options
     */
    function bstreeView(element, options) {
        this.element = element;
        this.itemIdPrefix = element.id + "-item-";
        this.settings = $.extend({}, defaults, options);
        this.init();
    }
    /**
     * Avoid plugin conflict.
     */
    $.extend(bstreeView.prototype, {
        /**
         * bstreeview intialize.
         */
        init: function () {
            this.tree = [];
            this.nodes = [];
            // Retrieve bstreeview Json Data.
            if (this.settings.data) {
                if (this.settings.data.isPrototypeOf(String)) {
                    this.settings.data = $.parseJSON(this.settings.data);
                }
                this.tree = $.extend(true, [], this.settings.data);
                if (!this._tree) {
                    this._tree = JSON.parse(JSON.stringify(this.tree)); // clone node
                }
                delete this.settings.data;
            }
            // Set main bstreeview class to element.
            $(this.element).addClass('list-group');

            this.initData({ nodes: this.tree });
            let _this = this;
            this.build($(this.element), this.tree, 0);
            // Update angle icon on collapse
            $(this.element).on('click', '.list-group-item', function (e) {
                $('.state-icon', this)
                    .toggleClass(_this.settings.expandIcon)
                    .toggleClass(_this.settings.collapseIcon);
                // navigate to href if present
                if (e.target.hasAttribute('href')) {
                    if (_this.settings.openNodeLinkOnNewTab) {
                        window.open(e.target.getAttribute('href'), '_blank');
                    }
                    else {
                        window.location = e.target.getAttribute('href');
                    }
                }
                
            });
        },
        /**
         * Initialize treeview Data.
         * @param {*} node
         */
        initData: function (node) {
            if (!node.nodes) return;
            
            let parent = node;
            let _this = this;
            $.each(node.nodes, function (index, node) {            
                node.nodeId = _this.nodes.length;
                node.parentId = parent.nodeId;
                _this.nodes.push(node);

                if (node.nodes) {
                    _this.initData(node);
                }
            });
        },
        /**
         * reset the tree
         * @param {*} node start node 
         */
        reset: function(node) {
            this.settings.data = node;
            $(this.element).empty();
            this.init();
        },
        /**
         * Search in treeview
         * @param {*} text  text
         * @param {*} ignoreCase if true ignore case otherwise use case
         */
        search: function (text, ignoreCase) {            
            if (text.length > 0) {
                let resultNode = new JsonSearch().searchAndReturnStructure(this._tree,text,ignoreCase);                
                this.reset(resultNode)
            }
            else {                        
                this.reset(this._tree);
            }
        },
        /**
         * Build treeview.
         * @param {*} parentElement
         * @param {*} nodes
         * @param {*} depth
         */
        build: function (parentElement, nodes, depth) {
            let _this = this;
            // Calculate item padding.
            
            depth += 1;
            // Add each node and sub-nodes.
            $.each(nodes, function addNodes(id, node) {
				
				let leftPadding = _this.settings.parentsMarginLeft;

				if (depth > 0) {
					leftPadding = _this.settings.indent + depth * _this.settings.indent;										
				}
				
				if (!node.nodes) {
					leftPadding+=_this.settings.chevronIntent;
				}
				
                // Main node element.
                let treeItem = $(templates.treeviewItem)
                    .attr('data-bs-target', "#" + _this.itemIdPrefix + node.nodeId)
                    .attr('style', 'padding-left:' + leftPadding+"rem")                    
                // Set Expand and Collapse icones.
                if (node.nodes) {
                    let treeItemStateIcon = $(templates.treeviewItemStateIcon).addClass((node.expanded)?_this.settings.expandIcon:_this.settings.collapseIcon);
                    treeItem.append(treeItemStateIcon);
                }
                // set node icon if exist.
                if (node.icon) {
                    let treeItemIcon = $(templates.treeviewItemIcon).addClass(node.icon);
                    treeItem.append(treeItemIcon);
                }
                // Set node Text.
                treeItem.append(node.text);
                // Reset node href if present
                if (node.href) {
                    treeItem.attr('href', node.href);
                }
                // Add class to node if present
                if (node.class) {
                    treeItem.addClass(node.class);
                }
                // Add custom id to node if present
                if (node.id) {
                    treeItem.attr('id', node.id);
                }
                // Attach node to parent.
                parentElement.append(treeItem);
                // Build child nodes.
                if (node.nodes) {
                    // Node group item.
                    let treeGroup = $(templates.treeviewGroupItem).attr('id', _this.itemIdPrefix + node.nodeId);
                    parentElement.append(treeGroup);
                    _this.build(treeGroup, node.nodes, depth);
                    if (node.expanded) {
                        treeGroup.addClass(_this.settings.expandClass);
                    }
                }
            });
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new bstreeView(this, options));
            }
        });
    };
})(jQuery, window, document);


class JsonSearch {
    /**
     * Public method to search the JSON data and return the entire structure with matching nodes and their parents.
     *
     * @param {string} jsonData - The JSON data as a string.
     * @param {string} query - The search term to look for.
     * @param {boolean} ignoreCase - Flag indicating case-sensitive (false) or case-insensitive (true) search.
     * @returns {array} An array containing the entire matching structure with parent nodes.
     */
    searchAndReturnStructure(jsonData, searchText, ignoreCase) {
        let newArray = new Array();
        jsonData.forEach(item => {
            const newItem = {};
    
            for (let key in item) {
                if (key === 'nodes' && Array.isArray(item[key])) {
                    const result = this.searchAndReturnStructure(item[key], searchText, ignoreCase);
                    if (result.length > 0) {                       
                        for (let k in item) {
                            newItem[k] = item[k];
                        }
                        newItem[key] = result;
                    }
                } else if (key === 'text' && typeof item[key] === 'string' && this.match(item[key],searchText, ignoreCase)) {                    
                    //add all object
                    return newArray.push(item);
                } else if (typeof item[key] === 'object' && item[key] !== null) {
                    newItem[key] = item[key];
                }
            }
    
            if (Object.keys(newItem).length > 0) {
                newArray.push(newItem);
            }
        });
    
        return newArray;
    }
    /**
     * match values
     * @param {*} value1 
     * @param {*} value2 
     * @param {*} ignoreCase 
     */
    match(value1, value2, ignoreCase) {
        if (ignoreCase) {
            value1=value1.toLowerCase();
            value2=value2.toLowerCase();
        }
        return value1.includes(value2)
    }
  }
  
