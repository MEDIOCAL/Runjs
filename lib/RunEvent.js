var internalInstanceKey = '__runInternalInstance$' + Math.random().toString(36).slice(2)

export const eventTypes = [
	'onClick',
	'onDbClick',
	'onChange',
	'onInput'
]

let RunEvent = {
	eventType: {
		'onClick': 'click',
		'onChange': 'change'
	},
	eventQueue: {},
	listenType: [],
	listenEvents: [],
	getEventType(type) {
		return this.eventQueue[type]
	},
	putListener(type, component, cb) {
		if( RunEvent.eventQueue[type] === undefined ) {
			RunEvent.eventQueue[type] = {}
		}
		RunEvent.eventQueue[type][component.domId] = cb
		component._hostNode[internalInstanceKey] = component
	},
	updateListener(type, component, cb) {
		if( RunEvent.eventQueue[type] === undefined ) {
			throw new Error('eventQueue is undefined')
		}
		RunEvent.eventQueue[type][component.domId] = cb
	},
	deleteListener(type, component, cb) {
		if( RunEvent.eventQueue[type] === undefined ) {
			throw new Error('eventQueue is undefined')
		}
		RunEvent.eventQueue[type][component.domId] = []
		delete RunEvent.eventQueue[type][component.domId]
	},
	dispatchEvent(type) {
		let events = RunEvent.getEventType(type)
		let components = []
		return function(e) {
			components = []
			let target = e.target
			if(target.nodeType === 9) {
				return 
			}
			if(target.nodeType === 3) {
				target = target.parentNode
			}

			while(target.nodeType != 9) {
				if(target[internalInstanceKey]) {
					components.push(target[internalInstanceKey].domId)
				}
				target = target.parentNode
			}

			for(let domId of components) {
				if(events && events.hasOwnProperty(domId)) {
					let evt = events[domId]
					evt(e)
				}
			}
			
		}
	},
	eventListener(eventType, callback) {
		eventType = RunEvent.eventType[eventType]
		if(RunEvent.listenType.indexOf(eventType) >= 0) {
			return 
		}
		RunEvent.listenType.push(eventType)
		if(document.addEventListener) {
			document.addEventListener(eventType, callback, false)
			return function () {
		          document.removeEventListener(eventType, callback, false);
		    }
		} else if (document.attachEvent) {
	      document.attachEvent('on' + eventType, callback);
	      return function () {
	          document.detachEvent('on' + eventType, callback);
	      }
	    }
	},
	listenTo(prop) {
		const removeEvent = RunEvent.eventListener(prop, RunEvent.dispatchEvent(prop))
		RunEvent.listenEvents.push(removeEvent)
	},
	removeEvent(component) {
		const domId = component.domId
		for(let type in RunEvent.eventQueue) {
			if(RunEvent.eventQueue.hasOwnProperty(type)) {
				if(RunEvent.eventQueue[type][domId]) {
					delete RunEvent.eventQueue[type][domId]
				}
			}
		}
	}
}

export default RunEvent