export const flattenObject = (
  objectToFlatten: Record<string, unknown>,
  prefix: string = "",
  result: Record<string, unknown> = {}
): Record<string, unknown> => {
  // Preserve empty objects and arrays, they are lost otherwise
  if (
    prefix &&
    typeof objectToFlatten === "object" &&
    objectToFlatten !== null &&
    Object.keys(objectToFlatten).length === 0
  ) {
    result[prefix] = Array.isArray(objectToFlatten) ? [] : {};
    return result;
  }

  prefix = prefix.length > 0 ? prefix + "." : "";

  for (const i in objectToFlatten) {
    if (Object.prototype.hasOwnProperty.call(objectToFlatten, i)) {
      // Only recurse on true objects and arrays, ignore custom classes like dates
      if (
        typeof objectToFlatten[i] === "object" &&
        (Array.isArray(objectToFlatten[i]) ||
          Object.prototype.toString.call(objectToFlatten[i]) === "[object Object]") &&
        objectToFlatten[i] !== null
      ) {
        // Recursion on deeper objects
        flattenObject(objectToFlatten[i] as Record<string, unknown>, prefix + i, result);
      } else {
        result[prefix + i] = objectToFlatten[i];
      }
    }
  }
  return result;
};
