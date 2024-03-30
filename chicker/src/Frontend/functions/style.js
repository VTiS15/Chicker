let styling = {
  fontFamily: "Courier New",
  color: "white",
  fontSize: "20px",
};

export const setStyling = (updatedStyling) => {
  styling = { ...styling, ...updatedStyling };
};

export const getStyling = () => {
  return styling;
};
