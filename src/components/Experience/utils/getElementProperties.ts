const fontMap = {
  Montreal1: "/fonts/PPNeueMontreal-Variable.ttf",
  Montreal:
    "https://rawcdn.githack.com/google/fonts/3b179b729ac3306ab2a249d848d94ff08b90a0af/apache/robotoslab/static/RobotoSlab-Black.ttf",
};

export const getElementProperties = (element: HTMLElement) => {
  const { backgroundColor, color, fontFamily, fontSize } =
    getComputedStyle(element);

  const isTransparent = element.dataset.glTransparent === "true";

  const normalizedFontFamily = fontFamily
    .replace(/['"]/g, "")
    .split(",")[0]
    .trim();

  console.log("Lenny FF", normalizedFontFamily);

  return {
    backgroundColor,
    color,
    fontFamily:
      fontMap[normalizedFontFamily as keyof typeof fontMap] ||
      normalizedFontFamily,
    fontSize: parseFloat(fontSize),
    isTransparent,
  };
};
