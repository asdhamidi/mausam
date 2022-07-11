import { capitalize, convertCtoF } from "./helper";
import { UI } from "./loader";

let tempData = {
  tempC: 0,
  windC: 0,
  tempF: 0,
  windF: 0,
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
      const info = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=887b83447da3759e9723b1883c80c7bc&units=metric`,
        { mode: "cors" }
      );
      const infoData = info.json();
      infoData.then(putInformation);
    } catch {
    } finally {
      clearInput();
      UI.closeSearchBar();
    }
  }

  function putInformation(data) {
    try {
      document.querySelector(".cityName").textContent = data.name;

      let d = new Date(data.dt * 1000);
      document.querySelector(".time").textContent = d.toLocaleTimeString();
      document.querySelector(".date").textContent = d.toDateString();

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

      if (unit == "M") {
        document.querySelector(".tempText").textContent =
          tempData.tempC + "° C";
        document.querySelector(".windText").textContent =
          tempData.windC + " KMh";
      } else {
        document.querySelector(".tempText").textContent =
          tempData.tempF + "° F";
        document.querySelector(".windText").textContent =
          tempData.windF + " Mph";
      }

      document.querySelector(".humidityText").textContent =
        data.main.humidity + "%";
    } catch {
      window.alert("Invalid Location");
      getInformation("Delhi");
    }
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
