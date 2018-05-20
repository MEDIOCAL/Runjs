import RunElement from '../lib/RunElement'

let createElement = RunElement.createElement
console.log(createElement)

const el = createElement('div', {className: 'nihao'}, [
				createElement('div',{},'123'),
				createElement('div',{},'456')
			])

console.log(el)