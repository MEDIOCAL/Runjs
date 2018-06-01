import instanceComponent from '../lib/instanceComponent'

const Run = {
	render(vNoideTree, ele) {
		const instance = instanceComponent(vNoideTree)
		const vnodeTree = instance.mountComponent(ele)
		ele.appendChild(vnodeTree.node)
	}
}

export default Run