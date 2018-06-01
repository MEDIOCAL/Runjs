import instanceComponent from './instanceComponent'
import DOMTree from './DOMTree'
import RunEvent, { eventTypes } from './RunEvent'

let globalIdCounter = 1
const STYLE = 'style'
const CHILDREN = 'children'

function enqueue(queue, update) {
	if (update) {
	    queue = queue || []
	    queue.push(update)
	  }
	  return queue
}

export default class RunDomComponent {
	constructor(node) {
		this._currentElement = node
		this.tag = node.tag
		this._instance = null
		this._hostNode = null
		this._renderedChildren = null
		this._hostParent = null
		this.domId = globalIdCounter++ 
	}

	mountComponent(hostParent) {
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
	}

	initialChildren(children, domTree) {
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
	}

	instantiateChild(children) {
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
	}

	flattenChildren(children) {
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
	}

	updateDOMProperties(lastProps, nextProps) {
		if(nextProps) {
			for(let prop in nextProps) {
				if(nextProps.hasOwnProperty(prop)) {
					if(prop === STYLE) {
						let nextProps = this._previousStyle = nextProps[prop]
						this._hostNode.style = nextProps
					} else if (eventTypes.indexOf(prop) >= 0 ) {
						RunEvent.putListener(prop, this, nextProps[prop])
						RunEvent.listenTo(prop)
					} else if(prop != CHILDREN) {
						this._hostNode.setAttribute(prop, nextProps[prop])
					}
				}
			}
		}
	}

	receiveComponent(nextElement) {
		const prevElement = this._currentElement
		this._currentElement = nextElement
		this.updateComponent(prevElement, nextElement)
	}

	updateComponent(prevElement, nextElement) {
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
	}

	updateChildren(prevChildren, nextChildren, mountImages, removedNodes) {
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
	}

	moveChild(child, afterNode, toIndex, lastIndex) {
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
	}

	unmountComponent() {}
}
