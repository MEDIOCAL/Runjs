import DOMLazyTree from './DOMLazyTree'
import instanceComponent from './instanceComponent'
import RunEvent from './RunEvent'

const STYLE = 'style'

function RunDOMComponent(vnode) {
	let tag = vnode.tag
	this._currentElement = vnode
	this.tag = tag.toLowerCase()
	this._instance = null
	this._hostNode = null
	this._renderedChildren = null
	this._hostParent = null 
}

RunDOMComponent.prototype.mountComponent = function(hostParent) {
	this._hostParent = hostParent
	let props = this._currentElement.props
	let mountImage = null 
	let el = null 
	el = document.createElement(this.tag)
	this._hostNode = el
	this.updateDOMProperties(null, props)
	let lazyTree = DOMLazyTree(el)
	this.createInitialChildren(props.children, lazyTree)
	mountImage = lazyTree
	mountImage._instance = this
	return mountImage
}

RunDOMComponent.prototype.updateDOMProperties = function(lastProps, nextProps) {
	if(nextProps) {
		for(let prop in nextProps) {
			if(nextProps.hasOwnProperty(prop)) {
				if(prop === STYLE) {
					let nextProps = this._previousStyle = nextProps[prop]
					this._hostNode.style = nextProps
				} else if(RunEvent.eventTypes.includes(prop)) {
					RunEvent.eventListener(this._instance, prop, nextProps[prop])
					RunEvent.eventEmit(this._hostNode, this._instance, prop)
				} else {
					this._hostNode[prop] = nextProps[props]
				}
			}
		}
	}
}	
	
RunDOMComponent.prototype.createInitialChildren = function (children, lazyTree) {
	let mountImages = this.mountChild(children)

	for(let mountImage of mountImages) {
		DOMLazyTree.queueChild(lazyTree, mountImages[i])
	}
}	
    
RunDOMComponent.prototype.mountChild = function (children) {
	let _mountIndex = 0
	let mountImages = []
	let children = this.initChildren(children)
	this._renderedChildren = children

	for(let name in children) {
		if(children.hasOwnProperty(name)) {
			let child = children[name]
			let mountImage = child.mountComponent(this)
			child._mountIndex = _mountIndex++
			mountImages.push(mountImage)
		}
	}

	return mountImages
}	

RunDOMComponent.prototype.receiveComponent = function (nextElement) {
	const prevElement = this._currentElement
	this._currentElement = nextElement
	this.updateComponent(prevElement, nextElement)
}

RunDOMComponent.prototype.updateComponent = function(prevElement, nextElement) {
	const prevprops = prevElement.props 
	const nextprops = nextElement.props

	this._updateDOMProperties(prevprops, nextprops)
	this._updateDOMChildren(lastProps, nextProps)
}

RunDOMComponent.prototype.initChildren = function(children) {
	if(children === null) {
		return null 
	}

	var childInstances = {}

	if (Array.isArray(children)) {
		for(let child of children) {
			let key = getComponentKey(child)
			childInstances[key] = this.initChild(children)
		}
	} else {
		childInstances[this.tag] = this.initChild(children)
	}
	return childInstances
}	
	
RunDOMComponent.prototype.initChild = function(child) {
	return instanceComponent(child)
}

export default RunDOMComponent