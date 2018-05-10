function RunElement(tag, props) {
	return {
		tag,
		props
	}
}

function createElement(tag, config, children) {
	let props = {} 

	if(config) {
		for(let propName in config) {
			if(config.hasOwnProperty(propName)) {
				props[propName] = config[propName]
			}
		}
	}

	props.children = children 

	if (tag && tag.defaultProps ) {
		let defaultProps = tag.defaultProps
		for (let propName in defaultProps) {
			if(defaultProps.hasOwnProperty(propName)) {
				props[propName] = defaultProps[propName]
			}
		}
	}

	return RunElement(tag, props) 
}

const RunElement = {
	createElement: createElement
}

export default RunElement