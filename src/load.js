import "./style.css";

// All icons used are from https://tablericons.com/
import searchIcon from "./assets/search.svg";
import humid from "./assets/humidity.svg";
import windy from "./assets/wind.svg";
import fl from "./assets/fl.svg";

import { convert } from "./helper";
import { updater } from "./update";

let UI = (() => {
  function load() {
    loadSideBar();
    loadInfoBar();
    // Loading Random Initial Information
    let cities = [
      "Muzaffarpur",
      "Dehradun",
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Shimla",
      "Srinagar",
      "Leh",
      "Port Blair",
    ];
    document.querySelector(".searchBar INPUT").value =
      cities[Math.floor(Math.random() * cities.length)];
    updater.update();
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
    aside.appendChild(cityName);

    loadSearchBar(aside);
  }

  function loadSearchBar(aside) {
    let searchBar = document.createElement("div");
    searchBar.className = "searchBar";

    let searchText = document.createElement("INPUT");
    searchText.setAttribute("type", "text");
    searchText.placeholder = "City Name...";
    searchBar.appendChild(searchText);

    aside.append(searchBar);
  }

  function loadInfoBar() {
    let main = document.querySelector("main");

    let TDInfo = document.createElement("div");
    TDInfo.className = "TDInfo";

    let dateInfo = document.createElement("div");
    dateInfo.className = "date";
    TDInfo.appendChild(dateInfo);

    let timeInfo = document.createElement("div");
    timeInfo.className = "time";
    TDInfo.appendChild(timeInfo);

    main.appendChild(TDInfo);

    let description = document.createElement("div");
    description.className = "desc";

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
    temp.appendChild(tempText);

    let otherInfo = document.createElement("div");
    otherInfo.className = "otherInfo";

    otherInfo.appendChild(createInfoItemLoader("feelsLike", fl, "Feels Like"));
    otherInfo.appendChild(createInfoItemLoader("humidity", humid, "Humidity"));
    otherInfo.appendChild(createInfoItemLoader("wind", windy, "Wind"));

    main.appendChild(description);
    main.appendChild(temp);
    main.appendChild(otherInfo);

    let blur = document.createElement("div");
    blur.className = "blur";
    blur.onclick = closeSearchBar;
    document.querySelector("body").appendChild(blur);

    loadCFButton(main);
  }

  // Creates and returns elements for sections like Humidity, Wind Speed Etc.
  function createInfoItemLoader(name, icon, title) {
    let mainDiv = document.createElement("div");
    mainDiv.className = name;

    let mainDivIcon = new Image();
    mainDivIcon.className = `${name}Icon`;
    mainDivIcon.src = icon;

    let mainDivInfo = document.createElement("div");
    mainDivInfo.className = `${name}Info`;

    let mainDivTitle = document.createElement("div");
    mainDivTitle.className = `${name}Title`;
    mainDivTitle.textContent = title;

    let mainDivText = document.createElement("div");
    mainDivText.className = `${name}Text`;

    mainDivInfo.appendChild(mainDivTitle);
    mainDivInfo.appendChild(mainDivText);

    mainDiv.appendChild(mainDivIcon);
    mainDiv.appendChild(mainDivInfo);

    return mainDiv;
  }

  // Creates the Celsius/Farhenheit toggle button.
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

  // Search Bar Related Utitlity Functions.
  let openSearchBar = () => {
    document.querySelector(".searchBar").classList.add("searchShow");
    document.querySelector(".blur").classList.add("blur-active");
  };

  let closeSearchBar = () => {
    document.querySelector(".searchBar").classList.remove("searchShow");
    document.querySelector(".blur").classList.remove("blur-active");
  };

  let isSearchBarOpen = () =>
    document.querySelector(".searchBar").classList.contains("searchShow");

  return {
    load,
    openSearchBar,
    closeSearchBar,
    isSearchBarOpen,
  };
})();

export { UI };
