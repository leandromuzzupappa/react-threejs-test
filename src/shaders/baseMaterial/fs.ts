export default /* glsl */ `
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec3 color = uColor;
    float opacity = 1.;

    gl_FragColor = vec4(color, opacity);
  }
`;
