import DOMTree from './DOMTree'

let internalInstanceKey = '__runInternalInstance$' + Math.random().toString(36).slice(2)

export default  class RunTextComponent {
    constructor(text) {
        this._currentElement = text
        this._stringText = '' + text
        this._hostNode = null
        this._hostParent = null
        this._domID = 0
        this._mountIndex = 0
    }
	  
    mountComponent(hostParent) {
      this._hostParent = hostParent
      let lazyTree = DOMTree(document.createDocumentFragment())
      let hostNode = this._hostNode = document.createTextNode(this._stringText)
      DOMTree.queueChild(lazyTree, DOMTree(hostNode))
      return lazyTree
    }

    receiveComponent(nextText) {
      if (nextText !== this._currentElement) {
          this._currentElement = nextText;
          var nextStringText = '' + nextText;
          if (nextStringText !== this._stringText) {
            this._stringText = nextStringText;
            var commentNodes = this._hostNode
            if(commentNodes.nodeType === 3) {
              commentNodes.nodeValue = nextText
              return 
            }
            commentNodes.textContent = nextText
          }
        }
    }

    unmountComponent() {
      if(this._hostNode && this._hostNode[internalInstanceKey]) {
         delete node[internalInstanceKey]
      }
      this._hostNode = null
    }
}