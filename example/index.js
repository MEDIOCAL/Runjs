import Run from '../lib/Run'
import RunElement from '../lib/RunElement'
import RunComponent from '../lib/RunComponent'


function click() {
	console.log(1)
}

function click1() {
	console.log(2)
}

function change(e) {
	console.log(e.target.value)
}

const rc = RunElement.createElement

function Header(props) {
	return rc('div', {class: 'header'}, 'header'+props.name)
}

function Content() {
	RunComponent.call(this)
	this.state = {
		status: true
	}
}
Content.isComponent = true

Content.prototype = RunComponent.prototype
Content.prototype.constructor = Content
Content.prototype.componentWillMount = function() {
	console.log('componentWillMount')
}
Content.prototype.click = function() {
	console.log('change')
	this.setState({
		status: !this.state.status
	})
}
Content.prototype.render = function() {
	const me = this
	return rc('div', {class: 'cont'}, [
			rc('div', {class: 'show'}, me.state.status ? 'bbb' : 'cxh'),
			rc('a', {class: 'a', href: 'javascript:void(0)', onClick: me.click.bind(me)}, '点我切换')
		]) 
}

Content.prototype.componentDidMount = function() {
	console.log('componentDidMount')
}

let vnode = rc('div', {class: 'home', onClick: click}, 
				rc('div', {class: 'son'}, [
					rc('div', {class: 's1', onClick: click1}, '123'),
					rc('div', {class: 's2'}, '456'),
					rc(Header, {name: 'cxh'}, null),
					rc('div', {class: 's2'}, '789'),
					rc(Content, {name: 'cxh'}, null),
					rc('input', {class: 's3', type: 'text', onChange: change}, null)
				])
			)

Run.render(vnode, document.getElementById('app'))

