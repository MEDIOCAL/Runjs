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

function getNodeAfter(parentNode, node) {
  if (Array.isArray(node)) {
    node = node[1];
  }
  return node ? node.nextSibling : parentNode.firstChild;
}


function processQueue(inst, updateQueue) {
  	for(let i = 0; i < updateQueue.length; i++) {
  		let update = updateQueue[i]
  		switch (update.type) {
  			case 'INSERT_MARKUP':
  				DOMTree.insertTreeBefore(node._hostNode, update.content, getNodeAfter(node._hostNode, update.afterNode))
  				break;
  			case 'MOVE_EXISTING':
  				moveChild(inst, update.fromNode, getNodeAfter(inst._hostNode, update.afterNode))
  				break;
  			case 'SET_MARKUP':
  				node._hostNode.innerHTML = update.content
  				break;
  			case 'TEXT_CONTENT':
  				setTextContent(inst, update.content)
  				break;
  			case 'REMOVE_NODE':
  				removeChild(inst, update.fromNode)
  				break;
  		}
  	}
}

function setTextContent(node, text) {
  if (node._hostNode.nodeValue) {
      node._hostNode.nodeValue = text
      return
  }
  node._hostNode.textContent = text
}

function moveChild(parentNode, childNode, referenceNode) {
  if (Array.isArray(childNode)) {
    moveDelimitedText(parentNode, childNode[0], childNode[1], referenceNode)
  } else {
    parentNode.insertBefore(childNode, referenceNode)
  }
}

function moveDelimitedText(parentNode, openingComment, closingComment, referenceNode) {
  var node = openingComment
  while (true) {
    var nextNode = node.nextSibling
    parentNode.insertBefore(node, referenceNode)
    if (node === closingComment) {
      break
    }
    node = nextNode
  }
}


function removeChild(inst, childNode) {
	let parentNode = inst._hostNode
  if (Array.isArray(childNode)) {
    var closingComment = childNode[1]
    childNode = childNode[0]
    removeDelimitedText(parentNode, childNode, closingComment);
    parentNode.removeChild(closingComment)
  }
  parentNode.removeChild(childNode)
}

function removeDelimitedText(parentNode, startNode, closingComment) {
  while (true) {
    var node = startNode.nextSibling
    if (node === closingComment) {
      break;
    } else {
      parentNode.removeChild(node)
    }
  }
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

	updateDOMProperties(lastProps, nextProps, b) {
		if(nextProps) {
			for(let prop in nextProps) {
				let lastProp = lastProps != null ? lastProps[prop] : undefined
				if(nextProps.hasOwnProperty(prop)) {
					if(prop === STYLE) {
						let nextProps = this._previousStyle = nextProps[prop]
						this._hostNode.style = nextProps
					} else if (eventTypes.indexOf(prop) >= 0) {
						if(!lastProp && nextProps[prop]) {
							RunEvent.putListener(prop, this, nextProps[prop])
							RunEvent.listenTo(prop)
						} else if(lastProp && !nextProps[prop]) {
							RunEvent.deleteListener(prop, this, nextProps[prop])
						} else if(nextProps[prop]) {
							RunEvent.updateListener(prop, this, nextProps[prop])
						}                         
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

		this.updateDOMProperties(prevProps, nextProps)
		let nextChildren = nextElement.props.children

		let prevContent = prevElement.props.children
		let nextContent = null

		if(typeof nextChildren === 'string' || typeof nextChildren === 'number') {
			nextChildren = null
			nextContent = nextElement.props.children
		}

		if(nextContent != null) {
			if(prevContent != nextContent) {
				this.updateTextContent('' + nextContent)
			}
			return 
		}

		let prevChildren = this._renderedChildren
		let removedNodes = {}
        let mountImages = []

		nextChildren = this.flattenChildren(nextChildren)

		this.updateChildren(prevChildren, nextChildren, mountImages, removedNodes)

		let updates = null
		let lastIndex = 0
		let nextIndex = 0
		let lastPlacedNode = null
		let nextMountIndex = 0
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
				if (prevChild) {
		            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
		        }
		        updates = enqueue(updates, this._mountChildAtIndex(nextChild, mountImages[nextMountIndex], lastPlacedNode, nextIndex));
		        nextMountIndex++
			}
			nextIndex++
			lastPlacedNode = nextChild._hostNode
		}

		for (name in removedNodes) {
	        if (removedNodes.hasOwnProperty(name)) {
	          updates = enqueue(updates, this._unmountChild(prevChildren[name], removedNodes[name]))
	        }
	    }

	    //批量更新
	    if (updates) {
	        processQueue(this, updates)
	    }
	    this._renderedChildren = nextChildren
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

	_mountChildAtIndex(child, mountImage, afterNode, index) {
		child._mountIndex = index
		this.makeInsertMarkup(child, afterNode, mountImage)
	}
	_unmountChild(child, node) {
		var update = this.removeChild(child, node)
		child._mountIndex = null
		return update
	}

	updateTextContent(nextContent) {
		let prevChildren = this._renderedChildren
		let updates = [this.makeTextContent(nextContent)]
		processQueue(this, updates)
	}

	unmountComponent() {}

	moveChild(child, afterNode, toIndex, lastIndex) {
		console.log(lastIndex)
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

	makeInsertMarkup(child, afterNode, markup) {
		return {
		    type: 'INSERT_MARKUP',
		    content: markup,
		    fromIndex: null,
		    fromNode: null,
		    toIndex: child._mountIndex,
		    afterNode: afterNode
		}
	}

	makeTextContent(textContent) {
		return {
			type: 'TEXT_CONTENT',
		    content: textContent,
		    fromIndex: null,
		    fromNode: null,
		    toIndex: null,
		    afterNode: null
		}
	}

	removeChild(child, node) {
		return {
		    type: 'REMOVE_NODE',
		    content: null,
		    fromIndex: child._mountIndex,
		    fromNode: node,
		    toIndex: null,
		    afterNode: null
		}
	}
}
