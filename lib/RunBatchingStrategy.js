const RunBatchingStrategy = {
	dirtyComponents: [],
	isBatchingUpdates: false,
	batchedUpdates(callback, component) {
		let alreadyBatchingUpdates = this.isBatchingUpdates
		this.isBatchingUpdates = true

		if (alreadyBatchingUpdates) {
	       return callback(component)
	    } else {
	       this.dirtyComponents.push(component)
	       this.flushBatchedUpdates()
	    }
	},
	flushBatchedUpdates() {
		let dirtyComponents = this.dirtyComponents
		console.log(dirtyComponents)
		while(dirtyComponents.length > 0) {
			const component = dirtyComponents.splice(0, 1)
			component[0].performUpdate()
		}
	}
}

export default RunBatchingStrategy