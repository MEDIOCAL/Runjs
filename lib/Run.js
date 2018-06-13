import instanceComponent from './instanceComponent'
import Transaction from './transaction'
import Runtransaction from './Runtransaction'

const Run = {
	render(vNoideTree, ele) {
		// const transaction = new Transaction([Runtransaction])
		const instance = instanceComponent(vNoideTree)
		const vnodeTree = instance.mountComponent(ele)
		ele.appendChild(vnodeTree.node)
	}
}

export default Run