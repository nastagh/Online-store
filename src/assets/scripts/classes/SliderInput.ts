import e from "express";
import { Filter } from "./Filter";
import { ProductCard, ProductData } from "./ProductCard";

export interface SliderInputOptions {
  max: number;
  min: number;
  leftValue: number;
  rightValue: number;
  name: string;
  minGap?: number;
  filterFieldName: keyof ProductData;
}

export class SliderInput extends Filter {
  private options: SliderInputOptions;
  private leftSlider: HTMLInputElement;
  private rightSlider: HTMLInputElement;
  private sliderTrack: HTMLElement;
  private spanValueLeft: HTMLElement;
  private spanValueRight: HTMLElement;
  public readonly html: HTMLElement;
  protected value: [number, number];
  private rangeContainer: HTMLElement;

  constructor(name: string, options: SliderInputOptions) {
    super(name);

    this.value = this.value || [options.leftValue, options.rightValue];

    this.options = options;
    this.options.minGap = options.minGap || 0;

    this.leftSlider = this.createInputElement(this.value[0]);
    this.rightSlider = this.createInputElement(this.value[1]);

    this.sliderTrack = document.createElement("div");
    this.sliderTrack.classList.add("slider-track");

    this.spanValueLeft = document.createElement("span");
    this.spanValueLeft.textContent = this.value[0].toString();
    this.spanValueRight = document.createElement("span");
    this.spanValueRight.textContent = this.value[1].toString();

    this.html = this.createHTMLElement();
    this.createActionHandlers();
  }

  private createInputElement(value: number): HTMLInputElement {
    const element = document.createElement("input");
    element.type = "range";
    element.max = this.options.max.toString();
    element.min = this.options.min.toString();
    element.value = value.toString();

    return element;
  }

  private createHTMLElement() {
    const filterContainer = document.createElement("div");
    const filterText = document.createElement("p");
    filterText.classList.add("filter-text");
    filterText.innerHTML = `<strong>${this.options.name}</strong>`;
    filterContainer.append(filterText);

    const valuesContainer = document.createElement("div");
    valuesContainer.classList.add("values");
    valuesContainer.innerHTML = `<span>&dash;</span>`;
    valuesContainer.prepend(this.spanValueLeft);
    valuesContainer.append(this.spanValueRight);
    filterContainer.append(valuesContainer);

    this.rangeContainer = document.createElement("div");
    this.rangeContainer.classList.add("range-container");
    this.rangeContainer.append(this.sliderTrack);
    this.rangeContainer.append(this.leftSlider);
    this.rangeContainer.append(this.rightSlider);
    filterContainer.append(this.rangeContainer);

    return filterContainer;
  }

  private createActionHandlers() {
    this.fillColor();
    this.rangeContainer.oninput = (e) => {
      if (e.target === this.leftSlider) this.leftHandler();
      else this.rightHandler();
    };
  }

  leftHandler() {
    if (
      parseInt(this.rightSlider.value) - parseInt(this.leftSlider.value) <=
      this.options.minGap
    ) {
      this.leftSlider.value =
        parseInt(this.rightSlider.value) - this.options.minGap + "";
    }
    this.spanValueLeft.textContent = this.leftSlider.value;
    this.fillColor();

    this.value[0] = parseInt(this.leftSlider.value);
    this.updateHandler();
  }

  rightHandler() {
    if (
      parseInt(this.rightSlider.value) - parseInt(this.leftSlider.value) <=
      this.options.minGap
    ) {
      this.rightSlider.value =
        parseInt(this.leftSlider.value) + this.options.minGap + "";
    }
    this.spanValueRight.textContent = this.rightSlider.value;
    this.fillColor();

    this.value[1] = parseInt(this.rightSlider.value);
    this.updateHandler();
  }

  public filter(arr: ProductCard[]): ProductCard[] {
    const [min, max] = this.value;

    return arr.filter((el: ProductCard) => {
      const value = el.productData[this.options.filterFieldName] as number;

      return value >= min && value <= max;
    });
  }

  private fillColor() {
    const percent1 =
      ((parseInt(this.leftSlider.value) - this.options.min) /
        (this.options.max - this.options.min)) *
      100;
    const percent2 =
      ((parseInt(this.rightSlider.value) - this.options.min) /
        (this.options.max - this.options.min)) *
      100;
    this.sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #d2c4b5 ${percent1}%,#d2c4b5 ${percent2}%, #dadae5 ${percent2}%)`;
  }

  public clear(): void {
    this.clearState();
    this.value = [this.options.leftValue, this.options.rightValue];
    this.leftSlider.value = this.value[0].toString();
    this.rightSlider.value = this.value[1].toString();
    this.spanValueLeft.textContent = this.value[0].toString();
    this.spanValueRight.textContent = this.value[1].toString();
    this.fillColor();
  }
}
