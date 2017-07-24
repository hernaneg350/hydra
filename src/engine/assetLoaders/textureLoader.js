function TextureLoader(props) {
	this.gl = props.gl;
	this.assetPool = props.assetPool;
}

TextureLoader.prototype.loadTexture = function(src) {
	var texture = this.gl.createTexture();

	var image = new Image();
	image.crossOrigin = "";
	image.src = src;

	return new Promise((resolve, reject) => {
		var load = () => {
			this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
			this.gl.generateMipmap(this.gl.TEXTURE_2D);

			image.removeEventListener('load', load);

			resolve(this.assetPool.saveAsset(texture));
		}

		image.addEventListener('load', load);
	});
};

module.exports = {
	TextureLoader: TextureLoader
};