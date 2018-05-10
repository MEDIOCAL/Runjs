import instanceComponent from './instanceComponent'

function render(vdom, dom) {
	const instance = instanceComponent(vdom)
}

const RunMount = {
	render: render
}

export default RunMount