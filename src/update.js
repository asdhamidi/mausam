import { capitalize, convertCtoF } from "./helper";
import { UI } from "./load";
import { fromUnixTime, formatDistanceToNow, format } from "date-fns";

let tempData = {
  tempC: 0,
  windC: 0,
  tempF: 0,
  windF: 0,
  flC: 0,
  flF: 0,
};

let updater = (() => {
  let unit = "M";
  function update() {
    let city = document.querySelector(".searchBar INPUT").value.trim();

    if (city != "") getInformation(city);
    else clearInput();
  }

  async function getInformation(city = "Delhi") {
    try {
      let info = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=887b83447da3759e9723b1883c80c7bc&units=metric`,
        { mode: "cors" }
      );
      let infoData = await info.json();
      putInformation(infoData);
    } catch (err) {
      alert("Invalid City");
    } finally {
      clearInput();
      UI.closeSearchBar();
    }
  }

  function putInformation(data) {
    try {
      console.log(data);
      document.querySelector(".cityName").textContent = data.name;

      let d = fromUnixTime(data.dt);
      document.querySelector(".date").textContent = format(d, "MMMM Lo, y");
      document.querySelector(".time").textContent =
        formatDistanceToNow(d) + " ago";

      document.querySelector(".desc").textContent = capitalize(
        data.weather[0].description
      );

      document.querySelector(
        ".tempIcon"
      ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      tempData.tempC = Math.round(data.main.temp);
      tempData.tempF = Math.round(convertCtoF(data.main.temp));
      tempData.windC = Math.round(data.wind.speed);
      tempData.windF = Math.round(tempData.windC / 1.6);
      tempData.flC = Math.round(data.main.feels_like);
      tempData.flF = Math.round(convertCtoF(tempData.flC));

      if (unit == "M") {
        document.querySelector(".tempText").textContent =
          tempData.tempC + "° C";
        document.querySelector(".windText").textContent =
          tempData.windC + " KMh";
        document.querySelector(".feelsLikeText").textContent =
          tempData.flC + "° C";
      } else {
        document.querySelector(".tempText").textContent =
          tempData.tempF + "° F";
        document.querySelector(".windText").textContent =
          tempData.windF + " Mph";
        document.querySelector(".feelsLikeText").textContent =
          tempData.flF + "° F";
      }

      document.querySelector(".humidityText").textContent =
        data.main.humidity + "%";

      changeBG(tempData.tempC);
    } catch {
      alert("Invalid City.");
      getInformation("Delhi");
    }
  }
  function changeBG(temp) {
    let body = document.querySelector("body");
    if (temp < 10) body.style.background = "var(--icy)";
    else if (temp >= 10 && temp <= 30) body.style.background = "var(--cool)";
    else body.style.background = "var(--hot)";
  }

  function clearInput() {
    document.querySelector(".searchBar INPUT").value = "";
  }

  function changeUnit() {
    if (this.unit == "M") this.unit = "I";
    else this.unit = "M";
  }

  return {
    update,
    changeUnit,
    unit,
  };
})();

export { updater, tempData };
