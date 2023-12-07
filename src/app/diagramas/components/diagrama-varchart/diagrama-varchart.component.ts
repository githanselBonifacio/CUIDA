import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, HostListener, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

export interface Data {
  name: string;
  value: number;
}

@Component({
  selector: 'app-diagrama-varchart',
  templateUrl: './diagrama-varchart.component.html',
  styleUrls: ['./diagrama-varchart.component.css']
})

export class DiagramaVarchartComponent implements OnInit, OnChanges, AfterViewInit {



  @ViewChild('chartContent') chartContent?: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data != undefined) {
      this.normalizarEjeY();
    }

  }
  ngOnInit(): void {
    if (this.data != undefined) {
      this.normalizarEjeY();
    }

  }
  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.sizeContentInit = this.chartContent?.nativeElement.offsetWidth ?? 0;
    })
  }


  @Input() titleChart: string = '';
  @Input() titleEjeY: string = '';
  @Input() titleEjeX: string = '';
  @Input() isColorIndividual: boolean = true;
  @Input() colorScheme = {
    individual: "#39A7FF",
    domain: ['#003f5c', '#2f4b7c', '#665191', '#61A3BA', '#d45087', '#f95d6a', '#ff7c43', '#ffa600', '#706233', '#B0926A', '#D2DE32', '#A2C579'],
    font: "#53565A",
    lines: "#53565A",
    legend: "#53565A",
    fontLegend: "#ffffff"

  };
  @Input() data: Data[] = [];
  @Input() isPercentageEjeY: boolean = false;
  @Input() unitEjeY: string = '';

  //options
  @Input() xAxis: boolean = true;
  @Input() NumberDivideEjeY: number = 8;
  ejeY: number[] = [];
  valueMinY: number = 0;
  valueMaxY: number = 0;
  maxColLegend: number = 74;

  sizeContentInit: number = 0;

  get sizeContentPx() {
    return `${this.sizeContentInit}px`
  }
  get titleY() {
    return `${this.titleEjeY} ( ${this.unitEjeY})`
  }

  get colorThemeIndividual() {
    return this.colorScheme.individual;
  }
  get colorThemeDomain() {
    return this.colorScheme.domain;
  }
  get colorLines() {
    return this.colorScheme.lines
  }
  get colorLegend() {
    return this.colorScheme.legend
  }
  get colorFont() {
    return this.colorScheme.legend
  }
  get colorFontLegend() {
    return this.colorScheme.fontLegend
  }


  normalizarEjeY() {
    if (this.isPercentageEjeY) {
      this.ejeY = this.createListejeY(0, 100, 5);
      this.valueMinY = 0;
      this.valueMaxY = 100;
    } else {
      const maxMin = this.data.reduce((acc, curr) => {
        if (curr.value > acc.max) {
          acc.max = curr.value;
        }
        if (curr.value < acc.min) {
          acc.min = curr.value;
        }
        return acc;
      }, { max: -Infinity, min: Infinity });
      this.valueMinY = 0;
      this.valueMaxY = Math.ceil(maxMin.max / 10) * 10;
      this.ejeY = this.createListejeY(this.valueMinY, this.valueMaxY, this.NumberDivideEjeY);
    }

  }
  getMultiploTen(num: number): number {
    const lastDigit = num % 10;
    if (lastDigit < 5) {
      return num - lastDigit;
    } else {
      return num + (10 - lastDigit);
    }
  }
  createListejeY(initial: number, final: number, divide: number): number[] {
    const difference = final - initial;
    var partSize;
    if (difference > 10) {
      partSize = Math.ceil((difference / divide) / 10) * 10;
    } else {
      partSize = 2;
      divide = 5;
    }

    const list: number[] = [];
    list.push(initial);
    for (let i = 1; i <= divide; i++) {
      const value = initial + partSize * i;
      list.push(value);
    }

    return list;
  }
  getSizeBar(value: number): number {
    return (value * 100) / this.valueMaxY;
  }


}
