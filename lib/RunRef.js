function attachRef(ref, instance, owner) {
	if (typeof ref === 'function') {
	    ref(instance._hostNode)
	} else {
	   owner.attachRef(ref, instance)
	}
}

function detachRef(ref, instance, owner) {
	if (typeof ref === 'function') {
	    ref(null)
	} else {
	    owner.detachRef(ref, instance)
	  }
}

const RunRef = {
	attachRefs: function(instance, element) {
		if (element === null || typeof element !== 'object') {
		    return;
		}
		const ref = element.props.ref

		if (ref != null) {
		    attachRef(ref, instance, element._owner);
		}
	},
	detachRefs: function(instance, element) {
		if (element === null || typeof element !== 'object') {
		    return;
		}
		var ref = element.ref
		if (ref != null) {
		    detachRef(ref, instance, element._owner)
		}
	}
}

export default RunRef 