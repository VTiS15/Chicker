let styling = {
  fontFamily: "Courier New",
  color: "white",
};

export const setStyling = (updatedStyling) => {
  styling = { ...styling, ...updatedStyling };
};

export const getStyling = () => {
  return styling;
};
