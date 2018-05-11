import RunUpdateQueue from './RunUpdateQueue'

function RunComponent(props) {
	this.props = props
	this.refs = {}
	this.updater = RunUpdateQueue
}
RunComponent.prototype.isComponent = {}

RunComponent.prototype.setState = function(state) {
	this.updater.enqueueSetState(this, state)
}

export default RunComponent