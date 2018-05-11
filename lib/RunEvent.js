const RunEvent = {
	eventListener(inst, type, callback) {
		if(!inst.queueEvent[type]) {
			inst.queueEvent[type] = []
		}
		inst.queueEvent[type].push(callback)
	},
	eventEmit(node, inst, type) {
		const cb = (e) => {
			if(inst.queueEvent[type]) {
				for(let event of inst.queueEvent[type]) {
					event(e)
				}
			}
		}
		node.addEventListener(type, cb)
	},
	eventTypes: ['onClick', 'onDbClick', 'onMourseEnter', 'onMouseLeave', 'onInput', 'onChange']
}

export default RunEvent