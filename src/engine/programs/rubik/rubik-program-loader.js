class RubikProgramLoader {
	loadProgram() {
		this.attributes = {
			position: this.gl.getAttribLocation(program, "position"),
			transform: this.gl.getUniformLocation(program, "transform"),
			texture: this.gl.getUniformLocation(program, "texture"),
			colorMap: this.gl.getAttribLocation(program, "color_map"),
			uvMap: this.gl.getAttribLocation(program, "uv_map")
		};
	}

	loadRenderable(rubikRenderable) {

	}
}