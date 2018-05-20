import RunUpdate from './RunUpdate'

function enqueueUpdate(internalInstance) {
	RunUpdate.enqueueUpdate(internalInstance)
}
const RunUpdateQueue = {
	enqueueSetState: function(inst, completeState) {
		const internalInstance = inst._reactInternalInstance
		const queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = [])
		queue.push(completeState)
		enqueueUpdate(internalInstance)
	}
}

export default RunUpdateQueue