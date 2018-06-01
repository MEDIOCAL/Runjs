webpackJsonp([0],{

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _RunDomComponent = __webpack_require__(331);

var _RunDomComponent2 = _interopRequireDefault(_RunDomComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function instanceComponent(node) {
	var type = node.tag;

	if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) != 'object') {
		return new RunTextComponent(node);
	}

	if (typeof type === 'string') {
		return new _RunDomComponent2.default(node);
	} else {
		return new RunComComponent(node);
	}
}

exports.default = instanceComponent;

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
module.exports = __webpack_require__(329);


/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Run = __webpack_require__(330);

var _Run2 = _interopRequireDefault(_Run);

var _RunElement = __webpack_require__(333);

var _RunElement2 = _interopRequireDefault(_RunElement);

var _RunComponent = __webpack_require__(334);

var _RunComponent2 = _interopRequireDefault(_RunComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function click() {
	console.log(1);
}

function click1() {
	console.log(2);
}

function change(e) {
	console.log(e.target.value);
}

var rc = _RunElement2.default.createElement;

function Header(props) {
	return rc('div', { class: 'header' }, 'header' + props.name);
}

function Content() {
	_RunComponent2.default.call(this);
	this.state = {
		name: 'bbb'
	};
}
Content.isComponent = true;

Content.prototype = _RunComponent2.default.prototype;
Content.prototype.constructor = Content;
Content.prototype.componentWillMount = function () {
	console.log('componentWillMount');
};
Content.prototype.click = function () {
	this.setState({
		name: 'cxh'
	});
};
Content.prototype.render = function () {
	var me = this;
	return rc('div', { class: 'cont' }, [rc('div', { class: 'show' }, me.state.name), rc('a', { class: 'a', href: 'javascript:void(0)', onClick: me.click.bind(me) }, '点我切换')]);
};

Content.prototype.componentDidMount = function () {
	console.log('componentDidMount');
};

var vnode = rc('div', { class: 'home', onClick: click }, rc('div', { class: 'son' }, [rc('div', { class: 's1', onClick: click1 }, '123'), rc('div', { class: 's2' }, '456'), rc(Header, { name: 'cxh' }, null), rc('div', { class: 's2' }, '789'), rc(Content, { name: 'cxh' }, null), rc('input', { class: 's3', type: 'text', onChange: change }, null)]));

_Run2.default.render(vnode, document.getElementById('app'));

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _instanceComponent = __webpack_require__(126);

var _instanceComponent2 = _interopRequireDefault(_instanceComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Run = {
	render: function render(vNoideTree, ele) {
		var instance = (0, _instanceComponent2.default)(vNoideTree);
		var vnodeTree = instance.mountComponent(ele);
		ele.appendChild(vnodeTree.node);
	}
};

exports.default = Run;

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _instanceComponent = __webpack_require__(126);

var _instanceComponent2 = _interopRequireDefault(_instanceComponent);

var _RunEvent = __webpack_require__(332);

var _RunEvent2 = _interopRequireDefault(_RunEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalIdCounter = 1;
var STYLE = 'style';
var CHILDREN = 'children';

function RunDomComponent(node) {
	this._currentElement = node;
	this.tag = node.tag;
	this._instance = null;
	this._hostNode = null;
	this._renderedChildren = null;
	this._hostParent = null;
	this.domId = globalIdCounter++;
}

RunDomComponent.prototype = {
	constructor: RunDomComponent,
	mountComponent: function mountComponent(hostParent) {
		this._hostParent = hostParent;
		var props = this._currentElement.props;
		var mountImage = null;
		var el = null;
		el = document.createElement(this.tag);
		this._hostNode = el;
		this.updateDOMProperties(null, props);
		mountImage = DOMTree(this._hostNode);
		this.initialChildren(props.children, mountImage);
		mountImage.instance = this;
		return mountImage;
	},
	initialChildren: function initialChildren(children, domTree) {
		var index = 0;

		var mountImages = [];

		var childInstances = this.instantiateChild(children);

		this._renderedChildren = childInstances;

		for (var name in childInstances) {
			if (childInstances.hasOwnProperty(name)) {
				var child = childInstances[name];
				var mountImage = child;
				if (child.mountComponent) {
					mountImage = child.mountComponent(this._hostNode);
				}
				child._mountIndex = index++;
				mountImages.push(mountImage);
			}
		}

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = mountImages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _mountImage = _step.value;

				DOMTree.queueChild(domTree, _mountImage);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return mountImages;
	},
	instantiateChild: function instantiateChild(children) {
		if (children === null) {
			return null;
		}
		var childInstances = {};
		if (Array.isArray(children)) {
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i];
				var key = child.props.key === undefined ? i.toString(36) : child.props.key;
				childInstances[key] = (0, _instanceComponent2.default)(child);
			}
		} else {
			childInstances[this.tag] = (0, _instanceComponent2.default)(children);
		}
		return childInstances;
	},
	flattenChildren: function flattenChildren(children) {
		if (children == null) {
			return children;
		}
		var result = {};
		if (Array.isArray(children)) {
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i];
				var key = child.props.key === undefined ? i.toString(36) : child.props.key;
				result[key] = child;
			}
		} else {
			result[this.tag] = children;
		}
		return result;
	},
	updateDOMProperties: function updateDOMProperties(lastProps, nextProps) {
		if (nextProps) {
			for (var prop in nextProps) {
				if (nextProps.hasOwnProperty(prop)) {
					if (prop === STYLE) {
						var _nextProps = this._previousStyle = _nextProps[prop];
						this._hostNode.style = _nextProps;
					} else if (eventType.indexOf(prop) >= 0) {
						_RunEvent2.default.putListener(prop, this, nextProps[prop]);
						_RunEvent2.default.listenTo(prop);
					} else if (prop != CHILDREN) {
						this._hostNode.setAttribute(prop, nextProps[prop]);
					}
				}
			}
		}
	},
	receiveComponent: function receiveComponent(nextElement) {
		var prevElement = this._currentElement;
		this._currentElement = nextElement;
		this.updateComponent(prevElement, nextElement);
	},
	updateComponent: function updateComponent(prevElement, nextElement) {
		var prevProps = prevElement.props;
		var nextProps = nextElement.props;

		var nextChildren = nextElement.props.children;
		if (typeof nextChildren === 'string' || typeof nextChildren === 'number') {
			nextChildren = null;
		}
		var prevChildren = this._renderedChildren;

		var removedNodes = {};
		var mountImages = [];

		nextChildren = this.flattenChildren(nextChildren);
		this.updateChildren(prevChildren, nextChildren, mountImages, removedNodes);
		console.log(nextChildren);
		var updates = null;
		var lastIndex = 0;
		var nextIndex = 0;
		var lastPlacedNode = null;
		for (var name in nextChildren) {
			if (!nextChildren.hasOwnProperty(name)) {
				continue;
			}

			var prevChild = prevChildren && prevChildren[name];
			var nextChild = nextChildren[name];

			if (prevChild === nextChild) {
				enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex));
				lastIndex = Math.max(prevChild._mountIndex, lastIndex);
				prevChild._mountIndex = nextIndex;
			} else {}
		}
	},
	updateChildren: function updateChildren(prevChildren, nextChildren, mountImages, removedNodes) {
		if (!nextChildren && !prevChildren) {
			return;
		}
		var name;
		var prevChild;

		//依次比较子 虚拟dom 的前后值，判断对子dom进行更新
		for (name in nextChildren) {
			if (!nextChildren.hasOwnProperty(name)) {
				continue;
			}

			prevChild = prevChildren && prevChildren[name];

			var prevElement = prevChild && prevChild._currentElement;
			var nextElement = nextChildren[name];

			if (prevChild != null && prevChild._currentElement) {
				prevChild.receiveComponent(nextElement);
				nextChildren[name] = prevChild;
			} else if (prevChild._currentElement) {
				if (prevChild) {
					removedNodes[name] = prevChild._hostNode;
					prevChild.unmountComponent();
				}
				var nextChildInstance = (0, _instanceComponent2.default)(nextElement);
				nextChildren[name] = nextChildInstance;
				nextChildInstance.mountComponent(this);
				mountImages.push(nextChildMountImage);
			}
		}

		for (name in prevChildren) {
			if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
				prevChild = prevChildren[name];
				removedNodes[name] = prevChild._hostNode;

				prevChild.unmountComponent(prevChild);
			}
		}
	},
	moveChild: function moveChild(child, afterNode, toIndex, lastIndex) {
		if (child._mountIndex < lastIndex) {
			return {
				type: 'MOVE_EXISTING',
				content: null,
				fromIndex: child._mountIndex,
				fromNode: child._hostNode,
				toIndex: toIndex,
				afterNode: afterNode
			};
		}
	},
	unmountComponent: function unmountComponent() {}
};

function enqueue(queue, update) {
	if (update) {
		queue = queue || [];
		queue.push(update);
	}
	return queue;
}

exports.default = RunDomComponent;

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var internalInstanceKey = '__runInternalInstance$' + Math.random().toString(36).slice(2);

var eventType = ['onClick', 'onDbClick', 'onChange', 'onInput'];

var RunEvent = {};

RunEvent.eventType = {
	'onClick': 'click',
	'onChange': 'change'
};

RunEvent.eventQueue = {};
RunEvent.listenType = [];
RunEvent.listenEvents = [];

RunEvent.getEventType = function (type) {
	return RunEvent.eventQueue[type];
};

RunEvent.putListener = function (type, component, cb) {
	if (RunEvent.eventQueue[type] === undefined) {
		RunEvent.eventQueue[type] = {};
	}
	if (RunEvent.eventQueue[type][component.domId]) {
		RunEvent.eventQueue[type][component.domId].push(cb);
	} else {
		RunEvent.eventQueue[type][component.domId] = [cb];
	}
	component._hostNode[internalInstanceKey] = component;
};

RunEvent.dispatchEvent = function (type) {
	var events = RunEvent.getEventType(type);
	var components = [];
	return function (e) {
		components = [];
		var target = e.target;
		if (target.nodeType === 9) {
			return;
		}
		if (target.nodeType === 3) {
			target = target.parentNode;
		}

		while (target.nodeType != 9) {
			if (target[internalInstanceKey]) {
				components.push(target[internalInstanceKey].domId);
			}
			target = target.parentNode;
		}

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var domId = _step.value;

				if (events && events.hasOwnProperty(domId)) {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = events[domId][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var evt = _step2.value;

							evt(e);
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	};
};

RunEvent.eventListener = function (eventType, callback) {
	eventType = RunEvent.eventType[eventType];
	if (RunEvent.listenType.indexOf(eventType) >= 0) {
		return;
	}
	RunEvent.listenType.push(eventType);
	if (document.addEventListener) {
		document.addEventListener(eventType, callback, false);
		return function () {
			document.removeEventListener(eventType, callback, false);
		};
	} else if (document.attachEvent) {
		document.attachEvent('on' + eventType, callback);
		return function () {
			document.detachEvent('on' + eventType, callback);
		};
	}
};

RunEvent.listenTo = function (prop) {
	var removeEvent = RunEvent.eventListener(prop, RunEvent.dispatchEvent(prop));
	RunEvent.listenEvents.push(removeEvent);
};

RunEvent.removeEvent = function (component) {
	var domId = component.domId;
	for (var type in RunEvent.eventQueue) {
		if (RunEvent.eventQueue.hasOwnProperty(type)) {
			if (RunEvent.eventQueue[type][domId]) {
				delete RunEvent.eventQueue[type][domId];
			}
		}
	}
};

exports.default = RunEvent;

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var RunElement = {
	createElement: function createElement(tag, props, children) {
		props.children = children;
		return {
			tag: tag,
			props: props
		};
	}
};

exports.default = RunElement;

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function RunComponent() {
	this.state = null;
	this.props = null;
}

RunComponent.prototype.setState = function (state, cb) {
	var internalInstance = this._runInternalInstance;
	var queue = internalInstance._stateQueue || (internalInstance._stateQueue = []);
	queue.push(state);
	RunUpdate.enqueueUpdate(internalInstance, cb);
};

exports.default = RunComponent;

/***/ })

},[127]);