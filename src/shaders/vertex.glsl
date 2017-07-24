// an attribute will receive data from a buffer
attribute vec3 position;
attribute vec2 uv_map;
attribute vec3 color_map;

varying vec2 texcoord;
varying vec3 color;

uniform mat3 transform;

// all shaders have a main function
void main() {

  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = vec4(transform * position, 1.0);

  // Pass the color to the fragment shader.
  texcoord = uv_map;
  color = color_map;
}