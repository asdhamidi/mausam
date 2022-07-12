import { capitalize, convertCtoF } from "./helper";
import { UI } from "./load";
import { fromUnixTime, formatDistanceToNow, format } from "date-fns";

let updater = (() => {
  // Current Unit Being Used: M = Metric, I = Imperial
  let unit = "M";

  // Holds current Metric & Imperial to be used whenever needed.
  let tempData = {
    tempC: 0,
    windC: 0,
    tempF: 0,
    windF: 0,
    flC: 0,
    flF: 0,
  };

  // Reads the searched city name and sends for updation of data. Endpoint of the IIFE.
  function update() {
    let city = document.querySelector(".searchBar INPUT").value.trim();

    if (city != "") updateInfo(city);
    else clearInput();
  }

  // Fetches data from API and passes for DOM updation.
  async function updateInfo(city = "Delhi") {
    try {
      loadingScreen();

      let info = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=887b83447da3759e9723b1883c80c7bc&units=metric`,
        { mode: "cors" }
      );
      let infoData = await info.json();
      putInfo(infoData);
    } catch (err) {
      alert("Invalid City");
    } finally {
      clearInput();
      UI.closeSearchBar();
    }
  }

  // Updates DOM values from the JSON received.
  function putInfo(data) {
    try {
      document.querySelector(".cityName").textContent = data.name;

      let d = fromUnixTime(data.dt);
      document.querySelector(".date").textContent = format(d, "MMMM Lo, y");
      document.querySelector(".time").textContent =
        "Last Updated: " + formatDistanceToNow(d) + " ago";

      document.querySelector(".desc").textContent = capitalize(
        data.weather[0].description
      );

      // Using the icon provided by the API website from the code in the JSON.
      document.querySelector(
        ".tempIcon"
      ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      // Storing both Metric & Imperial data, to avoid calling utility functions again and again.
      tempData.tempC = Math.round(data.main.temp);
      tempData.tempF = Math.round(convertCtoF(data.main.temp));
      tempData.windC = parseFloat(data.wind.speed).toFixed(1);
      tempData.windF = parseFloat(tempData.windC / 1.6).toFixed(1);
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
    } catch (err) {
      alert("Invalid City.");
      updateInfo("Delhi");
    }
  }

  // Changing the background color as per the current city temperature.
  function changeBG(temp) {
    let body = document.querySelector("body");
    if (temp < 10) body.style.background = "var(--icy)";
    else if (temp >= 10 && temp <= 30) body.style.background = "var(--cool)";
    else body.style.background = "var(--hot)";
  }

  // Writes Loading... into various divs while data is being fetched.
  function loadingScreen() {
    let fields = [
      ".cityName",
      ".date",
      ".time",
      ".desc",
      ".tempText",
      ".windText",
      ".feelsLikeText",
      ".humidityText",
    ];

    fields.forEach((field) => {
      document.querySelector(field).textContent = "Loading...";
    });
  }

  // Utility Functions.
  function changeUnit() {
    if (unit == "M") unit = "I";
    else unit = "M";
  }

  function getUnit() {
    return unit;
  }

  function clearInput() {
    document.querySelector(".searchBar INPUT").value = "";
  }

  return {
    update,
    changeUnit,
    getUnit,
    tempData,
  };
})();

export { updater };
