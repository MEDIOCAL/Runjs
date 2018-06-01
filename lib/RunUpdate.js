import RunBatchingStrategy from './RunBatchingStrategy'

function enqueueUpdate(internalInstance, cb) {
	if( !RunBatchingStrategy.isBatchingUpdates ) {
		RunBatchingStrategy.batchedUpdates(enqueueUpdate, internalInstance)
		return 
	}
	RunBatchingStrategy.dirtyComponents.push(internalInstance)
}

const RunUpdate = {
	enqueueUpdate: enqueueUpdate
}

export default RunUpdate