function ModelLoader(props) {
	this.assetPool = props.assetPool;
	this.gl = props.gl;
}

ModelLoader.prototype.loadModel = function(model) {
	var vertexBuffer = this.gl.createBuffer();
	var indexBuffer = this.gl.createBuffer();
	var uvBuffer = this.gl.createBuffer();
	var colorBuffer = this.gl.createBuffer();

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(model.vertices), this.gl.STATIC_DRAW);

	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), this.gl.STATIC_DRAW);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, uvBuffer);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(model.uvMap), this.gl.STATIC_DRAW);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(model.colors), this.gl.STATIC_DRAW);

	var assetHandle = this.assetPool.saveAsset({
		vertexBuffer: vertexBuffer,
		indexBuffer: indexBuffer,
		uvBuffer: uvBuffer,
		colorBuffer: colorBuffer,
		count: model.indices.length
	});

	return Promise.resolve(assetHandle);
};

module.exports = {
	ModelLoader: ModelLoader
};