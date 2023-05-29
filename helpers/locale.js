import regions from "./regions.json";

function detectLocale(locale) {
  if (locale) {
    if (locale === "ka") {
      return "ka";
    } else {
      return "en";
    }
  } else {
    return "ka";
  }
}

export function getLocaleKeyFromObj(obj, path, locale) {
  if (obj[path] && locale !== "en") {
    return obj[path + "_" + detectLocale(locale)] || obj[path];
  }
  return obj[path];
}

export const getRegionSlug = (locale) => {
  return regions.find((item) => item.slug === locale);
};
