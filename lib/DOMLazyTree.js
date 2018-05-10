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

DOMLazyTree.queueChild = queueChild

export default DOMLazyTree