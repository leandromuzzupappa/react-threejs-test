export default /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec3 color = uColor;
    float opacity = uOpacity;

    gl_FragColor = vec4(color, opacity);
  }
`;
