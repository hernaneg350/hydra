function Renderable(props) {
	this.transform = props.transform;
	this.model = props.model;
	this.texture = props.texture;
	this.colorMap = props.colorMap;
	this.shaderProgram = props.shaderProgram;
}

module.exports = {
	Renderable: Renderable
};