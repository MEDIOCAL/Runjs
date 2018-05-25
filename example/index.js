let keyId = 0
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
		console.log(vnodeTree)
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

var internalInstanceKey = '__reactInternalInstance$' + Math.random().toString(36).slice(2)

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
		let mountImages = []

		if(children === null) {
			return null 
		}

		let childInstances = {}

		if(Array.isArray(children)) {
			for(let child of children) {

				let key = child.props.key === undefined ? ++keyId : child.props.key
				childInstances[key] = instanceComponent(child)
			}

		} else {
			childInstances[this.tag] = instanceComponent(children)
		}
		
		this._renderedChildren = childInstances

		for(let name in childInstances) {
			if(childInstances.hasOwnProperty(name)) {
				let child = childInstances[name]
				let mountImage = child
				if(child.mountComponent) {
					mountImage = child.mountComponent(this._hostNode)
				}
				mountImages.push(mountImage)
			}
		}

		for(let mountImage of mountImages) {
			DOMTree.queueChild(domTree, mountImage)
		}

		return mountImages
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
	}
}

function RunComComponent(node) {

}

function instanceComponent(node) {
	const type = node.tag
	
	if(typeof node != 'object') {
		return RunTextComponent(node)
	}

	if(typeof type === 'string') {
		return new RunDomComponent(node)
	} else {
		return new RunComComponent(node)
	}
}

function RunTextComponent (text) {
	return document.createTextNode(text)
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

let vnode = rc('div', {class: 'home', onClick: click}, 
				rc('div', {class: 'son'}, [
					rc('div', {class: 's1', onClick: click1}, '123'),
					rc('div', {class: 's2'}, '456'),
					rc('input', {class: 's3', type: 'text', onChange: change}, null)
				])
			)

Run.render(vnode, document.getElementById('app'))