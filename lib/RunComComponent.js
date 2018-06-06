import instanceComponent from './instanceComponent'
import Runtransaction from './Runtransaction'

let componentId = 1

export default class RunComComponent {
	constructor(node) {
		this._componentId = componentId++
		this._currentElement = node
		this._hostParent = null
		this.element = null
		this.inst = null
		this._renderedComponent = null
		this._paddingElement = null
	}

	mountComponent(hostParent) {
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
	}

	_processPendingState() {
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
	}

	performUpdate() {
		if(this._paddingElement !== null) {
			this.receiveComponent(this._pendingElement)
		} else {
			// setState更新
			this.updateComponent(this._currentElement, this._currentElement)
		}
	}

	receiveComponent() {}

	updateComponent(prevParentElement, nextParentElement) {
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
	}

	_performComponentUpdate(nextElement, nextProps, nextState) {
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
	    Runtransaction.closer()
	}

	_updateRenderComponent() {
		const inst = this.inst
		const prevComponentInstance = this._renderedComponent
		const prevRenderedElement = prevComponentInstance._currentElement
		const nextRenderedElement = inst.render()
		this.element = nextRenderedElement
		prevComponentInstance.receiveComponent(nextRenderedElement)
	}

	attachRef(ref, component) {
		let inst = this.getPublicInstance()
		let publicComponentInstance = component._hostNode

		let refs = inst.refs || {}
		refs[ref] = publicComponentInstance
	}
	
	detachRef(ref) {
	    let refs = this.getPublicInstance().refs
	    delete refs[ref]
	}

	getPublicInstance() {
		return this.inst
	}
}
