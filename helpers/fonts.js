export default function detectFont(locale, upper, exc) {
  if (locale === "en")
    return `${upper ? "uppercase" : "font-normal"} ${
      exc ? "en-Rosario" : "en-Roboto"
    }`;
  else {
    return `${upper ? "ka-caps" : ""} ${exc ? "ka-excelsior" : ""} ${
      !upper && !exc ? "ka" : ""
    }`;
  }
}
