export const isLinkMeme = (url) => url.includes("?type=meme");

export const getSignature = (input) => {
  if (!input || !input.length) {
    return [];
  }
  const signature = input.replace(/\s/g, "");
  const startIndex = signature.indexOf("(");
  const endIndex = signature.indexOf(")");
  if (startIndex === -1 || endIndex === -1) {
    return [];
  }
  const params = signature.slice(startIndex + 1, endIndex);
  const paramArray = params.split(",");
  return paramArray;
};

export const getFunctionBySignature = (input, calldata) => {
  if (!input || !input.length) {
    return "";
  }
  const signature = input.replace(/\s/g, "");
  const startIndex = signature.indexOf("(");
  const endIndex = signature.indexOf(")");
  if (startIndex === -1 || endIndex === -1) {
    return "";
  }
  const funcName = signature.slice(0, startIndex);
  const parameters =
    calldata &&
    calldata.reduce((param, item, index) => {
      if (index === 0) {
        return `${item}`;
      }
      return `${param}, ${item}`;
    }, "");
  return funcName + "(" + parameters + ")";
};
