const RunElement = {
	createElement(tag, props, children, owner) {
		props.children = children
		return {
			tag,
			props,
			_owner: owner
		}
	}
}

export default RunElement