export default shouldUpdateRunComponent(prevRenderedElement, nextRenderedElement) {
	return prevRenderedElement.type === nextRenderedElement.type
}