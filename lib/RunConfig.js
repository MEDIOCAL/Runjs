import RunBatchingStrategy from './RunBatchingStrategy'

function initialize() {
	RunBatchingStrategy.isBatchingUpdates = true
}

function closer() {
	RunBatchingStrategy.isBatchingUpdates = false
	RunBatchingStrategy.flushBatchedUpdates()
}

const RunConfig = {
	initialize: initialize,
	closer: closer
}

export default RunConfig