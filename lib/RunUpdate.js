import RunBatchingStrategy from './RunBatchingStrategy'

console.log(RunBatchingStrategy)
let dirtyComponents = RunBatchingStrategy.dirtyComponents

function enqueueUpdate(component) {
	if( !RunBatchingStrategy.isBatchingUpdates ) {
		RunBatchingStrategy.batchedUpdates(enqueueUpdate, component)
		return 
	}
	dirtyComponents.push(component)
}

const RunUpdate = {
	enqueueUpdate: enqueueUpdate
}
export default RunUpdate