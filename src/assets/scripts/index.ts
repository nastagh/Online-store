import "../styles/style.scss";
import { SliderInput } from "./classes/SliderInput";
import { products } from "./info-products";
import { ProductCard, ProductData } from "./classes/ProductCard";
import { Basket } from "./classes/Basket";
import { Filter } from "./classes/Filter";
import { Search } from "./classes/Search";
import { Settings } from "./classes/Settings";
import { SelectFilter } from "./classes/SelectFilter";
import { ColorFilter } from "./classes/ColorButtons";
import { PopularFilter } from "./classes/Popular";
import { SizeFilter } from "./classes/Size";

//filter range input
const rangeContainer = document.getElementsByClassName("range-container")[0];

const stockSlider = new SliderInput("StockSlider", {
  name: "Stock",
  min: 1,
  max: 30,
  leftValue: 1,
  rightValue: 30,
  minGap: 1,
  filterFieldName: "stock",
});

const yearsSlider = new SliderInput("YearsSlider", {
  name: "Years",
  min: 2019,
  max: 2022,
  leftValue: 2019,
  rightValue: 2022,
  minGap: 1,
  filterFieldName: "year",
});

//card
const cardContainer = document.getElementsByClassName("container-card")[0];
//Basket
const basket = new Basket(20);
const basketCount = document.getElementsByClassName("only-basket")[0];
basketCount.innerHTML = basket.amount.toString();

//Search

const searchContainer = document.getElementsByClassName(
  "filter-container__search"
)[0];
const searchFilter = new Search("Search");

//settings

const settings = new Settings("Settings");
const settingsContainer = document.getElementsByClassName(
  "filter-container__settings"
)[0];

// Company filter

const companyFilter = new SelectFilter("companyFilter", [
  "All",
  "Ikea",
  "Dunelm",
  "Kartell",
  "Ashley",
]);
const selectContainer = document.getElementsByClassName(
  "filter-container__selector"
)[0];

//color
const colorContainer = document.getElementsByClassName(
  "filter-container__color"
)[0];
const colorFilter = new ColorFilter("colorsFilter", [
  "grey",
  "blue",
  "beige",
  "yellow",
  "white",
  "brown",
  "black",
]);

// Popular
const popularContainer =
  document.getElementsByClassName("popular-container")[0];
const popularFilter = new PopularFilter("popular_filter");

// Size

const sizeFilter = new SizeFilter("Size", ["1-50", "51-100", "101-140"]);
const sizeContainer = document.getElementsByClassName(
  "filter-container__size"
)[0];

const allCards = products.map((el: ProductData) => {
  const newCard = new ProductCard(el);

  if (basket.contains(el.id)) {
    newCard.select();
  }

  newCard.onSelect = (card: ProductData) => {
    if (basket.add(card)) {
      basketCount.innerHTML = basket.amount.toString();
    } else {
      newCard.deselect();
    }
  };

  newCard.onDeselect = (card: ProductData) => {
    basket.remove(card.id);
    basketCount.innerHTML = basket.amount.toString();
  };

  return newCard;
});

const filters: Filter[] = [
  searchFilter,
  popularFilter,
  colorFilter,
  settings,
  sizeFilter,
  companyFilter,
  stockSlider,
  yearsSlider,
];

const appendFilters = {
  [searchFilter.name]: searchContainer.append(searchFilter.html),
  [popularFilter.name]: popularContainer.append(popularFilter.html),
  [colorFilter.name]: colorContainer.append(colorFilter.html),
  [settings.name]: settingsContainer.append(settings.html),
  [sizeFilter.name]: sizeContainer.append(sizeFilter.html),
  [companyFilter.name]: selectContainer.append(companyFilter.html),
  [stockSlider.name]: rangeContainer.append(stockSlider.html),
  [yearsSlider.name]: rangeContainer.append(yearsSlider.html),
};

filters.forEach((filter) => {
  appendFilters[filter.name];

  filter.setUpdateHandler(() => {
    redrawCards(refilterCards());
  });
});

// initial draw
const errorMessage = document.getElementsByClassName(
  "error-message"
)[0] as HTMLElement;

redrawCards(refilterCards());
function redrawCards(arr: ProductCard[]) {
  if (arr.length === 0) {
    errorMessage.classList.remove("hidden");
  }
  cardContainer.innerHTML = "";
  arr.forEach((card) => cardContainer.append(card.html));
}

function refilterCards() {
  return filters.reduce((prev, filter) => filter.filter(prev), allCards);
}

//clear local storage

const clearLocalStorageButton = document.getElementById(
  "clearStorage"
) as HTMLButtonElement;

clearLocalStorageButton.onclick = () => {
  localStorage.clear();
  location.reload();
};

//button clear

const clearFilterButton = document.getElementById(
  "clearFilter"
) as HTMLButtonElement;

clearFilterButton.onclick = () => {
  filters.forEach((el) => el.clear());
  redrawCards(refilterCards());
};
