var fragmentShaderSource = require('./shaders/fragment.glsl');
var vertexShaderSource = require('./shaders/vertex.glsl');
var cube = require('./models/cube');
var _3d = require('./engine/3d');
var AssetPool = require('./engine/assetLoaders/assetPool').AssetPool;
var ModelLoader = require('./engine/assetLoaders/modelLoader').ModelLoader;
var ProgramLoader = require('./engine/assetLoaders/programLoader').ProgramLoader;
var ShaderLoader = require('./engine/assetLoaders/shaderLoader').ShaderLoader;
var TextureLoader = require('./engine/assetLoaders/textureLoader').TextureLoader;
var Renderer = require('./engine/renderer').Renderer;
var Renderable = require('./engine/renderable').Renderable;

function initWebGL(canvas) {
	var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

	// If we don't have a GL context, give up now
	if (!gl) {
		alert('Unable to initialize WebGL. Your browser may not support it.');
	}

	return gl;
}

async function start() {
	var canvas = document.getElementById('glCanvas');
	var gl = initWebGL(canvas);

	var assetPool = new AssetPool();
	var modelLoader = new ModelLoader({
		gl: gl,
		assetPool: assetPool
	});
	var shaderLoader = new ShaderLoader({
		gl: gl,
		assetPool: assetPool
	});
	var programLoader = new ProgramLoader({
		gl: gl,
		assetPool: assetPool
	});
	var textureLoader = new TextureLoader({
		gl: gl,
		assetPool: assetPool
	});
	var renderer = new Renderer(gl, assetPool);

	var model = new Renderable({
		transform: _3d.identity(),
		model: await modelLoader.loadModel(Object.assign({
			colors: [
				255, 0, 0,
				255, 0, 0,
				255, 0, 0,
				255, 0, 0,

				0, 0, 0,
				0, 0, 0,
				0, 0, 0,
				0, 0, 0,

				255, 255, 0,
				255, 255, 0,
				255, 255, 0,
				255, 255, 0,

				0, 0, 0,
				0, 0, 0,
				0, 0, 0,
				0, 0, 0,

				0, 0, 255,
				0, 0, 255,
				0, 0, 255,
				0, 0, 255,

				0, 0, 0,
				0, 0, 0,
				0, 0, 0,
				0, 0, 0
			]
		}, cube)),
		shaderProgram: await programLoader.loadProgram(await shaderLoader.loadShader({
			source: vertexShaderSource,
			type: gl.VERTEX_SHADER
		}), await shaderLoader.loadShader({
		source: fragmentShaderSource,
		type: gl.FRAGMENT_SHADER
		})),
		texture: await textureLoader.loadTexture('src/textures/face.png')
	});

	window.requestAnimationFrame(drawScene.bind(null, renderer, model));
}

var timestamp = null;

function updateRotationAngle(cube) {
	var angle = _3d.radians(0);

	if (timestamp != null) {
		var degree = (timestamp / 100) % 360;
		angle = _3d.radians(degree);
	}

	timestamp = new Date().getTime();

	cube.transform = _3d.quaternionRotation(_3d.axis([1, 1, 0]), angle);
}

function drawScene(renderer, model) {
	updateRotationAngle(model);

	renderer.renderWorldObject(model);

	window.requestAnimationFrame(drawScene.bind(this, renderer, model));
}

start();