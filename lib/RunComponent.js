import RunUpdate from './RunUpdate'

export default class RunComponent {
	constructor() {
		this.state = null 
		this.props = null
	}

	setState(state, cb) {
		const internalInstance = this._runInternalInstance
		const queue = internalInstance._stateQueue || (internalInstance._stateQueue = [])
		queue.push(state)
		RunUpdate.enqueueUpdate(internalInstance, cb)
	}
}
