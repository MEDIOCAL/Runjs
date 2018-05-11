import RunUpdate from './RunUpdate'

function batchedUpdates(callback, component) {
	let alreadyBatchingUpdates = RunBatchingStrategy.isBatchingUpdates
	RunBatchingStrategy.isBatchingUpdates = true

	if (alreadyBatchingUpdates) {
      return callback(component)
    }
    flushBatchedUpdates()
}


function flushBatchedUpdates() {
	let dirtyComponents = RunBatchingStrategy.dirtyComponents
	
	while(dirtyComponents.length > 0) {
		const component = dirtyComponents.splice(0, 1)
		component.performUpdateIfNecessary()
	}
}

const RunBatchingStrategy = {
	isBatchingUpdates: false,
	dirtyComponents: [],
	flushBatchedUpdates: flushBatchedUpdates,
	batchedUpdates: batchedUpdates
}

export default RunBatchingStrategy