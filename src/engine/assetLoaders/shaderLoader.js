function createShader(gl, type, source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (success) {
		return shader;
	}

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

function ShaderLoader(props) {
	this.assetPool = props.assetPool;
	this.gl = props.gl;
}

ShaderLoader.prototype.loadShader = function(shader) {
	var shaderAsset = createShader(this.gl, shader.type, shader.source);
	var assetHandle = this.assetPool.saveAsset(shaderAsset);

	return Promise.resolve(assetHandle);
};

module.exports = {
	ShaderLoader: ShaderLoader
};