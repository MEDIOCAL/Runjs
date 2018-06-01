function DOMTree(node) {
	return {
		node: node,
		instance: null
	}
}

DOMTree.queueChild = function(parentTree, childTree) {
	let child = childTree.node === undefined ? childTree : childTree.node
	parentTree.node.appendChild(child)
}


export default DOMTree