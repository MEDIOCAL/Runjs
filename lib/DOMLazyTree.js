function queueChild(parentTree, childTree) {
	parentTree.node.appendChild(childTree.node)
}

function DOMLazyTree(node) {
	return {
	    node: node,
	    children: [],
	    html: null,
	    text: null
	  }
}

function replaceChildWithTree(oldNode, newTree) {
	 oldNode.parentNode.replaceChild(newTree.node, oldNode)
}

DOMLazyTree.queueChild = queueChild

export default DOMLazyTree