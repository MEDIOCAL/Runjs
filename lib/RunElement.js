const RunElement = {
	createElement(tag, props, children) {
		props.children = children
		return {
			tag,
			props
		}
	}
}

export default RunElement