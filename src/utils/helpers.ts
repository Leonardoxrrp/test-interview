export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    return str.charAt(0) + str.slice(1).toLocaleLowerCase();
  };