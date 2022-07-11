export { convertCtoF, capitalize, convert };
import { tempData, updater } from "./update";

function convertCtoF(C) {
  return (C * 9) / 5 + 32;
}

function convertFtoC(F) {
  return (5 / 9) * (F - 32);
}

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

function convert() {
  if (updater.unit == "M") {
    document.querySelector(".tempText").textContent = tempData.tempF + "° F";
    document.querySelector(".windText").textContent = tempData.windF + " Mph";
  } else {
    document.querySelector(".tempText").textContent = tempData.tempC + "° C";
    document.querySelector(".windText").textContent = tempData.windC + " KMh";
  }
  updater.changeUnit();
}
