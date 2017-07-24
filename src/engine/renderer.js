function Renderer(gl, assetPool) {
	this.gl = gl;

	if (!this.gl) {
		throw new Error("WebGL not available");
	}

	this.assetPool = assetPool;
}

Renderer.prototype.renderWorldObject = function(renderable) {
	var model = this.assetPool.getAsset(renderable.model);
	var program = this.assetPool.getAsset(renderable.shaderProgram);

	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.enable(this.gl.DEPTH_TEST);

	this.gl.useProgram(program.program);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.vertexBuffer);
	var size = 3;
	var type = this.gl.FLOAT;
	var normalize = false;
	var stride = 0;
	var offset = 0;
	this.gl.enableVertexAttribArray(program.attributes.position);
	this.gl.vertexAttribPointer(
		program.attributes.position, size, type, normalize, stride, offset);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.colorBuffer);
	size = 3;
	type = this.gl.UNSIGNED_BYTE;
	normalize = true;
	stride = 0;
	offset = 0;
	this.gl.enableVertexAttribArray(program.attributes.colorMap);
	this.gl.vertexAttribPointer(
		program.attributes.colorMap, size, type, normalize, stride, offset);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.uvBuffer);
	size = 2;
	type = this.gl.FLOAT;
	normalize = false;
	stride = 0;
	offset = 0;
	this.gl.enableVertexAttribArray(program.attributes.uvMap);
	this.gl.vertexAttribPointer(
		program.attributes.uvMap, size, type, normalize, stride, offset);

	this.gl.uniform1i(program.attributes.texture, 0);

	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
	this.gl.uniformMatrix3fv(program.attributes.transform, false, renderable.transform);

	// Draw the cube.
	var primitiveType = this.gl.TRIANGLES;
	offset = 0;
	var indexType = this.gl.UNSIGNED_SHORT;
	var count = model.count;
	this.gl.drawElements(primitiveType, count, indexType, offset);
};

module.exports = {
	Renderer: Renderer
};