export default class Transaction {
	constructor(transactionWrapper) {
		this.transactionWrappers = transactionWrapper
		if(this.wrapperInitData) {
			this.wrapperInitData.length = 0
		} else {
			this.wrapperInitData = []
		}
		this._isInTransaction = false
		this.wrapperInitData = []
	}
	perform() {
		let method = arguments[0]
		let scope = arguments[1]
		let rest = arguments.slice(2, arguments.length)

		if(typeof method != 'function') {
			throw new Error('method is not a function')
		}

		try {
			this._isInTransaction = true
			this.initializeAll()
			method.call(scope, rest)
		} finally {
			try {
				this.closeAll()
			} finally {
				this._isInTransaction = false
			}
		}
	}
	initializeAll() {
		let transactionWrappers = this.transactionWrappers
		for(let i = 0,l = transactionWrappers.length; i < l; i++) {
			const wraper = transactionWrappers[i]
			if(wraper.initialize) {
				this.wrapperInitData[i] = wraper.initialize.call(this)
			} else {
				this.wrapperInitData[i] = null
			}
		}
	}
	closeAll() {
		let transactionWrappers = this.transactionWrappers
		for(let i = 0,l = transactionWrappers.length; i < l; i++) {
			const wraper = transactionWrappers[i]
			const initDate = this.wrapperInitData[i]
			if(wraper.close && initData) {
				wraper.close.call(this, initDate)
			}
		}
	}
}