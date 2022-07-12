import "./style.css";
import searchIcon from "./assets/search.svg";
import humid from "./assets/humidity.svg";
import windy from "./assets/wind.svg";
import fl from "./assets/fl.svg";
import { convert } from "./helper";

let UI = (() => {
  function load() {
    loadSideBar();
    loadInfoBar();
  }

  function loadSideBar() {
    let aside = document.querySelector("aside");

    let searchButton = new Image();
    searchButton.className = "searchButton";
    searchButton.src = searchIcon;
    searchButton.onclick = openSearchBar;
    aside.appendChild(searchButton);

    let cityName = document.createElement("div");
    cityName.className = "cityName";
    cityName.textContent = "Narnia";
    aside.appendChild(cityName);

    loadSearchBar(aside);
  }

  function loadSearchBar(aside) {
    let searchBar = document.createElement("div");
    searchBar.className = "searchBar";

    let searchText = document.createElement("INPUT");
    searchText.setAttribute("type", "text");
    searchBar.appendChild(searchText);

    aside.append(searchBar);
  }

  function loadInfoBar() {
    let main = document.querySelector("main");

    let TDInfo = document.createElement("div");
    TDInfo.className = "TDInfo";

    let dateInfo = document.createElement("div");
    dateInfo.textContent = "February 31st, 2222";
    dateInfo.className = "date";
    TDInfo.appendChild(dateInfo);

    let timeInfo = document.createElement("div");
    timeInfo.textContent = "5 minutes ago";
    timeInfo.className = "time";
    TDInfo.appendChild(timeInfo);

    main.appendChild(TDInfo);

    let description = document.createElement("div");
    description.className = "desc";
    description.textContent = "Sunny & Magical";

    let weatherInfo = document.createElement("div");
    weatherInfo.className = "weatherInfo";

    let temp = document.createElement("div");
    temp.className = "tempInfo";

    let tempIcon = new Image();
    tempIcon.className = "tempIcon";
    tempIcon.src = "https://openweathermap.org/img/wn/03d@2x.png";
    temp.appendChild(tempIcon);

    let tempText = document.createElement("div");
    tempText.className = "tempText";
    tempText.textContent = "19° C";
    temp.appendChild(tempText);

    let otherInfo = document.createElement("div");
    otherInfo.className = "otherInfo";

    let feelsLike = document.createElement("div");
    feelsLike.className = "feelsLike";

    let feelsLikeIcon = new Image();
    feelsLikeIcon.className = "feelsLikeIcon";
    feelsLikeIcon.src = fl;

    let feelsLikeInfo = document.createElement("div");
    feelsLikeInfo.className = "feelsLikeInfo";

    let feelsLikeTitle = document.createElement("div");
    feelsLikeTitle.textContent = "Feels Like";

    let feelsLikeText = document.createElement("div");
    feelsLikeText.textContent = "24° C";
    feelsLikeText.className = "feelsLikeText";

    feelsLikeInfo.appendChild(feelsLikeTitle);
    feelsLikeInfo.appendChild(feelsLikeText);

    feelsLike.appendChild(feelsLikeIcon);
    feelsLike.appendChild(feelsLikeInfo);
    otherInfo.appendChild(feelsLike);

    let humidity = document.createElement("div");
    humidity.className = "humidity";

    let humidityIcon = new Image();
    humidityIcon.className = "humidityIcon";
    humidityIcon.src = humid;

    let humidityInfo = document.createElement("div");
    humidityInfo.className = "humidityInfo";

    let humidityTitle = document.createElement("div");
    humidityTitle.textContent = "Humidity";

    let humidityText = document.createElement("div");
    humidityText.textContent = "1%";
    humidityText.className = "humidityText";

    humidityInfo.appendChild(humidityTitle);
    humidityInfo.appendChild(humidityText);

    humidity.appendChild(humidityIcon);
    humidity.appendChild(humidityInfo);
    otherInfo.appendChild(humidity);

    let wind = document.createElement("div");
    wind.className = "wind";

    let windIcon = new Image();
    windIcon.className = "windIcon";
    windIcon.src = windy;

    let windInfo = document.createElement("div");
    windInfo.className = "windInfo";

    let windTitle = document.createElement("div");
    windTitle.textContent = "Wind";

    let windText = document.createElement("div");
    windText.textContent = "12 KM/H";
    windText.className = "windText";

    windInfo.appendChild(windTitle);
    windInfo.appendChild(windText);

    wind.appendChild(windIcon);
    wind.appendChild(windInfo);

    otherInfo.appendChild(wind);

    main.appendChild(description);
    main.appendChild(temp);
    main.appendChild(otherInfo);

    let blur = document.createElement("div");
    blur.className = "blur";
    blur.onclick = closeSearchBar;
    document.querySelector("body").appendChild(blur);

    loadCFButton(main);
  }

  function loadCFButton(main) {
    let btn = document.createElement("label");
    btn.className = "switch";

    let btnInp = document.createElement("INPUT");
    btnInp.setAttribute("type", "checkbox");

    let slider = document.createElement("span");
    slider.className = "slider round";
    slider.textContent = "F // C";

    slider.onclick = convert;

    btn.appendChild(btnInp);
    btn.appendChild(slider);
    main.appendChild(btn);
  }

  let openSearchBar = () => {
    document.querySelector(".searchBar").classList.add("searchShow");
    document.querySelector(".blur").classList.add("blur-active");
  };
  let closeSearchBar = () => {
    document.querySelector(".searchBar").classList.remove("searchShow");
    document.querySelector(".blur").classList.remove("blur-active");
  };
  return {
    load,
    openSearchBar,
    closeSearchBar,
  };
})();

export { UI };
