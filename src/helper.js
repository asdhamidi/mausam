export { convertCtoF, capitalize, convert };
import { updater } from "./update";

// Unit Conversion Utility Functions.
function convertCtoF(C) {
  return (C * 9) / 5 + 32;
}

function convertFtoC(F) {
  return (5 / 9) * (F - 32);
}

// Capitalizes the first letter of each word.
function capitalize(S) {
  let res = S[0].toUpperCase();
  let i = 1;
  while (i < S.length) {
    if (S[i] == " " && i + 1 < S.length) {
      res += " " + S[i + 1].toUpperCase();
      i += 2;
    } else {
      res += S[i];
      i++;
    }
  }

  return res;
}

// Converts the text of DOM objects when unit conversion is required.
function convert() {
  if (updater.getUnit() === "M") {
    document.querySelector(".tempText").textContent =
      updater.tempData.tempF + "° F";
    document.querySelector(".windText").textContent =
      updater.tempData.windF + " Mph";
    document.querySelector(".feelsLikeText").textContent =
      updater.tempData.flF + "° F";
  } else {
    document.querySelector(".tempText").textContent =
      updater.tempData.tempC + "° C";
    document.querySelector(".windText").textContent =
      updater.tempData.windC + " KMh";
    document.querySelector(".feelsLikeText").textContent =
      updater.tempData.flC + "° C";
  }
  updater.changeUnit();
}
