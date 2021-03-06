function createProgram(gl, vertexShader, fragmentShader) {
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (success) {
		return program;
	}

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}

function ProgramLoader(props) {
	this.assetPool = props.assetPool;
	this.gl = props.gl;
}

ProgramLoader.prototype.loadProgram = function(vertexShaderHandle, fragmentShaderHandle) {
	var vertexShader = this.assetPool.getAsset(vertexShaderHandle);
	var fragmentShader = this.assetPool.getAsset(fragmentShaderHandle);

	var program = createProgram(this.gl, vertexShader, fragmentShader);

	var attributes = {
		position: this.gl.getAttribLocation(program, "position"),
		transform: this.gl.getUniformLocation(program, "transform"),
		texture: this.gl.getUniformLocation(program, "texture"),
		colorMap: this.gl.getAttribLocation(program, "color_map"),
		uvMap: this.gl.getAttribLocation(program, "uv_map")
	};

	var assetHandle = this.assetPool.saveAsset({
		program: program,
		attributes: attributes
	});

	return Promise.resolve(assetHandle);
};

module.exports = {
	ProgramLoader: ProgramLoader
};