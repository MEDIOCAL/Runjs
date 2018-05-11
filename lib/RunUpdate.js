import RunBatchingStrategy from './RunBatchingStrategy'

const batchingStrategy = RunBatchingStrategy
const dirtyComponents = batchingStrategy.dirtyComponents

function enqueueUpdate(component) {
	if( !batchingStrategy.isBatchingUpdates ) {
		batchingStrategy.batchedUpdates(enqueueUpdate, component)
		return 
	}
	dirtyComponents.push(component)
}

const RunUpdate = {
	enqueueUpdate: enqueueUpdate
}
export default RunUpdate