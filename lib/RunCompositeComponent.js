import instanceComponent from './instanceComponent'
import DOMLazyTree from './DOMLazyTree'

function RunCompositeComponent(vnode) {
	this._currentElement = vnode
	this._instance = null
	this._hostParent = null
	this._renderedComponent = null 
	this._batcheduUdate = null
}

RunCompositeComponent.prototype.mountComponent = function(hostParent) {
	let renderedElement = null
	this._hostParent = hostParent

	const Component = this._currentElement.type
	const doConstruct = shouldConstruct(Component)
	const inst = this._constructComponent(doConstruct, Component)

	inst.props = this._currentElement.props
	inst.refs = {}
	inst.updater = {}

	this._instance = inst

	inst._reactInternalInstance = this
	
	let initialState = inst.state

	if (initialState === undefined) {
      inst.state = initialState = null
    }

    this._pendingStateQueue = null

    let markup = this.performInitialMount(renderedElement, hostParent) 

    return 
}

RunCompositeComponent.prototype._constructComponent = function(doConstruct, Component) {
	if(doConstruct) {
		return new Component()
	}  else {
		return Component()
	}
}

RunCompositeComponent.prototype.performInitialMount = function(renderedElement, hostParent) {
	const inst = this._instance
	
	if(inst.componentWillMount) {
		inst.componentWillMount()
	}

	if (this._pendingStateQueue) {
	    inst.state = this._processPendingState(inst.props, inst.context);
	}

	if (renderedElement === undefined) {
      renderedElement = this._renderComponent();
    }

    const child = instanceComponent(renderedElement)

    this._renderedComponent = child

    const markup = child.mountComponent(hostParent)

    return markup

}

RunCompositeComponent.prototype._renderComponent = function() {
	return this._instance.render()
}

RunCompositeComponent.prototype._processPendingState = function() {
	let inst = this._instance
    let queues = this._pendingStateQueue
    this._pendingStateQueue = null
    
    if (!queues) {
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
}

RunCompositeComponent.prototype.receiveComponent = function(nextElement) {
	const prevElement = this._currentElement
	this._pendingElement = null
	this.updateComponent(prevElement, nextElement)
}

RunCompositeComponent.prototype.updateComponent = function(prevParentElement, nextParentElement) {
	const inst = this._instance
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
}

RunCompositeComponent.prototype._performComponentUpdate = function(nextElement, nextProps, nextState) {
	const inst = this._instance
	const prevState = inst.state 
	const prevProps = inst.prevProps

	if (inst.componentWillUpdate) {
		inst.componentWillUpdate(nextProps, nextState)
	}

	this._currentElement = nextElement
	inst.props = nextProps
    inst.state = nextState
    this.updateRenderComponent()
    if(inst.componentDidUpdate) {
    	inst.componentDidUpdate()
    }
}

RunCompositeComponent.prototype.updateRenderComponent = function() {
	const prevComponentInstance = this._renderedComponent
	const prevRenderedElement = prevComponentInstance._currentElement
	const nextRenderedElement = this._renderComponent()

	if(shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
		prevComponentInstance.receiveComponent(nextRenderedElement)
	} else {
		const oldHostNode = prevComponentInstance._hostNode
		prevComponentInstance.unmountComponent()
		const child = this.instanceComponent(nextRenderedElement)
		this._renderedComponent = child
		const nextMarkup = child.mountComponent(this._hostParent)
		DOMLazyTree.replaceChildWithTree(oldHostNode, nextMarkup)
	}
}

RunCompositeComponent.prototype.performUpdateIfNecessary = function() {
	if (this._pendingElement !== null) {
		this.receiveComponent(this._pendingElement)
	} else {
		this.updateComponent(this._currentElement, this._currentElement)
	}
}

RunCompositeComponent.prototype.unmountComponent = function() {
	
}

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isComponent);
}

export default RunCompositeComponent