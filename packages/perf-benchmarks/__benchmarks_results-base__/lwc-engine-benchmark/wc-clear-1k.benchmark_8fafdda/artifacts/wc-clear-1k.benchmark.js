(function () {
  'use strict';

  /* proxy-compat-disable */
  function invariant(value, msg) {
    if (!value) {
      throw new Error(`Invariant Violation: ${msg}`);
    }
  }

  function isTrue(value, msg) {
    if (!value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function isFalse(value, msg) {
    if (value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function fail(msg) {
    throw new Error(msg);
  }

  var assert = Object.freeze({
    __proto__: null,
    invariant: invariant,
    isTrue: isTrue,
    isFalse: isFalse,
    fail: fail
  });
  const {
    assign,
    create,
    defineProperties,
    defineProperty,
    freeze,
    getOwnPropertyDescriptor,
    getOwnPropertyNames,
    getPrototypeOf,
    hasOwnProperty,
    keys,
    seal,
    setPrototypeOf
  } = Object;
  const {
    filter: ArrayFilter,
    find: ArrayFind,
    forEach,
    indexOf: ArrayIndexOf,
    join: ArrayJoin,
    map: ArrayMap,
    push: ArrayPush,
    reduce: ArrayReduce,
    reverse: ArrayReverse,
    slice: ArraySlice,
    splice: ArraySplice,
    unshift: ArrayUnshift
  } = Array.prototype;
  const {
    charCodeAt: StringCharCodeAt,
    replace: StringReplace,
    slice: StringSlice,
    toLowerCase: StringToLowerCase
  } = String.prototype;

  function isUndefined(obj) {
    return obj === undefined;
  }

  function isNull(obj) {
    return obj === null;
  }

  function isTrue$1(obj) {
    return obj === true;
  }

  function isFalse$1(obj) {
    return obj === false;
  }

  function isFunction(obj) {
    return typeof obj === 'function';
  }

  function isObject(obj) {
    return typeof obj === 'object';
  }

  function getPropertyDescriptor(o, p) {
    do {
      const d = getOwnPropertyDescriptor(o, p);

      if (!isUndefined(d)) {
        return d;
      }

      o = getPrototypeOf(o);
    } while (o !== null);
  }
  const hasNativeSymbolsSupport = Symbol('x').toString() === 'Symbol(x)';

  function createHiddenField(key, namespace) {
    return hasNativeSymbolsSupport ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
  }

  const hiddenFieldsMap = new WeakMap();

  function setHiddenField(o, field, value) {
    let valuesByField = hiddenFieldsMap.get(o);

    if (isUndefined(valuesByField)) {
      valuesByField = create(null);
      hiddenFieldsMap.set(o, valuesByField);
    }

    valuesByField[field] = value;
  }

  function getHiddenField(o, field) {
    const valuesByField = hiddenFieldsMap.get(o);

    if (!isUndefined(valuesByField)) {
      return valuesByField[field];
    }
  }

  const {
    DOCUMENT_POSITION_CONTAINED_BY,
    DOCUMENT_POSITION_CONTAINS,
    DOCUMENT_POSITION_PRECEDING,
    DOCUMENT_POSITION_FOLLOWING,
    ELEMENT_NODE,
    TEXT_NODE,
    CDATA_SECTION_NODE,
    PROCESSING_INSTRUCTION_NODE,
    COMMENT_NODE,
    DOCUMENT_FRAGMENT_NODE
  } = Node;
  const {
    appendChild,
    cloneNode,
    compareDocumentPosition,
    insertBefore,
    removeChild,
    replaceChild,
    hasChildNodes
  } = Node.prototype;
  const {
    contains
  } = HTMLElement.prototype;
  const firstChildGetter = getOwnPropertyDescriptor(Node.prototype, 'firstChild').get;
  const lastChildGetter = getOwnPropertyDescriptor(Node.prototype, 'lastChild').get;
  const textContentGetter = getOwnPropertyDescriptor(Node.prototype, 'textContent').get;
  const parentNodeGetter = getOwnPropertyDescriptor(Node.prototype, 'parentNode').get;
  const ownerDocumentGetter = getOwnPropertyDescriptor(Node.prototype, 'ownerDocument').get;
  const parentElementGetter = hasOwnProperty.call(Node.prototype, 'parentElement') ? getOwnPropertyDescriptor(Node.prototype, 'parentElement').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'parentElement').get;
  const textContextSetter = getOwnPropertyDescriptor(Node.prototype, 'textContent').set;
  const childNodesGetter = hasOwnProperty.call(Node.prototype, 'childNodes') ? getOwnPropertyDescriptor(Node.prototype, 'childNodes').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'childNodes').get;
  const isConnected = hasOwnProperty.call(Node.prototype, 'isConnected') ? getOwnPropertyDescriptor(Node.prototype, 'isConnected').get : function () {
    const doc = ownerDocumentGetter.call(this);
    return doc === null || (compareDocumentPosition.call(doc, this) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
  };
  const {
    addEventListener,
    getAttribute,
    getBoundingClientRect,
    getElementsByTagName,
    getElementsByTagNameNS,
    hasAttribute,
    querySelector,
    querySelectorAll,
    removeAttribute,
    removeEventListener,
    setAttribute
  } = Element.prototype;
  const attachShadow = hasOwnProperty.call(Element.prototype, 'attachShadow') ? Element.prototype.attachShadow : () => {
    throw new TypeError('attachShadow() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill and use Lightning Web Components');
  };
  const childElementCountGetter = getOwnPropertyDescriptor(Element.prototype, 'childElementCount').get;
  const firstElementChildGetter = getOwnPropertyDescriptor(Element.prototype, 'firstElementChild').get;
  const lastElementChildGetter = getOwnPropertyDescriptor(Element.prototype, 'lastElementChild').get;
  const innerHTMLDescriptor = hasOwnProperty.call(Element.prototype, 'innerHTML') ? getOwnPropertyDescriptor(Element.prototype, 'innerHTML') : getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML');
  const innerHTMLGetter = innerHTMLDescriptor.get;
  const innerHTMLSetter = innerHTMLDescriptor.set;
  const outerHTMLDescriptor = hasOwnProperty.call(Element.prototype, 'outerHTML') ? getOwnPropertyDescriptor(Element.prototype, 'outerHTML') : getOwnPropertyDescriptor(HTMLElement.prototype, 'outerHTML');
  const outerHTMLGetter = outerHTMLDescriptor.get;
  const outerHTMLSetter = outerHTMLDescriptor.set;
  const tagNameGetter = getOwnPropertyDescriptor(Element.prototype, 'tagName').get;
  const tabIndexDescriptor = getOwnPropertyDescriptor(HTMLElement.prototype, 'tabIndex');
  const tabIndexGetter = tabIndexDescriptor.get;
  const tabIndexSetter = tabIndexDescriptor.set;
  const matches = hasOwnProperty.call(Element.prototype, 'matches') ? Element.prototype.matches : Element.prototype.msMatchesSelector;
  const childrenGetter = hasOwnProperty.call(Element.prototype, 'children') ? getOwnPropertyDescriptor(Element.prototype, 'children').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'children').get;
  const {
    getElementsByClassName
  } = HTMLElement.prototype;
  const shadowRootGetter = hasOwnProperty.call(Element.prototype, 'shadowRoot') ? getOwnPropertyDescriptor(Element.prototype, 'shadowRoot').get : () => null;
  let assignedNodes, assignedElements;

  if (typeof HTMLSlotElement !== 'undefined') {
    assignedNodes = HTMLSlotElement.prototype.assignedNodes;
    assignedElements = HTMLSlotElement.prototype.assignedElements;
  } else {
    assignedNodes = () => {
      throw new TypeError("assignedNodes() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill to start using <slot> elements in your Lightning Web Component's template");
    };

    assignedElements = () => {
      throw new TypeError("assignedElements() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill to start using <slot> elements in your Lightning Web Component's template");
    };
  }

  const dispatchEvent = 'EventTarget' in window ? EventTarget.prototype.dispatchEvent : Node.prototype.dispatchEvent;
  const eventTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'target').get;
  const eventCurrentTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'currentTarget').get;
  const focusEventRelatedTargetGetter = getOwnPropertyDescriptor(FocusEvent.prototype, 'relatedTarget').get;
  const DocumentPrototypeActiveElement = getOwnPropertyDescriptor(Document.prototype, 'activeElement').get;
  const elementFromPoint = hasOwnProperty.call(Document.prototype, 'elementFromPoint') ? Document.prototype.elementFromPoint : Document.prototype.msElementFromPoint;
  const defaultViewGetter = getOwnPropertyDescriptor(Document.prototype, 'defaultView').get;
  const {
    createComment,
    querySelectorAll: querySelectorAll$1,
    getElementById,
    getElementsByClassName: getElementsByClassName$1,
    getElementsByTagName: getElementsByTagName$1,
    getElementsByTagNameNS: getElementsByTagNameNS$1
  } = Document.prototype;
  const {
    getElementsByName
  } = HTMLDocument.prototype;
  const {
    addEventListener: windowAddEventListener,
    removeEventListener: windowRemoveEventListener
  } = window;
  const MO = MutationObserver;
  const MutationObserverObserve = MO.prototype.observe;

  function detect() {
    return typeof HTMLSlotElement === 'undefined';
  }

  const {
    createElement
  } = Document.prototype;
  const CHAR_S = 115;
  const CHAR_L = 108;
  const CHAR_O = 111;
  const CHAR_T = 116;

  function apply() {
    class HTMLSlotElement {}

    setPrototypeOf(HTMLSlotElement, HTMLElement.constructor);
    setPrototypeOf(HTMLSlotElement.prototype, HTMLElement.prototype);
    Window.prototype.HTMLSlotElement = HTMLSlotElement;
    defineProperty(Document.prototype, 'createElement', {
      value: function (tagName, _options) {
        const elm = createElement.apply(this, ArraySlice.call(arguments));

        if (tagName.length === 4 && StringCharCodeAt.call(tagName, 0) === CHAR_S && StringCharCodeAt.call(tagName, 1) === CHAR_L && StringCharCodeAt.call(tagName, 2) === CHAR_O && StringCharCodeAt.call(tagName, 3) === CHAR_T) {
          setPrototypeOf(elm, HTMLSlotElement.prototype);
        }

        return elm;
      }
    });
  }

  if (detect()) {
    apply();
  }

  const {
    assign: assign$1,
    create: create$1,
    defineProperties: defineProperties$1,
    defineProperty: defineProperty$1,
    freeze: freeze$1,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
    getOwnPropertyNames: getOwnPropertyNames$1,
    getPrototypeOf: getPrototypeOf$1,
    hasOwnProperty: hasOwnProperty$1,
    keys: keys$1,
    seal: seal$1,
    setPrototypeOf: setPrototypeOf$1
  } = Object;
  const hasNativeSymbolsSupport$1 = Symbol('x').toString() === 'Symbol(x)';

  let _globalThis;

  if (typeof globalThis === 'object') {
    _globalThis = globalThis;
  }

  function getGlobalThis() {
    if (typeof _globalThis === 'object') {
      return _globalThis;
    }

    try {
      Object.defineProperty(Object.prototype, '__magic__', {
        get: function () {
          return this;
        },
        configurable: true
      });
      _globalThis = __magic__;
      delete Object.prototype.__magic__;
    } catch (ex) {} finally {
      if (typeof _globalThis === 'undefined') {
        _globalThis = window;
      }
    }

    return _globalThis;
  }

  const _globalThis$1 = getGlobalThis();

  if (!_globalThis$1.lwcRuntimeFlags) {
    Object.defineProperty(_globalThis$1, 'lwcRuntimeFlags', {
      value: create$1(null)
    });
  }

  const runtimeFlags = _globalThis$1.lwcRuntimeFlags;

  function getOwnerDocument(node) {
    const doc = ownerDocumentGetter.call(node);
    return doc === null ? node : doc;
  }

  function getOwnerWindow(node) {
    const doc = getOwnerDocument(node);
    const win = defaultViewGetter.call(doc);

    if (win === null) {
      throw new TypeError();
    }

    return win;
  }

  let skipGlobalPatching;

  function isGlobalPatchingSkipped(node) {
    if (isUndefined(skipGlobalPatching)) {
      const ownerDocument = getOwnerDocument(node);
      skipGlobalPatching = ownerDocument.body && getAttribute.call(ownerDocument.body, 'data-global-patching-bypass') === 'temporary-bypass';
    }

    return isTrue$1(skipGlobalPatching);
  }

  function arrayFromCollection(collection) {
    const size = collection.length;
    const cloned = [];

    if (size > 0) {
      for (let i = 0; i < size; i++) {
        cloned[i] = collection[i];
      }
    }

    return cloned;
  }

  function pathComposer(startNode, composed) {
    const composedPath = [];
    let current = startNode;
    const startRoot = startNode instanceof Window ? startNode : startNode.getRootNode();

    while (!isNull(current)) {
      composedPath.push(current);
      let assignedSlot = null;

      if (current instanceof Element) {
        assignedSlot = current.assignedSlot;
      }

      if (!isNull(assignedSlot)) {
        current = assignedSlot;
      } else if (current instanceof ShadowRoot && (composed || current !== startRoot)) {
        current = current.host;
      } else {
        current = current.parentNode;
      }
    }

    let doc;

    if (startNode instanceof Window) {
      doc = startNode.document;
    } else {
      doc = getOwnerDocument(startNode);
    }

    if (composedPath[composedPath.length - 1] === doc) {
      composedPath.push(window);
    }

    return composedPath;
  }

  function retarget(refNode, path) {
    if (isNull(refNode)) {
      return null;
    }

    const refNodePath = pathComposer(refNode, true);
    const p$ = path;

    for (let i = 0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
      ancestor = p$[i];
      root = ancestor instanceof Window ? ancestor : ancestor.getRootNode();

      if (root !== lastRoot) {
        rootIdx = refNodePath.indexOf(root);
        lastRoot = root;
      }

      if (!(root instanceof SyntheticShadowRoot) || !isUndefined(rootIdx) && rootIdx > -1) {
        return ancestor;
      }
    }

    return null;
  }

  var EventListenerContext;

  (function (EventListenerContext) {
    EventListenerContext[EventListenerContext["CUSTOM_ELEMENT_LISTENER"] = 1] = "CUSTOM_ELEMENT_LISTENER";
    EventListenerContext[EventListenerContext["SHADOW_ROOT_LISTENER"] = 2] = "SHADOW_ROOT_LISTENER";
  })(EventListenerContext || (EventListenerContext = {}));

  const eventToContextMap = new WeakMap();

  function isChildNode(root, node) {
    return !!(compareDocumentPosition.call(root, node) & DOCUMENT_POSITION_CONTAINED_BY);
  }

  const GET_ROOT_NODE_CONFIG_FALSE = {
    composed: false
  };

  function getRootNodeHost(node, options) {
    let rootNode = node.getRootNode(options);

    if ('mode' in rootNode && 'delegatesFocus' in rootNode) {
      rootNode = getHost(rootNode);
    }

    return rootNode;
  }

  function targetGetter() {
    const originalCurrentTarget = eventCurrentTargetGetter.call(this);
    const originalTarget = eventTargetGetter.call(this);
    const composedPath = pathComposer(originalTarget, this.composed);
    const doc = getOwnerDocument(originalTarget);

    if (!(originalCurrentTarget instanceof Node)) {
      if (isNull(originalCurrentTarget) && isUndefined(getNodeOwnerKey(originalTarget))) {
        return originalTarget;
      }

      return retarget(doc, composedPath);
    } else if (originalCurrentTarget === doc || originalCurrentTarget === doc.body) {
      if (isUndefined(getNodeOwnerKey(originalTarget))) {
        return originalTarget;
      }

      return retarget(doc, composedPath);
    }

    const eventContext = eventToContextMap.get(this);
    const currentTarget = eventContext === EventListenerContext.SHADOW_ROOT_LISTENER ? getShadowRoot(originalCurrentTarget) : originalCurrentTarget;
    return retarget(currentTarget, composedPath);
  }

  function composedPathValue() {
    const originalTarget = eventTargetGetter.call(this);
    const originalCurrentTarget = eventCurrentTargetGetter.call(this);
    return isNull(originalCurrentTarget) ? [] : pathComposer(originalTarget, this.composed);
  }

  function patchEvent(event) {
    if (eventToContextMap.has(event)) {
      return;
    }

    defineProperties(event, {
      target: {
        get: targetGetter,
        enumerable: true,
        configurable: true
      },
      composedPath: {
        value: composedPathValue,
        writable: true,
        enumerable: true,
        configurable: true
      },
      srcElement: {
        get: targetGetter,
        enumerable: true,
        configurable: true
      },
      path: {
        get: composedPathValue,
        enumerable: true,
        configurable: true
      }
    });
    const originalRelatedTargetDescriptor = getPropertyDescriptor(event, 'relatedTarget');

    if (!isUndefined(originalRelatedTargetDescriptor)) {
      const relatedTargetGetter = originalRelatedTargetDescriptor.get;
      defineProperty(event, 'relatedTarget', {
        get() {
          const eventContext = eventToContextMap.get(this);
          const originalCurrentTarget = eventCurrentTargetGetter.call(this);
          const relatedTarget = relatedTargetGetter.call(this);

          if (isNull(relatedTarget)) {
            return null;
          }

          const currentTarget = eventContext === EventListenerContext.SHADOW_ROOT_LISTENER ? getShadowRoot(originalCurrentTarget) : originalCurrentTarget;
          return retarget(currentTarget, pathComposer(relatedTarget, true));
        },

        enumerable: true,
        configurable: true
      });
    }

    eventToContextMap.set(event, 0);
  }

  const customElementToWrappedListeners = new WeakMap();

  function getEventMap(elm) {
    let listenerInfo = customElementToWrappedListeners.get(elm);

    if (isUndefined(listenerInfo)) {
      listenerInfo = create(null);
      customElementToWrappedListeners.set(elm, listenerInfo);
    }

    return listenerInfo;
  }

  const shadowRootEventListenerMap = new WeakMap();

  function getWrappedShadowRootListener(sr, listener) {
    if (!isFunction(listener)) {
      throw new TypeError();
    }

    let shadowRootWrappedListener = shadowRootEventListenerMap.get(listener);

    if (isUndefined(shadowRootWrappedListener)) {
      shadowRootWrappedListener = function (event) {
        const {
          composed
        } = event;
        const target = eventTargetGetter.call(event);
        const currentTarget = eventCurrentTargetGetter.call(event);

        if (target !== currentTarget) {
          const rootNode = getRootNodeHost(target, {
            composed
          });

          if (isChildNode(rootNode, currentTarget) || composed === false && rootNode === currentTarget) {
            listener.call(sr, event);
          }
        }
      };

      shadowRootWrappedListener.placement = EventListenerContext.SHADOW_ROOT_LISTENER;

      shadowRootEventListenerMap.set(listener, shadowRootWrappedListener);
    }

    return shadowRootWrappedListener;
  }

  const customElementEventListenerMap = new WeakMap();

  function getWrappedCustomElementListener(elm, listener) {
    if (!isFunction(listener)) {
      throw new TypeError();
    }

    let customElementWrappedListener = customElementEventListenerMap.get(listener);

    if (isUndefined(customElementWrappedListener)) {
      customElementWrappedListener = function (event) {
        if (isValidEventForCustomElement(event)) {
          listener.call(elm, event);
        }
      };

      customElementWrappedListener.placement = EventListenerContext.CUSTOM_ELEMENT_LISTENER;

      customElementEventListenerMap.set(listener, customElementWrappedListener);
    }

    return customElementWrappedListener;
  }

  function domListener(evt) {
    patchEvent(evt);
    let immediatePropagationStopped = false;
    let propagationStopped = false;
    const {
      type,
      stopImmediatePropagation,
      stopPropagation
    } = evt;
    const currentTarget = eventCurrentTargetGetter.call(evt);
    const listenerMap = getEventMap(currentTarget);
    const listeners = listenerMap[type];
    defineProperty(evt, 'stopImmediatePropagation', {
      value() {
        immediatePropagationStopped = true;
        stopImmediatePropagation.call(evt);
      },

      writable: true,
      enumerable: true,
      configurable: true
    });
    defineProperty(evt, 'stopPropagation', {
      value() {
        propagationStopped = true;
        stopPropagation.call(evt);
      },

      writable: true,
      enumerable: true,
      configurable: true
    });
    const bookkeeping = ArraySlice.call(listeners);

    function invokeListenersByPlacement(placement) {
      forEach.call(bookkeeping, listener => {
        if (isFalse$1(immediatePropagationStopped) && listener.placement === placement) {
          if (ArrayIndexOf.call(listeners, listener) !== -1) {
            listener.call(undefined, evt);
          }
        }
      });
    }

    eventToContextMap.set(evt, EventListenerContext.SHADOW_ROOT_LISTENER);
    invokeListenersByPlacement(EventListenerContext.SHADOW_ROOT_LISTENER);

    if (isFalse$1(immediatePropagationStopped) && isFalse$1(propagationStopped)) {
      eventToContextMap.set(evt, EventListenerContext.CUSTOM_ELEMENT_LISTENER);
      invokeListenersByPlacement(EventListenerContext.CUSTOM_ELEMENT_LISTENER);
    }

    eventToContextMap.set(evt, 0);
  }

  function attachDOMListener(elm, type, wrappedListener) {
    const listenerMap = getEventMap(elm);
    let cmpEventHandlers = listenerMap[type];

    if (isUndefined(cmpEventHandlers)) {
      cmpEventHandlers = listenerMap[type] = [];
    }

    if (cmpEventHandlers.length === 0) {
      addEventListener.call(elm, type, domListener);
    }

    ArrayPush.call(cmpEventHandlers, wrappedListener);
  }

  function detachDOMListener(elm, type, wrappedListener) {
    const listenerMap = getEventMap(elm);
    let p;
    let listeners;

    if (!isUndefined(listeners = listenerMap[type]) && (p = ArrayIndexOf.call(listeners, wrappedListener)) !== -1) {
      ArraySplice.call(listeners, p, 1);

      if (listeners.length === 0) {
        removeEventListener.call(elm, type, domListener);
      }
    }
  }

  function isValidEventForCustomElement(event) {
    const target = eventTargetGetter.call(event);
    const currentTarget = eventCurrentTargetGetter.call(event);
    const {
      composed
    } = event;
    return composed === true || target === currentTarget || isChildNode(getRootNodeHost(target, GET_ROOT_NODE_CONFIG_FALSE), currentTarget);
  }

  function addCustomElementEventListener(elm, type, listener, _options) {

    const wrappedListener = getWrappedCustomElementListener(elm, listener);
    attachDOMListener(elm, type, wrappedListener);
  }

  function removeCustomElementEventListener(elm, type, listener, _options) {
    const wrappedListener = getWrappedCustomElementListener(elm, listener);
    detachDOMListener(elm, type, wrappedListener);
  }

  function addShadowRootEventListener(sr, type, listener, _options) {

    const elm = getHost(sr);
    const wrappedListener = getWrappedShadowRootListener(sr, listener);
    attachDOMListener(elm, type, wrappedListener);
  }

  function removeShadowRootEventListener(sr, type, listener, _options) {
    const elm = getHost(sr);
    const wrappedListener = getWrappedShadowRootListener(sr, listener);
    detachDOMListener(elm, type, wrappedListener);
  }

  function getTextContent(node) {
    switch (node.nodeType) {
      case ELEMENT_NODE:
        {
          const childNodes = getFilteredChildNodes(node);
          let content = '';

          for (let i = 0, len = childNodes.length; i < len; i += 1) {
            const currentNode = childNodes[i];

            if (currentNode.nodeType !== COMMENT_NODE) {
              content += getTextContent(currentNode);
            }
          }

          return content;
        }

      default:
        return node.nodeValue;
    }
  }

  const Items = createHiddenField('StaticNodeListItems', 'synthetic-shadow');

  function StaticNodeList() {
    throw new TypeError('Illegal constructor');
  }

  StaticNodeList.prototype = create(NodeList.prototype, {
    constructor: {
      writable: true,
      configurable: true,
      value: StaticNodeList
    },
    item: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(index) {
        return this[index];
      }

    },
    length: {
      enumerable: true,
      configurable: true,

      get() {
        return getHiddenField(this, Items).length;
      }

    },
    forEach: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(cb, thisArg) {
        forEach.call(getHiddenField(this, Items), cb, thisArg);
      }

    },
    entries: {
      writable: true,
      enumerable: true,
      configurable: true,

      value() {
        return ArrayMap.call(getHiddenField(this, Items), (v, i) => [i, v]);
      }

    },
    keys: {
      writable: true,
      enumerable: true,
      configurable: true,

      value() {
        return ArrayMap.call(getHiddenField(this, Items), (_v, i) => i);
      }

    },
    values: {
      writable: true,
      enumerable: true,
      configurable: true,

      value() {
        return getHiddenField(this, Items);
      }

    },
    [Symbol.iterator]: {
      writable: true,
      configurable: true,

      value() {
        let nextIndex = 0;
        return {
          next: () => {
            const items = getHiddenField(this, Items);
            return nextIndex < items.length ? {
              value: items[nextIndex++],
              done: false
            } : {
              done: true
            };
          }
        };
      }

    },
    [Symbol.toStringTag]: {
      configurable: true,

      get() {
        return 'NodeList';
      }

    },
    toString: {
      writable: true,
      configurable: true,

      value() {
        return '[object NodeList]';
      }

    }
  });
  setPrototypeOf(StaticNodeList, NodeList);

  function createStaticNodeList(items) {
    const nodeList = create(StaticNodeList.prototype);
    setHiddenField(nodeList, Items, items);
    forEach.call(items, (item, index) => {
      defineProperty(nodeList, index, {
        value: item,
        enumerable: true,
        configurable: true
      });
    });
    return nodeList;
  }

  const Items$1 = createHiddenField('StaticHTMLCollectionItems', 'synthetic-shadow');

  function StaticHTMLCollection() {
    throw new TypeError('Illegal constructor');
  }

  StaticHTMLCollection.prototype = create(HTMLCollection.prototype, {
    constructor: {
      writable: true,
      configurable: true,
      value: StaticHTMLCollection
    },
    item: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(index) {
        return this[index];
      }

    },
    length: {
      enumerable: true,
      configurable: true,

      get() {
        return getHiddenField(this, Items$1).length;
      }

    },
    namedItem: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(name) {
        if (name === '') {
          return null;
        }

        const items = getHiddenField(this, Items$1);

        for (let i = 0, len = items.length; i < len; i++) {
          const item = items[len];

          if (name === getAttribute.call(item, 'id') || name === getAttribute.call(item, 'name')) {
            return item;
          }
        }

        return null;
      }

    },
    forEach: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(cb, thisArg) {
        forEach.call(getHiddenField(this, Items$1), cb, thisArg);
      }

    },
    entries: {
      writable: true,
      enumerable: true,
      configurable: true,

      value() {
        return ArrayMap.call(getHiddenField(this, Items$1), (v, i) => [i, v]);
      }

    },
    keys: {
      writable: true,
      enumerable: true,
      configurable: true,

      value() {
        return ArrayMap.call(getHiddenField(this, Items$1), (v, i) => i);
      }

    },
    values: {
      writable: true,
      enumerable: true,
      configurable: true,

      value() {
        return getHiddenField(this, Items$1);
      }

    },
    [Symbol.iterator]: {
      writable: true,
      configurable: true,

      value() {
        let nextIndex = 0;
        return {
          next: () => {
            const items = getHiddenField(this, Items$1);
            return nextIndex < items.length ? {
              value: items[nextIndex++],
              done: false
            } : {
              done: true
            };
          }
        };
      }

    },
    [Symbol.toStringTag]: {
      configurable: true,

      get() {
        return 'HTMLCollection';
      }

    },
    toString: {
      writable: true,
      configurable: true,

      value() {
        return '[object HTMLCollection]';
      }

    }
  });
  setPrototypeOf(StaticHTMLCollection, HTMLCollection);

  function createStaticHTMLCollection(items) {
    const collection = create(StaticHTMLCollection.prototype);
    setHiddenField(collection, Items$1, items);
    forEach.call(items, (item, index) => {
      defineProperty(collection, index, {
        value: item,
        enumerable: true,
        configurable: true
      });
    });
    return collection;
  }

  function getInnerHTML(node) {
    let s = '';
    const childNodes = getFilteredChildNodes(node);

    for (let i = 0, len = childNodes.length; i < len; i += 1) {
      s += getOuterHTML(childNodes[i]);
    }

    return s;
  }

  const escapeAttrRegExp = /[&\u00A0"]/g;
  const escapeDataRegExp = /[&\u00A0<>]/g;
  const {
    replace,
    toLowerCase
  } = String.prototype;

  function escapeReplace(c) {
    switch (c) {
      case '&':
        return '&amp;';

      case '<':
        return '&lt;';

      case '>':
        return '&gt;';

      case '"':
        return '&quot;';

      case '\u00A0':
        return '&nbsp;';

      default:
        return '';
    }
  }

  function escapeAttr(s) {
    return replace.call(s, escapeAttrRegExp, escapeReplace);
  }

  function escapeData(s) {
    return replace.call(s, escapeDataRegExp, escapeReplace);
  }

  const voidElements = new Set(['AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR']);
  const plaintextParents = new Set(['STYLE', 'SCRIPT', 'XMP', 'IFRAME', 'NOEMBED', 'NOFRAMES', 'PLAINTEXT', 'NOSCRIPT']);

  function getOuterHTML(node) {
    switch (node.nodeType) {
      case ELEMENT_NODE:
        {
          const {
            attributes: attrs
          } = node;
          const tagName = tagNameGetter.call(node);
          let s = '<' + toLowerCase.call(tagName);

          for (let i = 0, attr; attr = attrs[i]; i++) {
            s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
          }

          s += '>';

          if (voidElements.has(tagName)) {
            return s;
          }

          return s + getInnerHTML(node) + '</' + toLowerCase.call(tagName) + '>';
        }

      case TEXT_NODE:
        {
          const {
            data,
            parentNode
          } = node;

          if (parentNode instanceof Element && plaintextParents.has(tagNameGetter.call(parentNode))) {
            return data;
          }

          return escapeData(data);
        }

      case CDATA_SECTION_NODE:
        {
          return `<!CDATA[[${node.data}]]>`;
        }

      case PROCESSING_INSTRUCTION_NODE:
        {
          return `<?${node.target} ${node.data}?>`;
        }

      case COMMENT_NODE:
        {
          return `<!--${node.data}-->`;
        }

      default:
        {
          return '';
        }
    }
  }

  const InternalSlot = createHiddenField('shadowRecord', 'synthetic-shadow');
  const {
    createDocumentFragment
  } = document;

  function getInternalSlot(root) {
    const record = getHiddenField(root, InternalSlot);

    if (isUndefined(record)) {
      throw new TypeError();
    }

    return record;
  }

  const ShadowRootResolverKey = '$shadowResolver$';
  const ShadowResolverPrivateKey = '$$ShadowResolverKey$$';
  defineProperty(Node.prototype, ShadowRootResolverKey, {
    set(fn) {
      this[ShadowResolverPrivateKey] = fn;
      setNodeOwnerKey(this, fn.nodeKey);
    },

    get() {
      return this[ShadowResolverPrivateKey];
    },

    configurable: true,
    enumerable: true
  });

  function getShadowRootResolver(node) {
    return node[ShadowRootResolverKey];
  }

  function setShadowRootResolver(node, fn) {
    node[ShadowRootResolverKey] = fn;
  }

  function isDelegatingFocus(host) {
    return getInternalSlot(host).delegatesFocus;
  }

  function getHost(root) {
    return getInternalSlot(root).host;
  }

  function getShadowRoot(elm) {
    return getInternalSlot(elm).shadowRoot;
  }

  function isHostElement(elm) {
    return !isUndefined(getHiddenField(elm, InternalSlot));
  }

  let uid = 0;

  function attachShadow$1(elm, options) {
    if (!isUndefined(getHiddenField(elm, InternalSlot))) {
      throw new Error(`Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.`);
    }

    const {
      mode,
      delegatesFocus
    } = options;
    const doc = getOwnerDocument(elm);
    const sr = createDocumentFragment.call(doc);
    const record = {
      mode,
      delegatesFocus: !!delegatesFocus,
      host: elm,
      shadowRoot: sr
    };
    setHiddenField(sr, InternalSlot, record);
    setHiddenField(elm, InternalSlot, record);

    const shadowResolver = () => sr;

    const x = shadowResolver.nodeKey = uid++;
    setNodeKey(elm, x);
    setShadowRootResolver(sr, shadowResolver);
    setPrototypeOf(sr, SyntheticShadowRoot.prototype);
    return sr;
  }

  const SyntheticShadowRootDescriptors = {
    constructor: {
      writable: true,
      configurable: true,
      value: SyntheticShadowRoot
    },
    toString: {
      writable: true,
      configurable: true,

      value() {
        return `[object ShadowRoot]`;
      }

    }
  };
  const ShadowRootDescriptors = {
    activeElement: {
      enumerable: true,
      configurable: true,

      get() {
        const host = getHost(this);
        const doc = getOwnerDocument(host);
        const activeElement = DocumentPrototypeActiveElement.call(doc);

        if (isNull(activeElement)) {
          return activeElement;
        }

        if ((compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) === 0) {
          return null;
        }

        let node = activeElement;

        while (!isNodeOwnedBy(host, node)) {
          node = parentElementGetter.call(node);
        }

        if (isSlotElement(node)) {
          return null;
        }

        return node;
      }

    },
    delegatesFocus: {
      configurable: true,

      get() {
        return getInternalSlot(this).delegatesFocus;
      }

    },
    elementFromPoint: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(left, top) {
        const host = getHost(this);
        const doc = getOwnerDocument(host);
        const element = elementFromPoint.call(doc, left, top);

        if (isNull(element)) {
          return element;
        }

        return retarget(this, pathComposer(element, true));
      }

    },
    elementsFromPoint: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(_left, _top) {
        throw new Error();
      }

    },
    getSelection: {
      writable: true,
      enumerable: true,
      configurable: true,

      value() {
        throw new Error();
      }

    },
    host: {
      enumerable: true,
      configurable: true,

      get() {
        return getHost(this);
      }

    },
    mode: {
      configurable: true,

      get() {
        return getInternalSlot(this).mode;
      }

    },
    styleSheets: {
      enumerable: true,
      configurable: true,

      get() {
        throw new Error();
      }

    }
  };
  const NodePatchDescriptors = {
    insertBefore: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(newChild, refChild) {
        insertBefore.call(getHost(this), newChild, refChild);
        return newChild;
      }

    },
    removeChild: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(oldChild) {
        removeChild.call(getHost(this), oldChild);
        return oldChild;
      }

    },
    appendChild: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(newChild) {
        appendChild.call(getHost(this), newChild);
        return newChild;
      }

    },
    replaceChild: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(newChild, oldChild) {
        replaceChild.call(getHost(this), newChild, oldChild);
        return oldChild;
      }

    },
    addEventListener: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(type, listener, options) {
        addShadowRootEventListener(this, type, listener);
      }

    },
    removeEventListener: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(type, listener, options) {
        removeShadowRootEventListener(this, type, listener);
      }

    },
    baseURI: {
      enumerable: true,
      configurable: true,

      get() {
        return getHost(this).baseURI;
      }

    },
    childNodes: {
      enumerable: true,
      configurable: true,

      get() {
        return createStaticNodeList(shadowRootChildNodes(this));
      }

    },
    compareDocumentPosition: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(otherNode) {
        const host = getHost(this);

        if (this === otherNode) {
          return 0;
        } else if (this.contains(otherNode)) {
          return 20;
        } else if (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) {
          return 37;
        } else {
          return 35;
        }
      }

    },
    contains: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(otherNode) {
        if (this === otherNode) {
          return true;
        }

        const host = getHost(this);
        return (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 && isNodeOwnedBy(host, otherNode);
      }

    },
    firstChild: {
      enumerable: true,
      configurable: true,

      get() {
        const childNodes = getInternalChildNodes(this);
        return childNodes[0] || null;
      }

    },
    lastChild: {
      enumerable: true,
      configurable: true,

      get() {
        const childNodes = getInternalChildNodes(this);
        return childNodes[childNodes.length - 1] || null;
      }

    },
    hasChildNodes: {
      writable: true,
      enumerable: true,
      configurable: true,

      value() {
        const childNodes = getInternalChildNodes(this);
        return childNodes.length > 0;
      }

    },
    isConnected: {
      enumerable: true,
      configurable: true,

      get() {
        return isConnected.call(getHost(this));
      }

    },
    nextSibling: {
      enumerable: true,
      configurable: true,

      get() {
        return null;
      }

    },
    previousSibling: {
      enumerable: true,
      configurable: true,

      get() {
        return null;
      }

    },
    nodeName: {
      enumerable: true,
      configurable: true,

      get() {
        return '#document-fragment';
      }

    },
    nodeType: {
      enumerable: true,
      configurable: true,

      get() {
        return 11;
      }

    },
    nodeValue: {
      enumerable: true,
      configurable: true,

      get() {
        return null;
      }

    },
    ownerDocument: {
      enumerable: true,
      configurable: true,

      get() {
        return getHost(this).ownerDocument;
      }

    },
    parentElement: {
      enumerable: true,
      configurable: true,

      get() {
        return null;
      }

    },
    parentNode: {
      enumerable: true,
      configurable: true,

      get() {
        return null;
      }

    },
    textContent: {
      enumerable: true,
      configurable: true,

      get() {
        const childNodes = getInternalChildNodes(this);
        let textContent = '';

        for (let i = 0, len = childNodes.length; i < len; i += 1) {
          const currentNode = childNodes[i];

          if (currentNode.nodeType !== COMMENT_NODE) {
            textContent += getTextContent(currentNode);
          }
        }

        return textContent;
      },

      set(v) {
        const host = getHost(this);
        textContextSetter.call(host, v);
      }

    },
    getRootNode: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(options) {
        return !isUndefined(options) && isTrue$1(options.composed) ? getHost(this).getRootNode(options) : this;
      }

    }
  };
  const ElementPatchDescriptors = {
    innerHTML: {
      enumerable: true,
      configurable: true,

      get() {
        const childNodes = getInternalChildNodes(this);
        let innerHTML = '';

        for (let i = 0, len = childNodes.length; i < len; i += 1) {
          innerHTML += getOuterHTML(childNodes[i]);
        }

        return innerHTML;
      },

      set(v) {
        const host = getHost(this);
        innerHTMLSetter.call(host, v);
      }

    }
  };
  const ParentNodePatchDescriptors = {
    childElementCount: {
      enumerable: true,
      configurable: true,

      get() {
        return this.children.length;
      }

    },
    children: {
      enumerable: true,
      configurable: true,

      get() {
        return createStaticHTMLCollection(ArrayFilter.call(shadowRootChildNodes(this), elm => elm instanceof Element));
      }

    },
    firstElementChild: {
      enumerable: true,
      configurable: true,

      get() {
        return this.children[0] || null;
      }

    },
    lastElementChild: {
      enumerable: true,
      configurable: true,

      get() {
        const {
          children
        } = this;
        return children.item(children.length - 1) || null;
      }

    },
    querySelector: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(selectors) {
        return shadowRootQuerySelector(this, selectors);
      }

    },
    querySelectorAll: {
      writable: true,
      enumerable: true,
      configurable: true,

      value(selectors) {
        return createStaticNodeList(shadowRootQuerySelectorAll(this, selectors));
      }

    }
  };
  assign(SyntheticShadowRootDescriptors, NodePatchDescriptors, ParentNodePatchDescriptors, ElementPatchDescriptors, ShadowRootDescriptors);

  function SyntheticShadowRoot() {
    throw new TypeError('Illegal constructor');
  }

  SyntheticShadowRoot.prototype = create(DocumentFragment.prototype, SyntheticShadowRootDescriptors);

  function foldSlotElement(slot) {
    let parent = parentElementGetter.call(slot);

    while (!isNull(parent) && isSlotElement(parent)) {
      slot = parent;
      parent = parentElementGetter.call(slot);
    }

    return slot;
  }

  function isNodeSlotted(host, node) {

    const hostKey = getNodeKey(host);
    let currentElement = node instanceof Element ? node : parentElementGetter.call(node);

    while (!isNull(currentElement) && currentElement !== host) {
      const elmOwnerKey = getNodeNearestOwnerKey(currentElement);
      const parent = parentElementGetter.call(currentElement);

      if (elmOwnerKey === hostKey) {
        return isSlotElement(currentElement);
      } else if (parent === host) {
        return false;
      } else if (!isNull(parent) && getNodeNearestOwnerKey(parent) !== elmOwnerKey) {
        if (isSlotElement(parent)) {
          currentElement = getNodeOwner(foldSlotElement(parent));

          if (!isNull(currentElement)) {
            if (currentElement === host) {
              return true;
            } else if (getNodeNearestOwnerKey(currentElement) === hostKey) {
              return true;
            }
          }
        } else {
          return false;
        }
      } else {
        currentElement = parent;
      }
    }

    return false;
  }

  function getNodeOwner(node) {
    if (!(node instanceof Node)) {
      return null;
    }

    const ownerKey = getNodeNearestOwnerKey(node);

    if (isUndefined(ownerKey)) {
      return null;
    }

    let nodeOwner = node;

    while (!isNull(nodeOwner) && getNodeKey(nodeOwner) !== ownerKey) {
      nodeOwner = parentNodeGetter.call(nodeOwner);
    }

    if (isNull(nodeOwner)) {
      return null;
    }

    return nodeOwner;
  }

  function isSlotElement(node) {
    return node instanceof HTMLSlotElement;
  }

  function isNodeOwnedBy(owner, node) {

    const ownerKey = getNodeNearestOwnerKey(node);
    return isUndefined(ownerKey) || getNodeKey(owner) === ownerKey;
  }

  function shadowRootChildNodes(root) {
    const elm = getHost(root);
    return getAllMatches(elm, arrayFromCollection(childNodesGetter.call(elm)));
  }

  function getAllSlottedMatches(host, nodeList) {
    const filteredAndPatched = [];

    for (let i = 0, len = nodeList.length; i < len; i += 1) {
      const node = nodeList[i];

      if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
        ArrayPush.call(filteredAndPatched, node);
      }
    }

    return filteredAndPatched;
  }

  function getFirstSlottedMatch(host, nodeList) {
    for (let i = 0, len = nodeList.length; i < len; i += 1) {
      const node = nodeList[i];

      if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
        return node;
      }
    }

    return null;
  }

  function getAllMatches(owner, nodeList) {
    const filteredAndPatched = [];

    for (let i = 0, len = nodeList.length; i < len; i += 1) {
      const node = nodeList[i];
      const isOwned = isNodeOwnedBy(owner, node);

      if (isOwned) {
        ArrayPush.call(filteredAndPatched, node);
      }
    }

    return filteredAndPatched;
  }

  function getFirstMatch(owner, nodeList) {
    for (let i = 0, len = nodeList.length; i < len; i += 1) {
      if (isNodeOwnedBy(owner, nodeList[i])) {
        return nodeList[i];
      }
    }

    return null;
  }

  function shadowRootQuerySelector(root, selector) {
    const elm = getHost(root);
    const nodeList = arrayFromCollection(querySelectorAll.call(elm, selector));
    return getFirstMatch(elm, nodeList);
  }

  function shadowRootQuerySelectorAll(root, selector) {
    const elm = getHost(root);
    const nodeList = querySelectorAll.call(elm, selector);
    return getAllMatches(elm, arrayFromCollection(nodeList));
  }

  function getFilteredChildNodes(node) {
    let children;

    if (!isHostElement(node) && !isSlotElement(node)) {
      children = childNodesGetter.call(node);
      return arrayFromCollection(children);
    }

    if (isHostElement(node)) {
      const slots = arrayFromCollection(querySelectorAll.call(node, 'slot'));
      const resolver = getShadowRootResolver(getShadowRoot(node));
      return ArrayReduce.call(slots, (seed, slot) => {
        if (resolver === getShadowRootResolver(slot)) {
          ArrayPush.apply(seed, getFilteredSlotAssignedNodes(slot));
        }

        return seed;
      }, []);
    } else {
      children = arrayFromCollection(childNodesGetter.call(node));
      const resolver = getShadowRootResolver(node);
      return ArrayReduce.call(children, (seed, child) => {
        if (resolver === getShadowRootResolver(child)) {
          ArrayPush.call(seed, child);
        }

        return seed;
      }, []);
    }
  }

  function getFilteredSlotAssignedNodes(slot) {
    const owner = getNodeOwner(slot);

    if (isNull(owner)) {
      return [];
    }

    const childNodes = arrayFromCollection(childNodesGetter.call(slot));
    return ArrayReduce.call(childNodes, (seed, child) => {
      if (!isNodeOwnedBy(owner, child)) {
        ArrayPush.call(seed, child);
      }

      return seed;
    }, []);
  }

  const OwnKey = '$$OwnKey$$';
  const OwnerKey = '$$OwnerKey$$';
  const hasNativeSymbolsSupport$2 = Symbol('x').toString() === 'Symbol(x)';

  function getNodeOwnerKey(node) {
    return node[OwnerKey];
  }

  function setNodeOwnerKey(node, value) {
    {
      node[OwnerKey] = value;
    }
  }

  function getNodeKey(node) {
    return node[OwnKey];
  }

  function setNodeKey(node, value) {
    {
      node[OwnKey] = value;
    }
  }

  function getNodeNearestOwnerKey(node) {
    let ownerNode = node;
    let ownerKey;

    while (!isNull(ownerNode)) {
      ownerKey = getNodeOwnerKey(ownerNode);

      if (!isUndefined(ownerKey)) {
        return ownerKey;
      }

      ownerNode = parentNodeGetter.call(ownerNode);
    }
  }

  function isNodeShadowed(node) {
    return !isUndefined(getNodeOwnerKey(node));
  }

  function isNodeDeepShadowed(node) {
    return !isUndefined(getNodeNearestOwnerKey(node));
  }

  function hasMountedChildren(node) {
    return isSlotElement(node) || isHostElement(node);
  }

  function getShadowParent(node, value) {
    const owner = getNodeOwner(node);

    if (value === owner) {
      return getShadowRoot(owner);
    } else if (value instanceof Element) {
      if (getNodeNearestOwnerKey(node) === getNodeNearestOwnerKey(value)) {
        return value;
      } else if (!isNull(owner) && isSlotElement(value)) {
        const slotOwner = getNodeOwner(value);

        if (!isNull(slotOwner) && isNodeOwnedBy(owner, slotOwner)) {
          return slotOwner;
        }
      }
    }

    return null;
  }

  function hasChildNodesPatched() {
    return getInternalChildNodes(this).length > 0;
  }

  function firstChildGetterPatched() {
    const childNodes = getInternalChildNodes(this);
    return childNodes[0] || null;
  }

  function lastChildGetterPatched() {
    const childNodes = getInternalChildNodes(this);
    return childNodes[childNodes.length - 1] || null;
  }

  function textContentGetterPatched() {
    return getTextContent(this);
  }

  function textContentSetterPatched(value) {
    textContextSetter.call(this, value);
  }

  function parentNodeGetterPatched() {
    const value = parentNodeGetter.call(this);

    if (isNull(value)) {
      return value;
    }

    return getShadowParent(this, value);
  }

  function parentElementGetterPatched() {
    const value = parentNodeGetter.call(this);

    if (isNull(value)) {
      return null;
    }

    const parentNode = getShadowParent(this, value);
    return parentNode instanceof Element ? parentNode : null;
  }

  function compareDocumentPositionPatched(otherNode) {
    if (this.getRootNode() === otherNode) {
      return 10;
    } else if (getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
      return 35;
    }

    return compareDocumentPosition.call(this, otherNode);
  }

  function containsPatched(otherNode) {
    if (otherNode == null || getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
      return false;
    }

    return (compareDocumentPosition.call(this, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
  }

  function cloneNodePatched(deep) {
    const clone = cloneNode.call(this, false);

    if (!deep) {
      return clone;
    }

    const childNodes = getInternalChildNodes(this);

    for (let i = 0, len = childNodes.length; i < len; i += 1) {
      clone.appendChild(childNodes[i].cloneNode(true));
    }

    return clone;
  }

  function childNodesGetterPatched() {
    if (this instanceof Element && isHostElement(this)) {
      const owner = getNodeOwner(this);
      const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));

      return createStaticNodeList(childNodes);
    }

    return childNodesGetter.call(this);
  }

  const nativeGetRootNode = Node.prototype.getRootNode;
  const getDocumentOrRootNode = !isUndefined(nativeGetRootNode) ? nativeGetRootNode : function () {
    let node = this;
    let nodeParent;

    while (!isNull(nodeParent = parentNodeGetter.call(node))) {
      node = nodeParent;
    }

    return node;
  };

  function getNearestRoot(node) {
    const ownerNode = getNodeOwner(node);

    if (isNull(ownerNode)) {
      return getDocumentOrRootNode.call(node);
    }

    return getShadowRoot(ownerNode);
  }

  function getRootNodePatched(options) {
    const composed = isUndefined(options) ? false : !!options.composed;
    return isTrue$1(composed) ? getDocumentOrRootNode.call(this, options) : getNearestRoot(this);
  }

  defineProperties(Node.prototype, {
    firstChild: {
      get() {
        if (hasMountedChildren(this)) {
          return firstChildGetterPatched.call(this);
        }

        return firstChildGetter.call(this);
      },

      enumerable: true,
      configurable: true
    },
    lastChild: {
      get() {
        if (hasMountedChildren(this)) {
          return lastChildGetterPatched.call(this);
        }

        return lastChildGetter.call(this);
      },

      enumerable: true,
      configurable: true
    },
    textContent: {
      get() {
        if (!runtimeFlags.ENABLE_NODE_PATCH) {
          if (isNodeShadowed(this) || isHostElement(this)) {
            return textContentGetterPatched.call(this);
          }

          return textContentGetter.call(this);
        }

        if (isGlobalPatchingSkipped(this)) {
          return textContentGetter.call(this);
        }

        return textContentGetterPatched.call(this);
      },

      set: textContentSetterPatched,
      enumerable: true,
      configurable: true
    },
    parentNode: {
      get() {
        if (isNodeShadowed(this)) {
          return parentNodeGetterPatched.call(this);
        }

        return parentNodeGetter.call(this);
      },

      enumerable: true,
      configurable: true
    },
    parentElement: {
      get() {
        if (isNodeShadowed(this)) {
          return parentElementGetterPatched.call(this);
        }

        return parentElementGetter.call(this);
      },

      enumerable: true,
      configurable: true
    },
    childNodes: {
      get() {
        if (hasMountedChildren(this)) {
          return childNodesGetterPatched.call(this);
        }

        return childNodesGetter.call(this);
      },

      enumerable: true,
      configurable: true
    },
    hasChildNodes: {
      value() {
        if (hasMountedChildren(this)) {
          return hasChildNodesPatched.call(this);
        }

        return hasChildNodes.call(this);
      },

      enumerable: true,
      writable: true,
      configurable: true
    },
    compareDocumentPosition: {
      value(otherNode) {
        if (isGlobalPatchingSkipped(this)) {
          return compareDocumentPosition.call(this, otherNode);
        }

        return compareDocumentPositionPatched.call(this, otherNode);
      },

      enumerable: true,
      writable: true,
      configurable: true
    },
    contains: {
      value(otherNode) {
        if (!runtimeFlags.ENABLE_NODE_PATCH) {
          if (otherNode == null) {
            return false;
          }

          if (isNodeShadowed(this) || isHostElement(this)) {
            return containsPatched.call(this, otherNode);
          }

          return contains.call(this, otherNode);
        }

        if (isGlobalPatchingSkipped(this)) {
          return contains.call(this, otherNode);
        }

        return containsPatched.call(this, otherNode);
      },

      enumerable: true,
      writable: true,
      configurable: true
    },
    cloneNode: {
      value(deep) {
        if (!runtimeFlags.ENABLE_NODE_PATCH) {
          if (isNodeShadowed(this) || isHostElement(this)) {
            return cloneNodePatched.call(this, deep);
          }

          return cloneNode.call(this, deep);
        }

        if (isTrue$1(deep)) {
          if (isGlobalPatchingSkipped(this)) {
            return cloneNode.call(this, deep);
          }

          return cloneNodePatched.call(this, deep);
        }

        return cloneNode.call(this, deep);
      },

      enumerable: true,
      writable: true,
      configurable: true
    },
    getRootNode: {
      value: getRootNodePatched,
      enumerable: true,
      configurable: true,
      writable: true
    },
    isConnected: {
      enumerable: true,
      configurable: true,

      get() {
        return isConnected.call(this);
      }

    }
  });

  const getInternalChildNodes =  function (node) {
    return node.childNodes;
  };

  if (hasOwnProperty.call(HTMLElement.prototype, 'contains')) {
    defineProperty(HTMLElement.prototype, 'contains', getOwnPropertyDescriptor(Node.prototype, 'contains'));
  }

  if (hasOwnProperty.call(HTMLElement.prototype, 'parentElement')) {
    defineProperty(HTMLElement.prototype, 'parentElement', getOwnPropertyDescriptor(Node.prototype, 'parentElement'));
  }

  function elemFromPoint(left, top) {
    const element = elementFromPoint.call(this, left, top);

    if (isNull(element)) {
      return element;
    }

    return retarget(this, pathComposer(element, true));
  }

  Document.prototype.elementFromPoint = elemFromPoint;
  defineProperty(Document.prototype, 'activeElement', {
    get() {
      let node = DocumentPrototypeActiveElement.call(this);

      if (isNull(node)) {
        return node;
      }

      while (!isUndefined(getNodeOwnerKey(node))) {
        node = parentElementGetter.call(node);

        if (isNull(node)) {
          return null;
        }
      }

      if (node.tagName === 'HTML') {
        node = this.body;
      }

      return node;
    },

    enumerable: true,
    configurable: true
  });
  defineProperty(Document.prototype, 'getElementById', {
    value() {
      const elm = getElementById.apply(this, ArraySlice.call(arguments));

      if (isNull(elm)) {
        return null;
      }

      return isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm) ? elm : null;
    },

    writable: true,
    enumerable: true,
    configurable: true
  });
  defineProperty(Document.prototype, 'querySelector', {
    value() {
      const elements = arrayFromCollection(querySelectorAll$1.apply(this, ArraySlice.call(arguments)));
      const filtered = ArrayFind.call(elements, elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
      return !isUndefined(filtered) ? filtered : null;
    },

    writable: true,
    enumerable: true,
    configurable: true
  });
  defineProperty(Document.prototype, 'querySelectorAll', {
    value() {
      const elements = arrayFromCollection(querySelectorAll$1.apply(this, ArraySlice.call(arguments)));
      const filtered = ArrayFilter.call(elements, elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
      return createStaticNodeList(filtered);
    },

    writable: true,
    enumerable: true,
    configurable: true
  });
  defineProperty(Document.prototype, 'getElementsByClassName', {
    value() {
      const elements = arrayFromCollection(getElementsByClassName$1.apply(this, ArraySlice.call(arguments)));
      const filtered = ArrayFilter.call(elements, elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
      return createStaticHTMLCollection(filtered);
    },

    writable: true,
    enumerable: true,
    configurable: true
  });
  defineProperty(Document.prototype, 'getElementsByTagName', {
    value() {
      const elements = arrayFromCollection(getElementsByTagName$1.apply(this, ArraySlice.call(arguments)));
      const filtered = ArrayFilter.call(elements, elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
      return createStaticHTMLCollection(filtered);
    },

    writable: true,
    enumerable: true,
    configurable: true
  });
  defineProperty(Document.prototype, 'getElementsByTagNameNS', {
    value() {
      const elements = arrayFromCollection(getElementsByTagNameNS$1.apply(this, ArraySlice.call(arguments)));
      const filtered = ArrayFilter.call(elements, elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
      return createStaticHTMLCollection(filtered);
    },

    writable: true,
    enumerable: true,
    configurable: true
  });
  defineProperty(getOwnPropertyDescriptor(HTMLDocument.prototype, 'getElementsByName') ? HTMLDocument.prototype : Document.prototype, 'getElementsByName', {
    value() {
      const elements = arrayFromCollection(getElementsByName.apply(this, ArraySlice.call(arguments)));
      const filtered = ArrayFilter.call(elements, elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
      return createStaticNodeList(filtered);
    },

    writable: true,
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(window, 'ShadowRoot', {
    value: SyntheticShadowRoot,
    configurable: true,
    writable: true
  });

  function doesEventNeedsPatch(e) {
    const originalTarget = eventTargetGetter.call(e);
    return originalTarget instanceof Node && isNodeDeepShadowed(originalTarget);
  }

  function isValidEventListener(listener) {
    return isFunction(listener) || !isNull(listener) && isObject(listener) && isFunction(listener.handleEvent);
  }

  function getEventListenerWrapper(listener) {
    if ('$$lwcEventWrapper$$' in listener) {
      return listener.$$lwcEventWrapper$$;
    }

    const isHandlerFunction = isFunction(listener);

    const wrapperFn = listener.$$lwcEventWrapper$$ = function (e) {
      if (doesEventNeedsPatch(e)) {
        patchEvent(e);
      }

      return isHandlerFunction ? listener.call(this, e) : listener.handleEvent && listener.handleEvent(e);
    };

    return wrapperFn;
  }

  function windowAddEventListener$1(type, listener, optionsOrCapture) {
    if (!isValidEventListener(listener)) {
      return;
    }

    const wrapperFn = getEventListenerWrapper(listener);
    windowAddEventListener.call(this, type, wrapperFn, optionsOrCapture);
  }

  function windowRemoveEventListener$1(type, listener, optionsOrCapture) {
    if (!isValidEventListener(listener)) {
      return;
    }

    const wrapperFn = getEventListenerWrapper(listener);
    windowRemoveEventListener.call(this, type, wrapperFn || listener, optionsOrCapture);
  }

  function addEventListener$1(type, listener, optionsOrCapture) {
    if (!isValidEventListener(listener)) {
      return;
    }

    const wrapperFn = getEventListenerWrapper(listener);
    addEventListener.call(this, type, wrapperFn, optionsOrCapture);
  }

  function removeEventListener$1(type, listener, optionsOrCapture) {
    if (!isValidEventListener(listener)) {
      return;
    }

    const wrapperFn = getEventListenerWrapper(listener);
    removeEventListener.call(this, type, wrapperFn || listener, optionsOrCapture);
  }

  window.addEventListener = windowAddEventListener$1;
  window.removeEventListener = windowRemoveEventListener$1;
  const protoToBePatched = typeof EventTarget !== 'undefined' ? EventTarget.prototype : Node.prototype;
  defineProperties(protoToBePatched, {
    addEventListener: {
      value: addEventListener$1,
      enumerable: true,
      writable: true,
      configurable: true
    },
    removeEventListener: {
      value: removeEventListener$1,
      enumerable: true,
      writable: true,
      configurable: true
    }
  });
  const composedDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, 'composed');

  function detect$1() {
    if (!composedDescriptor) {
      return false;
    }

    let clickEvent = new Event('click');
    const button = document.createElement('button');
    button.addEventListener('click', event => clickEvent = event);
    button.click();
    return !composedDescriptor.get.call(clickEvent);
  }

  const originalClickDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'click');

  function handleClick(event) {
    Object.defineProperty(event, 'composed', {
      configurable: true,
      enumerable: true,

      get() {
        return true;
      }

    });
  }

  function apply$1() {
    HTMLElement.prototype.click = function () {
      addEventListener.call(this, 'click', handleClick);

      try {
        originalClickDescriptor.value.call(this);
      } finally {
        removeEventListener.call(this, 'click', handleClick);
      }
    };
  }

  if (detect$1()) {
    apply$1();
  }

  function detect$2() {
    return new Event('test', {
      composed: true
    }).composed !== true;
  }

  function apply$2() {
    const composedEvents = assign(create(null), {
      beforeinput: 1,
      blur: 1,
      click: 1,
      compositionend: 1,
      compositionstart: 1,
      compositionupdate: 1,
      copy: 1,
      cut: 1,
      dblclick: 1,
      DOMActivate: 1,
      DOMFocusIn: 1,
      DOMFocusOut: 1,
      drag: 1,
      dragend: 1,
      dragenter: 1,
      dragleave: 1,
      dragover: 1,
      dragstart: 1,
      drop: 1,
      focus: 1,
      focusin: 1,
      focusout: 1,
      gotpointercapture: 1,
      input: 1,
      keydown: 1,
      keypress: 1,
      keyup: 1,
      lostpointercapture: 1,
      mousedown: 1,
      mouseenter: 1,
      mouseleave: 1,
      mousemove: 1,
      mouseout: 1,
      mouseover: 1,
      mouseup: 1,
      paste: 1,
      pointercancel: 1,
      pointerdown: 1,
      pointerenter: 1,
      pointerleave: 1,
      pointermove: 1,
      pointerout: 1,
      pointerover: 1,
      pointerup: 1,
      touchcancel: 1,
      touchend: 1,
      touchmove: 1,
      touchstart: 1,
      wheel: 1
    });
    const EventConstructor = Event;

    function PatchedEvent(type, eventInitDict) {
      const event = new EventConstructor(type, eventInitDict);
      const isComposed = !!(eventInitDict && eventInitDict.composed);
      Object.defineProperties(event, {
        composed: {
          get() {
            return isComposed;
          },

          configurable: true,
          enumerable: true
        }
      });
      return event;
    }

    PatchedEvent.prototype = EventConstructor.prototype;
    PatchedEvent.AT_TARGET = EventConstructor.AT_TARGET;
    PatchedEvent.BUBBLING_PHASE = EventConstructor.BUBBLING_PHASE;
    PatchedEvent.CAPTURING_PHASE = EventConstructor.CAPTURING_PHASE;
    PatchedEvent.NONE = EventConstructor.NONE;
    window.Event = PatchedEvent;
    Object.defineProperties(Event.prototype, {
      composed: {
        get() {
          const {
            type
          } = this;
          return composedEvents[type] === 1;
        },

        configurable: true,
        enumerable: true
      }
    });
  }

  if (detect$2()) {
    apply$2();
  }

  const CustomEventConstructor = CustomEvent;

  function PatchedCustomEvent(type, eventInitDict) {
    const event = new CustomEventConstructor(type, eventInitDict);
    const isComposed = !!(eventInitDict && eventInitDict.composed);
    Object.defineProperties(event, {
      composed: {
        get() {
          return isComposed;
        },

        configurable: true,
        enumerable: true
      }
    });
    return event;
  }

  PatchedCustomEvent.prototype = CustomEventConstructor.prototype;
  window.CustomEvent = PatchedCustomEvent;
  const originalComposedGetter = Object.getOwnPropertyDescriptor(Event.prototype, 'composed').get;
  Object.defineProperties(FocusEvent.prototype, {
    composed: {
      get() {
        const {
          isTrusted
        } = this;
        const composed = originalComposedGetter.call(this);

        if (isTrusted && composed === false) {
          return true;
        }

        return composed;
      },

      enumerable: true,
      configurable: true
    }
  });

  function detect$3() {
    return typeof HTMLIFrameElement !== 'undefined';
  }

  function apply$3() {
    const desc = getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow');
    const {
      get: originalGetter
    } = desc;

    desc.get = function () {
      const original = originalGetter.call(this);

      if (isNull(original) || isUndefined(getNodeOwnerKey(this))) {
        return original;
      }

      return wrapIframeWindow(original);
    };

    defineProperty(HTMLIFrameElement.prototype, 'contentWindow', desc);
  }

  function wrapIframeWindow(win) {
    return {
      addEventListener() {
        return win.addEventListener.apply(win, arguments);
      },

      blur() {
        return win.blur.apply(win, arguments);
      },

      close() {
        return win.close.apply(win, arguments);
      },

      focus() {
        return win.focus.apply(win, arguments);
      },

      postMessage() {
        return win.postMessage.apply(win, arguments);
      },

      removeEventListener() {
        return win.removeEventListener.apply(win, arguments);
      },

      get closed() {
        return win.closed;
      },

      get frames() {
        return win.frames;
      },

      get length() {
        return win.length;
      },

      get location() {
        return win.location;
      },

      set location(value) {
        win.location = value;
      },

      get opener() {
        return win.opener;
      },

      get parent() {
        return win.parent;
      },

      get self() {
        return win.self;
      },

      get top() {
        return win.top;
      },

      get window() {
        return win.window;
      }

    };
  }

  if (detect$3()) {
    apply$3();
  }

  const OriginalMutationObserver = MutationObserver;
  const {
    disconnect: originalDisconnect,
    observe: originalObserve,
    takeRecords: originalTakeRecords
  } = OriginalMutationObserver.prototype;
  const wrapperLookupField = '$$lwcObserverCallbackWrapper$$';
  const observerLookupField = '$$lwcNodeObservers$$';
  const observerToNodesMap = new WeakMap();

  function getNodeObservers(node) {
    return node[observerLookupField];
  }

  function setNodeObservers(node, observers) {
    node[observerLookupField] = observers;
  }

  function retargetMutationRecord(originalRecord) {
    const {
      addedNodes,
      removedNodes,
      target,
      type
    } = originalRecord;
    const retargetedRecord = create(MutationRecord.prototype);
    defineProperties(retargetedRecord, {
      addedNodes: {
        get() {
          return addedNodes;
        },

        enumerable: true,
        configurable: true
      },
      removedNodes: {
        get() {
          return removedNodes;
        },

        enumerable: true,
        configurable: true
      },
      type: {
        get() {
          return type;
        },

        enumerable: true,
        configurable: true
      },
      target: {
        get() {
          return target.shadowRoot;
        },

        enumerable: true,
        configurable: true
      }
    });
    return retargetedRecord;
  }

  function isQualifiedObserver(observer, target) {
    let parentNode = target;

    while (!isNull(parentNode)) {
      const parentNodeObservers = getNodeObservers(parentNode);

      if (!isUndefined(parentNodeObservers) && (parentNodeObservers[0] === observer || ArrayIndexOf.call(parentNodeObservers, observer) !== -1)) {
        return true;
      }

      parentNode = parentNode.parentNode;
    }

    return false;
  }

  function filterMutationRecords(mutations, observer) {
    return ArrayReduce.call(mutations, (filteredSet, record) => {
      const {
        target,
        addedNodes,
        removedNodes,
        type
      } = record;

      if (type === 'childList' && !isUndefined(getNodeKey(target))) {
        if (addedNodes.length > 0) {
          const sampleNode = addedNodes[0];

          if (isQualifiedObserver(observer, sampleNode)) {
            const nodeObservers = getNodeObservers(target);

            if (nodeObservers && (nodeObservers[0] === observer || ArrayIndexOf.call(nodeObservers, observer) !== -1)) {
              ArrayPush.call(filteredSet, record);
            } else {
              ArrayPush.call(filteredSet, retargetMutationRecord(record));
            }
          }
        } else {
          const shadowRoot = target.shadowRoot;
          const sampleNode = removedNodes[0];

          if (getNodeNearestOwnerKey(target) === getNodeNearestOwnerKey(sampleNode) && isQualifiedObserver(observer, target)) {
            ArrayPush.call(filteredSet, record);
          } else if (shadowRoot) {
            const shadowRootObservers = getNodeObservers(shadowRoot);

            if (shadowRootObservers && (shadowRootObservers[0] === observer || ArrayIndexOf.call(shadowRootObservers, observer) !== -1)) {
              ArrayPush.call(filteredSet, retargetMutationRecord(record));
            }
          }
        }
      } else {
        if (isQualifiedObserver(observer, target)) {
          ArrayPush.call(filteredSet, record);
        }
      }

      return filteredSet;
    }, []);
  }

  function getWrappedCallback(callback) {
    let wrappedCallback = callback[wrapperLookupField];

    if (isUndefined(wrappedCallback)) {
      wrappedCallback = callback[wrapperLookupField] = (mutations, observer) => {
        const filteredRecords = filterMutationRecords(mutations, observer);

        if (filteredRecords.length === 0) {
          return;
        }

        callback.call(observer, filteredRecords, observer);
      };
    }

    return wrappedCallback;
  }

  function PatchedMutationObserver(callback) {
    const wrappedCallback = getWrappedCallback(callback);
    const observer = new OriginalMutationObserver(wrappedCallback);
    return observer;
  }

  function patchedDisconnect() {
    originalDisconnect.call(this);
    const observedNodes = observerToNodesMap.get(this);

    if (!isUndefined(observedNodes)) {
      forEach.call(observedNodes, observedNode => {
        const observers = observedNode[observerLookupField];

        if (!isUndefined(observers)) {
          const index = ArrayIndexOf.call(observers, this);

          if (index !== -1) {
            ArraySplice.call(observers, index, 1);
          }
        }
      });
      observedNodes.length = 0;
    }
  }

  function patchedObserve(target, options) {
    let targetObservers = getNodeObservers(target);

    if (isUndefined(targetObservers)) {
      targetObservers = [];
      setNodeObservers(target, targetObservers);
    }

    if (ArrayIndexOf.call(targetObservers, this) === -1) {
      ArrayPush.call(targetObservers, this);
    }

    if (target instanceof SyntheticShadowRoot) {
      target = target.host;
    }

    if (observerToNodesMap.has(this)) {
      const observedNodes = observerToNodesMap.get(this);

      if (ArrayIndexOf.call(observedNodes, target) === -1) {
        ArrayPush.call(observedNodes, target);
      }
    } else {
      observerToNodesMap.set(this, [target]);
    }

    return originalObserve.call(this, target, options);
  }

  function patchedTakeRecords() {
    return filterMutationRecords(originalTakeRecords.call(this), this);
  }

  PatchedMutationObserver.prototype = OriginalMutationObserver.prototype;
  PatchedMutationObserver.prototype.disconnect = patchedDisconnect;
  PatchedMutationObserver.prototype.observe = patchedObserve;
  PatchedMutationObserver.prototype.takeRecords = patchedTakeRecords;
  defineProperty(window, 'MutationObserver', {
    value: PatchedMutationObserver,
    configurable: true,
    writable: true
  });
  let observer;
  const observerConfig = {
    childList: true
  };
  const SlotChangeKey = createHiddenField('slotchange', 'synthetic-shadow');

  function initSlotObserver() {
    return new MO(mutations => {
      const slots = [];
      forEach.call(mutations, mutation => {

        const {
          target: slot
        } = mutation;

        if (ArrayIndexOf.call(slots, slot) === -1) {
          ArrayPush.call(slots, slot);
          dispatchEvent.call(slot, new CustomEvent('slotchange'));
        }
      });
    });
  }

  function getFilteredSlotFlattenNodes(slot) {
    const childNodes = arrayFromCollection(childNodesGetter.call(slot));
    return ArrayReduce.call(childNodes, (seed, child) => {
      if (child instanceof Element && isSlotElement(child)) {
        ArrayPush.apply(seed, getFilteredSlotFlattenNodes(child));
      } else {
        ArrayPush.call(seed, child);
      }

      return seed;
    }, []);
  }

  function assignedSlotGetterPatched() {
    const parentNode = parentNodeGetter.call(this);

    if (isNull(parentNode) || !isSlotElement(parentNode) || getNodeNearestOwnerKey(parentNode) === getNodeNearestOwnerKey(this)) {
      return null;
    }

    return parentNode;
  }

  defineProperties(HTMLSlotElement.prototype, {
    addEventListener: {
      value(type, listener, options) {
        HTMLElement.prototype.addEventListener.call(this, type, listener, options);

        if (type === 'slotchange' && !getHiddenField(this, SlotChangeKey)) {
          setHiddenField(this, SlotChangeKey, true);

          if (!observer) {
            observer = initSlotObserver();
          }

          MutationObserverObserve.call(observer, this, observerConfig);
        }
      },

      writable: true,
      enumerable: true,
      configurable: true
    },
    assignedElements: {
      value(options) {
        if (isNodeShadowed(this)) {
          const flatten = !isUndefined(options) && isTrue$1(options.flatten);
          const nodes = flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
          return ArrayFilter.call(nodes, node => node instanceof Element);
        } else {
          return assignedElements.apply(this, ArraySlice.call(arguments));
        }
      },

      writable: true,
      enumerable: true,
      configurable: true
    },
    assignedNodes: {
      value(options) {
        if (isNodeShadowed(this)) {
          const flatten = !isUndefined(options) && isTrue$1(options.flatten);
          return flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
        } else {
          return assignedNodes.apply(this, ArraySlice.call(arguments));
        }
      },

      writable: true,
      enumerable: true,
      configurable: true
    },
    name: {
      get() {
        const name = getAttribute.call(this, 'name');
        return isNull(name) ? '' : name;
      },

      set(value) {
        setAttribute.call(this, 'name', value);
      },

      enumerable: true,
      configurable: true
    },
    childNodes: {
      get() {
        if (isNodeShadowed(this)) {
          const owner = getNodeOwner(this);
          const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
          return createStaticNodeList(childNodes);
        }

        return childNodesGetter.call(this);
      },

      enumerable: true,
      configurable: true
    }
  });
  defineProperties(Text.prototype, {
    assignedSlot: {
      get: assignedSlotGetterPatched,
      enumerable: true,
      configurable: true
    }
  });

  function getNonPatchedFilteredArrayOfNodes(context, unfilteredNodes) {
    let filtered;
    const ownerKey = getNodeOwnerKey(context);

    if (!isUndefined(ownerKey)) {
      if (isHostElement(context)) {
        const owner = getNodeOwner(context);

        if (isNull(owner)) {
          filtered = [];
        } else if (getNodeKey(context)) {
          filtered = getAllSlottedMatches(context, unfilteredNodes);
        } else {
          filtered = getAllMatches(owner, unfilteredNodes);
        }
      } else {
        filtered = ArrayFilter.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === ownerKey);
      }
    } else if (context instanceof HTMLBodyElement) {
      filtered = ArrayFilter.call(unfilteredNodes, elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(context));
    } else {
      filtered = ArraySlice.call(unfilteredNodes);
    }

    return filtered;
  }

  var ShadowDomSemantic;

  (function (ShadowDomSemantic) {
    ShadowDomSemantic[ShadowDomSemantic["Disabled"] = 0] = "Disabled";
    ShadowDomSemantic[ShadowDomSemantic["Enabled"] = 1] = "Enabled";
  })(ShadowDomSemantic || (ShadowDomSemantic = {}));

  function innerHTMLGetterPatched() {
    const childNodes = getInternalChildNodes(this);
    let innerHTML = '';

    for (let i = 0, len = childNodes.length; i < len; i += 1) {
      innerHTML += getOuterHTML(childNodes[i]);
    }

    return innerHTML;
  }

  function outerHTMLGetterPatched() {
    return getOuterHTML(this);
  }

  function attachShadowPatched(options) {
    if (isTrue$1(options['$$lwc-synthetic-mode$$'])) {
      return attachShadow$1(this, options);
    } else {
      return attachShadow.call(this, options);
    }
  }

  function shadowRootGetterPatched() {
    if (isHostElement(this)) {
      const shadow = getShadowRoot(this);

      if (shadow.mode === 'open') {
        return shadow;
      }
    }

    return shadowRootGetter.call(this);
  }

  function childrenGetterPatched() {
    const owner = getNodeOwner(this);
    const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
    return createStaticHTMLCollection(ArrayFilter.call(childNodes, node => node instanceof Element));
  }

  function childElementCountGetterPatched() {
    return this.children.length;
  }

  function firstElementChildGetterPatched() {
    return this.children[0] || null;
  }

  function lastElementChildGetterPatched() {
    const {
      children
    } = this;
    return children.item(children.length - 1) || null;
  }

  defineProperties(Element.prototype, {
    innerHTML: {
      get() {
        if (!runtimeFlags.ENABLE_ELEMENT_PATCH) {
          if (isNodeShadowed(this) || isHostElement(this)) {
            return innerHTMLGetterPatched.call(this);
          }

          return innerHTMLGetter.call(this);
        }

        if (isGlobalPatchingSkipped(this)) {
          return innerHTMLGetter.call(this);
        }

        return innerHTMLGetterPatched.call(this);
      },

      set(v) {
        innerHTMLSetter.call(this, v);
      },

      enumerable: true,
      configurable: true
    },
    outerHTML: {
      get() {
        if (!runtimeFlags.ENABLE_ELEMENT_PATCH) {
          if (isNodeShadowed(this) || isHostElement(this)) {
            return outerHTMLGetterPatched.call(this);
          }

          return outerHTMLGetter.call(this);
        }

        if (isGlobalPatchingSkipped(this)) {
          return outerHTMLGetter.call(this);
        }

        return outerHTMLGetterPatched.call(this);
      },

      set(v) {
        outerHTMLSetter.call(this, v);
      },

      enumerable: true,
      configurable: true
    },
    attachShadow: {
      value: attachShadowPatched,
      enumerable: true,
      writable: true,
      configurable: true
    },
    shadowRoot: {
      get: shadowRootGetterPatched,
      enumerable: true,
      configurable: true
    },
    children: {
      get() {
        if (hasMountedChildren(this)) {
          return childrenGetterPatched.call(this);
        }

        return childrenGetter.call(this);
      },

      enumerable: true,
      configurable: true
    },
    childElementCount: {
      get() {
        if (hasMountedChildren(this)) {
          return childElementCountGetterPatched.call(this);
        }

        return childElementCountGetter.call(this);
      },

      enumerable: true,
      configurable: true
    },
    firstElementChild: {
      get() {
        if (hasMountedChildren(this)) {
          return firstElementChildGetterPatched.call(this);
        }

        return firstElementChildGetter.call(this);
      },

      enumerable: true,
      configurable: true
    },
    lastElementChild: {
      get() {
        if (hasMountedChildren(this)) {
          return lastElementChildGetterPatched.call(this);
        }

        return lastElementChildGetter.call(this);
      },

      enumerable: true,
      configurable: true
    },
    assignedSlot: {
      get: assignedSlotGetterPatched,
      enumerable: true,
      configurable: true
    }
  });

  if (hasOwnProperty.call(HTMLElement.prototype, 'innerHTML')) {
    defineProperty(HTMLElement.prototype, 'innerHTML', getOwnPropertyDescriptor(Element.prototype, 'innerHTML'));
  }

  if (hasOwnProperty.call(HTMLElement.prototype, 'outerHTML')) {
    defineProperty(HTMLElement.prototype, 'outerHTML', getOwnPropertyDescriptor(Element.prototype, 'outerHTML'));
  }

  if (hasOwnProperty.call(HTMLElement.prototype, 'children')) {
    defineProperty(HTMLElement.prototype, 'children', getOwnPropertyDescriptor(Element.prototype, 'children'));
  }

  function querySelectorPatched() {
    const nodeList = arrayFromCollection(querySelectorAll.apply(this, ArraySlice.call(arguments)));

    if (isHostElement(this)) {
      const owner = getNodeOwner(this);

      if (isNull(owner)) {
        return null;
      } else if (getNodeKey(this)) {
        return getFirstSlottedMatch(this, nodeList);
      } else {
        return getFirstMatch(owner, nodeList);
      }
    } else if (isNodeShadowed(this)) {
      const ownerKey = getNodeOwnerKey(this);

      if (!isUndefined(ownerKey)) {
        const elm = ArrayFind.call(nodeList, elm => getNodeNearestOwnerKey(elm) === ownerKey);
        return isUndefined(elm) ? null : elm;
      } else {
        if (!runtimeFlags.ENABLE_NODE_LIST_PATCH) {
          return nodeList.length === 0 ? null : nodeList[0];
        }

        const contextNearestOwnerKey = getNodeNearestOwnerKey(this);
        const elm = ArrayFind.call(nodeList, elm => getNodeNearestOwnerKey(elm) === contextNearestOwnerKey);
        return isUndefined(elm) ? null : elm;
      }
    } else {
      if (!runtimeFlags.ENABLE_NODE_LIST_PATCH) {
        if (!(this instanceof HTMLBodyElement)) {
          const elm = nodeList[0];
          return isUndefined(elm) ? null : elm;
        }
      }

      const elm = ArrayFind.call(nodeList, elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(this));
      return isUndefined(elm) ? null : elm;
    }
  }

  function getFilteredArrayOfNodes(context, unfilteredNodes, shadowDomSemantic) {
    let filtered;

    if (isHostElement(context)) {
      const owner = getNodeOwner(context);

      if (isNull(owner)) {
        filtered = [];
      } else if (getNodeKey(context)) {
        filtered = getAllSlottedMatches(context, unfilteredNodes);
      } else {
        filtered = getAllMatches(owner, unfilteredNodes);
      }
    } else if (isNodeShadowed(context)) {
      const ownerKey = getNodeOwnerKey(context);

      if (!isUndefined(ownerKey)) {
        filtered = ArrayFilter.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === ownerKey);
      } else if (shadowDomSemantic === ShadowDomSemantic.Enabled) {
        const contextNearestOwnerKey = getNodeNearestOwnerKey(context);
        filtered = ArrayFilter.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === contextNearestOwnerKey);
      } else {
        filtered = ArraySlice.call(unfilteredNodes);
      }
    } else {
      if (context instanceof HTMLBodyElement || shadowDomSemantic === ShadowDomSemantic.Enabled) {
        filtered = ArrayFilter.call(unfilteredNodes, elm => isUndefined(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(context));
      } else {
        filtered = ArraySlice.call(unfilteredNodes);
      }
    }

    return filtered;
  }

  defineProperties(Element.prototype, {
    querySelector: {
      value: querySelectorPatched,
      writable: true,
      enumerable: true,
      configurable: true
    },
    querySelectorAll: {
      value() {
        const nodeList = arrayFromCollection(querySelectorAll.apply(this, ArraySlice.call(arguments)));

        if (!runtimeFlags.ENABLE_NODE_LIST_PATCH) {
          const filteredResults = getFilteredArrayOfNodes(this, nodeList, ShadowDomSemantic.Disabled);
          return createStaticNodeList(filteredResults);
        }

        return createStaticNodeList(getFilteredArrayOfNodes(this, nodeList, ShadowDomSemantic.Enabled));
      },

      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  {
    defineProperties(Element.prototype, {
      getElementsByClassName: {
        value() {
          const elements = arrayFromCollection(getElementsByClassName.apply(this, ArraySlice.call(arguments)));

          if (!runtimeFlags.ENABLE_HTML_COLLECTIONS_PATCH) {
            return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
          }

          const filteredResults = getFilteredArrayOfNodes(this, elements, ShadowDomSemantic.Enabled);
          return createStaticHTMLCollection(filteredResults);
        },

        writable: true,
        enumerable: true,
        configurable: true
      },
      getElementsByTagName: {
        value() {
          const elements = arrayFromCollection(getElementsByTagName.apply(this, ArraySlice.call(arguments)));

          if (!runtimeFlags.ENABLE_HTML_COLLECTIONS_PATCH) {
            return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
          }

          const filteredResults = getFilteredArrayOfNodes(this, elements, ShadowDomSemantic.Enabled);
          return createStaticHTMLCollection(filteredResults);
        },

        writable: true,
        enumerable: true,
        configurable: true
      },
      getElementsByTagNameNS: {
        value() {
          const elements = arrayFromCollection(getElementsByTagNameNS.apply(this, ArraySlice.call(arguments)));

          if (!runtimeFlags.ENABLE_HTML_COLLECTIONS_PATCH) {
            return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
          }

          const filteredResults = getFilteredArrayOfNodes(this, elements, ShadowDomSemantic.Enabled);
          return createStaticHTMLCollection(filteredResults);
        },

        writable: true,
        enumerable: true,
        configurable: true
      }
    });
  }

  if (hasOwnProperty.call(HTMLElement.prototype, 'getElementsByClassName')) {
    defineProperty(HTMLElement.prototype, 'getElementsByClassName', getOwnPropertyDescriptor(Element.prototype, 'getElementsByClassName'));
  }

  const FocusableSelector = `
    [contenteditable],
    [tabindex],
    a[href],
    area[href],
    audio[controls],
    button,
    iframe,
    input,
    select,
    textarea,
    video[controls]
`;
  const formElementTagNames = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']);

  function filterSequentiallyFocusableElements(elements) {
    return elements.filter(element => {
      if (hasAttribute.call(element, 'tabindex')) {
        return getAttribute.call(element, 'tabindex') === '0';
      }

      if (formElementTagNames.has(tagNameGetter.call(element))) {
        return !hasAttribute.call(element, 'disabled');
      }

      return true;
    });
  }

  const DidAddMouseDownListener = createHiddenField('DidAddMouseDownListener', 'synthetic-shadow');

  function isVisible(element) {
    const {
      width,
      height
    } = getBoundingClientRect.call(element);
    const noZeroSize = width > 0 || height > 0;
    const isAreaElement = element.tagName === 'AREA';
    return (noZeroSize || isAreaElement) && getComputedStyle(element).visibility !== 'hidden';
  }

  function isTabbable(element) {
    if (isHostElement(element) && isDelegatingFocus(element)) {
      return false;
    }

    return matches.call(element, FocusableSelector) && isVisible(element);
  }

  function hostElementFocus() {
    const _rootNode = this.getRootNode();

    if (_rootNode === this) {
      const focusable = querySelector.call(this, FocusableSelector);

      if (!isNull(focusable)) {
        focusable.focus.apply(focusable, arguments);
      }

      return;
    }

    const rootNode = _rootNode;

    if (rootNode.activeElement === this) {
      return;
    }

    const focusables = arrayFromCollection(querySelectorAll.call(this, FocusableSelector));
    let didFocus = false;

    while (!didFocus && focusables.length !== 0) {
      const focusable = focusables.shift();
      focusable.focus.apply(focusable, arguments);
      const currentRootNode = focusable.getRootNode();
      didFocus = currentRootNode.activeElement === focusable;
    }
  }

  function getTabbableSegments(host) {
    const doc = getOwnerDocument(host);
    const all = filterSequentiallyFocusableElements(arrayFromCollection(querySelectorAll$1.call(doc, FocusableSelector)));
    const inner = filterSequentiallyFocusableElements(arrayFromCollection(querySelectorAll.call(host, FocusableSelector)));

    const firstChild = inner[0];
    const lastChild = inner[inner.length - 1];
    const hostIndex = ArrayIndexOf.call(all, host);
    const firstChildIndex = hostIndex > -1 ? hostIndex : ArrayIndexOf.call(all, firstChild);
    const lastChildIndex = inner.length === 0 ? firstChildIndex + 1 : ArrayIndexOf.call(all, lastChild) + 1;
    const prev = ArraySlice.call(all, 0, firstChildIndex);
    const next = ArraySlice.call(all, lastChildIndex);
    return {
      prev,
      inner,
      next
    };
  }

  function getActiveElement(host) {
    const doc = getOwnerDocument(host);
    const activeElement = DocumentPrototypeActiveElement.call(doc);

    if (isNull(activeElement)) {
      return activeElement;
    }

    return (compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 ? activeElement : null;
  }

  function relatedTargetPosition(host, relatedTarget) {
    const pos = compareDocumentPosition.call(host, relatedTarget);

    if (pos & DOCUMENT_POSITION_CONTAINED_BY) {
      return 0;
    } else if (pos & DOCUMENT_POSITION_PRECEDING) {
      return 1;
    } else if (pos & DOCUMENT_POSITION_FOLLOWING) {
      return 2;
    }

    return -1;
  }

  function muteEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function muteFocusEventsDuringExecution(win, func) {
    windowAddEventListener.call(win, 'focusin', muteEvent, true);
    windowAddEventListener.call(win, 'focusout', muteEvent, true);
    func();
    windowRemoveEventListener.call(win, 'focusin', muteEvent, true);
    windowRemoveEventListener.call(win, 'focusout', muteEvent, true);
  }

  function focusOnNextOrBlur(segment, target, relatedTarget) {
    const win = getOwnerWindow(relatedTarget);
    const next = getNextTabbable(segment, relatedTarget);

    if (isNull(next)) {
      muteFocusEventsDuringExecution(win, () => {
        target.blur();
      });
    } else {
      muteFocusEventsDuringExecution(win, () => {
        next.focus();
      });
    }
  }

  let letBrowserHandleFocus = false;

  function disableKeyboardFocusNavigationRoutines() {
    letBrowserHandleFocus = true;
  }

  function enableKeyboardFocusNavigationRoutines() {
    letBrowserHandleFocus = false;
  }

  function skipHostHandler(event) {
    if (letBrowserHandleFocus) {
      enableKeyboardFocusNavigationRoutines();
      return;
    }

    const host = eventCurrentTargetGetter.call(event);
    const target = eventTargetGetter.call(event);

    if (host !== target) {
      return;
    }

    const relatedTarget = focusEventRelatedTargetGetter.call(event);

    if (isNull(relatedTarget)) {
      return;
    }

    const segments = getTabbableSegments(host);
    const position = relatedTargetPosition(host, relatedTarget);

    if (position === 1) {
      const findTabbableElms = isTabbableFrom.bind(null, host.getRootNode());
      const first = ArrayFind.call(segments.inner, findTabbableElms);

      if (!isUndefined(first)) {
        const win = getOwnerWindow(first);
        muteFocusEventsDuringExecution(win, () => {
          first.focus();
        });
      } else {
        focusOnNextOrBlur(segments.next, target, relatedTarget);
      }
    } else if (host === target) {
      focusOnNextOrBlur(ArrayReverse.call(segments.prev), target, relatedTarget);
    }
  }

  function skipShadowHandler(event) {
    if (letBrowserHandleFocus) {
      enableKeyboardFocusNavigationRoutines();
      return;
    }

    const relatedTarget = focusEventRelatedTargetGetter.call(event);

    if (isNull(relatedTarget)) {
      return;
    }

    const host = eventCurrentTargetGetter.call(event);
    const segments = getTabbableSegments(host);

    if (ArrayIndexOf.call(segments.inner, relatedTarget) !== -1) {
      return;
    }

    const target = eventTargetGetter.call(event);
    const position = relatedTargetPosition(host, relatedTarget);

    if (position === 1) {
      focusOnNextOrBlur(segments.next, target, relatedTarget);
    }

    if (position === 2) {
      focusOnNextOrBlur(ArrayReverse.call(segments.prev), target, relatedTarget);
    }
  }

  function isTabbableFrom(fromRoot, toElm) {
    if (!isTabbable(toElm)) {
      return false;
    }

    const ownerDocument = getOwnerDocument(toElm);
    let root = toElm.getRootNode();

    while (root !== ownerDocument && root !== fromRoot) {
      const sr = root;
      const host = sr.host;

      if (getAttribute.call(host, 'tabindex') === '-1') {
        return false;
      }

      root = host && host.getRootNode();
    }

    return true;
  }

  function getNextTabbable(tabbables, relatedTarget) {
    const len = tabbables.length;

    if (len > 0) {
      for (let i = 0; i < len; i += 1) {
        const next = tabbables[i];

        if (isTabbableFrom(relatedTarget.getRootNode(), next)) {
          return next;
        }
      }
    }

    return null;
  }

  function handleFocus(elm) {

    bindDocumentMousedownMouseupHandlers(elm);
    ignoreFocusIn(elm);
    addEventListener.call(elm, 'focusin', skipHostHandler, true);
  }

  function ignoreFocus(elm) {
    removeEventListener.call(elm, 'focusin', skipHostHandler, true);
  }

  function bindDocumentMousedownMouseupHandlers(elm) {
    const ownerDocument = getOwnerDocument(elm);

    if (!getHiddenField(ownerDocument, DidAddMouseDownListener)) {
      setHiddenField(ownerDocument, DidAddMouseDownListener, true);
      addEventListener.call(ownerDocument, 'mousedown', disableKeyboardFocusNavigationRoutines, true);
      addEventListener.call(ownerDocument, 'mouseup', () => {
        setTimeout(enableKeyboardFocusNavigationRoutines);
      }, true);
    }
  }

  function handleFocusIn(elm) {

    bindDocumentMousedownMouseupHandlers(elm);
    ignoreFocus(elm);
    addEventListener.call(elm, 'focusin', skipShadowHandler, true);
  }

  function ignoreFocusIn(elm) {
    removeEventListener.call(elm, 'focusin', skipShadowHandler, true);
  }

  const {
    blur,
    focus
  } = HTMLElement.prototype;

  function tabIndexGetterPatched() {
    if (isDelegatingFocus(this) && isFalse$1(hasAttribute.call(this, 'tabindex'))) {
      return 0;
    }

    return tabIndexGetter.call(this);
  }

  function tabIndexSetterPatched(value) {
    const delegatesFocus = isDelegatingFocus(this);
    const prevValue = tabIndexGetter.call(this);
    const prevHasAttr = hasAttribute.call(this, 'tabindex');
    tabIndexSetter.call(this, value);
    const currValue = tabIndexGetter.call(this);
    const currHasAttr = hasAttribute.call(this, 'tabindex');
    const didValueChange = prevValue !== currValue;

    if (prevHasAttr && (didValueChange || isFalse$1(currHasAttr))) {
      if (prevValue === -1) {
        ignoreFocusIn(this);
      }

      if (prevValue === 0 && delegatesFocus) {
        ignoreFocus(this);
      }
    }

    if (isFalse$1(currHasAttr)) {
      return;
    }

    if (prevHasAttr && currHasAttr && isFalse$1(didValueChange)) {
      return;
    }

    if (currValue === -1) {
      handleFocusIn(this);
    }

    if (currValue === 0 && delegatesFocus) {
      handleFocus(this);
    }
  }

  function blurPatched() {
    if (isDelegatingFocus(this)) {
      const currentActiveElement = getActiveElement(this);

      if (!isNull(currentActiveElement)) {
        currentActiveElement.blur();
        return;
      }
    }

    return blur.call(this);
  }

  function focusPatched() {
    disableKeyboardFocusNavigationRoutines();

    if (isHostElement(this) && isDelegatingFocus(this)) {
      hostElementFocus.call(this);
      return;
    }

    focus.apply(this, arguments);
    enableKeyboardFocusNavigationRoutines();
  }

  defineProperties(HTMLElement.prototype, {
    tabIndex: {
      get() {
        if (isHostElement(this)) {
          return tabIndexGetterPatched.call(this);
        }

        return tabIndexGetter.call(this);
      },

      set(v) {
        if (isHostElement(this)) {
          return tabIndexSetterPatched.call(this, v);
        }

        return tabIndexSetter.call(this, v);
      },

      enumerable: true,
      configurable: true
    },
    blur: {
      value() {
        if (isHostElement(this)) {
          return blurPatched.call(this);
        }

        blur.call(this);
      },

      enumerable: true,
      writable: true,
      configurable: true
    },
    focus: {
      value() {
        focusPatched.apply(this, arguments);
      },

      enumerable: true,
      writable: true,
      configurable: true
    }
  });
  const {
    addEventListener: superAddEventListener,
    removeEventListener: superRemoveEventListener
  } = Node.prototype;

  function addEventListenerPatched(type, listener, options) {
    if (isHostElement(this)) {
      addCustomElementEventListener(this, type, listener);
    } else {
      superAddEventListener.call(this, type, listener, options);
    }
  }

  function removeEventListenerPatched(type, listener, options) {
    if (isHostElement(this)) {
      removeCustomElementEventListener(this, type, listener);
    } else {
      superRemoveEventListener.call(this, type, listener, options);
    }
  }

  if (typeof EventTarget !== 'undefined') {
    defineProperties(EventTarget.prototype, {
      addEventListener: {
        value: addEventListenerPatched,
        enumerable: true,
        writable: true,
        configurable: true
      },
      removeEventListener: {
        value: removeEventListenerPatched,
        enumerable: true,
        writable: true,
        configurable: true
      }
    });
  } else {
    defineProperties(Node.prototype, {
      addEventListener: {
        value: addEventListenerPatched,
        enumerable: true,
        writable: true,
        configurable: true
      },
      removeEventListener: {
        value: removeEventListenerPatched,
        enumerable: true,
        writable: true,
        configurable: true
      }
    });
  }

  const ShadowTokenKey = '$shadowToken$';
  const ShadowTokenPrivateKey = '$$ShadowTokenKey$$';

  function getShadowToken(node) {
    return node[ShadowTokenKey];
  }

  function setShadowToken(node, shadowToken) {
    node[ShadowTokenKey] = shadowToken;
  }

  defineProperty(Element.prototype, '$shadowToken$', {
    set(shadowToken) {
      const oldShadowToken = this[ShadowTokenPrivateKey];

      if (!isUndefined(oldShadowToken) && oldShadowToken !== shadowToken) {
        removeAttribute.call(this, oldShadowToken);
      }

      if (!isUndefined(shadowToken)) {
        setAttribute.call(this, shadowToken, '');
      }

      this[ShadowTokenPrivateKey] = shadowToken;
    },

    get() {
      return this[ShadowTokenPrivateKey];
    },

    configurable: true
  });
  const DomManualPrivateKey = '$$DomManualKey$$';

  const DocumentResolverFn = function () {};

  let portalObserver;
  const portalObserverConfig = {
    childList: true
  };

  function adoptChildNode(node, fn, shadowToken) {
    const previousNodeShadowResolver = getShadowRootResolver(node);

    if (previousNodeShadowResolver === fn) {
      return;
    }

    setShadowRootResolver(node, fn);

    if (node instanceof Element) {
      setShadowToken(node, shadowToken);

      if (isHostElement(node)) {
        return;
      }

      if (isUndefined(previousNodeShadowResolver)) {
        MutationObserverObserve.call(portalObserver, node, portalObserverConfig);
      }

      const childNodes = childNodesGetter.call(node);

      for (let i = 0, len = childNodes.length; i < len; i += 1) {
        adoptChildNode(childNodes[i], fn, shadowToken);
      }
    }
  }

  function initPortalObserver() {
    return new MO(mutations => {
      forEach.call(mutations, mutation => {
        const {
          target: elm,
          addedNodes,
          removedNodes
        } = mutation;
        const fn = getShadowRootResolver(elm);
        const shadowToken = getShadowToken(elm);

        for (let i = 0, len = removedNodes.length; i < len; i += 1) {
          const node = removedNodes[i];

          if (!(compareDocumentPosition.call(elm, node) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
            adoptChildNode(node, DocumentResolverFn, undefined);
          }
        }

        for (let i = 0, len = addedNodes.length; i < len; i += 1) {
          const node = addedNodes[i];

          if (compareDocumentPosition.call(elm, node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
            adoptChildNode(node, fn, shadowToken);
          }
        }
      });
    });
  }

  function markElementAsPortal(elm) {
    if (isUndefined(portalObserver)) {
      portalObserver = initPortalObserver();
    }

    if (isUndefined(getShadowRootResolver(elm))) {
      throw new Error(`Invalid Element`);
    }

    MutationObserverObserve.call(portalObserver, elm, portalObserverConfig);
  }

  defineProperty(Element.prototype, '$domManual$', {
    set(v) {
      this[DomManualPrivateKey] = v;

      if (isTrue$1(v)) {
        markElementAsPortal(this);
      }
    },

    get() {
      return this[DomManualPrivateKey];
    },

    configurable: true
  });
  /** version: 1.3.7-226.4 */

  var _tmpl = void 0;

  /* proxy-compat-disable */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  function detect$4() {
    // Don't apply polyfill when ProxyCompat is enabled.
    if ('getKey' in Proxy) {
      return false;
    }

    const proxy = new Proxy([3, 4], {});
    const res = [1, 2].concat(proxy);
    return res.length !== 4;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    isConcatSpreadable
  } = Symbol;
  const {
    isArray
  } = Array;
  const {
    slice: ArraySlice$1,
    unshift: ArrayUnshift$1,
    shift: ArrayShift
  } = Array.prototype;

  function isObject$1(O) {
    return typeof O === 'object' ? O !== null : typeof O === 'function';
  } // https://www.ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable


  function isSpreadable(O) {
    if (!isObject$1(O)) {
      return false;
    }

    const spreadable = O[isConcatSpreadable];
    return spreadable !== undefined ? Boolean(spreadable) : isArray(O);
  } // https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat


  function ArrayConcatPolyfill(..._args) {
    const O = Object(this);
    const A = [];
    let N = 0;
    const items = ArraySlice$1.call(arguments);
    ArrayUnshift$1.call(items, O);

    while (items.length) {
      const E = ArrayShift.call(items);

      if (isSpreadable(E)) {
        let k = 0;
        const length = E.length;

        for (k; k < length; k += 1, N += 1) {
          if (k in E) {
            const subElement = E[k];
            A[N] = subElement;
          }
        }
      } else {
        A[N] = E;
        N += 1;
      }
    }

    return A;
  }

  function apply$4() {
    Array.prototype.concat = ArrayConcatPolyfill;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  if (detect$4()) {
    apply$4();
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function detect$1$1(propName) {
    return Object.getOwnPropertyDescriptor(Element.prototype, propName) === undefined;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    hasAttribute: hasAttribute$1,
    getAttribute: getAttribute$1,
    setAttribute: setAttribute$1,
    setAttributeNS,
    removeAttribute: removeAttribute$1,
    removeAttributeNS
  } = Element.prototype;
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // that doesn't follow the regular transformation process. e.g.: `aria-labeledby` <=> `ariaLabelBy`

  const ARIA_REGEX = /^aria/;
  const nodeToAriaPropertyValuesMap = new WeakMap();
  const {
    hasOwnProperty: hasOwnProperty$2
  } = Object.prototype;
  const {
    replace: StringReplace$1,
    toLowerCase: StringToLowerCase$1
  } = String.prototype;

  function getAriaPropertyMap(elm) {
    let map = nodeToAriaPropertyValuesMap.get(elm);

    if (map === undefined) {
      map = {};
      nodeToAriaPropertyValuesMap.set(elm, map);
    }

    return map;
  }

  function getNormalizedAriaPropertyValue(value) {
    return value == null ? null : value + '';
  }

  function createAriaPropertyPropertyDescriptor(propName, attrName) {
    return {
      get() {
        const map = getAriaPropertyMap(this);

        if (hasOwnProperty$2.call(map, propName)) {
          return map[propName];
        } // otherwise just reflect what's in the attribute


        return hasAttribute$1.call(this, attrName) ? getAttribute$1.call(this, attrName) : null;
      },

      set(newValue) {
        const normalizedValue = getNormalizedAriaPropertyValue(newValue);
        const map = getAriaPropertyMap(this);
        map[propName] = normalizedValue; // reflect into the corresponding attribute

        if (newValue === null) {
          removeAttribute$1.call(this, attrName);
        } else {
          setAttribute$1.call(this, attrName, newValue);
        }
      },

      configurable: true,
      enumerable: true
    };
  }

  function patch(propName) {
    // Typescript is inferring the wrong function type for this particular
    // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch
    const replaced = StringReplace$1.call(propName, ARIA_REGEX, 'aria-');
    const attrName = StringToLowerCase$1.call(replaced);
    const descriptor = createAriaPropertyPropertyDescriptor(propName, attrName);
    Object.defineProperty(Element.prototype, propName, descriptor);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // https://wicg.github.io/aom/spec/aria-reflection.html


  const ElementPrototypeAriaPropertyNames = ['ariaAutoComplete', 'ariaChecked', 'ariaCurrent', 'ariaDisabled', 'ariaExpanded', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaLabel', 'ariaLevel', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaPressed', 'ariaReadOnly', 'ariaRequired', 'ariaSelected', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'ariaLive', 'ariaRelevant', 'ariaAtomic', 'ariaBusy', 'ariaActiveDescendant', 'ariaControls', 'ariaDescribedBy', 'ariaFlowTo', 'ariaLabelledBy', 'ariaOwns', 'ariaPosInSet', 'ariaSetSize', 'ariaColCount', 'ariaColIndex', 'ariaDetails', 'ariaErrorMessage', 'ariaKeyShortcuts', 'ariaModal', 'ariaPlaceholder', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaColSpan', 'role'];
  /**
   * Note: Attributes aria-dropeffect and aria-grabbed were deprecated in
   * ARIA 1.1 and do not have corresponding IDL attributes.
   */

  for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
    const propName = ElementPrototypeAriaPropertyNames[i];

    if (detect$1$1(propName)) {
      patch(propName);
    }
  }
  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function invariant$1(value, msg) {
    if (!value) {
      throw new Error(`Invariant Violation: ${msg}`);
    }
  }

  function isTrue$2(value, msg) {
    if (!value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function isFalse$2(value, msg) {
    if (value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function fail$1(msg) {
    throw new Error(msg);
  }

  var assert$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    invariant: invariant$1,
    isTrue: isTrue$2,
    isFalse: isFalse$2,
    fail: fail$1
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const {
    assign: assign$2,
    create: create$2,
    defineProperties: defineProperties$2,
    defineProperty: defineProperty$2,
    freeze: freeze$2,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$2,
    getOwnPropertyNames: getOwnPropertyNames$2,
    getPrototypeOf: getPrototypeOf$2,
    hasOwnProperty: hasOwnProperty$1$1,
    keys: keys$2,
    seal: seal$2,
    setPrototypeOf: setPrototypeOf$2
  } = Object;
  const {
    isArray: isArray$1
  } = Array;
  const {
    filter: ArrayFilter$1,
    find: ArrayFind$1,
    forEach: forEach$1,
    indexOf: ArrayIndexOf$1,
    join: ArrayJoin$1,
    map: ArrayMap$1,
    push: ArrayPush$1,
    reduce: ArrayReduce$1,
    reverse: ArrayReverse$1,
    slice: ArraySlice$1$1,
    splice: ArraySplice$1,
    unshift: ArrayUnshift$1$1
  } = Array.prototype;
  const {
    charCodeAt: StringCharCodeAt$1,
    replace: StringReplace$1$1,
    slice: StringSlice$1,
    toLowerCase: StringToLowerCase$1$1
  } = String.prototype;

  function isUndefined$1(obj) {
    return obj === undefined;
  }

  function isNull$1(obj) {
    return obj === null;
  }

  function isTrue$1$1(obj) {
    return obj === true;
  }

  function isFalse$1$1(obj) {
    return obj === false;
  }

  function isFunction$1(obj) {
    return typeof obj === 'function';
  }

  function isObject$1$1(obj) {
    return typeof obj === 'object';
  }

  function isString(obj) {
    return typeof obj === 'string';
  }

  const OtS = {}.toString;

  function toString(obj) {
    if (obj && obj.toString) {
      // Arrays might hold objects with "null" prototype So using
      // Array.prototype.toString directly will cause an error Iterate through
      // all the items and handle individually.
      if (isArray$1(obj)) {
        return ArrayJoin$1.call(ArrayMap$1.call(obj, toString), ',');
      }

      return obj.toString();
    } else if (typeof obj === 'object') {
      return OtS.call(obj);
    } else {
      return obj + emptyString;
    }
  }

  function getPropertyDescriptor$1(o, p) {
    do {
      const d = getOwnPropertyDescriptor$2(o, p);

      if (!isUndefined$1(d)) {
        return d;
      }

      o = getPrototypeOf$2(o);
    } while (o !== null);
  }

  const emptyString = '';
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /*
   * In IE11, symbols are expensive.
   * Due to the nature of the symbol polyfill. This method abstract the
   * creation of symbols, so we can fallback to string when native symbols
   * are not supported. Note that we can't use typeof since it will fail when transpiling.
   */

  const hasNativeSymbolsSupport$3 = Symbol('x').toString() === 'Symbol(x)';

  function createHiddenField$1(key, namespace) {
    return hasNativeSymbolsSupport$3 ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
  }

  const hiddenFieldsMap$1 = new WeakMap();

  function setHiddenField$1(o, field, value) {
    let valuesByField = hiddenFieldsMap$1.get(o);

    if (isUndefined$1(valuesByField)) {
      valuesByField = create$2(null);
      hiddenFieldsMap$1.set(o, valuesByField);
    }

    valuesByField[field] = value;
  }

  function getHiddenField$1(o, field) {
    const valuesByField = hiddenFieldsMap$1.get(o);

    if (!isUndefined$1(valuesByField)) {
      return valuesByField[field];
    }
  }
  /** version: 1.3.7-226.4 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const defaultDefHTMLPropertyNames = ['accessKey', 'dir', 'draggable', 'hidden', 'id', 'lang', 'spellcheck', 'tabIndex', 'title']; // Few more exceptions that are using the attribute name to match the property in lowercase.
  // this list was compiled from https://msdn.microsoft.com/en-us/library/ms533062(v=vs.85).aspx
  // and https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
  // Note: this list most be in sync with the compiler as well.

  const HTMLPropertyNamesWithLowercasedReflectiveAttributes = ['accessKey', 'readOnly', 'tabIndex', 'bgColor', 'colSpan', 'rowSpan', 'contentEditable', 'dateTime', 'formAction', 'isMap', 'maxLength', 'useMap'];

  function offsetPropertyErrorMessage(name) {
    return `Using the \`${name}\` property is an anti-pattern because it rounds the value to an integer. Instead, use the \`getBoundingClientRect\` method to obtain fractional values for the size of an element and its position relative to the viewport.`;
  } // Global HTML Attributes & Properties
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement


  const globalHTMLProperties = assign$2(create$2(null), {
    accessKey: {
      attribute: 'accesskey'
    },
    accessKeyLabel: {
      readOnly: true
    },
    className: {
      attribute: 'class',
      error: 'Using the `className` property is an anti-pattern because of slow runtime behavior and potential conflicts with classes provided by the owner element. Use the `classList` API instead.'
    },
    contentEditable: {
      attribute: 'contenteditable'
    },
    dataset: {
      readOnly: true,
      error: "Using the `dataset` property is an anti-pattern because it can't be statically analyzed. Expose each property individually using the `@api` decorator instead."
    },
    dir: {
      attribute: 'dir'
    },
    draggable: {
      attribute: 'draggable'
    },
    dropzone: {
      attribute: 'dropzone',
      readOnly: true
    },
    hidden: {
      attribute: 'hidden'
    },
    id: {
      attribute: 'id'
    },
    inputMode: {
      attribute: 'inputmode'
    },
    lang: {
      attribute: 'lang'
    },
    slot: {
      attribute: 'slot',
      error: 'Using the `slot` property is an anti-pattern.'
    },
    spellcheck: {
      attribute: 'spellcheck'
    },
    style: {
      attribute: 'style'
    },
    tabIndex: {
      attribute: 'tabindex'
    },
    title: {
      attribute: 'title'
    },
    translate: {
      attribute: 'translate'
    },
    // additional "global attributes" that are not present in the link above.
    isContentEditable: {
      readOnly: true
    },
    offsetHeight: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetHeight')
    },
    offsetLeft: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetLeft')
    },
    offsetParent: {
      readOnly: true
    },
    offsetTop: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetTop')
    },
    offsetWidth: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetWidth')
    },
    role: {
      attribute: 'role'
    }
  });
  const AttrNameToPropNameMap = create$2(null);
  const PropNameToAttrNameMap = create$2(null); // Synthetic creation of all AOM property descriptors for Custom Elements

  forEach$1.call(ElementPrototypeAriaPropertyNames, propName => {
    // Typescript is inferring the wrong function type for this particular
    // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch
    const attrName = StringToLowerCase$1$1.call(StringReplace$1$1.call(propName, /^aria/, 'aria-'));
    AttrNameToPropNameMap[attrName] = propName;
    PropNameToAttrNameMap[propName] = attrName;
  });
  forEach$1.call(defaultDefHTMLPropertyNames, propName => {
    const attrName = StringToLowerCase$1$1.call(propName);
    AttrNameToPropNameMap[attrName] = propName;
    PropNameToAttrNameMap[propName] = attrName;
  });
  forEach$1.call(HTMLPropertyNamesWithLowercasedReflectiveAttributes, propName => {
    const attrName = StringToLowerCase$1$1.call(propName);
    AttrNameToPropNameMap[attrName] = propName;
    PropNameToAttrNameMap[propName] = attrName;
  });
  const CAMEL_REGEX = /-([a-z])/g;
  /**
   * This method maps between attribute names
   * and the corresponding property name.
   */

  function getPropNameFromAttrName(attrName) {
    if (isUndefined$1(AttrNameToPropNameMap[attrName])) {
      AttrNameToPropNameMap[attrName] = StringReplace$1$1.call(attrName, CAMEL_REGEX, g => g[1].toUpperCase());
    }

    return AttrNameToPropNameMap[attrName];
  }

  const CAPS_REGEX = /[A-Z]/g;
  /**
   * This method maps between property names
   * and the corresponding attribute name.
   */

  function getAttrNameFromPropName(propName) {
    if (isUndefined$1(PropNameToAttrNameMap[propName])) {
      PropNameToAttrNameMap[propName] = StringReplace$1$1.call(propName, CAPS_REGEX, match => '-' + match.toLowerCase());
    }

    return PropNameToAttrNameMap[propName];
  }

  let controlledElement = null;
  let controlledAttributeName;

  function isAttributeLocked(elm, attrName) {
    return elm !== controlledElement || attrName !== controlledAttributeName;
  }

  function lockAttribute(_elm, _key) {
    controlledElement = null;
    controlledAttributeName = undefined;
  }

  function unlockAttribute(elm, key) {
    controlledElement = elm;
    controlledAttributeName = key;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  let nextTickCallbackQueue = [];
  const SPACE_CHAR = 32;
  const EmptyObject = seal$2(create$2(null));
  const EmptyArray = seal$2([]);

  function flushCallbackQueue() {

    const callbacks = nextTickCallbackQueue;
    nextTickCallbackQueue = []; // reset to a new queue

    for (let i = 0, len = callbacks.length; i < len; i += 1) {
      callbacks[i]();
    }
  }

  function addCallbackToNextTick(callback) {

    if (nextTickCallbackQueue.length === 0) {
      Promise.resolve().then(flushCallbackQueue);
    }

    ArrayPush$1.call(nextTickCallbackQueue, callback);
  }

  function isCircularModuleDependency(value) {
    return hasOwnProperty$1$1.call(value, '__circular__');
  }
  /**
   * When LWC is used in the context of an Aura application, the compiler produces AMD
   * modules, that doesn't resolve properly circular dependencies between modules. In order
   * to circumvent this issue, the module loader returns a factory with a symbol attached
   * to it.
   *
   * This method returns the resolved value if it received a factory as argument. Otherwise
   * it returns the original value.
   */


  function resolveCircularModuleDependency(fn) {

    return fn();
  }

  const useSyntheticShadow = hasOwnProperty$1$1.call(Element.prototype, '$shadowToken$');
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function getComponentTag(vm) {
    // Element.prototype.tagName getter might be poisoned. We need to use a try/catch to protect the
    // engine internal when accessing the tagName property.
    try {
      return `<${StringToLowerCase$1$1.call(vm.elm.tagName)}>`;
    } catch (error) {
      return '<invalid-tag-name>';
    }
  } // TODO [#1695]: Unify getComponentStack and getErrorComponentStack

  function getErrorComponentStack(vm) {
    const wcStack = [];
    let currentVm = vm;

    while (!isNull$1(currentVm)) {
      ArrayPush$1.call(wcStack, getComponentTag(currentVm));
      currentVm = currentVm.owner;
    }

    return wcStack.reverse().join('\n\t');
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function handleEvent(event, vnode) {
    const {
      type
    } = event;
    const {
      data: {
        on
      }
    } = vnode;
    const handler = on && on[type]; // call event handler if exists

    if (handler) {
      handler.call(undefined, event);
    }
  }

  function createListener() {
    return function handler(event) {
      handleEvent(event, handler.vnode);
    };
  }

  function updateAllEventListeners(oldVnode, vnode) {
    if (isUndefined$1(oldVnode.listener)) {
      createAllEventListeners(vnode);
    } else {
      vnode.listener = oldVnode.listener;
      vnode.listener.vnode = vnode;
    }
  }

  function createAllEventListeners(vnode) {
    const {
      data: {
        on
      }
    } = vnode;

    if (isUndefined$1(on)) {
      return;
    }

    const elm = vnode.elm;
    const listener = vnode.listener = createListener();
    listener.vnode = vnode;
    let name;

    for (name in on) {
      elm.addEventListener(name, listener);
    }
  }

  var modEvents = {
    update: updateAllEventListeners,
    create: createAllEventListeners
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const xlinkNS = 'http://www.w3.org/1999/xlink';
  const xmlNS = 'http://www.w3.org/XML/1998/namespace';
  const ColonCharCode = 58;

  function updateAttrs(oldVnode, vnode) {
    const {
      data: {
        attrs
      }
    } = vnode;

    if (isUndefined$1(attrs)) {
      return;
    }

    let {
      data: {
        attrs: oldAttrs
      }
    } = oldVnode;

    if (oldAttrs === attrs) {
      return;
    }

    const elm = vnode.elm;
    let key;
    oldAttrs = isUndefined$1(oldAttrs) ? EmptyObject : oldAttrs; // update modified attributes, add new attributes
    // this routine is only useful for data-* attributes in all kind of elements
    // and aria-* in standard elements (custom elements will use props for these)

    for (key in attrs) {
      const cur = attrs[key];
      const old = oldAttrs[key];

      if (old !== cur) {
        unlockAttribute(elm, key);

        if (StringCharCodeAt$1.call(key, 3) === ColonCharCode) {
          // Assume xml namespace
          elm.setAttributeNS(xmlNS, key, cur);
        } else if (StringCharCodeAt$1.call(key, 5) === ColonCharCode) {
          // Assume xlink namespace
          elm.setAttributeNS(xlinkNS, key, cur);
        } else if (isNull$1(cur)) {
          elm.removeAttribute(key);
        } else {
          elm.setAttribute(key, cur);
        }

        lockAttribute();
      }
    }
  }

  const emptyVNode = {
    data: {}
  };
  var modAttrs = {
    create: vnode => updateAttrs(emptyVNode, vnode),
    update: updateAttrs
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function isLiveBindingProp(sel, key) {
    // For properties with live bindings, we read values from the DOM element
    // instead of relying on internally tracked values.
    return sel === 'input' && (key === 'value' || key === 'checked');
  }

  function update(oldVnode, vnode) {
    const props = vnode.data.props;

    if (isUndefined$1(props)) {
      return;
    }

    const oldProps = oldVnode.data.props;

    if (oldProps === props) {
      return;
    }

    const elm = vnode.elm;
    const isFirstPatch = isUndefined$1(oldProps);
    const {
      sel
    } = vnode;

    for (const key in props) {
      const cur = props[key];


      if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? elm[key] : oldProps[key])) {
        elm[key] = cur;
      }
    }
  }

  const emptyVNode$1 = {
    data: {}
  };
  var modProps = {
    create: vnode => update(emptyVNode$1, vnode),
    update
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const classNameToClassMap = create$2(null);

  function getMapFromClassName(className) {
    // Intentionally using == to match undefined and null values from computed style attribute
    if (className == null) {
      return EmptyObject;
    } // computed class names must be string


    className = isString(className) ? className : className + '';
    let map = classNameToClassMap[className];

    if (map) {
      return map;
    }

    map = create$2(null);
    let start = 0;
    let o;
    const len = className.length;

    for (o = 0; o < len; o++) {
      if (StringCharCodeAt$1.call(className, o) === SPACE_CHAR) {
        if (o > start) {
          map[StringSlice$1.call(className, start, o)] = true;
        }

        start = o + 1;
      }
    }

    if (o > start) {
      map[StringSlice$1.call(className, start, o)] = true;
    }

    classNameToClassMap[className] = map;

    return map;
  }

  function updateClassAttribute(oldVnode, vnode) {
    const {
      elm,
      data: {
        className: newClass
      }
    } = vnode;
    const {
      data: {
        className: oldClass
      }
    } = oldVnode;

    if (oldClass === newClass) {
      return;
    }

    const {
      classList
    } = elm;
    const newClassMap = getMapFromClassName(newClass);
    const oldClassMap = getMapFromClassName(oldClass);
    let name;

    for (name in oldClassMap) {
      // remove only if it is not in the new class collection and it is not set from within the instance
      if (isUndefined$1(newClassMap[name])) {
        classList.remove(name);
      }
    }

    for (name in newClassMap) {
      if (isUndefined$1(oldClassMap[name])) {
        classList.add(name);
      }
    }
  }

  const emptyVNode$2 = {
    data: {}
  };
  var modComputedClassName = {
    create: vnode => updateClassAttribute(emptyVNode$2, vnode),
    update: updateClassAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function updateStyleAttribute(oldVnode, vnode) {
    const {
      style: newStyle
    } = vnode.data;

    if (oldVnode.data.style === newStyle) {
      return;
    }

    const elm = vnode.elm;
    const {
      style
    } = elm;

    if (!isString(newStyle) || newStyle === '') {
      removeAttribute$1.call(elm, 'style');
    } else {
      style.cssText = newStyle;
    }
  }

  const emptyVNode$3 = {
    data: {}
  };
  var modComputedStyle = {
    create: vnode => updateStyleAttribute(emptyVNode$3, vnode),
    update: updateStyleAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // The compiler takes care of transforming the inline classnames into an object. It's faster to set the
  // different classnames properties individually instead of via a string.

  function createClassAttribute(vnode) {
    const {
      elm,
      data: {
        classMap
      }
    } = vnode;

    if (isUndefined$1(classMap)) {
      return;
    }

    const {
      classList
    } = elm;

    for (const name in classMap) {
      classList.add(name);
    }
  }

  var modStaticClassName = {
    create: createClassAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // The compiler takes care of transforming the inline style into an object. It's faster to set the
  // different style properties individually instead of via a string.

  function createStyleAttribute(vnode) {
    const {
      elm,
      data: {
        styleMap
      }
    } = vnode;

    if (isUndefined$1(styleMap)) {
      return;
    }

    const {
      style
    } = elm;

    for (const name in styleMap) {
      style[name] = styleMap[name];
    }
  }

  var modStaticStyle = {
    create: createStyleAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function createContext(vnode) {
    const {
      data: {
        context
      }
    } = vnode;

    if (isUndefined$1(context)) {
      return;
    }

    const elm = vnode.elm;
    const vm = getAssociatedVMIfPresent(elm);

    if (!isUndefined$1(vm)) {
      assign$2(vm.context, context);
    }
  }

  const contextModule = {
    create: createContext
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
  @license
  Copyright (c) 2015 Simon Friis Vindum.
  This code may only be used under the MIT License found at
  https://github.com/snabbdom/snabbdom/blob/master/LICENSE
  Code distributed by Snabbdom as part of the Snabbdom project at
  https://github.com/snabbdom/snabbdom/
  */

  function isUndef(s) {
    return s === undefined;
  }

  function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
  }

  function isVNode(vnode) {
    return vnode != null;
  }

  function createKeyToOldIdx(children, beginIdx, endIdx) {
    const map = {};
    let j, key, ch; // TODO [#1637]: simplify this by assuming that all vnodes has keys

    for (j = beginIdx; j <= endIdx; ++j) {
      ch = children[j];

      if (isVNode(ch)) {
        key = ch.key;

        if (key !== undefined) {
          map[key] = j;
        }
      }
    }

    return map;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx];

      if (isVNode(ch)) {
        ch.hook.create(ch);
        ch.hook.insert(ch, parentElm, before);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]; // text nodes do not have logic associated to them

      if (isVNode(ch)) {
        ch.hook.remove(ch, parentElm);
      }
    }
  }

  function updateDynamicChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (!isVNode(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (!isVNode(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (!isVNode(newStartVnode)) {
        newStartVnode = newCh[++newStartIdx];
      } else if (!isVNode(newEndVnode)) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode);
        newEndVnode.hook.move(oldStartVnode, parentElm, oldEndVnode.elm.nextSibling);
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode);
        newStartVnode.hook.move(oldEndVnode, parentElm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = oldKeyToIdx[newStartVnode.key];

        if (isUndef(idxInOld)) {
          // New element
          newStartVnode.hook.create(newStartVnode);
          newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];

          if (isVNode(elmToMove)) {
            if (elmToMove.sel !== newStartVnode.sel) {
              // New element
              newStartVnode.hook.create(newStartVnode);
              newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
            } else {
              patchVnode(elmToMove, newStartVnode);
              oldCh[idxInOld] = undefined;
              newStartVnode.hook.move(elmToMove, parentElm, oldStartVnode.elm);
            }
          }

          newStartVnode = newCh[++newStartIdx];
        }
      }
    }

    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        const n = newCh[newEndIdx + 1];
        before = isVNode(n) ? n.elm : null;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }

  function updateStaticChildren(parentElm, oldCh, newCh) {
    const {
      length
    } = newCh;

    if (oldCh.length === 0) {
      // the old list is empty, we can directly insert anything new
      addVnodes(parentElm, null, newCh, 0, length);
      return;
    } // if the old list is not empty, the new list MUST have the same
    // amount of nodes, that's why we call this static children


    let referenceElm = null;

    for (let i = length - 1; i >= 0; i -= 1) {
      const vnode = newCh[i];
      const oldVNode = oldCh[i];

      if (vnode !== oldVNode) {
        if (isVNode(oldVNode)) {
          if (isVNode(vnode)) {
            // both vnodes must be equivalent, and se just need to patch them
            patchVnode(oldVNode, vnode);
            referenceElm = vnode.elm;
          } else {
            // removing the old vnode since the new one is null
            oldVNode.hook.remove(oldVNode, parentElm);
          }
        } else if (isVNode(vnode)) {
          // this condition is unnecessary
          vnode.hook.create(vnode); // insert the new node one since the old one is null

          vnode.hook.insert(vnode, parentElm, referenceElm);
          referenceElm = vnode.elm;
        }
      }
    }
  }

  function patchVnode(oldVnode, vnode) {
    if (oldVnode !== vnode) {
      vnode.elm = oldVnode.elm;
      vnode.hook.update(oldVnode, vnode);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const noop = () => void 0;

  function observeElementChildNodes(elm) {
    elm.$domManual$ = true;
  }

  function setElementShadowToken(elm, token) {
    elm.$shadowToken$ = token;
  }

  function updateNodeHook(oldVnode, vnode) {
    const {
      text
    } = vnode;

    if (oldVnode.text !== text) {
      /**
       * Compiler will never produce a text property that is not string
       */


      vnode.elm.nodeValue = text;
    }
  }

  function insertNodeHook(vnode, parentNode, referenceNode) {

    parentNode.insertBefore(vnode.elm, referenceNode);
  }

  function removeNodeHook(vnode, parentNode) {

    parentNode.removeChild(vnode.elm);
  }

  function createElmHook(vnode) {
    modEvents.create(vnode); // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.

    modAttrs.create(vnode);
    modProps.create(vnode);
    modStaticClassName.create(vnode);
    modStaticStyle.create(vnode);
    modComputedClassName.create(vnode);
    modComputedStyle.create(vnode);
    contextModule.create(vnode);
  }

  var LWCDOMMode;

  (function (LWCDOMMode) {
    LWCDOMMode["manual"] = "manual";
  })(LWCDOMMode || (LWCDOMMode = {}));

  function fallbackElmHook(vnode) {
    const {
      owner
    } = vnode;
    const elm = vnode.elm;

    if (isTrue$1$1(useSyntheticShadow)) {
      const {
        data: {
          context
        }
      } = vnode;
      const {
        shadowAttribute
      } = owner.context;

      if (!isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === LWCDOMMode.manual) {
        // this element will now accept any manual content inserted into it
        observeElementChildNodes(elm);
      } // when running in synthetic shadow mode, we need to set the shadowToken value
      // into each element from the template, so they can be styled accordingly.


      setElementShadowToken(elm, shadowAttribute);
    }
  }

  function updateElmHook(oldVnode, vnode) {
    // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.
    modAttrs.update(oldVnode, vnode);
    modProps.update(oldVnode, vnode);
    modComputedClassName.update(oldVnode, vnode);
    modComputedStyle.update(oldVnode, vnode);
  }

  function insertCustomElmHook(vnode) {
    const vm = getAssociatedVM(vnode.elm);
    appendVM(vm);
  }

  function updateChildrenHook(oldVnode, vnode) {
    const {
      children,
      owner
    } = vnode;
    const fn = hasDynamicChildren(children) ? updateDynamicChildren : updateStaticChildren;
    runWithBoundaryProtection(owner, owner.owner, noop, () => {
      fn(vnode.elm, oldVnode.children, children);
    }, noop);
  }

  function allocateChildrenHook(vnode) {
    const vm = getAssociatedVM(vnode.elm); // A component with slots will re-render because:
    // 1- There is a change of the internal state.
    // 2- There is a change on the external api (ex: slots)
    //
    // In case #1, the vnodes in the cmpSlots will be reused since they didn't changed. This routine emptied the
    // slotted children when those VCustomElement were rendered and therefore in subsequent calls to allocate children
    // in a reused VCustomElement, there won't be any slotted children.
    // For those cases, we will use the reference for allocated children stored when rendering the fresh VCustomElement.
    //
    // In case #2, we will always get a fresh VCustomElement.

    const children = vnode.aChildren || vnode.children;
    vm.aChildren = children;

    if (isTrue$1$1(useSyntheticShadow)) {
      // slow path
      allocateInSlot(vm, children); // save the allocated children in case this vnode is reused.

      vnode.aChildren = children; // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!

      vnode.children = EmptyArray;
    }
  }

  function createViewModelHook(vnode) {
    const elm = vnode.elm;

    if (!isUndefined$1(getAssociatedVMIfPresent(elm))) {
      // There is a possibility that a custom element is registered under tagName,
      // in which case, the initialization is already carry on, and there is nothing else
      // to do here since this hook is called right after invoking `document.createElement`.
      return;
    }

    const {
      mode,
      ctor,
      owner
    } = vnode;
    const def = getComponentDef(ctor);
    setElementProto(elm, def);

    if (isTrue$1$1(useSyntheticShadow)) {
      const {
        shadowAttribute
      } = owner.context; // when running in synthetic shadow mode, we need to set the shadowToken value
      // into each element from the template, so they can be styled accordingly.

      setElementShadowToken(elm, shadowAttribute);
    }

    createVM(elm, ctor, {
      mode,
      owner
    });
  }

  function createCustomElmHook(vnode) {
    modEvents.create(vnode); // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.

    modAttrs.create(vnode);
    modProps.create(vnode);
    modStaticClassName.create(vnode);
    modStaticStyle.create(vnode);
    modComputedClassName.create(vnode);
    modComputedStyle.create(vnode);
    contextModule.create(vnode);
  }

  function createChildrenHook(vnode) {
    const {
      elm,
      children
    } = vnode;

    for (let j = 0; j < children.length; ++j) {
      const ch = children[j];

      if (ch != null) {
        ch.hook.create(ch);
        ch.hook.insert(ch, elm, null);
      }
    }
  }

  function rerenderCustomElmHook(vnode) {
    const vm = getAssociatedVM(vnode.elm);

    rerenderVM(vm);
  }

  function updateCustomElmHook(oldVnode, vnode) {
    // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.
    modAttrs.update(oldVnode, vnode);
    modProps.update(oldVnode, vnode);
    modComputedClassName.update(oldVnode, vnode);
    modComputedStyle.update(oldVnode, vnode);
  }

  function removeElmHook(vnode) {
    // this method only needs to search on child vnodes from template
    // to trigger the remove hook just in case some of those children
    // are custom elements.
    const {
      children,
      elm
    } = vnode;

    for (let j = 0, len = children.length; j < len; ++j) {
      const ch = children[j];

      if (!isNull$1(ch)) {
        ch.hook.remove(ch, elm);
      }
    }
  }

  function removeCustomElmHook(vnode) {
    // for custom elements we don't have to go recursively because the removeVM routine
    // will take care of disconnecting any child VM attached to its shadow as well.
    removeVM(getAssociatedVM(vnode.elm));
  } // Using a WeakMap instead of a WeakSet because this one works in IE11 :(


  const FromIteration = new WeakMap(); // dynamic children means it was generated by an iteration
  // in a template, and will require a more complex diffing algo.

  function markAsDynamicChildren(children) {
    FromIteration.set(children, 1);
  }

  function hasDynamicChildren(children) {
    return FromIteration.has(children);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const Services = create$2(null);

  function invokeServiceHook(vm, cbs) {

    const {
      component,
      data,
      def,
      context
    } = vm;

    for (let i = 0, len = cbs.length; i < len; ++i) {
      cbs[i].call(undefined, component, data, def, context);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const CHAR_S$1 = 115;
  const CHAR_V = 118;
  const CHAR_G = 103;
  const NamespaceAttributeForSVG = 'http://www.w3.org/2000/svg';
  const SymbolIterator = Symbol.iterator;
  const TextHook = {
    create: vnode => {
      vnode.elm = document.createTextNode(vnode.text);
      linkNodeToShadow(vnode);
    },
    update: updateNodeHook,
    insert: insertNodeHook,
    move: insertNodeHook,
    remove: removeNodeHook
  }; // insert is called after update, which is used somewhere else (via a module)
  // to mark the vm as inserted, that means we cannot use update as the main channel
  // to rehydrate when dirty, because sometimes the element is not inserted just yet,
  // which breaks some invariants. For that reason, we have the following for any
  // Custom Element that is inserted via a template.

  const ElementHook = {
    create: vnode => {
      const {
        data,
        sel,
        clonedElement
      } = vnode;
      const {
        ns
      } = data; // TODO [#1364]: supporting the ability to inject a cloned StyleElement via a vnode this is
      // used for style tags for native shadow

      if (isUndefined$1(clonedElement)) {
        vnode.elm = isUndefined$1(ns) ? document.createElement(sel) : document.createElementNS(ns, sel);
      } else {
        vnode.elm = clonedElement;
      }

      linkNodeToShadow(vnode);
      fallbackElmHook(vnode);
      createElmHook(vnode);
    },
    update: (oldVnode, vnode) => {
      updateElmHook(oldVnode, vnode);
      updateChildrenHook(oldVnode, vnode);
    },
    insert: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
      createChildrenHook(vnode);
    },
    move: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
    },
    remove: (vnode, parentNode) => {
      removeNodeHook(vnode, parentNode);
      removeElmHook(vnode);
    }
  };
  const CustomElementHook = {
    create: vnode => {
      const {
        sel
      } = vnode;
      vnode.elm = document.createElement(sel);
      linkNodeToShadow(vnode);
      createViewModelHook(vnode);
      allocateChildrenHook(vnode);
      createCustomElmHook(vnode);
    },
    update: (oldVnode, vnode) => {
      updateCustomElmHook(oldVnode, vnode); // in fallback mode, the allocation will always set children to
      // empty and delegate the real allocation to the slot elements

      allocateChildrenHook(vnode); // in fallback mode, the children will be always empty, so, nothing
      // will happen, but in native, it does allocate the light dom

      updateChildrenHook(oldVnode, vnode); // this will update the shadowRoot

      rerenderCustomElmHook(vnode);
    },
    insert: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
      const vm = getAssociatedVM(vnode.elm);

      runConnectedCallback(vm);
      createChildrenHook(vnode);
      insertCustomElmHook(vnode);
    },
    move: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
    },
    remove: (vnode, parentNode) => {
      removeNodeHook(vnode, parentNode);
      removeCustomElmHook(vnode);
    }
  };

  function linkNodeToShadow(vnode) {
    // TODO [#1164]: this should eventually be done by the polyfill directly
    vnode.elm.$shadowResolver$ = vnode.owner.cmpRoot.$shadowResolver$;
  } // TODO [#1136]: this should be done by the compiler, adding ns to every sub-element


  function addNS(vnode) {
    const {
      data,
      children,
      sel
    } = vnode;
    data.ns = NamespaceAttributeForSVG; // TODO [#1275]: review why `sel` equal `foreignObject` should get this `ns`

    if (isArray$1(children) && sel !== 'foreignObject') {
      for (let j = 0, n = children.length; j < n; ++j) {
        const childNode = children[j];

        if (childNode != null && childNode.hook === ElementHook) {
          addNS(childNode);
        }
      }
    }
  }

  function addVNodeToChildLWC(vnode) {
    ArrayPush$1.call(getVMBeingRendered().velements, vnode);
  } // [h]tml node


  function h(sel, data, children) {
    const vmBeingRendered = getVMBeingRendered();

    const {
      key
    } = data;
    let text, elm;
    const vnode = {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: ElementHook,
      owner: vmBeingRendered
    };

    if (sel.length === 3 && StringCharCodeAt$1.call(sel, 0) === CHAR_S$1 && StringCharCodeAt$1.call(sel, 1) === CHAR_V && StringCharCodeAt$1.call(sel, 2) === CHAR_G) {
      addNS(vnode);
    }

    return vnode;
  } // [t]ab[i]ndex function


  function ti(value) {
    // if value is greater than 0, we normalize to 0
    // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
    // If value is less than -1, we don't care
    const shouldNormalize = value > 0 && !(isTrue$1$1(value) || isFalse$1$1(value));

    return shouldNormalize ? 0 : value;
  } // [s]lot element node


  function s(slotName, data, children, slotset) {

    if (!isUndefined$1(slotset) && !isUndefined$1(slotset[slotName]) && slotset[slotName].length !== 0) {
      children = slotset[slotName];
    }

    const vnode = h('slot', data, children);

    if (useSyntheticShadow) {
      // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
      sc(children);
    }

    return vnode;
  } // [c]ustom element node


  function c(sel, Ctor, data, children = EmptyArray) {
    if (isCircularModuleDependency(Ctor)) {
      Ctor = resolveCircularModuleDependency(Ctor);
    }

    const vmBeingRendered = getVMBeingRendered();

    const {
      key
    } = data;
    let text, elm;
    const vnode = {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: CustomElementHook,
      ctor: Ctor,
      owner: vmBeingRendered,
      mode: 'open'
    };
    addVNodeToChildLWC(vnode);
    return vnode;
  } // [i]terable node


  function i(iterable, factory) {
    const list = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

    sc(list);

    if (isUndefined$1(iterable) || iterable === null) {

      return list;
    }

    const iterator = iterable[SymbolIterator]();

    let next = iterator.next();
    let j = 0;
    let {
      value,
      done: last
    } = next;

    while (last === false) {
      // implementing a look-back-approach because we need to know if the element is the last
      next = iterator.next();
      last = next.done; // template factory logic based on the previous collected value

      const vnode = factory(value, j, j === 0, last);

      if (isArray$1(vnode)) {
        ArrayPush$1.apply(list, vnode);
      } else {
        ArrayPush$1.call(list, vnode);
      }


      j += 1;
      value = next.value;
    }

    return list;
  }
  /**
   * [f]lattening
   */


  function f(items) {

    const len = items.length;
    const flattened = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

    sc(flattened);

    for (let j = 0; j < len; j += 1) {
      const item = items[j];

      if (isArray$1(item)) {
        ArrayPush$1.apply(flattened, item);
      } else {
        ArrayPush$1.call(flattened, item);
      }
    }

    return flattened;
  } // [t]ext node


  function t(text) {
    const data = EmptyObject;
    let sel, children, key, elm;
    return {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: TextHook,
      owner: getVMBeingRendered()
    };
  } // [d]ynamic value to produce a text vnode


  function d(value) {
    if (value == null) {
      return null;
    }

    return t(value);
  } // [b]ind function


  function b(fn) {
    const vmBeingRendered = getVMBeingRendered();

    if (isNull$1(vmBeingRendered)) {
      throw new Error();
    }

    const vm = vmBeingRendered;
    return function (event) {
      invokeEventListener(vm, fn, vm.component, event);
    };
  } // [f]unction_[b]ind


  function fb(fn) {
    const vmBeingRendered = getVMBeingRendered();

    if (isNull$1(vmBeingRendered)) {
      throw new Error();
    }

    const vm = vmBeingRendered;
    return function () {
      return invokeComponentCallback(vm, fn, ArraySlice$1$1.call(arguments));
    };
  } // [l]ocator_[l]istener function


  function ll(originalHandler, id, context) {
    const vm = getVMBeingRendered();

    if (isNull$1(vm)) {
      throw new Error();
    } // bind the original handler with b() so we can call it
    // after resolving the locator


    const eventListener = b(originalHandler); // create a wrapping handler to resolve locator, and
    // then invoke the original handler.

    return function (event) {
      // located service for the locator metadata
      const {
        context: {
          locator
        }
      } = vm;

      if (!isUndefined$1(locator)) {
        const {
          locator: locatorService
        } = Services;

        if (locatorService) {
          locator.resolved = {
            target: id,
            host: locator.id,
            targetContext: isFunction$1(context) && context(),
            hostContext: isFunction$1(locator.context) && locator.context()
          }; // a registered `locator` service will be invoked with
          // access to the context.locator.resolved, which will contain:
          // outer id, outer context, inner id, and inner context

          invokeServiceHook(vm, locatorService);
        }
      } // invoke original event listener via b()


      eventListener(event);
    };
  } // [k]ey function


  function k(compilerKey, obj) {
    switch (typeof obj) {
      case 'number':
      case 'string':
        return compilerKey + ':' + obj;

    }
  } // [g]lobal [id] function


  function gid(id) {
    const vmBeingRendered = getVMBeingRendered();

    if (isUndefined$1(id) || id === '') {

      return id;
    } // We remove attributes when they are assigned a value of null


    if (isNull$1(id)) {
      return null;
    }

    return `${id}-${vmBeingRendered.idx}`;
  } // [f]ragment [id] function


  function fid(url) {
    const vmBeingRendered = getVMBeingRendered();

    if (isUndefined$1(url) || url === '') {

      return url;
    } // We remove attributes when they are assigned a value of null


    if (isNull$1(url)) {
      return null;
    } // Apply transformation only for fragment-only-urls


    if (/^#/.test(url)) {
      return `${url}-${vmBeingRendered.idx}`;
    }

    return url;
  }
  /**
   * Map to store an index value assigned to any dynamic component reference ingested
   * by dc() api. This allows us to generate a unique unique per template per dynamic
   * component reference to avoid diffing algo mismatches.
   */


  const DynamicImportedComponentMap = new Map();
  let dynamicImportedComponentCounter = 0;
  /**
   * create a dynamic component via `<x-foo lwc:dynamic={Ctor}>`
   */

  function dc(sel, Ctor, data, children) {


    if (Ctor == null) {
      return null;
    }

    if (!isComponentConstructor(Ctor)) {
      throw new Error(`Invalid LWC Constructor ${toString(Ctor)} for custom element <${sel}>.`);
    }

    let idx = DynamicImportedComponentMap.get(Ctor);

    if (isUndefined$1(idx)) {
      idx = dynamicImportedComponentCounter++;
      DynamicImportedComponentMap.set(Ctor, idx);
    } // the new vnode key is a mix of idx and compiler key, this is required by the diffing algo
    // to identify different constructors as vnodes with different keys to avoid reusing the
    // element used for previous constructors.


    data.key = `dc:${idx}:${data.key}`;
    return c(sel, Ctor, data, children);
  }
  /**
   * slow children collection marking mechanism. this API allows the compiler to signal
   * to the engine that a particular collection of children must be diffed using the slow
   * algo based on keys due to the nature of the list. E.g.:
   *
   *   - slot element's children: the content of the slot has to be dynamic when in synthetic
   *                              shadow mode because the `vnode.children` might be the slotted
   *                              content vs default content, in which case the size and the
   *                              keys are not matching.
   *   - children that contain dynamic components
   *   - children that are produced by iteration
   *
   */


  function sc(vnodes) {
    // choose to use the snabbdom virtual dom diffing algo instead of our
    // static dummy algo.


    markAsDynamicChildren(vnodes);
    return vnodes;
  }

  var api = /*#__PURE__*/Object.freeze({
    __proto__: null,
    h: h,
    ti: ti,
    s: s,
    c: c,
    i: i,
    f: f,
    t: t,
    d: d,
    b: b,
    fb: fb,
    ll: ll,
    k: k,
    gid: gid,
    fid: fid,
    dc: dc,
    sc: sc
  });
  const signedTemplateSet = new Set();

  function defaultEmptyTemplate() {
    return [];
  }

  signedTemplateSet.add(defaultEmptyTemplate);

  function isTemplateRegistered(tpl) {
    return signedTemplateSet.has(tpl);
  }
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by userland code.
   */


  function registerTemplate(tpl) {
    signedTemplateSet.add(tpl); // chaining this method as a way to wrap existing
    // assignment of templates easily, without too much transformation

    return tpl;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const CachedStyleFragments = create$2(null);

  function createStyleElement(styleContent) {
    const elm = document.createElement('style');
    elm.type = 'text/css';
    elm.textContent = styleContent;
    return elm;
  }

  function getCachedStyleElement(styleContent) {
    let fragment = CachedStyleFragments[styleContent];

    if (isUndefined$1(fragment)) {
      fragment = document.createDocumentFragment();
      const styleElm = createStyleElement(styleContent);
      fragment.appendChild(styleElm);
      CachedStyleFragments[styleContent] = fragment;
    }

    return fragment.cloneNode(true).firstChild;
  }

  const globalStyleParent = document.head || document.body || document;
  const InsertedGlobalStyleContent = create$2(null);

  function insertGlobalStyle(styleContent) {
    // inserts the global style when needed, otherwise does nothing
    if (isUndefined$1(InsertedGlobalStyleContent[styleContent])) {
      InsertedGlobalStyleContent[styleContent] = true;
      const elm = createStyleElement(styleContent);
      globalStyleParent.appendChild(elm);
    }
  }

  function createStyleVNode(elm) {
    const vnode = h('style', {
      key: 'style'
    }, EmptyArray); // TODO [#1364]: supporting the ability to inject a cloned StyleElement
    // forcing the diffing algo to use the cloned style for native shadow

    vnode.clonedElement = elm;
    return vnode;
  }
  /**
   * Reset the styling token applied to the host element.
   */


  function resetStyleAttributes(vm) {
    const {
      context,
      elm
    } = vm; // Remove the style attribute currently applied to the host element.

    const oldHostAttribute = context.hostAttribute;

    if (!isUndefined$1(oldHostAttribute)) {
      removeAttribute$1.call(elm, oldHostAttribute);
    } // Reset the scoping attributes associated to the context.


    context.hostAttribute = context.shadowAttribute = undefined;
  }
  /**
   * Apply/Update the styling token applied to the host element.
   */


  function applyStyleAttributes(vm, hostAttribute, shadowAttribute) {
    const {
      context,
      elm
    } = vm; // Remove the style attribute currently applied to the host element.

    setAttribute$1.call(elm, hostAttribute, '');
    context.hostAttribute = hostAttribute;
    context.shadowAttribute = shadowAttribute;
  }

  function collectStylesheets(stylesheets, hostSelector, shadowSelector, isNative, aggregatorFn) {
    forEach$1.call(stylesheets, sheet => {
      if (isArray$1(sheet)) {
        collectStylesheets(sheet, hostSelector, shadowSelector, isNative, aggregatorFn);
      } else {
        aggregatorFn(sheet(hostSelector, shadowSelector, isNative));
      }
    });
  }

  function evaluateCSS(stylesheets, hostAttribute, shadowAttribute) {

    if (useSyntheticShadow) {
      const hostSelector = `[${hostAttribute}]`;
      const shadowSelector = `[${shadowAttribute}]`;
      collectStylesheets(stylesheets, hostSelector, shadowSelector, false, textContent => {
        insertGlobalStyle(textContent);
      });
      return null;
    } else {
      // Native shadow in place, we need to act accordingly by using the `:host` selector, and an
      // empty shadow selector since it is not really needed.
      let buffer = '';
      collectStylesheets(stylesheets, emptyString, emptyString, true, textContent => {
        buffer += textContent;
      });
      return createStyleVNode(getCachedStyleElement(buffer));
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  var GlobalMeasurementPhase;

  (function (GlobalMeasurementPhase) {
    GlobalMeasurementPhase["REHYDRATE"] = "lwc-rehydrate";
    GlobalMeasurementPhase["HYDRATE"] = "lwc-hydrate";
  })(GlobalMeasurementPhase || (GlobalMeasurementPhase = {})); // Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
  // JSDom (used in Jest) for example doesn't implement the UserTiming APIs.


  const isUserTimingSupported = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

  function getMarkName(phase, vm) {
    // Adding the VM idx to the mark name creates a unique mark name component instance. This is necessary to produce
    // the right measures for components that are recursive.
    return `${getComponentTag(vm)} - ${phase} - ${vm.idx}`;
  }

  function start(markName) {
    performance.mark(markName);
  }

  function end(measureName, markName) {
    performance.measure(measureName, markName); // Clear the created marks and measure to avoid filling the performance entries buffer.
    // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.

    performance.clearMarks(markName);
    performance.clearMarks(measureName);
  }

  function noop$1() {
    /* do nothing */
  }
  const startGlobalMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
    const markName = isUndefined$1(vm) ? phase : getMarkName(phase, vm);
    start(markName);
  };
  const endGlobalMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
    const markName = isUndefined$1(vm) ? phase : getMarkName(phase, vm);
    end(phase, markName);
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  let isUpdatingTemplate = false;
  let vmBeingRendered = null;

  function getVMBeingRendered() {
    return vmBeingRendered;
  }

  function setVMBeingRendered(vm) {
    vmBeingRendered = vm;
  }

  const EmptySlots = create$2(null);

  function validateSlots(vm, html) {
    {
      // this method should never leak to prod
      throw new ReferenceError();
    }
  }

  function validateFields(vm, html) {
    {
      // this method should never leak to prod
      throw new ReferenceError();
    }
  }

  function evaluateTemplate(vm, html) {

    const isUpdatingTemplateInception = isUpdatingTemplate;
    const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
    let vnodes = [];
    runWithBoundaryProtection(vm, vm.owner, () => {
      // pre
      vmBeingRendered = vm;
    }, () => {
      // job
      const {
        component,
        context,
        cmpSlots,
        cmpTemplate,
        tro
      } = vm;
      tro.observe(() => {
        // reset the cache memoizer for template when needed
        if (html !== cmpTemplate) {
          // perf opt: do not reset the shadow root during the first rendering (there is nothing to reset)
          if (!isUndefined$1(cmpTemplate)) {
            // It is important to reset the content to avoid reusing similar elements generated from a different
            // template, because they could have similar IDs, and snabbdom just rely on the IDs.
            resetShadowRoot(vm);
          } // Check that the template was built by the compiler


          if (isUndefined$1(html) || !isTemplateRegistered(html)) {
            throw new TypeError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString(html)}.`);
          }

          vm.cmpTemplate = html; // Populate context with template information

          context.tplCache = create$2(null);
          resetStyleAttributes(vm);
          const {
            stylesheets,
            stylesheetTokens
          } = html;

          if (isUndefined$1(stylesheets) || stylesheets.length === 0) {
            context.styleVNode = null;
          } else if (!isUndefined$1(stylesheetTokens)) {
            const {
              hostAttribute,
              shadowAttribute
            } = stylesheetTokens;
            applyStyleAttributes(vm, hostAttribute, shadowAttribute); // Caching style vnode so it can be reused on every render

            context.styleVNode = evaluateCSS(stylesheets, hostAttribute, shadowAttribute);
          }

          if ("production" !== 'production') {
            // one time operation for any new template returned by render()
            // so we can warn if the template is attempting to use a binding
            // that is not provided by the component instance.
            validateFields(vm, html);
          }
        }

        if ("production" !== 'production') {
          assert$1.isTrue(isObject$1$1(context.tplCache), `vm.context.tplCache must be an object associated to ${cmpTemplate}.`); // validating slots in every rendering since the allocated content might change over time

          validateSlots(vm, html);
        } // right before producing the vnodes, we clear up all internal references
        // to custom elements from the template.


        vm.velements = []; // Set the global flag that template is being updated

        isUpdatingTemplate = true;
        vnodes = html.call(undefined, api, component, cmpSlots, context.tplCache);
        const {
          styleVNode
        } = context;

        if (!isNull$1(styleVNode)) {
          ArrayUnshift$1$1.call(vnodes, styleVNode);
        }
      });
    }, () => {
      // post
      isUpdatingTemplate = isUpdatingTemplateInception;
      vmBeingRendered = vmOfTemplateBeingUpdatedInception;
    });

    return vnodes;
  }
  let vmBeingConstructed = null;

  function isBeingConstructed(vm) {
    return vmBeingConstructed === vm;
  }

  const noop$2 = () => void 0;

  function invokeComponentCallback(vm, fn, args) {
    const {
      component,
      callHook,
      owner
    } = vm;
    let result;
    runWithBoundaryProtection(vm, owner, noop$2, () => {
      // job
      result = callHook(component, fn, args);
    }, noop$2);
    return result;
  }

  function invokeComponentConstructor(vm, Ctor) {
    const vmBeingConstructedInception = vmBeingConstructed;
    let error;

    vmBeingConstructed = vm;
    /**
     * Constructors don't need to be wrapped with a boundary because for root elements
     * it should throw, while elements from template are already wrapped by a boundary
     * associated to the diffing algo.
     */

    try {
      // job
      const result = new Ctor(); // Check indirectly if the constructor result is an instance of LightningElement. Using
      // the "instanceof" operator would not work here since Locker Service provides its own
      // implementation of LightningElement, so we indirectly check if the base constructor is
      // invoked by accessing the component on the vm.

      if (vmBeingConstructed.component !== result) {
        throw new TypeError('Invalid component constructor, the class should extend LightningElement.');
      }
    } catch (e) {
      error = Object(e);
    } finally {

      vmBeingConstructed = vmBeingConstructedInception;

      if (!isUndefined$1(error)) {
        error.wcStack = getErrorComponentStack(vm); // re-throwing the original error annotated after restoring the context

        throw error; // eslint-disable-line no-unsafe-finally
      }
    }
  }

  function invokeComponentRenderMethod(vm) {
    const {
      def: {
        render
      },
      callHook,
      component,
      owner
    } = vm;
    const vmBeingRenderedInception = getVMBeingRendered();
    let html;
    let renderInvocationSuccessful = false;
    runWithBoundaryProtection(vm, owner, () => {
      setVMBeingRendered(vm);
    }, () => {
      // job
      vm.tro.observe(() => {
        html = callHook(component, render);
        renderInvocationSuccessful = true;
      });
    }, () => {
      setVMBeingRendered(vmBeingRenderedInception);
    }); // If render() invocation failed, process errorCallback in boundary and return an empty template

    return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
  }

  function invokeComponentRenderedCallback(vm) {
    const {
      def: {
        renderedCallback
      },
      component,
      callHook,
      owner
    } = vm;

    if (!isUndefined$1(renderedCallback)) {
      runWithBoundaryProtection(vm, owner, () => {
      }, () => {
        // job
        callHook(component, renderedCallback);
      }, () => {
      });
    }
  }

  function invokeEventListener(vm, fn, thisValue, event) {
    const {
      callHook,
      owner
    } = vm;
    runWithBoundaryProtection(vm, owner, noop$2, () => {
      // job
      if ("production" !== 'production') {
        assert$1.isTrue(isFunction$1(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
      }

      callHook(thisValue, fn, [event]);
    }, noop$2);
  }
  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    create: create$1$1
  } = Object;
  const {
    splice: ArraySplice$1$1,
    indexOf: ArrayIndexOf$1$1,
    push: ArrayPush$1$1
  } = Array.prototype;
  const TargetToReactiveRecordMap = new WeakMap();

  function isUndefined$1$1(obj) {
    return obj === undefined;
  }

  function getReactiveRecord(target) {
    let reactiveRecord = TargetToReactiveRecordMap.get(target);

    if (isUndefined$1$1(reactiveRecord)) {
      const newRecord = create$1$1(null);
      reactiveRecord = newRecord;
      TargetToReactiveRecordMap.set(target, newRecord);
    }

    return reactiveRecord;
  }

  let currentReactiveObserver = null;

  function valueMutated(target, key) {
    const reactiveRecord = TargetToReactiveRecordMap.get(target);

    if (!isUndefined$1$1(reactiveRecord)) {
      const reactiveObservers = reactiveRecord[key];

      if (!isUndefined$1$1(reactiveObservers)) {
        for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
          const ro = reactiveObservers[i];
          ro.notify();
        }
      }
    }
  }

  function valueObserved(target, key) {
    // We should determine if an active Observing Record is present to track mutations.
    if (currentReactiveObserver === null) {
      return;
    }

    const ro = currentReactiveObserver;
    const reactiveRecord = getReactiveRecord(target);
    let reactiveObservers = reactiveRecord[key];

    if (isUndefined$1$1(reactiveObservers)) {
      reactiveObservers = [];
      reactiveRecord[key] = reactiveObservers;
    } else if (reactiveObservers[0] === ro) {
      return; // perf optimization considering that most subscriptions will come from the same record
    }

    if (ArrayIndexOf$1$1.call(reactiveObservers, ro) === -1) {
      ro.link(reactiveObservers);
    }
  }

  class ReactiveObserver {
    constructor(callback) {
      this.listeners = [];
      this.callback = callback;
    }

    observe(job) {
      const inceptionReactiveRecord = currentReactiveObserver;
      currentReactiveObserver = this;
      let error;

      try {
        job();
      } catch (e) {
        error = Object(e);
      } finally {
        currentReactiveObserver = inceptionReactiveRecord;

        if (error !== undefined) {
          throw error; // eslint-disable-line no-unsafe-finally
        }
      }
    }
    /**
     * This method is responsible for disconnecting the Reactive Observer
     * from any Reactive Record that has a reference to it, to prevent future
     * notifications about previously recorded access.
     */


    reset() {
      const {
        listeners
      } = this;
      const len = listeners.length;

      if (len > 0) {
        for (let i = 0; i < len; i += 1) {
          const set = listeners[i];
          const pos = ArrayIndexOf$1$1.call(listeners[i], this);
          ArraySplice$1$1.call(set, pos, 1);
        }

        listeners.length = 0;
      }
    } // friend methods


    notify() {
      this.callback.call(undefined, this);
    }

    link(reactiveObservers) {
      ArrayPush$1$1.call(reactiveObservers, this); // we keep track of observing records where the observing record was added to so we can do some clean up later on

      ArrayPush$1$1.call(this.listeners, reactiveObservers);
    }

  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const signedComponentToMetaMap = new Map();
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by userland code.
   */

  function registerComponent(Ctor, {
    name,
    tmpl: template
  }) {
    signedComponentToMetaMap.set(Ctor, {
      name,
      template
    }); // chaining this method as a way to wrap existing
    // assignment of component constructor easily, without too much transformation

    return Ctor;
  }

  function getComponentRegisteredMeta(Ctor) {
    return signedComponentToMetaMap.get(Ctor);
  }

  function createComponent(uninitializedVm, Ctor) {
    // create the component instance
    invokeComponentConstructor(uninitializedVm, Ctor);
    const initializedVm = uninitializedVm;

    if (isUndefined$1(initializedVm.component)) {
      throw new ReferenceError(`Invalid construction for ${Ctor}, you must extend LightningElement.`);
    }
  }

  function linkComponent(vm) {
    const {
      def: {
        wire
      }
    } = vm;

    if (!isUndefined$1(wire)) {
      const {
        wiring
      } = Services;

      if (wiring) {
        invokeServiceHook(vm, wiring);
      }
    }
  }

  function getTemplateReactiveObserver(vm) {
    return new ReactiveObserver(() => {

      const {
        isDirty
      } = vm;

      if (isFalse$1$1(isDirty)) {
        markComponentAsDirty(vm);
        scheduleRehydration(vm);
      }
    });
  }

  function renderComponent(vm) {

    vm.tro.reset();
    const vnodes = invokeComponentRenderMethod(vm);
    vm.isDirty = false;
    vm.isScheduled = false;

    return vnodes;
  }

  function markComponentAsDirty(vm) {

    vm.isDirty = true;
  }

  const cmpEventListenerMap = new WeakMap();

  function getWrappedComponentsListener(vm, listener) {
    if (!isFunction$1(listener)) {
      throw new TypeError(); // avoiding problems with non-valid listeners
    }

    let wrappedListener = cmpEventListenerMap.get(listener);

    if (isUndefined$1(wrappedListener)) {
      wrappedListener = function (event) {
        invokeEventListener(vm, listener, undefined, event);
      };

      cmpEventListenerMap.set(listener, wrappedListener);
    }

    return wrappedListener;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function createObservedFieldsDescriptorMap(fields) {
    return ArrayReduce$1.call(fields, (acc, field) => {
      acc[field] = createObservedFieldPropertyDescriptor(field);
      return acc;
    }, {});
  }

  function createObservedFieldPropertyDescriptor(key) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        valueObserved(this, key);
        return vm.cmpTrack[key];
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        if (newValue !== vm.cmpTrack[key]) {
          vm.cmpTrack[key] = newValue;

          if (isFalse$1$1(vm.isDirty)) {
            valueMutated(this, key);
          }
        }
      },

      enumerable: true,
      configurable: true
    };
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * This is a descriptor map that contains
   * all standard properties that a Custom Element can support (including AOM properties), which
   * determines what kind of capabilities the Base HTML Element and
   * Base Lightning Element should support.
   */


  const HTMLElementOriginalDescriptors = create$2(null);
  forEach$1.call(ElementPrototypeAriaPropertyNames, propName => {
    // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
    // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
    const descriptor = getPropertyDescriptor$1(HTMLElement.prototype, propName);

    if (!isUndefined$1(descriptor)) {
      HTMLElementOriginalDescriptors[propName] = descriptor;
    }
  });
  forEach$1.call(defaultDefHTMLPropertyNames, propName => {
    // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
    // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
    // this category, so, better to be sure.
    const descriptor = getPropertyDescriptor$1(HTMLElement.prototype, propName);

    if (!isUndefined$1(descriptor)) {
      HTMLElementOriginalDescriptors[propName] = descriptor;
    }
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const ShadowRootInnerHTMLSetter = getOwnPropertyDescriptor$2(ShadowRoot.prototype, 'innerHTML').set;
  const dispatchEvent$1 = 'EventTarget' in window ? EventTarget.prototype.dispatchEvent : Node.prototype.dispatchEvent; // IE11

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * This operation is called with a descriptor of an standard html property
   * that a Custom Element can support (including AOM properties), which
   * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
   * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
   */

  function createBridgeToElementDescriptor(propName, descriptor) {
    const {
      get,
      set,
      enumerable,
      configurable
    } = descriptor;

    if (!isFunction$1(get)) {

      throw new TypeError();
    }

    if (!isFunction$1(set)) {

      throw new TypeError();
    }

    return {
      enumerable,
      configurable,

      get() {
        const vm = getAssociatedVM(this);

        if (isBeingConstructed(vm)) {

          return;
        }

        valueObserved(this, propName);
        return get.call(vm.elm);
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        if (newValue !== vm.cmpProps[propName]) {
          vm.cmpProps[propName] = newValue;

          if (isFalse$1$1(vm.isDirty)) {
            // perf optimization to skip this step if not in the DOM
            valueMutated(this, propName);
          }
        }

        return set.call(vm.elm, newValue);
      }

    };
  }

  function getLinkedElement(cmp) {
    return getAssociatedVM(cmp).elm;
  }
  /**
   * This class is the base class for any LWC element.
   * Some elements directly extends this class, others implement it via inheritance.
   **/


  function BaseLightningElementConstructor() {
    // This should be as performant as possible, while any initialization should be done lazily
    if (isNull$1(vmBeingConstructed)) {
      throw new ReferenceError('Illegal constructor');
    }

    const vm = vmBeingConstructed;
    const {
      elm,
      mode,
      def: {
        ctor
      }
    } = vm;
    const component = this;
    vm.component = component;
    vm.tro = getTemplateReactiveObserver(vm);
    vm.oar = create$2(null); // interaction hooks
    // We are intentionally hiding this argument from the formal API of LWCElement because
    // we don't want folks to know about it just yet.

    if (arguments.length === 1) {
      const {
        callHook,
        setHook,
        getHook
      } = arguments[0];
      vm.callHook = callHook;
      vm.setHook = setHook;
      vm.getHook = getHook;
    } // attaching the shadowRoot


    const shadowRootOptions = {
      mode,
      delegatesFocus: !!ctor.delegatesFocus,
      '$$lwc-synthetic-mode$$': true
    };
    const cmpRoot = elm.attachShadow(shadowRootOptions); // linking elm, shadow root and component with the VM

    associateVM(component, vm);
    associateVM(cmpRoot, vm);
    associateVM(elm, vm); // VM is now initialized

    vm.cmpRoot = cmpRoot;

    return this;
  } // HTML Element - The Good Parts


  BaseLightningElementConstructor.prototype = {
    constructor: BaseLightningElementConstructor,

    dispatchEvent(_event) {
      const elm = getLinkedElement(this); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch;

      return dispatchEvent$1.apply(elm, arguments);
    },

    addEventListener(type, listener, options) {
      const vm = getAssociatedVM(this);

      const wrappedListener = getWrappedComponentsListener(vm, listener);
      vm.elm.addEventListener(type, wrappedListener, options);
    },

    removeEventListener(type, listener, options) {
      const vm = getAssociatedVM(this);
      const wrappedListener = getWrappedComponentsListener(vm, listener);
      vm.elm.removeEventListener(type, wrappedListener, options);
    },

    setAttributeNS(ns, attrName, _value) {
      const elm = getLinkedElement(this);

      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      elm.setAttributeNS.apply(elm, arguments);
      lockAttribute();
    },

    removeAttributeNS(ns, attrName) {
      const elm = getLinkedElement(this);
      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      elm.removeAttributeNS.apply(elm, arguments);
      lockAttribute();
    },

    removeAttribute(attrName) {
      const elm = getLinkedElement(this);
      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      elm.removeAttribute.apply(elm, arguments);
      lockAttribute();
    },

    setAttribute(attrName, _value) {
      const elm = getLinkedElement(this);

      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      elm.setAttribute.apply(elm, arguments);
      lockAttribute();
    },

    getAttribute(attrName) {
      const elm = getLinkedElement(this);
      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      const value = elm.getAttribute.apply(elm, arguments);
      lockAttribute();
      return value;
    },

    getAttributeNS(ns, attrName) {
      const elm = getLinkedElement(this);
      unlockAttribute(elm, attrName); // Typescript does not like it when you treat the `arguments` object as an array
      // @ts-ignore type-mismatch

      const value = elm.getAttributeNS.apply(elm, arguments);
      lockAttribute();
      return value;
    },

    getBoundingClientRect() {
      const elm = getLinkedElement(this);

      return elm.getBoundingClientRect();
    },

    /**
     * Returns the first element that is a descendant of node that
     * matches selectors.
     */
    // querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    // querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    querySelector(selectors) {
      const vm = getAssociatedVM(this);

      const {
        elm
      } = vm;
      return elm.querySelector(selectors);
    },

    /**
     * Returns all element descendants of node that
     * match selectors.
     */
    // querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>,
    // querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>,
    querySelectorAll(selectors) {
      const vm = getAssociatedVM(this);

      const {
        elm
      } = vm;
      return elm.querySelectorAll(selectors);
    },

    /**
     * Returns all element descendants of node that
     * match the provided tagName.
     */
    getElementsByTagName(tagNameOrWildCard) {
      const vm = getAssociatedVM(this);

      const {
        elm
      } = vm;
      return elm.getElementsByTagName(tagNameOrWildCard);
    },

    /**
     * Returns all element descendants of node that
     * match the provide classnames.
     */
    getElementsByClassName(names) {
      const vm = getAssociatedVM(this);

      const {
        elm
      } = vm;
      return elm.getElementsByClassName(names);
    },

    get isConnected() {
      const vm = getAssociatedVM(this);
      const {
        elm
      } = vm;
      return elm.isConnected;
    },

    get classList() {

      return getLinkedElement(this).classList;
    },

    get template() {
      const vm = getAssociatedVM(this);
      return vm.cmpRoot;
    },

    get shadowRoot() {
      // From within the component instance, the shadowRoot is always
      // reported as "closed". Authors should rely on this.template instead.
      return null;
    },

    render() {
      const vm = getAssociatedVM(this);
      return vm.def.template;
    },

    toString() {
      const vm = getAssociatedVM(this);
      return `[object ${vm.def.name}]`;
    }

  };
  const baseDescriptors = ArrayReduce$1.call(getOwnPropertyNames$2(HTMLElementOriginalDescriptors), (descriptors, propName) => {
    descriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
    return descriptors;
  }, create$2(null));
  defineProperties$2(BaseLightningElementConstructor.prototype, baseDescriptors);

  freeze$2(BaseLightningElementConstructor);
  seal$2(BaseLightningElementConstructor.prototype); // @ts-ignore

  const BaseLightningElement = BaseLightningElementConstructor;
  /**
   * Copyright (C) 2017 salesforce.com, inc.
   */

  const {
    isArray: isArray$2
  } = Array;
  const {
    getPrototypeOf: getPrototypeOf$1$1,
    create: ObjectCreate,
    defineProperty: ObjectDefineProperty,
    defineProperties: ObjectDefineProperties,
    isExtensible,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$1$1,
    getOwnPropertyNames: getOwnPropertyNames$1$1,
    getOwnPropertySymbols,
    preventExtensions,
    hasOwnProperty: hasOwnProperty$2$1
  } = Object;
  const {
    push: ArrayPush$2,
    concat: ArrayConcat,
    map: ArrayMap$1$1
  } = Array.prototype;

  function isUndefined$2(obj) {
    return obj === undefined;
  }

  function isFunction$1$1(obj) {
    return typeof obj === 'function';
  }

  function isObject$2(obj) {
    return typeof obj === 'object';
  }

  const proxyToValueMap = new WeakMap();

  function registerProxy(proxy, value) {
    proxyToValueMap.set(proxy, value);
  }

  const unwrap = replicaOrAny => proxyToValueMap.get(replicaOrAny) || replicaOrAny;

  function wrapValue(membrane, value) {
    return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
  }
  /**
   * Unwrap property descriptors will set value on original descriptor
   * We only need to unwrap if value is specified
   * @param descriptor external descrpitor provided to define new property on original value
   */


  function unwrapDescriptor(descriptor) {
    if (hasOwnProperty$2$1.call(descriptor, 'value')) {
      descriptor.value = unwrap(descriptor.value);
    }

    return descriptor;
  }

  function lockShadowTarget(membrane, shadowTarget, originalTarget) {
    const targetKeys = ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
    targetKeys.forEach(key => {
      let descriptor = getOwnPropertyDescriptor$1$1(originalTarget, key); // We do not need to wrap the descriptor if configurable
      // Because we can deal with wrapping it when user goes through
      // Get own property descriptor. There is also a chance that this descriptor
      // could change sometime in the future, so we can defer wrapping
      // until we need to

      if (!descriptor.configurable) {
        descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
      }

      ObjectDefineProperty(shadowTarget, key, descriptor);
    });
    preventExtensions(shadowTarget);
  }

  class ReactiveProxyHandler {
    constructor(membrane, value) {
      this.originalTarget = value;
      this.membrane = membrane;
    }

    get(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const value = originalTarget[key];
      const {
        valueObserved
      } = membrane;
      valueObserved(originalTarget, key);
      return membrane.getProxy(value);
    }

    set(shadowTarget, key, value) {
      const {
        originalTarget,
        membrane: {
          valueMutated
        }
      } = this;
      const oldValue = originalTarget[key];

      if (oldValue !== value) {
        originalTarget[key] = value;
        valueMutated(originalTarget, key);
      } else if (key === 'length' && isArray$2(originalTarget)) {
        // fix for issue #236: push will add the new index, and by the time length
        // is updated, the internal length is already equal to the new length value
        // therefore, the oldValue is equal to the value. This is the forking logic
        // to support this use case.
        valueMutated(originalTarget, key);
      }

      return true;
    }

    deleteProperty(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueMutated
        }
      } = this;
      delete originalTarget[key];
      valueMutated(originalTarget, key);
      return true;
    }

    apply(shadowTarget, thisArg, argArray) {
      /* No op */
    }

    construct(target, argArray, newTarget) {
      /* No op */
    }

    has(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved
        }
      } = this;
      valueObserved(originalTarget, key);
      return key in originalTarget;
    }

    ownKeys(shadowTarget) {
      const {
        originalTarget
      } = this;
      return ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
    }

    isExtensible(shadowTarget) {
      const shadowIsExtensible = isExtensible(shadowTarget);

      if (!shadowIsExtensible) {
        return shadowIsExtensible;
      }

      const {
        originalTarget,
        membrane
      } = this;
      const targetIsExtensible = isExtensible(originalTarget);

      if (!targetIsExtensible) {
        lockShadowTarget(membrane, shadowTarget, originalTarget);
      }

      return targetIsExtensible;
    }

    setPrototypeOf(shadowTarget, prototype) {
    }

    getPrototypeOf(shadowTarget) {
      const {
        originalTarget
      } = this;
      return getPrototypeOf$1$1(originalTarget);
    }

    getOwnPropertyDescriptor(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueObserved
      } = this.membrane; // keys looked up via hasOwnProperty need to be reactive

      valueObserved(originalTarget, key);
      let desc = getOwnPropertyDescriptor$1$1(originalTarget, key);

      if (isUndefined$2(desc)) {
        return desc;
      }

      const shadowDescriptor = getOwnPropertyDescriptor$1$1(shadowTarget, key);

      if (!isUndefined$2(shadowDescriptor)) {
        return shadowDescriptor;
      } // Note: by accessing the descriptor, the key is marked as observed
      // but access to the value, setter or getter (if available) cannot observe
      // mutations, just like regular methods, in which case we just do nothing.


      desc = wrapDescriptor(membrane, desc, wrapValue);

      if (!desc.configurable) {
        // If descriptor from original target is not configurable,
        // We must copy the wrapped descriptor over to the shadow target.
        // Otherwise, proxy will throw an invariant error.
        // This is our last chance to lock the value.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
        ObjectDefineProperty(shadowTarget, key, desc);
      }

      return desc;
    }

    preventExtensions(shadowTarget) {
      const {
        originalTarget,
        membrane
      } = this;
      lockShadowTarget(membrane, shadowTarget, originalTarget);
      preventExtensions(originalTarget);
      return true;
    }

    defineProperty(shadowTarget, key, descriptor) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueMutated
      } = membrane;
      const {
        configurable
      } = descriptor; // We have to check for value in descriptor
      // because Object.freeze(proxy) calls this method
      // with only { configurable: false, writeable: false }
      // Additionally, method will only be called with writeable:false
      // if the descriptor has a value, as opposed to getter/setter
      // So we can just check if writable is present and then see if
      // value is present. This eliminates getter and setter descriptors

      if (hasOwnProperty$2$1.call(descriptor, 'writable') && !hasOwnProperty$2$1.call(descriptor, 'value')) {
        const originalDescriptor = getOwnPropertyDescriptor$1$1(originalTarget, key);
        descriptor.value = originalDescriptor.value;
      }

      ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));

      if (configurable === false) {
        ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
      }

      valueMutated(originalTarget, key);
      return true;
    }

  }

  function wrapReadOnlyValue(membrane, value) {
    return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
  }

  class ReadOnlyHandler {
    constructor(membrane, value) {
      this.originalTarget = value;
      this.membrane = membrane;
    }

    get(shadowTarget, key) {
      const {
        membrane,
        originalTarget
      } = this;
      const value = originalTarget[key];
      const {
        valueObserved
      } = membrane;
      valueObserved(originalTarget, key);
      return membrane.getReadOnlyProxy(value);
    }

    set(shadowTarget, key, value) {

      return false;
    }

    deleteProperty(shadowTarget, key) {

      return false;
    }

    apply(shadowTarget, thisArg, argArray) {
      /* No op */
    }

    construct(target, argArray, newTarget) {
      /* No op */
    }

    has(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved
        }
      } = this;
      valueObserved(originalTarget, key);
      return key in originalTarget;
    }

    ownKeys(shadowTarget) {
      const {
        originalTarget
      } = this;
      return ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
    }

    setPrototypeOf(shadowTarget, prototype) {
    }

    getOwnPropertyDescriptor(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueObserved
      } = membrane; // keys looked up via hasOwnProperty need to be reactive

      valueObserved(originalTarget, key);
      let desc = getOwnPropertyDescriptor$1$1(originalTarget, key);

      if (isUndefined$2(desc)) {
        return desc;
      }

      const shadowDescriptor = getOwnPropertyDescriptor$1$1(shadowTarget, key);

      if (!isUndefined$2(shadowDescriptor)) {
        return shadowDescriptor;
      } // Note: by accessing the descriptor, the key is marked as observed
      // but access to the value or getter (if available) cannot be observed,
      // just like regular methods, in which case we just do nothing.


      desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);

      if (hasOwnProperty$2$1.call(desc, 'set')) {
        desc.set = undefined; // readOnly membrane does not allow setters
      }

      if (!desc.configurable) {
        // If descriptor from original target is not configurable,
        // We must copy the wrapped descriptor over to the shadow target.
        // Otherwise, proxy will throw an invariant error.
        // This is our last chance to lock the value.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
        ObjectDefineProperty(shadowTarget, key, desc);
      }

      return desc;
    }

    preventExtensions(shadowTarget) {

      return false;
    }

    defineProperty(shadowTarget, key, descriptor) {

      return false;
    }

  }

  function createShadowTarget(value) {
    let shadowTarget = undefined;

    if (isArray$2(value)) {
      shadowTarget = [];
    } else if (isObject$2(value)) {
      shadowTarget = {};
    }

    return shadowTarget;
  }

  const ObjectDotPrototype = Object.prototype;

  function defaultValueIsObservable(value) {
    // intentionally checking for null
    if (value === null) {
      return false;
    } // treat all non-object types, including undefined, as non-observable values


    if (typeof value !== 'object') {
      return false;
    }

    if (isArray$2(value)) {
      return true;
    }

    const proto = getPrototypeOf$1$1(value);
    return proto === ObjectDotPrototype || proto === null || getPrototypeOf$1$1(proto) === null;
  }

  const defaultValueObserved = (obj, key) => {
    /* do nothing */
  };

  const defaultValueMutated = (obj, key) => {
    /* do nothing */
  };

  const defaultValueDistortion = value => value;

  function wrapDescriptor(membrane, descriptor, getValue) {
    const {
      set,
      get
    } = descriptor;

    if (hasOwnProperty$2$1.call(descriptor, 'value')) {
      descriptor.value = getValue(membrane, descriptor.value);
    } else {
      if (!isUndefined$2(get)) {
        descriptor.get = function () {
          // invoking the original getter with the original target
          return getValue(membrane, get.call(unwrap(this)));
        };
      }

      if (!isUndefined$2(set)) {
        descriptor.set = function (value) {
          // At this point we don't have a clear indication of whether
          // or not a valid mutation will occur, we don't have the key,
          // and we are not sure why and how they are invoking this setter.
          // Nevertheless we preserve the original semantics by invoking the
          // original setter with the original target and the unwrapped value
          set.call(unwrap(this), membrane.unwrapProxy(value));
        };
      }
    }

    return descriptor;
  }

  class ReactiveMembrane {
    constructor(options) {
      this.valueDistortion = defaultValueDistortion;
      this.valueMutated = defaultValueMutated;
      this.valueObserved = defaultValueObserved;
      this.valueIsObservable = defaultValueIsObservable;
      this.objectGraph = new WeakMap();

      if (!isUndefined$2(options)) {
        const {
          valueDistortion,
          valueMutated,
          valueObserved,
          valueIsObservable
        } = options;
        this.valueDistortion = isFunction$1$1(valueDistortion) ? valueDistortion : defaultValueDistortion;
        this.valueMutated = isFunction$1$1(valueMutated) ? valueMutated : defaultValueMutated;
        this.valueObserved = isFunction$1$1(valueObserved) ? valueObserved : defaultValueObserved;
        this.valueIsObservable = isFunction$1$1(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
      }
    }

    getProxy(value) {
      const unwrappedValue = unwrap(value);
      const distorted = this.valueDistortion(unwrappedValue);

      if (this.valueIsObservable(distorted)) {
        const o = this.getReactiveState(unwrappedValue, distorted); // when trying to extract the writable version of a readonly
        // we return the readonly.

        return o.readOnly === value ? value : o.reactive;
      }

      return distorted;
    }

    getReadOnlyProxy(value) {
      value = unwrap(value);
      const distorted = this.valueDistortion(value);

      if (this.valueIsObservable(distorted)) {
        return this.getReactiveState(value, distorted).readOnly;
      }

      return distorted;
    }

    unwrapProxy(p) {
      return unwrap(p);
    }

    getReactiveState(value, distortedValue) {
      const {
        objectGraph
      } = this;
      let reactiveState = objectGraph.get(distortedValue);

      if (reactiveState) {
        return reactiveState;
      }

      const membrane = this;
      reactiveState = {
        get reactive() {
          const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue); // caching the reactive proxy after the first time it is accessed

          const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
          registerProxy(proxy, value);
          ObjectDefineProperty(this, 'reactive', {
            value: proxy
          });
          return proxy;
        },

        get readOnly() {
          const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue); // caching the readOnly proxy after the first time it is accessed

          const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
          registerProxy(proxy, value);
          ObjectDefineProperty(this, 'readOnly', {
            value: proxy
          });
          return proxy;
        }

      };
      objectGraph.set(distortedValue, reactiveState);
      return reactiveState;
    }

  }
  /** version: 0.26.0 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function valueDistortion(value) {
    return value;
  }

  const reactiveMembrane = new ReactiveMembrane({
    valueObserved,
    valueMutated,
    valueDistortion
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // from the element instance, and get the value or set a new value on the component.
  // This means that across different elements, similar names can get the exact same
  // descriptor, so we can cache them:


  const cachedGetterByKey = create$2(null);
  const cachedSetterByKey = create$2(null);

  function createGetter(key) {
    let fn = cachedGetterByKey[key];

    if (isUndefined$1(fn)) {
      fn = cachedGetterByKey[key] = function () {
        const vm = getAssociatedVM(this);
        const {
          getHook
        } = vm;
        return getHook(vm.component, key);
      };
    }

    return fn;
  }

  function createSetter(key) {
    let fn = cachedSetterByKey[key];

    if (isUndefined$1(fn)) {
      fn = cachedSetterByKey[key] = function (newValue) {
        const vm = getAssociatedVM(this);
        const {
          setHook
        } = vm;
        newValue = reactiveMembrane.getReadOnlyProxy(newValue);
        setHook(vm.component, key, newValue);
      };
    }

    return fn;
  }

  function createMethodCaller(methodName) {
    return function () {
      const vm = getAssociatedVM(this);
      const {
        callHook,
        component
      } = vm;
      const fn = component[methodName];
      return callHook(vm.component, fn, ArraySlice$1$1.call(arguments));
    };
  }

  function HTMLBridgeElementFactory(SuperClass, props, methods) {
    let HTMLBridgeElement;
    /**
     * Modern browsers will have all Native Constructors as regular Classes
     * and must be instantiated with the new keyword. In older browsers,
     * specifically IE11, those are objects with a prototype property defined,
     * since they are not supposed to be extended or instantiated with the
     * new keyword. This forking logic supports both cases, specifically because
     * wc.ts relies on the construction path of the bridges to create new
     * fully qualifying web components.
     */

    if (isFunction$1(SuperClass)) {
      HTMLBridgeElement = class extends SuperClass {};
    } else {
      HTMLBridgeElement = function () {
        // Bridge classes are not supposed to be instantiated directly in
        // browsers that do not support web components.
        throw new TypeError('Illegal constructor');
      }; // prototype inheritance dance


      setPrototypeOf$2(HTMLBridgeElement, SuperClass);
      setPrototypeOf$2(HTMLBridgeElement.prototype, SuperClass.prototype);
      defineProperty$2(HTMLBridgeElement.prototype, 'constructor', {
        writable: true,
        configurable: true,
        value: HTMLBridgeElement
      });
    }

    const descriptors = create$2(null); // expose getters and setters for each public props on the new Element Bridge

    for (let i = 0, len = props.length; i < len; i += 1) {
      const propName = props[i];
      descriptors[propName] = {
        get: createGetter(propName),
        set: createSetter(propName),
        enumerable: true,
        configurable: true
      };
    } // expose public methods as props on the new Element Bridge


    for (let i = 0, len = methods.length; i < len; i += 1) {
      const methodName = methods[i];
      descriptors[methodName] = {
        value: createMethodCaller(methodName),
        writable: true,
        configurable: true
      };
    }

    defineProperties$2(HTMLBridgeElement.prototype, descriptors);
    return HTMLBridgeElement;
  }

  const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElement, getOwnPropertyNames$2(HTMLElementOriginalDescriptors), []);
  freeze$2(BaseBridgeElement);
  seal$2(BaseBridgeElement.prototype);
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * @track decorator to mark fields as reactive in
   * LWC Components. This function implements the internals of this
   * decorator.
   */

  function track(target, prop, descriptor) {
    if (arguments.length === 1) {
      return reactiveMembrane.getProxy(target);
    }

    return createTrackedPropertyDescriptor(target, prop, isUndefined$1(descriptor) ? true : descriptor.enumerable === true);
  }

  function createTrackedPropertyDescriptor(Ctor, key, enumerable) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        valueObserved(this, key);
        return vm.cmpTrack[key];
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        const reactiveOrAnyValue = reactiveMembrane.getProxy(newValue);

        if (reactiveOrAnyValue !== vm.cmpTrack[key]) {
          vm.cmpTrack[key] = reactiveOrAnyValue;

          if (isFalse$1$1(vm.isDirty)) {
            // perf optimization to skip this step if the track property is on a component that is already dirty
            valueMutated(this, key);
          }
        }
      },

      enumerable,
      configurable: true
    };
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function wireDecorator(target, prop, descriptor) {

    return createTrackedPropertyDescriptor(target, prop, isObject$1$1(descriptor) ? descriptor.enumerable === true : true);
  }
  /**
   * @wire decorator to wire fields and methods to a wire adapter in
   * LWC Components. This function implements the internals of this
   * decorator.
   */


  function wire(_adapter, _config) {
    const len = arguments.length;

    if (len > 0 && len < 3) {
      return wireDecorator;
    } else {

      throw new TypeError();
    }
  }
  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    assign: assign$1$1,
    create: create$2$1,
    defineProperties: defineProperties$1$1,
    defineProperty: defineProperty$1$1,
    freeze: freeze$1$1,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$2$1,
    getOwnPropertyNames: getOwnPropertyNames$2$1,
    getPrototypeOf: getPrototypeOf$2$1,
    hasOwnProperty: hasOwnProperty$3,
    keys: keys$1$1,
    seal: seal$1$1,
    setPrototypeOf: setPrototypeOf$1$1
  } = Object;
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /*
   * In IE11, symbols are expensive.
   * Due to the nature of the symbol polyfill. This method abstract the
   * creation of symbols, so we can fallback to string when native symbols
   * are not supported. Note that we can't use typeof since it will fail when transpiling.
   */


  const hasNativeSymbolsSupport$1$1 = Symbol('x').toString() === 'Symbol(x)';
  /** version: 1.3.7-226.4 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // Cached reference to globalThis

  let _globalThis$2;

  if (typeof globalThis === 'object') {
    _globalThis$2 = globalThis;
  }

  function getGlobalThis$1() {
    if (typeof _globalThis$2 === 'object') {
      return _globalThis$2;
    }

    try {
      // eslint-disable-next-line no-extend-native
      Object.defineProperty(Object.prototype, '__magic__', {
        get: function () {
          return this;
        },
        configurable: true
      }); // @ts-ignore
      // __magic__ is undefined in Safari 10 and IE10 and older.
      // eslint-disable-next-line no-undef

      _globalThis$2 = __magic__; // @ts-ignore

      delete Object.prototype.__magic__;
    } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
    } finally {
      // If the magic above fails for some reason we assume that we are in a
      // legacy browser. Assume `window` exists in this case.
      if (typeof _globalThis$2 === 'undefined') {
        _globalThis$2 = window;
      }
    }

    return _globalThis$2;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const _globalThis$1$1 = getGlobalThis$1();

  if (!_globalThis$1$1.lwcRuntimeFlags) {
    Object.defineProperty(_globalThis$1$1, 'lwcRuntimeFlags', {
      value: create$2$1(null)
    });
  }

  const runtimeFlags$1 = _globalThis$1$1.lwcRuntimeFlags; // This function is not supported for use within components and is meant for
  /** version: 1.3.7-226.4 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * @api decorator to mark public fields and public methods in
   * LWC Components. This function implements the internals of this
   * decorator.
   */

  function api$1(target, propName, descriptor) {

    const meta = getDecoratorsRegisteredMeta(target); // initializing getters and setters for each public prop on the target prototype

    if (isObject$1$1(descriptor) && (isFunction$1(descriptor.get) || isFunction$1(descriptor.set))) {
      // if it is configured as an accessor it must have a descriptor
      // @ts-ignore it must always be set before calling this method
      meta.props[propName].config = isFunction$1(descriptor.set) ? 3 : 1;
      return createPublicAccessorDescriptor(target, propName, descriptor);
    } else {
      // @ts-ignore it must always be set before calling this method
      meta.props[propName].config = 0;
      return createPublicPropertyDescriptor(target, propName, descriptor);
    }
  }

  function createPublicPropertyDescriptor(proto, key, descriptor) {
    return {
      get() {
        const vm = getAssociatedVM(this);

        if (isBeingConstructed(vm)) {

          return;
        }

        valueObserved(this, key);
        return vm.cmpProps[key];
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        vm.cmpProps[key] = newValue; // avoid notification of observability if the instance is already dirty

        if (isFalse$1$1(vm.isDirty)) {
          // perf optimization to skip this step if the component is dirty already.
          valueMutated(this, key);
        }
      },

      enumerable: isUndefined$1(descriptor) ? true : descriptor.enumerable
    };
  }

  class AccessorReactiveObserver extends ReactiveObserver {
    constructor(vm, set) {
      super(() => {
        if (isFalse$1$1(this.debouncing)) {
          this.debouncing = true;
          addCallbackToNextTick(() => {
            if (isTrue$1$1(this.debouncing)) {
              const {
                value
              } = this;
              const {
                isDirty: dirtyStateBeforeSetterCall,
                component,
                idx
              } = vm;
              set.call(component, value); // de-bouncing after the call to the original setter to prevent
              // infinity loop if the setter itself is mutating things that
              // were accessed during the previous invocation.

              this.debouncing = false;

              if (isTrue$1$1(vm.isDirty) && isFalse$1$1(dirtyStateBeforeSetterCall) && idx > 0) {
                // immediate rehydration due to a setter driven mutation, otherwise
                // the component will get rendered on the second tick, which it is not
                // desirable.
                rerenderVM(vm);
              }
            }
          });
        }
      });
      this.debouncing = false;
    }

    reset(value) {
      super.reset();
      this.debouncing = false;

      if (arguments.length > 0) {
        this.value = value;
      }
    }

  }

  function createPublicAccessorDescriptor(Ctor, key, descriptor) {
    const {
      get,
      set,
      enumerable
    } = descriptor;

    if (!isFunction$1(get)) {

      throw new TypeError();
    }

    return {
      get() {

        return get.call(this);
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        if (set) {
          if (runtimeFlags$1.ENABLE_REACTIVE_SETTER) {
            let ro = vm.oar[key];

            if (isUndefined$1(ro)) {
              ro = vm.oar[key] = new AccessorReactiveObserver(vm, set);
            } // every time we invoke this setter from outside (through this wrapper setter)
            // we should reset the value and then debounce just in case there is a pending
            // invocation the next tick that is not longer relevant since the value is changing
            // from outside.


            ro.reset(newValue);
            ro.observe(() => {
              set.call(this, newValue);
            });
          } else {
            set.call(this, newValue);
          }
        }
      },

      enumerable
    };
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * EXPERIMENTAL: This function allows for the registration of "services" in
   * LWC by exposing hooks into the component life-cycle. This API is subject
   * to change or being removed.
   */


  function decorate(Ctor, decorators) {
    // intentionally comparing decorators with null and undefined
    if (!isFunction$1(Ctor) || decorators == null) {
      throw new TypeError();
    }

    const props = getOwnPropertyNames$2(decorators); // intentionally allowing decoration of classes only for now

    const target = Ctor.prototype;

    for (let i = 0, len = props.length; i < len; i += 1) {
      const propName = props[i];
      const decorator = decorators[propName];

      if (!isFunction$1(decorator)) {
        throw new TypeError();
      }

      const originalDescriptor = getOwnPropertyDescriptor$2(target, propName);
      const descriptor = decorator(Ctor, propName, originalDescriptor);

      if (!isUndefined$1(descriptor)) {
        defineProperty$2(target, propName, descriptor);
      }
    }

    return Ctor; // chaining
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const signedDecoratorToMetaMap = new Map();
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by userland code.
   */

  function registerDecorators(Ctor, meta) {
    const decoratorMap = create$2(null);
    const props = getPublicPropertiesHash(Ctor, meta.publicProps);
    const methods = getPublicMethodsHash(Ctor, meta.publicMethods);
    const wire$1 = getWireHash(Ctor, meta.wire);
    const track$1 = getTrackHash(Ctor, meta.track);
    const fields = meta.fields;
    signedDecoratorToMetaMap.set(Ctor, {
      props,
      methods,
      wire: wire$1,
      track: track$1,
      fields
    });

    for (const propName in props) {
      decoratorMap[propName] = api$1;
    }

    if (wire$1) {
      for (const propName in wire$1) {
        const wireDef = wire$1[propName];

        if (wireDef.method) {
          // for decorated methods we need to do nothing
          continue;
        }

        decoratorMap[propName] = wire(wireDef.adapter, wireDef.params);
      }
    }

    if (track$1) {
      for (const propName in track$1) {
        decoratorMap[propName] = track;
      }
    }

    decorate(Ctor, decoratorMap);
    return Ctor;
  }

  function getDecoratorsRegisteredMeta(Ctor) {
    return signedDecoratorToMetaMap.get(Ctor);
  }

  function getTrackHash(target, track) {
    if (isUndefined$1(track) || getOwnPropertyNames$2(track).length === 0) {
      return EmptyObject;
    } // TODO [#1302]: check that anything in `track` is correctly defined in the prototype


    return assign$2(create$2(null), track);
  }

  function getWireHash(target, wire) {
    if (isUndefined$1(wire) || getOwnPropertyNames$2(wire).length === 0) {
      return;
    } // TODO [#1302]: check that anything in `wire` is correctly defined in the prototype


    return assign$2(create$2(null), wire);
  }

  function getPublicPropertiesHash(target, props) {
    if (isUndefined$1(props) || getOwnPropertyNames$2(props).length === 0) {
      return EmptyObject;
    }

    return getOwnPropertyNames$2(props).reduce((propsHash, propName) => {
      const attr = getAttrNameFromPropName(propName);
      propsHash[propName] = assign$2({
        config: 0,
        type: 'any',
        attr
      }, props[propName]);
      return propsHash;
    }, create$2(null));
  }

  function getPublicMethodsHash(target, publicMethods) {
    if (isUndefined$1(publicMethods) || publicMethods.length === 0) {
      return EmptyObject;
    }

    return publicMethods.reduce((methodsHash, methodName) => {
      const method = target.prototype[methodName];

      methodsHash[methodName] = method;
      return methodsHash;
    }, create$2(null));
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const CtorToDefMap = new WeakMap();

  function getCtorProto(Ctor, subclassComponentName) {
    let proto = getPrototypeOf$2(Ctor);

    if (isNull$1(proto)) {
      throw new ReferenceError(`Invalid prototype chain for ${subclassComponentName}, you must extend LightningElement.`);
    } // covering the cases where the ref is circular in AMD


    if (isCircularModuleDependency(proto)) {
      const p = resolveCircularModuleDependency(proto);
      // of our Base class without having to leak it to user-land. If the circular function returns
      // itself, that's the signal that we have hit the end of the proto chain, which must always
      // be base.


      proto = p === proto ? BaseLightningElement : p;
    }

    return proto;
  }

  function createComponentDef(Ctor, meta, subclassComponentName) {

    const {
      name
    } = meta;
    let {
      template
    } = meta;
    const decoratorsMeta = getDecoratorsRegisteredMeta(Ctor);
    let props = {};
    let methods = {};
    let wire;
    let track = {};
    let fields;

    if (!isUndefined$1(decoratorsMeta)) {
      props = decoratorsMeta.props;
      methods = decoratorsMeta.methods;
      wire = decoratorsMeta.wire;
      track = decoratorsMeta.track;
      fields = decoratorsMeta.fields;
    }

    const proto = Ctor.prototype;
    let {
      connectedCallback,
      disconnectedCallback,
      renderedCallback,
      errorCallback,
      render
    } = proto;
    const superProto = getCtorProto(Ctor, subclassComponentName);
    const superDef = superProto !== BaseLightningElement ? getComponentDef(superProto, subclassComponentName) : null;
    const SuperBridge = isNull$1(superDef) ? BaseBridgeElement : superDef.bridge;
    const bridge = HTMLBridgeElementFactory(SuperBridge, getOwnPropertyNames$2(props), getOwnPropertyNames$2(methods));

    if (!isNull$1(superDef)) {
      props = assign$2(create$2(null), superDef.props, props);
      methods = assign$2(create$2(null), superDef.methods, methods);
      wire = superDef.wire || wire ? assign$2(create$2(null), superDef.wire, wire) : undefined;
      track = assign$2(create$2(null), superDef.track, track);
      connectedCallback = connectedCallback || superDef.connectedCallback;
      disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
      renderedCallback = renderedCallback || superDef.renderedCallback;
      errorCallback = errorCallback || superDef.errorCallback;
      render = render || superDef.render;
      template = template || superDef.template;
    }

    props = assign$2(create$2(null), HTML_PROPS, props);

    if (!isUndefined$1(fields)) {
      defineProperties$2(proto, createObservedFieldsDescriptorMap(fields));
    }

    if (isUndefined$1(template)) {
      // default template
      template = defaultEmptyTemplate;
    }

    const def = {
      ctor: Ctor,
      name,
      wire,
      track,
      props,
      methods,
      bridge,
      template,
      connectedCallback,
      disconnectedCallback,
      renderedCallback,
      errorCallback,
      render
    };

    return def;
  }
  /**
   * EXPERIMENTAL: This function allows for the identification of LWC
   * constructors. This API is subject to change or being removed.
   */


  function isComponentConstructor(ctor) {
    if (!isFunction$1(ctor)) {
      return false;
    } // Fast path: LightningElement is part of the prototype chain of the constructor.


    if (ctor.prototype instanceof BaseLightningElement) {
      return true;
    } // Slow path: LightningElement is not part of the prototype chain of the constructor, we need
    // climb up the constructor prototype chain to check in case there are circular dependencies
    // to resolve.


    let current = ctor;

    do {
      if (isCircularModuleDependency(current)) {
        const circularResolved = resolveCircularModuleDependency(current); // If the circular function returns itself, that's the signal that we have hit the end of the proto chain,
        // which must always be a valid base constructor.

        if (circularResolved === current) {
          return true;
        }

        current = circularResolved;
      }

      if (current === BaseLightningElement) {
        return true;
      }
    } while (!isNull$1(current) && (current = getPrototypeOf$2(current))); // Finally return false if the LightningElement is not part of the prototype chain.


    return false;
  }
  /**
   * EXPERIMENTAL: This function allows for the collection of internal
   * component metadata. This API is subject to change or being removed.
   */


  function getComponentDef(Ctor, subclassComponentName) {
    let def = CtorToDefMap.get(Ctor);

    if (isUndefined$1(def)) {
      if (!isComponentConstructor(Ctor)) {
        throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
      }

      let meta = getComponentRegisteredMeta(Ctor);

      if (isUndefined$1(meta)) {
        // TODO [#1295]: remove this workaround after refactoring tests
        meta = {
          template: undefined,
          name: Ctor.name
        };
      }

      def = createComponentDef(Ctor, meta, subclassComponentName || Ctor.name);
      CtorToDefMap.set(Ctor, def);
    }

    return def;
  }
  // No DOM Patching occurs here


  function setElementProto(elm, def) {
    setPrototypeOf$2(elm, def.bridge.prototype);
  }

  const HTML_PROPS = ArrayReduce$1.call(getOwnPropertyNames$2(HTMLElementOriginalDescriptors), (props, propName) => {
    const attrName = getAttrNameFromPropName(propName);
    props[propName] = {
      config: 3,
      type: 'any',
      attr: attrName
    };
    return props;
  }, create$2(null));
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  var VMState;

  (function (VMState) {
    VMState[VMState["created"] = 0] = "created";
    VMState[VMState["connected"] = 1] = "connected";
    VMState[VMState["disconnected"] = 2] = "disconnected";
  })(VMState || (VMState = {}));

  let idx = 0;
  /** The internal slot used to associate different objects the engine manipulates with the VM */

  const ViewModelReflection = createHiddenField$1('ViewModel', 'engine');

  function callHook(cmp, fn, args = []) {
    return fn.apply(cmp, args);
  }

  function setHook(cmp, prop, newValue) {
    cmp[prop] = newValue;
  }

  function getHook(cmp, prop) {
    return cmp[prop];
  }

  function rerenderVM(vm) {
    rehydrate(vm);
  }

  function appendRootVM(vm) {
    runConnectedCallback(vm);
    rehydrate(vm);
  }

  function appendVM(vm) {
    rehydrate(vm);
  } // just in case the component comes back, with this we guarantee re-rendering it
  // while preventing any attempt to rehydration until after reinsertion.


  function resetComponentStateWhenRemoved(vm) {
    const {
      state
    } = vm;

    if (state !== VMState.disconnected) {
      const {
        oar,
        tro
      } = vm; // Making sure that any observing record will not trigger the rehydrated on this vm

      tro.reset(); // Making sure that any observing accessor record will not trigger the setter to be reinvoked

      for (const key in oar) {
        oar[key].reset();
      }

      runDisconnectedCallback(vm); // Spec: https://dom.spec.whatwg.org/#concept-node-remove (step 14-15)

      runShadowChildNodesDisconnectedCallback(vm);
      runLightChildNodesDisconnectedCallback(vm);
    }
  } // this method is triggered by the diffing algo only when a vnode from the
  // old vnode.children is removed from the DOM.


  function removeVM(vm) {

    resetComponentStateWhenRemoved(vm);
  } // this method is triggered by the removal of a root element from the DOM.


  function removeRootVM(vm) {
    resetComponentStateWhenRemoved(vm);
  }

  function createVM(elm, Ctor, options) {

    const def = getComponentDef(Ctor);
    const {
      isRoot,
      mode,
      owner
    } = options;
    idx += 1;
    const uninitializedVm = {
      // component creation index is defined once, and never reset, it can
      // be preserved from one insertion to another without any issue
      idx,
      state: VMState.created,
      isScheduled: false,
      isDirty: true,
      isRoot: isTrue$1$1(isRoot),
      mode,
      def,
      owner,
      elm,
      data: EmptyObject,
      context: create$2(null),
      cmpProps: create$2(null),
      cmpTrack: create$2(null),
      cmpSlots: useSyntheticShadow ? create$2(null) : undefined,
      callHook,
      setHook,
      getHook,
      children: EmptyArray,
      aChildren: EmptyArray,
      velements: EmptyArray,
      // Perf optimization to preserve the shape of this obj
      cmpTemplate: undefined,
      component: undefined,
      cmpRoot: undefined,
      tro: undefined,
      oar: undefined
    };


    createComponent(uninitializedVm, Ctor); // link component to the wire service

    const initializedVm = uninitializedVm;
    linkComponent(initializedVm);
  }

  function associateVM(obj, vm) {
    setHiddenField$1(obj, ViewModelReflection, vm);
  }

  function getAssociatedVM(obj) {
    const vm = getHiddenField$1(obj, ViewModelReflection);

    return vm;
  }

  function getAssociatedVMIfPresent(obj) {
    const maybeVm = getHiddenField$1(obj, ViewModelReflection);

    return maybeVm;
  }

  function rehydrate(vm) {

    if (isTrue$1$1(vm.isDirty)) {
      const children = renderComponent(vm);
      patchShadowRoot(vm, children);
    }
  }

  function patchShadowRoot(vm, newCh) {
    const {
      cmpRoot,
      children: oldCh
    } = vm;
    vm.children = newCh; // caching the new children collection

    if (newCh.length > 0 || oldCh.length > 0) {
      // patch function mutates vnodes by adding the element reference,
      // however, if patching fails it contains partial changes.
      if (oldCh !== newCh) {
        const fn = hasDynamicChildren(newCh) ? updateDynamicChildren : updateStaticChildren;
        runWithBoundaryProtection(vm, vm, () => {
        }, () => {
          // job
          fn(cmpRoot, oldCh, newCh);
        }, () => {
        });
      }
    }

    if (vm.state === VMState.connected) {
      // If the element is connected, that means connectedCallback was already issued, and
      // any successive rendering should finish with the call to renderedCallback, otherwise
      // the connectedCallback will take care of calling it in the right order at the end of
      // the current rehydration process.
      runRenderedCallback(vm);
    }
  }

  function runRenderedCallback(vm) {
    const {
      rendered
    } = Services;

    if (rendered) {
      invokeServiceHook(vm, rendered);
    }

    invokeComponentRenderedCallback(vm);
  }

  let rehydrateQueue = [];

  function flushRehydrationQueue() {
    startGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);

    const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
    rehydrateQueue = []; // reset to a new queue

    for (let i = 0, len = vms.length; i < len; i += 1) {
      const vm = vms[i];

      try {
        rehydrate(vm);
      } catch (error) {
        if (i + 1 < len) {
          // pieces of the queue are still pending to be rehydrated, those should have priority
          if (rehydrateQueue.length === 0) {
            addCallbackToNextTick(flushRehydrationQueue);
          }

          ArrayUnshift$1$1.apply(rehydrateQueue, ArraySlice$1$1.call(vms, i + 1));
        } // we need to end the measure before throwing.


        endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE); // re-throwing the original error will break the current tick, but since the next tick is
        // already scheduled, it should continue patching the rest.

        throw error; // eslint-disable-line no-unsafe-finally
      }
    }

    endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);
  }

  function runConnectedCallback(vm) {
    const {
      state
    } = vm;

    if (state === VMState.connected) {
      return; // nothing to do since it was already connected
    }

    vm.state = VMState.connected; // reporting connection

    const {
      connected
    } = Services;

    if (connected) {
      invokeServiceHook(vm, connected);
    }

    const {
      connectedCallback
    } = vm.def;

    if (!isUndefined$1(connectedCallback)) {

      invokeComponentCallback(vm, connectedCallback);
    }
  }

  function runDisconnectedCallback(vm) {

    if (isFalse$1$1(vm.isDirty)) {
      // this guarantees that if the component is reused/reinserted,
      // it will be re-rendered because we are disconnecting the reactivity
      // linking, so mutations are not automatically reflected on the state
      // of disconnected components.
      vm.isDirty = true;
    }

    vm.state = VMState.disconnected; // reporting disconnection

    const {
      disconnected
    } = Services;

    if (disconnected) {
      invokeServiceHook(vm, disconnected);
    }

    const {
      disconnectedCallback
    } = vm.def;

    if (!isUndefined$1(disconnectedCallback)) {

      invokeComponentCallback(vm, disconnectedCallback);
    }
  }

  function runShadowChildNodesDisconnectedCallback(vm) {
    const {
      velements: vCustomElementCollection
    } = vm; // reporting disconnection for every child in inverse order since they are inserted in reserved order

    for (let i = vCustomElementCollection.length - 1; i >= 0; i -= 1) {
      const elm = vCustomElementCollection[i].elm; // There are two cases where the element could be undefined:
      // * when there is an error during the construction phase, and an
      //   error boundary picks it, there is a possibility that the VCustomElement
      //   is not properly initialized, and therefore is should be ignored.
      // * when slotted custom element is not used by the element where it is slotted
      //   into it, as a result, the custom element was never initialized.

      if (!isUndefined$1(elm)) {
        const childVM = getAssociatedVM(elm);
        resetComponentStateWhenRemoved(childVM);
      }
    }
  }

  function runLightChildNodesDisconnectedCallback(vm) {
    const {
      aChildren: adoptedChildren
    } = vm;
    recursivelyDisconnectChildren(adoptedChildren);
  }
  /**
   * The recursion doesn't need to be a complete traversal of the vnode graph,
   * instead it can be partial, when a custom element vnode is found, we don't
   * need to continue into its children because by attempting to disconnect the
   * custom element itself will trigger the removal of anything slotted or anything
   * defined on its shadow.
   */


  function recursivelyDisconnectChildren(vnodes) {
    for (let i = 0, len = vnodes.length; i < len; i += 1) {
      const vnode = vnodes[i];

      if (!isNull$1(vnode) && isArray$1(vnode.children) && !isUndefined$1(vnode.elm)) {
        // vnode is a VElement with children
        if (isUndefined$1(vnode.ctor)) {
          // it is a VElement, just keep looking (recursively)
          recursivelyDisconnectChildren(vnode.children);
        } else {
          // it is a VCustomElement, disconnect it and ignore its children
          resetComponentStateWhenRemoved(getAssociatedVM(vnode.elm));
        }
      }
    }
  } // This is a super optimized mechanism to remove the content of the shadowRoot
  // without having to go into snabbdom. Especially useful when the reset is a consequence
  // of an error, in which case the children VNodes might not be representing the current
  // state of the DOM


  function resetShadowRoot(vm) {
    vm.children = EmptyArray;
    ShadowRootInnerHTMLSetter.call(vm.cmpRoot, ''); // disconnecting any known custom element inside the shadow of the this vm

    runShadowChildNodesDisconnectedCallback(vm);
  }

  function scheduleRehydration(vm) {
    if (!vm.isScheduled) {
      vm.isScheduled = true;

      if (rehydrateQueue.length === 0) {
        addCallbackToNextTick(flushRehydrationQueue);
      }

      ArrayPush$1.call(rehydrateQueue, vm);
    }
  }

  function getErrorBoundaryVM(vm) {
    let currentVm = vm;

    while (!isNull$1(currentVm)) {
      if (!isUndefined$1(currentVm.def.errorCallback)) {
        return currentVm;
      }

      currentVm = currentVm.owner;
    }
  }
  // NOTE: we should probably more this routine to the synthetic shadow folder
  // and get the allocation to be cached by in the elm instead of in the VM


  function allocateInSlot(vm, children) {

    const {
      cmpSlots: oldSlots
    } = vm;
    const cmpSlots = vm.cmpSlots = create$2(null);

    for (let i = 0, len = children.length; i < len; i += 1) {
      const vnode = children[i];

      if (isNull$1(vnode)) {
        continue;
      }

      const {
        data
      } = vnode;
      const slotName = data.attrs && data.attrs.slot || '';
      const vnodes = cmpSlots[slotName] = cmpSlots[slotName] || []; // re-keying the vnodes is necessary to avoid conflicts with default content for the slot
      // which might have similar keys. Each vnode will always have a key that
      // starts with a numeric character from compiler. In this case, we add a unique
      // notation for slotted vnodes keys, e.g.: `@foo:1:1`

      vnode.key = `@${slotName}:${vnode.key}`;
      ArrayPush$1.call(vnodes, vnode);
    }

    if (isFalse$1$1(vm.isDirty)) {
      // We need to determine if the old allocation is really different from the new one
      // and mark the vm as dirty
      const oldKeys = keys$2(oldSlots);

      if (oldKeys.length !== keys$2(cmpSlots).length) {
        markComponentAsDirty(vm);
        return;
      }

      for (let i = 0, len = oldKeys.length; i < len; i += 1) {
        const key = oldKeys[i];

        if (isUndefined$1(cmpSlots[key]) || oldSlots[key].length !== cmpSlots[key].length) {
          markComponentAsDirty(vm);
          return;
        }

        const oldVNodes = oldSlots[key];
        const vnodes = cmpSlots[key];

        for (let j = 0, a = cmpSlots[key].length; j < a; j += 1) {
          if (oldVNodes[j] !== vnodes[j]) {
            markComponentAsDirty(vm);
            return;
          }
        }
      }
    }
  }

  function runWithBoundaryProtection(vm, owner, pre, job, post) {
    let error;
    pre();

    try {
      job();
    } catch (e) {
      error = Object(e);
    } finally {
      post();

      if (!isUndefined$1(error)) {
        error.wcStack = error.wcStack || getErrorComponentStack(vm);
        const errorBoundaryVm = isNull$1(owner) ? undefined : getErrorBoundaryVM(owner);

        if (isUndefined$1(errorBoundaryVm)) {
          throw error; // eslint-disable-line no-unsafe-finally
        }

        resetShadowRoot(vm); // remove offenders


        const errorCallback = errorBoundaryVm.def.errorCallback;
        invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);
      }
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    appendChild: appendChild$1,
    insertBefore: insertBefore$1,
    removeChild: removeChild$1,
    replaceChild: replaceChild$1
  } = Node.prototype;
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const ConnectingSlot = createHiddenField$1('connecting', 'engine');
  const DisconnectingSlot = createHiddenField$1('disconnecting', 'engine');

  function callNodeSlot(node, slot) {

    const fn = getHiddenField$1(node, slot);

    if (!isUndefined$1(fn)) {
      fn();
    }

    return node; // for convenience
  } // monkey patching Node methods to be able to detect the insertions and removal of
  // root elements created via createElement.


  assign$2(Node.prototype, {
    appendChild(newChild) {
      const appendedNode = appendChild$1.call(this, newChild);
      return callNodeSlot(appendedNode, ConnectingSlot);
    },

    insertBefore(newChild, referenceNode) {
      const insertedNode = insertBefore$1.call(this, newChild, referenceNode);
      return callNodeSlot(insertedNode, ConnectingSlot);
    },

    removeChild(oldChild) {
      const removedNode = removeChild$1.call(this, oldChild);
      return callNodeSlot(removedNode, DisconnectingSlot);
    },

    replaceChild(newChild, oldChild) {
      const replacedNode = replaceChild$1.call(this, newChild, oldChild);
      callNodeSlot(replacedNode, DisconnectingSlot);
      callNodeSlot(newChild, ConnectingSlot);
      return replacedNode;
    }

  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * This function builds a Web Component class from a LWC constructor
   * so it can be registered as a new element via customElements.define()
   * at any given time. E.g.:
   *
   *      import { buildCustomElementConstructor } from 'lwc';
   *      import Foo from 'ns/foo';
   *      const WC = buildCustomElementConstructor(Foo);
   *      customElements.define('x-foo', WC);
   *      const elm = document.createElement('x-foo');
   *
   */


  function buildCustomElementConstructor(Ctor, options) {
    var _a;

    const {
      props,
      bridge: BaseElement
    } = getComponentDef(Ctor);
    const normalizedOptions = {
      mode: 'open',
      isRoot: true,
      owner: null
    };

    if (isObject$1$1(options) && !isNull$1(options)) {
      const {
        mode
      } = options;

      if (mode === 'closed') {
        normalizedOptions.mode = mode;
      }
    }

    return _a = class extends BaseElement {
      constructor() {
        super();
        createVM(this, Ctor, normalizedOptions);
      }

      connectedCallback() {
        const vm = getAssociatedVM(this);
        appendRootVM(vm);
      }

      disconnectedCallback() {
        const vm = getAssociatedVM(this);
        removeRootVM(vm);
      }

      attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue === newValue) {
          // ignoring similar values for better perf
          return;
        }

        const propName = getPropNameFromAttrName(attrName);

        if (isUndefined$1(props[propName])) {
          // ignoring unknown attributes
          return;
        }

        if (!isAttributeLocked(this, attrName)) {
          // ignoring changes triggered by the engine itself during:
          // * diffing when public props are attempting to reflect to the DOM
          // * component via `this.setAttribute()`, should never update the prop.
          // Both cases, the the setAttribute call is always wrap by the unlocking
          // of the attribute to be changed
          return;
        } // reflect attribute change to the corresponding props when changed
        // from outside.


        this[propName] = newValue;
      }

    }, // collecting all attribute names from all public props to apply
    // the reflection from attributes to props via attributeChangedCallback.
    _a.observedAttributes = ArrayMap$1.call(getOwnPropertyNames$2(props), propName => props[propName].attr), _a;
  }
  /** version: 1.3.7-226.4 */

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */
  const BEFORE_ALL = 'beforeAll';
  const BEFORE = 'before';
  const AFTER_ALL = 'afterAll';
  const AFTER = 'after';
  const MODE_ONLY = 'only';
  const MODE_SKIP = 'skip';
  const MODES = {
    ONLY: MODE_ONLY,
    SKIP: MODE_SKIP
  };
  const HOOKS = {
    BEFORE_ALL,
    BEFORE,
    AFTER_ALL,
    AFTER
  };
  const RUN_BENCHMARK = 'run_benchmark';

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */
  const makeDescribe = (name, parent, mode) => ({
    type: "group",
    mode: parent && !mode ? parent.mode : mode,
    children: [],
    hooks: [],
    startedAt: 0,
    aggregate: 0,
    name,
    parent
  });
  const makeBenchmark = (name, parent, mode) => ({
    type: "benchmark",
    mode: parent && !mode ? parent.mode : mode,
    hooks: [],
    name,
    parent,
    startedAt: 0,
    aggregate: 0
  });
  const makeBenchmarkRun = (fn, parent) => ({
    type: "run",
    fn,
    name: RUN_BENCHMARK,
    parent,
    startedAt: 0,
    metrics: {},
    hooks: [],
    aggregate: 0
  });

  const handler = (event, state) => {
    switch (event.nodeType) {
      case 'start_describe_definition':
        {
          const {
            nodeName,
            mode
          } = event;
          const currentDescribeBlock = state.currentDescribeBlock;
          const describeBlock = makeDescribe(nodeName, currentDescribeBlock, mode);
          currentDescribeBlock.children.push(describeBlock);
          state.currentDescribeBlock = describeBlock;
          break;
        }

      case 'start_benchmark_definition':
        {
          const {
            nodeName,
            mode
          } = event;
          const currentDescribeBlock = state.currentDescribeBlock;
          const benchmarkBlock = makeBenchmark(nodeName, currentDescribeBlock, mode);
          currentDescribeBlock.children.push(benchmarkBlock);
          state.currentDescribeBlock = benchmarkBlock;
          break;
        }

      case 'finish_describe_definition':
      case 'finish_benchmark_definition':
        {
          const currentDescribeBlock = state.currentDescribeBlock;

          if (!currentDescribeBlock) {
            throw new Error(`"currentDescribeBlock" has to be there since we're finishing its definition.`);
          }

          if (currentDescribeBlock.type === "benchmark" && !currentDescribeBlock.run) {
            throw new Error(`Benchmark "${currentDescribeBlock.name}" must have a 'run()' function or contain benchmarks inside.`);
          }

          if (currentDescribeBlock.parent) {
            state.currentDescribeBlock = currentDescribeBlock.parent;
          }

          break;
        }

      case 'add_hook':
        {
          const {
            currentDescribeBlock
          } = state;
          const {
            fn,
            hookType: type
          } = event;

          if (fn && type) {
            currentDescribeBlock.hooks.push({
              fn,
              type
            });
          }

          break;
        }

      case 'run_benchmark':
        {
          const currentDescribeBlock = state.currentDescribeBlock;
          const {
            fn
          } = event;

          if (fn) {
            const benchmark = makeBenchmarkRun(fn, currentDescribeBlock);
            currentDescribeBlock.run = benchmark;
          }

          break;
        }
    }
  };

  var primitivesHandler = registerComponent(handler, {
    tmpl: _tmpl
  });

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */
  var DEFAULT_STATE = registerComponent(Object.freeze({
    benchmarkName: "",
    useMacroTaskAfterBenchmark: true,
    maxDuration: 1000 * 20,
    minSampleCount: 30,
    iterations: 0,
    results: [],
    executedTime: 0,
    executedIterations: 0
  }), {
    tmpl: _tmpl
  });

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */
  function cloneState(obj) {
    const stateClone = Object.assign({}, obj);

    if (stateClone.children) {
      stateClone.children = stateClone.children.map(obj => cloneState(obj));
    }

    if (stateClone.run) {
      stateClone.run = Object.assign({}, stateClone.run);
    }

    return stateClone;
  }

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */
  const eventHandlers = [primitivesHandler];
  const ROOT_DESCRIBE_BLOCK_NAME = typeof BEST_CONFIG !== 'undefined' ? BEST_CONFIG.benchmarkName : 'ROOT_DESCRIBE_BLOCK';
  const ROOT_DESCRIBE_BLOCK = makeDescribe(ROOT_DESCRIBE_BLOCK_NAME);
  const STATE = Object.assign({}, DEFAULT_STATE, {
    currentDescribeBlock: ROOT_DESCRIBE_BLOCK,
    rootDescribeBlock: ROOT_DESCRIBE_BLOCK
  });
  const getBenckmarkState = () => cloneState(STATE);
  const getBenchmarkRootNode = () => getBenckmarkState().rootDescribeBlock;
  const initializeBenchmarkConfig = newOpts => {
    if (newOpts.iterations !== undefined) {
      if (newOpts.iterateOnClient === undefined) {
        newOpts.iterateOnClient = true;
      }

      newOpts.minSampleCount = newOpts.iterations;
      newOpts.maxDuration = 1;
    }

    return Object.assign(STATE, newOpts);
  }; // PROTECTED: Should only be used by the primitives

  function dispatch(event) {
    try {
      for (const handler of eventHandlers) {
        handler(event, STATE);
      }
    } catch (err) {
      STATE.benchmarkDefinitionError = err;
    }
  }

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */

  /*
   * This code is a slight modification of VueJS next-tick
   * https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js
   *
   */
  function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
  }

  const callbacks = [];
  let pending = false;

  function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;

    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  function handleError(e, ctx, type) {
    console.error(e, ctx, type);
  }

  let microTimerFunc;
  let macroTimerFunc;
  let useMacroTask = false; // Determine (macro) Task defer implementation.
  // Technically setImmediate should be the ideal choice, but it's only available
  // in IE. The only polyfill that consistently queues the callback after all DOM
  // events triggered in the same loop is by using MessageChannel.

  /* istanbul ignore if */

  if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    macroTimerFunc = () => {
      setImmediate(flushCallbacks);
    };
  } else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) || // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]')) {
    const channel = new MessageChannel();
    const port = channel.port2;
    channel.port1.onmessage = flushCallbacks;

    macroTimerFunc = () => {
      port.postMessage(1);
    };
  } else {
    /* istanbul ignore next */
    macroTimerFunc = () => {
      setTimeout(flushCallbacks, 0);
    };
  } // Determine MicroTask defer implementation.

  /* istanbul ignore next, $flow-disable-line */


  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve();

    microTimerFunc = () => {
      p.then(flushCallbacks);
    };
  } else {
    // fallback to macro
    microTimerFunc = macroTimerFunc;
  }
  /*
   * Wrap a function so that if any code inside triggers state change,
   * the changes are queued using a Task instead of a MicroTask.
   */


  function withMacroTask(fn) {
    return fn._withTask || (fn._withTask = function () {
      useMacroTask = true;
      const res = fn.apply(null, arguments);
      useMacroTask = false;
      return res;
    });
  }
  function nextTick(cb, ctx) {
    let _resolve;

    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });

    if (!pending) {
      pending = true;

      if (useMacroTask) {
        macroTimerFunc();
      } else {
        microTimerFunc();
      }
    }

    return cb ? null : new Promise(resolve => {
      _resolve = resolve;
    });
  }
  const time = window.performance.now.bind(window.performance);
  const formatTime = t => Math.round(t * 1000) / 1000;
  const raf = window && window.requestAnimationFrame ? window.requestAnimationFrame : nextTick;

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */
  var BenchmarkMeasureType;

  (function (BenchmarkMeasureType) {
    BenchmarkMeasureType["Execute"] = "BEST/execute";
    BenchmarkMeasureType["Before"] = "BEST/before";
    BenchmarkMeasureType["After"] = "BEST/after";
  })(BenchmarkMeasureType || (BenchmarkMeasureType = {}));

  const _initHandlers = () => Object.values(HOOKS).reduce((o, k) => {
    o[k] = [];
    return o;
  }, {});

  const _initHooks = hooks => hooks.reduce((m, {
    type,
    fn
  }) => {
    m[type].push(fn);
    return m;
  }, _initHandlers());

  const _forceGC = () => window.gc && window.gc();

  function startMeasure(markName, type) {
    performance.mark(`${type}/${markName}`);
  }

  function endMeasure(markName, type) {
    const eventName = `${type}/${markName}`;
    performance.measure(eventName, eventName);
    performance.clearMarks(eventName);
    performance.clearMeasures(eventName);
  }

  const executeBenchmark = async (benchmarkNode, markName, {
    useMacroTaskAfterBenchmark
  }) => {
    // Force garbage collection before executing an iteration (--js-flags=--expose-gc)
    _forceGC();

    return new Promise((resolve, reject) => {
      raf(async () => {
        benchmarkNode.startedAt = formatTime(time());
        startMeasure(markName, BenchmarkMeasureType.Execute);

        try {
          await benchmarkNode.fn();
          benchmarkNode.metrics.script = formatTime(time() - benchmarkNode.startedAt);

          if (useMacroTaskAfterBenchmark) {
            withMacroTask(async () => {
              await nextTick();
              benchmarkNode.aggregate = formatTime(time() - benchmarkNode.startedAt);
              endMeasure(markName, BenchmarkMeasureType.Execute);
              resolve();
            })();
          } else {
            benchmarkNode.aggregate = formatTime(time() - benchmarkNode.startedAt);
            endMeasure(markName, BenchmarkMeasureType.Execute);
            resolve();
          }
        } catch (e) {
          benchmarkNode.aggregate = -1;
          endMeasure(markName, BenchmarkMeasureType.Execute);
          reject();
        }
      });
    });
  };

  const runBenchmarkIteration = async (node, opts) => {
    const {
      hooks,
      children,
      run
    } = node;

    const hookHandlers = _initHooks(hooks); // -- Before All ----


    for (const hook of hookHandlers[HOOKS.BEFORE_ALL]) {
      await hook();
    } // -- For each children ----


    if (children) {
      for (const child of children) {
        // -- Traverse Child ----
        node.startedAt = formatTime(time());
        await runBenchmarkIteration(child, opts);
        node.aggregate = formatTime(time() - node.startedAt);
      }
    }

    if (run) {
      // -- Before ----
      const markName = run.parent.name;

      for (const hook of hookHandlers[HOOKS.BEFORE]) {
        await hook();
      }


      node.startedAt = formatTime(time());
      await executeBenchmark(run, markName, opts);
      node.aggregate = formatTime(time() - node.startedAt); // -- After ----

      for (const hook of hookHandlers[HOOKS.AFTER]) {
        await hook();
      }
    } // -- After All ----


    for (const hook of hookHandlers[HOOKS.AFTER_ALL]) {
      await hook();
    }

    return node;
  };

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */
  function normalizeResults(benchmarkState) {
    const {
      benchmarkName,
      executedIterations,
      executedTime: aggregate,
      results
    } = benchmarkState;
    return {
      benchmarkName,
      executedIterations,
      aggregate,
      results
    };
  }

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */
  function validateState(benchmarkState) {
    const {
      rootDescribeBlock,
      currentDescribeBlock,
      benchmarkDefinitionError
    } = benchmarkState;

    if (benchmarkDefinitionError) {
      return; // Nothing to do; there is already an error
    }

    if (rootDescribeBlock !== currentDescribeBlock) {
      benchmarkState.benchmarkDefinitionError = new Error('Benchmark parsing error');
    }

    if (rootDescribeBlock.children.length === 0) {
      benchmarkState.benchmarkDefinitionError = new Error('No benchmarks to run');
    }
  }

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */

  function collectNodeResults(node) {
    const {
      name,
      aggregate,
      startedAt,
      run,
      children
    } = node;
    const type = node.type;
    const resultNode = {
      type,
      name,
      aggregate,
      startedAt
    };

    if (run) {
      resultNode.aggregate = run.aggregate;
      resultNode.metrics = run.metrics;
    } else if (children) {
      resultNode.nodes = children.map(c => collectNodeResults(c));
    }

    return resultNode;
  }

  async function runIterations(config) {
    if (config.executedTime < config.maxDuration || config.executedIterations < config.minSampleCount) {
      const {
        useMacroTaskAfterBenchmark
      } = config;
      const benchmark = await runBenchmarkIteration(getBenchmarkRootNode(), {
        useMacroTaskAfterBenchmark
      });
      const results = collectNodeResults(benchmark);
      config.results.push(results);
      config.executedTime += benchmark.aggregate;
      config.executedIterations += 1;

      if (!config.iterateOnClient) {
        return config;
      }

      return runIterations(config);
    }

    return config;
  }

  async function runBenchmark(benchmarkState) {
    validateState(benchmarkState);

    if (benchmarkState.benchmarkDefinitionError) {
      throw benchmarkState.benchmarkDefinitionError;
    }

    benchmarkState.results = [];
    await runIterations(benchmarkState);
    return normalizeResults(benchmarkState);
  }

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */

  const _dispatchBenchmark = (nodeName, blockFn, mode) => {
    dispatch({
      nodeName,
      mode,
      nodeType: 'start_benchmark_definition'
    });
    blockFn();
    dispatch({
      nodeName,
      nodeType: 'finish_benchmark_definition'
    });
  };

  const benchmark = (benchmarkName, fn) => _dispatchBenchmark(benchmarkName, fn);

  benchmark.only = (benchmarkName, fn) => _dispatchBenchmark(benchmarkName, fn, MODES.ONLY);

  benchmark.skip = (benchmarkName, fn) => _dispatchBenchmark(benchmarkName, fn, MODES.SKIP);

  const _addHook = (fn, hookType) => dispatch({
    nodeName: 'hook',
    fn,
    hookType,
    nodeType: 'add_hook'
  });

  const before = fn => _addHook(fn, HOOKS.BEFORE);

  const after = fn => _addHook(fn, HOOKS.AFTER);

  const run = fn => dispatch({
    nodeName: 'run',
    fn,
    nodeType: RUN_BENCHMARK
  });

  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
  */

  const setupBenchmark = config => initializeBenchmarkConfig(config);

  const runBenchmark$1 = async config => {
    if (config) {
      setupBenchmark(config);
    }

    const benchmarkState = getBenckmarkState();
    const benchmarkResults = await runBenchmark(benchmarkState);
    return benchmarkResults;
  }; // Expose BEST API


  const BEST = {
    setupBenchmark,
    runBenchmark: runBenchmark$1
  };
  window.BEST = BEST;
  window.process = {
    env: {
      NODE_ENV: 'development'
    }
  }; // Auto-load

  window.addEventListener('load', async () => {
    const config = setupBenchmark(window.BEST_CONFIG);

    if (config.autoStart) {
      window.BEST_RESULTS = await runBenchmark$1();
    }
  });

  function tmpl($api, $cmp, $slotset, $ctx) {
    const {
      d: api_dynamic,
      h: api_element,
      b: api_bind,
      t: api_text
    } = $api;
    const {
      _m0,
      _m1
    } = $ctx;
    return [api_element("span", {
      key: 0
    }, [api_dynamic($cmp.row.id)]), api_element("div", {
      key: 2
    }, [api_element("a", {
      attrs: {
        "data-id": $cmp.row.id
      },
      key: 1,
      on: {
        "click": _m0 || ($ctx._m0 = api_bind($cmp.handleSelect))
      }
    }, [api_dynamic($cmp.row.label)])]), api_element("div", {
      key: 4
    }, [api_element("a", {
      attrs: {
        "data-id": $cmp.row.id
      },
      key: 3,
      on: {
        "click": _m1 || ($ctx._m1 = api_bind($cmp.handleRemove))
      }
    }, [api_text("Remove")])])];
  }

  var _tmpl$1 = registerTemplate(tmpl);
  tmpl.stylesheets = [];
  tmpl.stylesheetTokens = {
    hostAttribute: "benchmark-tableComponentRow_tableComponentRow-host",
    shadowAttribute: "benchmark-tableComponentRow_tableComponentRow"
  };

  class TableComponentRow extends BaseLightningElement {
    constructor(...args) {
      super(...args);
      this.row = void 0;
    }

    handleSelect() {
      this.dispatchEvent(new CustomEvent('select'));
    }

    handleRemove() {
      this.dispatchEvent(new CustomEvent('remove'));
    }

  }

  registerDecorators(TableComponentRow, {
    publicProps: {
      row: {
        config: 0
      }
    }
  });

  var Row = registerComponent(TableComponentRow, {
    tmpl: _tmpl$1
  });

  function tmpl$1($api, $cmp, $slotset, $ctx) {
    const {
      k: api_key,
      b: api_bind,
      c: api_custom_element,
      i: api_iterator,
      h: api_element
    } = $api;
    const {
      _m0,
      _m1
    } = $ctx;
    return [api_element("section", {
      key: 2
    }, [api_element("div", {
      key: 1
    }, api_iterator($cmp.rows, function (row) {
      return api_custom_element("benchmark-table-component-row", Row, {
        className: row.className,
        props: {
          "row": row
        },
        key: api_key(0, row.id),
        on: {
          "select": _m0 || ($ctx._m0 = api_bind($cmp.handleSelect)),
          "remove": _m1 || ($ctx._m1 = api_bind($cmp.handleRemove))
        }
      }, []);
    }))])];
  }

  var _tmpl$2 = registerTemplate(tmpl$1);
  tmpl$1.stylesheets = [];
  tmpl$1.stylesheetTokens = {
    hostAttribute: "benchmark-tableComponent_tableComponent-host",
    shadowAttribute: "benchmark-tableComponent_tableComponent"
  };

  class TableComponent extends BaseLightningElement {
    constructor(...args) {
      super(...args);
      this.rows = [];
    }

    handleSelect() {}

    handleRemove() {}

  }

  registerDecorators(TableComponent, {
    publicProps: {
      rows: {
        config: 0
      }
    }
  });

  var Table = registerComponent(TableComponent, {
    tmpl: _tmpl$2
  });

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  const adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
  const colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
  const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];

  function _random(max) {
    return Math.round(Math.random() * 1000) % max;
  }

  class Store {
    constructor() {
      this.data = [];
      this.selected = undefined;
      this.id = 1;
    }

    buildData(count = 1000) {
      var data = [];

      for (var i = 0; i < count; i++) data.push({
        id: this.id++,
        label: adjectives[_random(adjectives.length)] + ' ' + colours[_random(colours.length)] + ' ' + nouns[_random(nouns.length)]
      });

      return data;
    }

    updateData() {
      // Just assigning setting each tenth this.data doesn't cause a redraw, the following does:
      var newData = [];

      for (let i = 0; i < this.data.length; i++) {
        if (i % 10 === 0) {
          newData[i] = Object.assign({}, this.data[i], {
            label: this.data[i].label + ' !!!'
          });
        } else {
          newData[i] = this.data[i];
        }
      }

      this.data = newData;
    }

    delete(id) {
      const idx = this.data.findIndex(d => d.id == id);
      this.data.splice(idx, 1);
    }

    run() {
      this.data = this.buildData();
      this.selected = undefined;
    }

    add() {
      this.data = this.data.concat(this.buildData(1000));
    }

    update() {
      this.updateData();
    }

    select(id) {
      this.selected = id;
    }

    runLots() {
      this.data = this.buildData(10000);
      this.selected = undefined;
    }

    clear() {
      this.data = [];
      this.selected = undefined;
    }

    swapRows() {
      if (this.data.length > 10) {
        const d4 = this.data[4];
        const d9 = this.data[9];
        var newData = this.data.map(function (data, i) {
          if (i === 4) {
            return d9;
          } else if (i === 9) {
            return d4;
          }

          return data;
        });
        this.data = newData;
      }
    }

  }

  var Store$1 = registerComponent(Store, {
    tmpl: _tmpl
  });

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  /** Wait for the next frame */

  function nextFrame(cb) {
    setTimeout(cb, 0);
  }
  const insertTableComponent = function (el, container = document.body) {
    return new Promise(resolve => {
      container.appendChild(el);
      nextFrame(() => {
        resolve(el);
      });
    });
  };
  const destroyTableComponent = function (el) {
    return el && el.parentElement.removeChild(el);
  };

  customElements.define('benchmark-table-component', buildCustomElementConstructor(Table)); // the row can be optionally defined, but this benchmark always do it so we know how costly it is.

  customElements.define('benchmark-table-component-row', buildCustomElementConstructor(Row));
  benchmark(`benchmark-table-wc/clear/1k`, () => {
    let tableElement;
    let store;
    before(async () => {
      tableElement = document.createElement('benchmark-table-component');
      await insertTableComponent(tableElement);
      store = new Store$1();
      store.run(); // eslint-disable-next-line require-atomic-updates

      tableElement.rows = store.data;
    });
    run(() => {
      tableElement.rows = [];
    });
    after(() => {
      destroyTableComponent(tableElement);
    });
  });

}());
