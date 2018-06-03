function insertTreeChildren(tree) {
  var node = tree.node;
  var children = tree.children;
  if (children.length) {
    for (var i = 0; i < children.length; i++) {
      DOMTree.insertTreeBefore(node, children[i], null);
    }
  }
}

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

DOMTree.insertTreeBefore = function(parentNode, tree, referenceNode) {
  	parentNode.insertBefore(tree.node, referenceNode)
  	insertTreeChildren(tree)
}

export default DOMTree