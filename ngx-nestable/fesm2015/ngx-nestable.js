import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, ElementRef, NgZone, Output, Input, Directive, HostListener, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const _traverseChildren = (/**
 * @param {?} tree
 * @param {?} callback
 * @param {?=} parent
 * @return {?}
 */
(tree, callback, parent = null) => {
    for (let i = 0; i < tree.length; i++) {
        /** @type {?} */
        const item = tree[i];
        if (typeof item === 'undefined') {
            continue;
        }
        /** @type {?} */
        const callbackResult = callback(item, parent);
        if (callbackResult) {
            break;
        }
        if (item.children) {
            _traverseChildren(item.children, callback, item);
        }
    }
});
/** @type {?} */
const _insertAfter = (/**
 * @param {?} newNode
 * @param {?} referenceNode
 * @return {?}
 */
(newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
});
/** @type {?} */
const _replace = (/**
 * @param {?} newNode
 * @param {?} referenceNode
 * @return {?}
 */
(newNode, referenceNode) => {
    referenceNode.parentNode.replaceChild(newNode, referenceNode);
});
/** @type {?} */
const _replaceTargetWithElements = (/**
 * @param {?} target
 * @param {?} elements
 * @return {?}
 */
(target, elements) => {
    /** @type {?} */
    let i = elements.length;
    if (target.parentNode) {
        while (i--) {
            target.parentNode.insertBefore(elements[i], target);
        }
        /// remove the target.
        target.parentNode.removeChild(target);
    }
});
/** @type {?} */
const _getParents = (/**
 * @param {?} el
 * @param {?=} parentSelector
 * @return {?}
 */
(el, parentSelector = document.body) => {
    /** @type {?} */
    const parents = [];
    /** @type {?} */
    let parentNode = el.parentNode;
    while (parentNode !== parentSelector) {
        /** @type {?} */
        const o = parentNode;
        if (!parentNode) {
            break;
        }
        if (parentNode.tagName === parentSelector.tagName) {
            parents.push(o);
        }
        parentNode = o.parentNode;
    }
    parents.push(parentSelector); // Push that parentSelector you wanted to stop at
    return parents;
});
/** @type {?} */
const _closest = (/**
 * @param {?} el
 * @param {?} selector
 * @return {?}
 */
(el, selector) => {
    /** @type {?} */
    let matchesFn;
    // find vendor prefix
    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some((/**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        if (typeof document.body[fn] === 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    }));
    /** @type {?} */
    let parent;
    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent === null) {
            break;
        }
        /** @type {?} */
        const matches = parent[matchesFn](selector);
        if (parent && matches) {
            return parent;
        }
        el = parent;
    }
    return null;
});
/** @type {?} */
const _offset = (/**
 * @param {?} elem
 * @return {?}
 */
(elem) => {
    /** @type {?} */
    let box = { top: 0, left: 0 };
    // BlackBerry 5, iOS 3 (original iPhone)
    if (typeof elem.getBoundingClientRect !== undefined) {
        box = elem.getBoundingClientRect();
    }
    return {
        top: box.top + (window.pageYOffset || elem.scrollTop) - (elem.clientTop || 0),
        left: box.left + (window.pageXOffset || elem.scrollLeft) - (elem.clientLeft || 0)
    };
});
/** @type {?} */
const _findObjectInTree = (/**
 * @param {?} array
 * @param {?} id
 * @return {?}
 */
(array, id) => {
    /** @type {?} */
    let result = null;
    _traverseChildren(array, (/**
     * @param {?} item
     * @return {?}
     */
    item => {
        if (item['$$id'] === Number.parseInt(id)) {
            result = item;
            return true;
        }
    }));
    return result;
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const REGISTER_HANDLE = 'NESTABLE_DRAG_HANDLE_REGISTER';
/** @type {?} */
const DRAG_START = 'NESTABLE_DRAG_HANDLE_START';
/** @type {?} */
const EXPAND_COLLAPSE = 'NESTABLE_EXPAND_COLLAPSE_EVENT';
/** @type {?} */
const defaultSettings = (/** @type {?} */ ({
    listNodeName: 'ul',
    itemNodeName: 'li',
    rootClass: 'dd',
    listClass: 'dd-list',
    itemClass: 'dd-item',
    dragClass: 'dd-dragel',
    handleClass: 'dd-handle',
    collapsedClass: 'dd-collapsed',
    placeClass: 'dd-placeholder',
    group: 0,
    // TODO
    maxDepth: 5,
    threshold: 20,
    fixedDepth: false,
    // fixed item's depth
    exportCollapsed: true,
    // TODO
    disableDrag: false,
}));
/** @type {?} */
const mouse = {
    moving: 0,
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    nowX: 0,
    nowY: 0,
    distX: 0,
    distY: 0,
    dirAx: 0,
    dirX: 0,
    dirY: 0,
    lastDirX: 0,
    lastDirY: 0,
    distAxX: 0,
    distAxY: 0
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PX = 'px';
const ɵ0 = /**
 * @return {?}
 */
function () {
    /** @type {?} */
    const el = document.createElement('div');
    /** @type {?} */
    const docEl = document.documentElement;
    if (!('pointerEvents' in el.style)) {
        return false;
    }
    el.style.pointerEvents = 'auto';
    el.style.pointerEvents = 'x';
    docEl.appendChild(el);
    /** @type {?} */
    const supports = window.getComputedStyle &&
        window.getComputedStyle(el, '').pointerEvents === 'auto';
    docEl.removeChild(el);
    return !!supports;
};
/** @type {?} */
const hasPointerEvents = ((ɵ0))();
class NestableComponent {
    /**
     * @param {?} ref
     * @param {?} renderer
     * @param {?} el
     * @param {?} zone
     */
    constructor(ref, renderer, el, zone) {
        this.ref = ref;
        this.renderer = renderer;
        this.el = el;
        this.zone = zone;
        this.listChange = new EventEmitter();
        this.drop = new EventEmitter();
        this.drag = new EventEmitter();
        this.disclosure = new EventEmitter();
        this.options = defaultSettings;
        this.disableDrag = false;
        this.dragRootEl = null;
        this.dragEl = null;
        this.dragModel = null;
        this.moving = false;
        /**
         * Dragged element contains children, and those children contain other children and so on...
         * This property gives you the number of generations contained within the dragging item.
         */
        this.dragDepth = 0;
        /**
         * The depth of dragging item relative to element root (ngx-nestable)
         */
        this.relativeDepth = 0;
        this.hasNewRoot = false;
        this.pointEl = null;
        this.items = [];
        this._componentActive = false;
        this._mouse = Object.assign({}, mouse);
        this._list = [];
        this._itemId = 0;
        this._registerHandleDirective = false;
    }
    /**
     * @return {?}
     */
    get list() {
        return this._list;
    }
    /**
     * @param {?} list
     * @return {?}
     */
    set list(list) {
        this._list = list;
        this._generateItemIds();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // set/extend default options
        this._componentActive = true;
        /** @type {?} */
        const optionKeys = Object.keys(defaultSettings);
        for (const key of optionKeys) {
            if (typeof this.options[key] === 'undefined') {
                this.options[key] = defaultSettings[key];
            }
        }
        this._generateItemIds();
        this._generateItemExpanded();
        this._createHandleListener();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { }
    /**
     * @private
     * @return {?}
     */
    _generateItemIds() {
        _traverseChildren(this._list, (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            item['$$id'] = this._itemId++;
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _generateItemExpanded() {
        _traverseChildren(this._list, (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            if (typeof item.expanded === 'undefined') {
                item['$$expanded'] = true;
            }
            else {
                item['$$expanded'] = item.expanded;
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _createHandleListener() {
        this.renderer.listen(this.el.nativeElement, REGISTER_HANDLE, (/**
         * @return {?}
         */
        () => {
            this._registerHandleDirective = true;
        }));
        this.renderer.listen(this.el.nativeElement, DRAG_START, (/**
         * @param {?} data
         * @return {?}
         */
        data => {
            this.dragStart(data.detail.event, data.detail.param.item, data.detail.param.parentList);
        }));
        this.renderer.listen(this.el.nativeElement, EXPAND_COLLAPSE, (/**
         * @param {?} data
         * @return {?}
         */
        data => {
            this.disclosure.emit({
                item: data.detail.item,
                expanded: data.detail.item['$$expanded']
            });
        }));
    }
    /**
     * @private
     * @param {?} event
     * @param {?} dragItem
     * @return {?}
     */
    _createDragClone(event, dragItem) {
        this._mouseStart(event, dragItem);
        if (!this._registerHandleDirective) {
            this._mouse.offsetY = dragItem.nextElementSibling
                ? dragItem.nextElementSibling.clientHeight / 2
                : dragItem.clientHeight / 2;
        }
        // create drag clone
        this.dragEl = document.createElement(this.options.listNodeName);
        document.body.appendChild(this.dragEl);
        this.renderer.addClass(this.dragEl, this.options.dragClass);
        // add drag clone to body and set css
        this.renderer.setStyle(this.dragEl, 'left', event.pageX - this._mouse.offsetX + PX);
        this.renderer.setStyle(this.dragEl, 'top', event.pageY - this._mouse.offsetY + PX);
        this.renderer.setStyle(this.dragEl, 'position', 'absolute');
        this.renderer.setStyle(this.dragEl, 'z-index', 9999);
        this.renderer.setStyle(this.dragEl, 'pointer-events', 'none');
    }
    /**
     * @private
     * @param {?} event
     * @param {?} dragItem
     * @return {?}
     */
    _createPlaceholder(event, dragItem) {
        this._placeholder = document.createElement('div');
        this._placeholder.classList.add(this.options.placeClass);
        _insertAfter(this._placeholder, dragItem);
        dragItem.parentNode.removeChild(dragItem);
        this.dragEl.appendChild(dragItem);
        this.dragRootEl = dragItem;
    }
    /**
     * Sets depth proerties (relative and drag)
     * @private
     * @return {?}
     */
    _calculateDepth() {
        // total depth of dragging item
        /** @type {?} */
        let depth;
        /** @type {?} */
        const items = this.dragEl.querySelectorAll(this.options.itemNodeName);
        for (let i = 0; i < items.length; i++) {
            depth = _getParents(items[i], this.dragEl).length;
            if (depth > this.dragDepth) {
                this.dragDepth = depth;
            }
        }
        // depth relative to root
        this.relativeDepth = _getParents(this._placeholder, this.el.nativeElement.querySelector(this.options.listNodeName)).length;
    }
    /**
     * @private
     * @param {?} event
     * @param {?} dragItem
     * @return {?}
     */
    _mouseStart(event, dragItem) {
        this._mouse.offsetX = event.pageX - _offset(dragItem).left;
        this._mouse.offsetY = event.pageY - _offset(dragItem).top;
        this._mouse.startX = this._mouse.lastX = event.pageX;
        this._mouse.startY = this._mouse.lastY = event.pageY;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _mouseUpdate(event) {
        // mouse position last events
        this._mouse.lastX = this._mouse.nowX;
        this._mouse.lastY = this._mouse.nowY;
        // mouse position this events
        this._mouse.nowX = event.pageX;
        this._mouse.nowY = event.pageY;
        // distance mouse moved between events
        this._mouse.distX = this._mouse.nowX - this._mouse.lastX;
        this._mouse.distY = this._mouse.nowY - this._mouse.lastY;
        // direction mouse was moving
        this._mouse.lastDirX = this._mouse.dirX;
        this._mouse.lastDirY = this._mouse.dirY;
        // direction mouse is now moving (on both axis)
        this._mouse.dirX =
            this._mouse.distX === 0 ? 0 : this._mouse.distX > 0 ? 1 : -1;
        this._mouse.dirY =
            this._mouse.distY === 0 ? 0 : this._mouse.distY > 0 ? 1 : -1;
    }
    /**
     * @private
     * @return {?}
     */
    _showMasks() {
        /** @type {?} */
        const masks = this.el.nativeElement.getElementsByClassName('nestable-item-mask');
        for (let i = 0; i < masks.length; i++) {
            masks[i].style.display = 'block';
        }
    }
    /**
     * @private
     * @return {?}
     */
    _hideMasks() {
        /** @type {?} */
        const masks = this.el.nativeElement.getElementsByClassName('nestable-item-mask');
        for (let i = 0; i < masks.length; i++) {
            masks[i].style.display = 'none';
        }
    }
    /**
     * calc mouse traverse distance on axis
     * @private
     * @param {?} m - mouse
     * @return {?}
     */
    _calcMouseDistance(m) {
        m.distAxX += Math.abs(m.distX);
        if (m.dirX !== 0 && m.dirX !== m.lastDirX) {
            m.distAxX = 0;
        }
        m.distAxY += Math.abs(m.distY);
        if (m.dirY !== 0 && m.dirY !== m.lastDirY) {
            m.distAxY = 0;
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _move(event) {
        /** @type {?} */
        let depth;
        /** @type {?} */
        let list;
        /** @type {?} */
        const dragRect = this.dragEl.getBoundingClientRect();
        this.renderer.setStyle(this.dragEl, 'left', event.pageX - this._mouse.offsetX + PX);
        this.renderer.setStyle(this.dragEl, 'top', event.pageY - this._mouse.offsetY + PX);
        this._mouseUpdate(event);
        // axis mouse is now moving on
        /** @type {?} */
        const newAx = Math.abs(this._mouse.distX) > Math.abs(this._mouse.distY) ? 1 : 0;
        // do nothing on first move
        if (!this._mouse.moving) {
            this._mouse.dirAx = newAx;
            this._mouse.moving = 1;
            return;
        }
        // calc distance moved on this axis (and direction)
        if (this._mouse.dirAx !== newAx) {
            this._mouse.distAxX = 0;
            this._mouse.distAxY = 0;
        }
        else {
            this._calcMouseDistance(this._mouse);
        }
        this._mouse.dirAx = newAx;
        // find list item under cursor
        if (!hasPointerEvents) {
            this.dragEl.style.visibility = 'hidden';
        }
        /** @type {?} */
        const pointEl = document.elementFromPoint(event.pageX - document.body.scrollLeft, event.pageY - (window.pageYOffset || document.documentElement.scrollTop));
        if (!hasPointerEvents) {
            this.dragEl.style.visibility = 'visible';
        }
        if (pointEl &&
            (pointEl.classList.contains('nestable-item-mask') ||
                pointEl.classList.contains(this.options.placeClass))) {
            this.pointEl = pointEl.parentElement.parentElement;
        }
        else {
            return;
        }
        /**
         * move horizontal
         */
        if (!this.options.fixedDepth &&
            this._mouse.dirAx &&
            this._mouse.distAxX >= this.options.threshold) {
            // reset move distance on x-axis for new phase
            this._mouse.distAxX = 0;
            /** @type {?} */
            const previous = this._placeholder.previousElementSibling;
            // increase horizontal level if previous sibling exists, is not collapsed, and can have children
            if (this._mouse.distX > 0 && previous) {
                list = previous.querySelectorAll(this.options.listNodeName);
                list = list[list.length - 1];
                // check if depth limit has reached
                depth = _getParents(this._placeholder, this.el.nativeElement.querySelector(this.options.listNodeName)).length;
                if (depth + this.dragDepth <= this.options.maxDepth) {
                    // create new sub-level if one doesn't exist
                    if (!list) {
                        list = document.createElement(this.options.listNodeName);
                        list.style.paddingLeft = this.options.threshold + PX;
                        list.appendChild(this._placeholder);
                        previous.appendChild(list);
                        // this.setParent(previous);
                    }
                    else {
                        // else append to next level up
                        list = previous.querySelector(`:scope > ${this.options.listNodeName}`);
                        list.appendChild(this._placeholder);
                    }
                }
            }
            // decrease horizontal level
            if (this._mouse.distX < 0) {
                // we can't decrease a level if an item preceeds the current one
                /** @type {?} */
                const next = document.querySelector(`.${this.options.placeClass} + ${this.options.itemNodeName}`);
                /** @type {?} */
                const parentElement = this._placeholder.parentElement;
                if (!next && parentElement) {
                    /** @type {?} */
                    const closestItem = _closest(this._placeholder, this.options.itemNodeName);
                    if (closestItem) {
                        parentElement.removeChild(this._placeholder);
                        _insertAfter(this._placeholder, closestItem);
                    }
                }
            }
        }
        if (!pointEl.classList.contains('nestable-item-mask')) {
            return;
        }
        // find root list of item under cursor
        /** @type {?} */
        const pointElRoot = _closest(this.pointEl, `.${this.options.rootClass}`);
        /** @type {?} */
        const isNewRoot = pointElRoot
            ? this.dragRootEl.dataset['nestable-id'] !==
                pointElRoot.dataset['nestable-id']
            : false;
        /**
         * move vertical
         */
        if (!this._mouse.dirAx || isNewRoot) {
            // check if groups match if dragging over new root
            if (isNewRoot &&
                this.options.group !== pointElRoot.dataset['nestable-group']) {
                return;
            }
            // check depth limit
            depth =
                this.dragDepth -
                    1 +
                    _getParents(this.pointEl, this.el.nativeElement.querySelector(this.options.listNodeName)).length;
            if (depth > this.options.maxDepth) {
                return;
            }
            /** @type {?} */
            const before = event.pageY <
                _offset(this.pointEl).top + this.pointEl.clientHeight / 2;
            /** @type {?} */
            const placeholderParent = this._placeholder.parentNode;
            // get point element depth
            /** @type {?} */
            let pointRelativeDepth;
            pointRelativeDepth = _getParents(this.pointEl, this.el.nativeElement.querySelector(this.options.listNodeName)).length;
            if (this.options.fixedDepth) {
                if (pointRelativeDepth === this.relativeDepth - 1) {
                    /** @type {?} */
                    const childList = this.pointEl.querySelector(this.options.listNodeName);
                    if (!childList.children.length) {
                        childList.appendChild(this._placeholder);
                    }
                }
                else if (pointRelativeDepth === this.relativeDepth) {
                    if (before) {
                        this.pointEl.parentElement.insertBefore(this._placeholder, this.pointEl);
                    }
                    else {
                        _insertAfter(this._placeholder, this.pointEl);
                    }
                    if (Array.prototype.indexOf.call(this.pointEl.parentElement.children, this.pointEl) ===
                        this.pointEl.parentElement.children.length - 1) {
                        _insertAfter(this._placeholder, this.pointEl);
                    }
                }
            }
            else if (before) {
                this.pointEl.parentElement.insertBefore(this._placeholder, this.pointEl);
            }
            else {
                _insertAfter(this._placeholder, this.pointEl);
            }
        }
    }
    /**
     * @return {?}
     */
    reset() {
        /** @type {?} */
        const keys = Object.keys(this._mouse);
        for (const key of keys) {
            this._mouse[key] = 0;
        }
        this._itemId = 0;
        this.moving = false;
        this.dragEl = null;
        this.dragRootEl = null;
        this.dragDepth = 0;
        this.relativeDepth = 0;
        this.hasNewRoot = false;
        this.pointEl = null;
    }
    /**
     * @param {?} event
     * @param {?} item
     * @param {?} parentList
     * @return {?}
     */
    dragStartFromItem(event, item, parentList) {
        if (!this._registerHandleDirective) {
            this.dragStart(event, item, parentList);
        }
    }
    /**
     * @private
     * @param {?} event
     * @param {?} item
     * @param {?} parentList
     * @return {?}
     */
    dragStart(event, item, parentList) {
        this._oldListLength = this.list.length;
        if (!this.options.disableDrag) {
            event.stopPropagation();
            event.preventDefault();
            if (event.originalEvent) {
                event = event.originalEvent;
            }
            // allow only first mouse button
            if (event.type.indexOf('mouse') === 0) {
                if (event.button !== 0) {
                    return;
                }
            }
            else {
                if (event.touches.length !== 1) {
                    return;
                }
            }
            this.ref.detach();
            this._dragIndex = parentList.indexOf(item);
            this.dragModel = parentList.splice(parentList.indexOf(item), 1)[0];
            /** @type {?} */
            const dragItem = _closest(event.target, this.options.itemNodeName);
            if (dragItem === null) {
                return;
            }
            this._parentDragId = Number.parseInt(dragItem.parentElement.parentElement.id);
            /** @type {?} */
            const dragRect = dragItem.getBoundingClientRect();
            this._showMasks();
            this._createDragClone(event, dragItem);
            this.renderer.setStyle(this.dragEl, 'width', dragRect.width + PX);
            this._createPlaceholder(event, dragItem);
            this.renderer.setStyle(this._placeholder, 'height', dragRect.height + PX);
            this._calculateDepth();
            this.drag.emit({
                originalEvent: event,
                item
            });
            this._cancelMouseup = this.renderer.listen(document, 'mouseup', this.dragStop.bind(this));
            this._cancelMousemove = this.renderer.listen(document, 'mousemove', this.dragMove.bind(this));
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragStop(event) {
        this._cancelMouseup();
        this._cancelMousemove();
        this._hideMasks();
        if (this.dragEl) {
            /** @type {?} */
            const draggedId = Number.parseInt(this.dragEl.firstElementChild.id);
            /** @type {?} */
            let placeholderContainer = _closest(this._placeholder, this.options.itemNodeName);
            /** @type {?} */
            let changedElementPosition = this._dragIndex !==
                Array.prototype.indexOf.call(this._placeholder.parentElement.children, this._placeholder);
            /** @type {?} */
            const index = Array.prototype.indexOf.call(this._placeholder.parentElement.children, this._placeholder);
            if ((this._dragIndex === index) && (this._oldListLength === this.list.length)) {
                changedElementPosition = true;
            }
            // placeholder in root
            if (placeholderContainer === null) {
                this.list.splice(Array.prototype.indexOf.call(this._placeholder.parentElement.children, this._placeholder), 0, Object.assign({}, this.dragModel));
            }
            else {
                // palceholder nested
                placeholderContainer = _findObjectInTree(this.list, Number.parseInt(placeholderContainer.id));
                if (!placeholderContainer.children) {
                    placeholderContainer.children = [];
                    placeholderContainer.children.push(Object.assign({}, this.dragModel));
                }
                else {
                    placeholderContainer.children.splice(Array.prototype.indexOf.call(this._placeholder.parentElement.children, this._placeholder), 0, Object.assign({}, this.dragModel));
                }
                if (index === this._dragIndex) {
                    changedElementPosition = false;
                }
                if (!changedElementPosition) {
                    changedElementPosition =
                        placeholderContainer['$$id'] !== this._parentDragId;
                }
            }
            this._placeholder.parentElement.removeChild(this._placeholder);
            this.dragEl.parentNode.removeChild(this.dragEl);
            this.dragEl.remove();
            this.reset();
            this.listChange.emit(this.list);
            this.drop.emit({
                originalEvent: event,
                destination: placeholderContainer,
                item: this.dragModel,
                changedElementPosition
            });
            this.ref.reattach();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragMove(event) {
        if (this.dragEl) {
            event.preventDefault();
            if (event.originalEvent) {
                event = event.originalEvent;
            }
            this._move(event.type.indexOf('mouse') === 0 ? event : event.touches[0]);
        }
    }
    /**
     * @return {?}
     */
    expandAll() {
        _traverseChildren(this._list, (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            item['$$expanded'] = true;
        }));
        this.ref.markForCheck();
    }
    /**
     * @return {?}
     */
    collapseAll() {
        _traverseChildren(this._list, (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            item['$$expanded'] = false;
        }));
        this.ref.markForCheck();
    }
}
NestableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-nestable',
                template: "<ng-container *ngTemplateOutlet=\"nestableList; context:{nestable: list, depth: 0}\">\n</ng-container>\n\n<ng-template #nestableList let-nestable=\"nestable\" let-depth=\"depth\">\n    <ul [style.padding-left.px]=\"depth ? options.threshold : 0\"\n        [class]=\"options.listClass\">\n        <li [class]=\"options.itemClass\" [id]=\"item.$$id\" *ngFor=\"let item of nestable\">\n\n            <ng-container *ngTemplateOutlet=\"nestableItem; context:{nestable: nestable, item: item, depth: depth}\">\n            </ng-container>\n\n            <ng-container *ngIf=\"item.children && item.$$expanded\">\n                <ng-container *ngTemplateOutlet=\"nestableList; context:{nestable: item.children, depth: depth + 1}\">\n                </ng-container>\n            </ng-container>\n\n            <ul [class]=\"options.listClass\" [style.padding-left.px]=\"options.threshold\"></ul>\n        </li>\n    </ul>\n</ng-template>\n\n<ng-template #nestableItem let-parentList=\"nestable\" let-item=\"item\" let-depth=\"depth\">\n    <div class=\"nestable-item-container mat-list-item\" (mousedown)=\"dragStartFromItem($event, item, parentList)\">\n        <ng-container\n            *ngTemplateOutlet=\"template; context:{$implicit: {item: item, parentList: parentList}, depth: depth}\">\n        </ng-container>\n\n        <div class=\"nestable-item-mask\"></div>\n    </div>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@import url(https://fonts.googleapis.com/css?family=Roboto);ul .dd-placeholder{margin:5px 0;padding:0;min-height:30px;background:#f2fbff;border:1px dashed #b6bcbf;box-sizing:border-box}ul li .nestable-item-mask{display:none;position:absolute;top:0;bottom:0;right:0;left:0;z-index:9998}ul li .nestable-expand-button{display:block;position:relative;cursor:pointer;float:left;width:25px;height:14px;padding:0;white-space:nowrap;overflow:hidden;border:0;background:0 0;font-size:18px;line-height:1;text-align:center;font-weight:700;outline:0}ul li .nestable-item-container{position:relative;display:flex;flex-direction:row;align-items:center;color:rgba(0,0,0,.87);min-height:32px;font-size:16px;font-family:Roboto,sans-serif;cursor:pointer;outline:0;margin-bottom:2px;padding-left:8px}ul li .nestable-item-container:hover{background:rgba(0,0,0,.04)}ol,ul{list-style:none}"]
            }] }
];
/** @nocollapse */
NestableComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgZone }
];
NestableComponent.propDecorators = {
    listChange: [{ type: Output }],
    drop: [{ type: Output }],
    drag: [{ type: Output }],
    disclosure: [{ type: Output }],
    template: [{ type: Input }],
    options: [{ type: Input }],
    disableDrag: [{ type: Input }],
    list: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NestableComponent.prototype.listChange;
    /** @type {?} */
    NestableComponent.prototype.drop;
    /** @type {?} */
    NestableComponent.prototype.drag;
    /** @type {?} */
    NestableComponent.prototype.disclosure;
    /** @type {?} */
    NestableComponent.prototype.template;
    /** @type {?} */
    NestableComponent.prototype.options;
    /** @type {?} */
    NestableComponent.prototype.disableDrag;
    /** @type {?} */
    NestableComponent.prototype.dragRootEl;
    /** @type {?} */
    NestableComponent.prototype.dragEl;
    /** @type {?} */
    NestableComponent.prototype.dragModel;
    /** @type {?} */
    NestableComponent.prototype.moving;
    /**
     * Dragged element contains children, and those children contain other children and so on...
     * This property gives you the number of generations contained within the dragging item.
     * @type {?}
     */
    NestableComponent.prototype.dragDepth;
    /**
     * The depth of dragging item relative to element root (ngx-nestable)
     * @type {?}
     */
    NestableComponent.prototype.relativeDepth;
    /** @type {?} */
    NestableComponent.prototype.hasNewRoot;
    /** @type {?} */
    NestableComponent.prototype.pointEl;
    /** @type {?} */
    NestableComponent.prototype.items;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._componentActive;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._mouse;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._list;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._cancelMousemove;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._cancelMouseup;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._placeholder;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._itemId;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._registerHandleDirective;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._dragIndex;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._parentDragId;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype._oldListLength;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype.ref;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype.el;
    /**
     * @type {?}
     * @private
     */
    NestableComponent.prototype.zone;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NestableDragHandleDirective {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        /** @type {?} */
        const detail = {
            param: this.ngxNestableDragHandle,
            event: event
        };
        this._el.nativeElement.dispatchEvent(new CustomEvent(DRAG_START, { bubbles: true, detail: detail }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._el.nativeElement.dispatchEvent(new CustomEvent(REGISTER_HANDLE, { bubbles: true, detail: this.ngxNestableDragHandle }));
    }
}
NestableDragHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxNestableDragHandle]'
            },] }
];
/** @nocollapse */
NestableDragHandleDirective.ctorParameters = () => [
    { type: ElementRef }
];
NestableDragHandleDirective.propDecorators = {
    ngxNestableDragHandle: [{ type: Input }],
    onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NestableDragHandleDirective.prototype.ngxNestableDragHandle;
    /**
     * @type {?}
     * @private
     */
    NestableDragHandleDirective.prototype._el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NestableExpandCollapseDirective {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        event.stopPropagation();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this.ngxNestableExpandCollapse.item['$$expanded'] = !this.ngxNestableExpandCollapse.item['$$expanded'];
        this._el.nativeElement.dispatchEvent(new CustomEvent(EXPAND_COLLAPSE, {
            bubbles: true,
            detail: this.ngxNestableExpandCollapse
        }));
    }
}
NestableExpandCollapseDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxNestableExpandCollapse]'
            },] }
];
/** @nocollapse */
NestableExpandCollapseDirective.ctorParameters = () => [
    { type: ElementRef }
];
NestableExpandCollapseDirective.propDecorators = {
    ngxNestableExpandCollapse: [{ type: Input }],
    onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NestableExpandCollapseDirective.prototype.ngxNestableExpandCollapse;
    /**
     * @type {?}
     * @private
     */
    NestableExpandCollapseDirective.prototype._el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NestableModule {
}
NestableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [
                    NestableComponent,
                    NestableDragHandleDirective,
                    NestableExpandCollapseDirective
                ],
                exports: [
                    NestableComponent,
                    NestableDragHandleDirective,
                    NestableExpandCollapseDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NestableComponent, NestableModule, NestableDragHandleDirective as ɵa, NestableExpandCollapseDirective as ɵb };
//# sourceMappingURL=ngx-nestable.js.map
