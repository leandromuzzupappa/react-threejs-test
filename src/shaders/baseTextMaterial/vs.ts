export default /* glsl */ `
  varying vec2 vUv;

  void main() {
    // projectionMatrix -> it is a matrix that is used to convert the 3D coordinates to 2D coordinates.
    // modelViewMatrix -> it is a matrix that is used to convert the 3D coordinates to 2D coordinates.
    // position -> it is a 3D vector that represents the position of the vertex.
    // gl_Position -> it is a 4D vector that represents the position of the vertex.

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
  }
`;
