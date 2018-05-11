import instanceComponent from './instanceComponent'
import RunConfig from './RunConfig'

function render(vdom, dom) {
	RunConfig.initialize()
	const instance = instanceComponent(vdom)
	RunConfig.closer()
}

const RunMount = {
	render: render
}

export default RunMount