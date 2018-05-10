import instanceComponent from './instanceComponent'

function RunCompositeComponent(vnode) {
	this._currentElement = vnode
	this._instance = null
	this._hostParent = null
	this._renderedComponent = null 
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

	let initialState = inst.state

	if (initialState === undefined) {
      inst.state = initialState = null
    }

    this._pendingStateQueue = null

    let markup = this.performInitialMount(renderedElement, hostParent) 

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

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isComponent);
}

export default RunCompositeComponent