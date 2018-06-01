import RunDomComponent from '../lib/RunDomComponent'
import RunComComponent from '../lib/RunComComponent'
import RunTextComponent from '../lib/RunTextComponent'

function instanceComponent(node) {
	const type = node.tag
	
	if(typeof node != 'object') {
		return new RunTextComponent(node)
	}

	if(typeof type === 'string') {
		return new RunDomComponent(node)
	} else {
		return new RunComComponent(node)
	}
}

export default instanceComponent