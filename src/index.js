/**
 * All icons used are from https://tablericons.com/
 * Highly suggested.
 */

import { UI } from "./load";
import { updater } from "./update";
import "./style.css";

UI.load();

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && UI.isSearchBarOpen) updater.update();
  if (e.key === "Escape") UI.closeSearchBar();
});
