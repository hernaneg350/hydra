precision mediump float;

varying vec2 texcoord;
varying vec3 color;

uniform sampler2D texture;

void main() {
  vec4 tex = texture2D(texture, texcoord);

  gl_FragColor = mix(vec4(color, 1.0), tex, tex.a);
}