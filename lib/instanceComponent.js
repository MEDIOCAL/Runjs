import RunCompositeComponent from './RunCompositeComponent'
import RunDOMComponent from './RunDOMComponent'

export default function instanceComponent(vnode) {
	if(!vnode) {
		return null 
	}
	if(typeof vnode === 'object') {
		if (typeof vnode.tag === 'string') {
			return new RunDOMComponent(vnode)
		} else if(typeof vnode.tag === 'object') {
			return new RunCompositeComponent(vnode)
		}
	}
}