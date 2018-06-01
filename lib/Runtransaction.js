import RunBatchingStrategy from './RunBatchingStrategy'

const Runtransaction = {
	initialize() {
		RunBatchingStrategy.isBatchingUpdates = true
	},
	closer() {
		RunBatchingStrategy.isBatchingUpdates = false
	}
}

export default Runtransaction