export const getElementProperties = (element: HTMLElement) => {
  const { backgroundColor, color, fontFamily, fontSize } =
    getComputedStyle(element);

  const normalizedFontFamily = fontFamily
    .replace(/['"]/g, "")
    .split(",")[0]
    .trim();

  return {
    backgroundColor,
    color,
    fontFamily: normalizedFontFamily,
    fontSize: parseFloat(fontSize),
  };
};
