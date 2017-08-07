class RubikRenderable {
	constructor(props) {
		this.transform = props.transform;
		this.model = props.model;
		this.texture = props.texture;
		this.colorMap = props.colorMap;
	}
}

module.exports.default = RubikRenderable;