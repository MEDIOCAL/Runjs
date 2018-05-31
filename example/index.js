let keyId = 0
let componentId = 1
let globalIdCounter = 1;
const RunElement = {
	createElement(tag, props, children) {
		props.children = children
		return {
			tag,
			props
		}
	}
}

const Run = {
	render(vNoideTree, ele) {
		const instance = instanceComponent(vNoideTree)
		const vnodeTree = instance.mountComponent(ele)
		ele.appendChild(vnodeTree.node)
	}
}

const STYLE = 'style'
const CHILDREN = 'children'
const eventType = [
	'onClick',
	'onDbClick',
	'onChange',
	'onInput'
]

var internalInstanceKey = '__runInternalInstance$' + Math.random().toString(36).slice(2)

function DOMTree(node) {
	return {
		node: node,
		instance: null
	}
}

DOMTree.queueChild = function(parentTree, childTree) {
	let child = childTree.node === undefined ? childTree : childTree.node
	parentTree.node.appendChild(child)
}

let RunEvent = {}

RunEvent.eventType = {
	'onClick': 'click',
	'onChange': 'change'
}

RunEvent.eventQueue = {}
RunEvent.listenType = []
RunEvent.listenEvents = []

RunEvent.getEventType = function(type) {
	return RunEvent.eventQueue[type]
}

RunEvent.putListener = function(type, component, cb) {
	if( RunEvent.eventQueue[type] === undefined ) {
		RunEvent.eventQueue[type] = {}
	}
	if(RunEvent.eventQueue[type][component.domId]) {
		RunEvent.eventQueue[type][component.domId].push(cb)
	} else {
		RunEvent.eventQueue[type][component.domId] = [cb]
	}
	component._hostNode[internalInstanceKey] = component
}

RunEvent.dispatchEvent = function(type) {
	let events = RunEvent.getEventType(type)
	let components = []
	return function(e) {
		components = []
		let target = e.target
		if(target.nodeType === 9) {
			return 
		}
		if(target.nodeType === 3) {
			target = target.parentNode
		}

		while(target.nodeType != 9) {
			if(target[internalInstanceKey]) {
				components.push(target[internalInstanceKey].domId)
			}
			target = target.parentNode
		}

		for(let domId of components) {
			if(events && events.hasOwnProperty(domId)) {
				for(let evt of events[domId]) {
					evt(e)
				}
			}
		}
		
	}
}

RunEvent.eventListener = function(eventType, callback) {
	eventType = RunEvent.eventType[eventType]
	if(RunEvent.listenType.indexOf(eventType) >= 0) {
		return 
	}
	RunEvent.listenType.push(eventType)
	if(document.addEventListener) {
		document.addEventListener(eventType, callback, false)
		return function () {
	          document.removeEventListener(eventType, callback, false);
	    }
	} else if (document.attachEvent) {
      document.attachEvent('on' + eventType, callback);
      return function () {
          document.detachEvent('on' + eventType, callback);
      }
    }
}

RunEvent.listenTo = function(prop) {
	const removeEvent = RunEvent.eventListener(prop, RunEvent.dispatchEvent(prop))
	RunEvent.listenEvents.push(removeEvent)
}

RunEvent.removeEvent = function(component) {
	const domId = component.domId
	for(let type in RunEvent.eventQueue) {
		if(RunEvent.eventQueue.hasOwnProperty(type)) {
			if(RunEvent.eventQueue[type][domId]) {
				delete RunEvent.eventQueue[type][domId]
			}
		}
	}
}

const Runtransaction = {
	initialize: function() {
		RunBatchingStrategy.isBatchingUpdates = true
	},
	closer: function() {
		RunBatchingStrategy.isBatchingUpdates = false
	}
}

function flushBatchedUpdates() {
	let dirtyComponents = RunBatchingStrategy.dirtyComponents
	console.log(dirtyComponents)
	while(dirtyComponents.length > 0) {
		const component = dirtyComponents.splice(0, 1)
		component[0].performUpdate()
	}
}

const RunBatchingStrategy = {
	dirtyComponents: [],
	isBatchingUpdates: false,
	batchedUpdates: function(callback, component) {
		let alreadyBatchingUpdates = RunBatchingStrategy.isBatchingUpdates
		RunBatchingStrategy.isBatchingUpdates = true

		if (alreadyBatchingUpdates) {
	       return callback(component)
	    } else {
	       RunBatchingStrategy.dirtyComponents.push(component)
	       flushBatchedUpdates()
	    }
	},
	flushBatchedUpdates: flushBatchedUpdates
}

function enqueueUpdate(internalInstance, cb) {
	if( !RunBatchingStrategy.isBatchingUpdates ) {
		RunBatchingStrategy.batchedUpdates(enqueueUpdate, internalInstance)
		return 
	}
	RunBatchingStrategy.dirtyComponents.push(internalInstance)
}

const RunUpdate = {
	enqueueUpdate: enqueueUpdate
}

function enqueue(queue, update) {
	if (update) {
	    queue = queue || []
	    queue.push(update)
	  }
	  return queue
}

function RunDomComponent(node) {
		this._currentElement = node
		this.tag = node.tag
		this._instance = null
		this._hostNode = null
		this._renderedChildren = null
		this._hostParent = null
		this.domId = globalIdCounter++ 
}

RunDomComponent.prototype = {
	constructor: RunDomComponent,
	mountComponent: function (hostParent) {
		this._hostParent = hostParent
		let props = this._currentElement.props
		let mountImage = null 
		let el = null 
		el = document.createElement(this.tag)
		this._hostNode = el
		this.updateDOMProperties(null, props)
		mountImage = DOMTree(this._hostNode)
		this.initialChildren(props.children, mountImage)
		mountImage.instance = this
		return mountImage
	},
	initialChildren: function(children, domTree) {
		let index = 0

		let mountImages = []

		let childInstances = this.instantiateChild(children)
		
		this._renderedChildren = childInstances

		for(let name in childInstances) {
			if(childInstances.hasOwnProperty(name)) {
				let child = childInstances[name]
				let mountImage = child
				if(child.mountComponent) {
					mountImage = child.mountComponent(this._hostNode)
				}
				child._mountIndex = index++
				mountImages.push(mountImage)
			}
		}

		for(let mountImage of mountImages) {
			DOMTree.queueChild(domTree, mountImage)
		}

		return mountImages
	},
	instantiateChild: function(children) {
		if(children === null) {
			return null 
		}
		let childInstances = {}
		if(Array.isArray(children)) {
			for(let i = 0, l = children.length; i< l; i++) {
				let child = children[i]
				let key = child.props.key === undefined ? i.toString(36) : child.props.key
				childInstances[key] = instanceComponent(child)
			}
		} else {
			childInstances[this.tag] = instanceComponent(children)
		}
		return childInstances
	},
	flattenChildren: function(children) {
		if (children == null) {
		    return children
		}
		let result = {}
		if(Array.isArray(children)) {
			for(let i = 0, l = children.length; i< l; i++) {
				let child = children[i]
				let key = child.props.key === undefined ? i.toString(36) : child.props.key
				result[key] = child
			}
		} else {
			result[this.tag] = children
		}
		return result
	},
	updateDOMProperties: function(lastProps, nextProps) {
		if(nextProps) {
			for(let prop in nextProps) {
				if(nextProps.hasOwnProperty(prop)) {
					if(prop === STYLE) {
						let nextProps = this._previousStyle = nextProps[prop]
						this._hostNode.style = nextProps
					} else if (eventType.indexOf(prop) >= 0 ) {
						RunEvent.putListener(prop, this, nextProps[prop])
						RunEvent.listenTo(prop)
					} else if(prop != CHILDREN) {
						this._hostNode.setAttribute(prop, nextProps[prop])
					}
				}
			}
		}
	},
	receiveComponent: function(nextElement) {
		const prevElement = this._currentElement
		this._currentElement = nextElement
		this.updateComponent(prevElement, nextElement)
	},
	updateComponent: function(prevElement, nextElement) {
		const prevProps = prevElement.props 
		const nextProps = nextElement.props

		let nextChildren = nextElement.props.children
		if(typeof nextChildren === 'string' || typeof nextChildren === 'number') {
			nextChildren = null
		}
		let prevChildren = this._renderedChildren
		
		let removedNodes = {}
        let mountImages = []

		nextChildren = this.flattenChildren(nextChildren)
		this.updateChildren(prevChildren, nextChildren, mountImages, removedNodes)
		console.log(nextChildren)
		let updates = null
		let lastIndex = 0
		let nextIndex = 0
		let lastPlacedNode = null
		for(let name in nextChildren) {
			if (!nextChildren.hasOwnProperty(name)) {
	          continue
	        }
	        
	        let prevChild = prevChildren && prevChildren[name]
			let nextChild = nextChildren[name]

			if(prevChild === nextChild) {
				enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex))
				lastIndex = Math.max(prevChild._mountIndex, lastIndex)
				prevChild._mountIndex = nextIndex
			} else {

			}
			
		}
	},
	updateChildren: function(prevChildren, nextChildren, mountImages, removedNodes) {
		if (!nextChildren && !prevChildren) {
	      return
	    }
	    var name
    	var prevChild

    	//依次比较子 虚拟dom 的前后值，判断对子dom进行更新
    	for(name in nextChildren) {
    		if (!nextChildren.hasOwnProperty(name)) {
		        continue
		    }
    		
    		prevChild = prevChildren && prevChildren[name]

    		let prevElement = prevChild && prevChild._currentElement
    		let nextElement = nextChildren[name]

    		if (prevChild != null && prevChild._currentElement) {
		        prevChild.receiveComponent(nextElement)
		        nextChildren[name] = prevChild
		    } else if(prevChild._currentElement) {
		    	if (prevChild) {
		          removedNodes[name] = prevChild._hostNode
		          prevChild.unmountComponent()
		        }
		        var nextChildInstance = instanceComponent(nextElement)
		        nextChildren[name] = nextChildInstance
		        nextChildInstance.mountComponent(this)
		        mountImages.push(nextChildMountImage)
		    }
    	}

    	for (name in prevChildren) {
	      if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
	        prevChild = prevChildren[name]
	        removedNodes[name] = prevChild._hostNode

	        prevChild.unmountComponent(prevChild)
	      }
	    }

	},
	moveChild: function(child, afterNode, toIndex, lastIndex) {
		if (child._mountIndex < lastIndex) {
	        return {
			    type: 'MOVE_EXISTING',
			    content: null,
			    fromIndex: child._mountIndex,
			    fromNode: child._hostNode,
			    toIndex: toIndex,
			    afterNode: afterNode
			}
	    }
	},
	unmountComponent: function() {

	}
}

function RunComComponent(node) {
	this._componentId = componentId++
	this._currentElement = node
	this._hostParent = null
	this.element = null
	this.inst = null
	this._renderedComponent = null
	this._paddingElement = null
}

RunComComponent.prototype = {
	constructor: RunComComponent,
	mountComponent: function(hostParent) {
		Runtransaction.initialize()
		let Component = this._currentElement.tag
		let props = this._currentElement.props
		let inst = null
		let initialState = null
		this._hostParent = hostParent

		if(Component.isComponent) {
			this.inst = inst = new Component(props)
			inst.refs = {}
			initialState = inst.state
			inst._runInternalInstance = this
		} else {
			this.element = Component(props)
		}

		if(initialState === undefined ) {
			initialState = inst.state = null
		}

		this._stateQueue = null 

		if(inst && inst.componentWillMount) {
			inst.componentWillMount()
		}

		if(this._stateQueue) {
			inst.state = this._processPendingState()
		}
		

		if(!this.element) {
			this.element = inst.render()
		}

		

		let instComponent = instanceComponent(this.element)

		this._renderedComponent = instComponent

		let mountImage = instComponent.mountComponent(hostParent)

		if(inst && inst.componentDidMount) {
			inst.componentDidMount()
		}
		Runtransaction.closer()
		return mountImage
	},
	_processPendingState: function() {
		let inst = this.inst
		let queues = this._stateQueue 
		this._stateQueue = null

		if(!queues) {
			return inst.state
		}

		if(queues.length === 1) {
	    	return queues[0]
	    }

	    let nextState = {}

	    for(let queue of queues) {
	    	let state = {}
	    	if(typeof queue === 'function') {
	    		state = queue.call(inst, inst.state)
	    	} else {
	    		state = queue 
	    	}
	    	Object.assign({}, nextState, state)
	    } 

	    return nextState
	},
	performUpdate: function() {
		if(this._paddingElement !== null) {
			this.receiveComponent(this._pendingElement)
		} else {
			// setState更新
			this.updateComponent(this._currentElement, this._currentElement)
		}
	},
	receiveComponent: function() {

	},
	updateComponent: function(prevParentElement, nextParentElement) {
		const inst = this.inst
		const prevProps = prevParentElement.props
   		const nextProps = nextParentElement.props
		
		let willReceive = false
    
	    if (prevParentElement !== nextParentElement) {
	        willReceive = true
	    }

	    if (willReceive && inst.componentWillReceiveProps) {
	        inst.componentWillReceiveProps(nextProps);
	    }

	    const nextState = this._processPendingState()

	    let shouldUpdate = true

	    if (inst.shouldComponentUpdate) {
	    	shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState)
	    }

	    if (shouldUpdate) {
	    	this._performComponentUpdate(nextParentElement, nextProps, nextState)
	    } else {
	    	this._currentElement = nextParentElement
	    	inst.props = nextProps
	        inst.state = nextState
	    }
	},
	_performComponentUpdate: function(nextElement, nextProps, nextState) {
		const inst = this.inst
		const prevState = inst.state 
		const prevProps = inst.props 

		if (inst.componentWillUpdate) {
			inst.componentWillUpdate(nextProps, nextState)
		}

		this._currentElement = nextElement

		inst.props = nextProps
    	inst.state = nextState
    	this._updateRenderComponent()
	    if(inst.componentDidUpdate) {
	    	inst.componentDidUpdate()
	    }
	},
	_updateRenderComponent: function() {
		const inst = this.inst
		const prevComponentInstance = this._renderedComponent
		const prevRenderedElement = prevComponentInstance._currentElement
		const nextRenderedElement = inst.render()
		prevComponentInstance.receiveComponent(nextRenderedElement)
		
	}
}

function instanceComponent(node) {
	const type = node.tag
	
	if(typeof node != 'object') {
		return new RunTextComponent(node)
	}

	if(typeof type === 'string') {
		return new RunDomComponent(node)
	} else {
		return new RunComComponent(node)
	}
}

function RunTextComponent (text) {
	this._currentElement = text
  	this._stringText = '' + text
  	this._hostNode = null
    this._hostParent = null
    this._domID = 0
    this._mountIndex = 0
}

RunTextComponent.prototype.mountComponent = function(hostParent) {
	this._hostParent = hostParent
	let lazyTree = DOMTree(document.createDocumentFragment())
	let hostNode = this._hostNode = document.createTextNode(this._stringText)
	DOMTree.queueChild(lazyTree, DOMTree(hostNode))
	return lazyTree
}

RunTextComponent.prototype.receiveComponent = function(nextText) {
	if (nextText !== this._currentElement) {
      this._currentElement = nextText;
      var nextStringText = '' + nextText;
      if (nextStringText !== this._stringText) {
        this._stringText = nextStringText;
        var commentNodes = this._hostNode
        if(commentNodes.nodeType === 3) {
        	commentNodes.nodeValue = nextText
        	return 
        }
        commentNodes.textContent = nextText
      }
    }
}
RunTextComponent.prototype.unmountComponent = function() {
	if(this._hostNode && this._hostNode[internalInstanceKey]) {
		 delete node[internalInstanceKey]
	}
	this._hostNode = null
}

function RunComponent() {
	this.state = null 
	this.props = null
}

RunComponent.prototype.setState = function(state, cb) {
	const internalInstance = this._runInternalInstance
	const queue = internalInstance._stateQueue || (internalInstance._stateQueue = [])
	queue.push(state)
	RunUpdate.enqueueUpdate(internalInstance, cb)
}

function click() {
	console.log(1)
}

function click1() {
	console.log(2)
}

function change(e) {
	console.log(e.target.value)
}

const rc = RunElement.createElement

function Header(props) {
	return rc('div', {class: 'header'}, 'header'+props.name)
}

function Content() {
	RunComponent.call(this)
	this.state = {
		name: 'bbb'
	}
}
Content.isComponent = true

Content.prototype = RunComponent.prototype
Content.prototype.constructor = Content
Content.prototype.componentWillMount = function() {
	console.log('componentWillMount')
}
Content.prototype.click = function() {
	this.setState({
		name: 'cxh'
	})
}
Content.prototype.render = function() {
	const me = this
	return rc('div', {class: 'cont'}, [
			rc('div', {class: 'show'}, me.state.name),
			rc('a', {class: 'a', href: 'javascript:void(0)', onClick: me.click.bind(me)}, '点我切换')
		]) 
}

Content.prototype.componentDidMount = function() {
	console.log('componentDidMount')
}

let vnode = rc('div', {class: 'home', onClick: click}, 
				rc('div', {class: 'son'}, [
					rc('div', {class: 's1', onClick: click1}, '123'),
					rc('div', {class: 's2'}, '456'),
					rc(Header, {name: 'cxh'}, null),
					rc('div', {class: 's2'}, '789'),
					rc(Content, {name: 'cxh'}, null),
					rc('input', {class: 's3', type: 'text', onChange: change}, null)
				])
			)

Run.render(vnode, document.getElementById('app'))

