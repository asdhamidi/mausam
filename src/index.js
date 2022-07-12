import { UI } from "./load";
import { updater } from "./update";
import "./style.css";

UI.load();

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") updater.update();
});
