export default /* glsl */ `
  uniform sampler2D uTexture;  

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec3 texture = texture2D(uTexture, uv).rgb;
    vec3 color = vec3(uv.x, uv.y, .0);

    float opacity = 1.;

    gl_FragColor = vec4(texture, opacity);
  }
`;
