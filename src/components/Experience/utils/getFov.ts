export const getFov = (height: number, positionZ: number) => {
  return 2 * Math.atan(height / 2 / positionZ) * (180 / Math.PI);
};
