
import { Component, Input, ViewChild, HostListener, ElementRef, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';

interface Data {
  name: string;
  value: number;
}

interface DataPieChar {
  name: string;
  value: number;
  percentage: string | null;
  pathd: string | null;
  fill: string | null;
  labex: string | null;
  labely: string | null;
}

@Component({
  selector: 'app-diagrama-piechart',
  templateUrl: './diagrama-piechart.component.html',
  styleUrls: ['./diagrama-piechart.component.css']
})
export class DiagramaPiechartComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    if (this.data?.length != 0) {
      this.setValues()
    }

  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      if (this.data?.length != 0) {
        this.buildChart();
      }

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.clean();
      if (this.data?.length != 0) {
        this.setValues();
        this.buildChart();
      }
    }
  }
  @ViewChild('contentPie') contentPie?: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) { }

  @Input() data: Data[] = [];
  @Input() unit: string = '';
  @Input() title: string = '';
  @Input() isMonoColor: boolean = true;
  @Input() colorScheme = {
    individual: ["#0c255e", "#003785", "#1465bb", "#2196f3", "#81c9fa", "#789dca", "#57bd9e", "#2ca880", "#009d71"],
    domain: ['#1f618d', '#239b56', '#b7950b', '#b9770e', '#a04000', '#B0926A', '#D2DE32', '#A2C579'],
    font: "#53565A",
    lines: "#53565A",
    legend: "#53565A",
    fontLegend: "#ffffff"
  };

  @Input() dataChart: DataPieChar[] = [];
  sumValues: number = 0;
  colors: string[] = [];
  ubicationLabels: any[] = [];


  get diameterPie() {
    const height = this.contentPie?.nativeElement.offsetHeight ?? 100;
    const width = this.contentPie?.nativeElement.offsetWidth ?? 100;
    let deltaResize = 0;
    if ((height / width) > 0.4) {
      deltaResize = 0.3;
    } else {
      deltaResize = 0.20;
    }
    return width * deltaResize;
  }

  get diameterPiePx() {
    return `${this.diameterPie}px`
  }

  get cx() {
    return this.diameterPie / 2;
  }
  get cy() {
    return this.diameterPie / 2;
  }
  get radio() {
    return this.diameterPie / 2;
  }
  clean() {
    this.dataChart = [];
    this.sumValues = 0;
    this.colors = [];
    this.ubicationLabels = [];
  }
  setValues() {
    const sortedData = [...this.data].sort((d1, d2) => d1.value - d2.value);
    this.data = sortedData;
    this.sumValues = this.data?.map(d => d.value)?.reduce((tot, acc) => tot = tot + acc);
    this.colors = this.isMonoColor ? this.colorScheme.individual : this.colorScheme.domain;
  }


  calculatePercentage(value: number): number {
    return (value / this.sumValues) * 100;
  }

  buildChart() {
    //circle
    const circleChart = document.getElementById("circlePieChart");
    const circle = document.getElementById("circlePie");

    if (circle && circleChart) {
      circleChart.setAttribute("cx", `${this.cx.toFixed(2)}`);
      circleChart.setAttribute("cy", `${this.cy.toFixed(2)}`);
      circleChart.setAttribute("r", `${this.radio.toFixed(2)}`);

      circle.style.width = `${this.diameterPie}`;
      circle.style.height = `${this.diameterPie}`;

      let angleAccu = 0;
      let xi = 2 * this.radio;
      let yi = this.radio;

      this.data?.forEach((d, i) => {

        const percentageAngle = this.calculatePercentage(d.value);
        const angleNext = (2 * Math.PI * (percentageAngle / 100));

        let angle = angleAccu + angleNext;
        let arcCompletion = "";
        if (percentageAngle > 50) {
          angle = angleAccu + angleNext / 2;
          const xf = this.cx + this.radio * Math.cos(angle);
          const yf = this.cy - this.radio * Math.sin(angle);
          arcCompletion = `L${xf},${yf} A${this.radio},${this.radio} 0 0,0 ${this.cx + this.radio},${this.cy}`
        }

        const xf = this.cx + this.radio * Math.cos(angle);
        const yf = this.cy - this.radio * Math.sin(angle);

        const lxf = (this.cx + this.radio * Math.cos(angleAccu + angleNext / 2)).toFixed(2);
        const lyf = (this.cy - this.radio * Math.sin(angleAccu + angleNext / 2)).toFixed(2);


        const arc = `L${xi},${yi} A${this.radio},${this.radio} 0 0,0 ${xf.toFixed(2)},${yf.toFixed(2)} ${arcCompletion}`;
        const pathD = `M${this.cx},${this.cy} ${arc}`

        this.dataChart.push({
          ...d,
          "percentage": `${this.calculatePercentage(d.value).toFixed(1)}%`,
          "pathd": `${pathD}`,
          "fill": `${this.colors[i]}`,
          "labex": `${lxf}px`,
          "labely": `${lyf}px`,
        })
        angleAccu = angle;
        xi = xf;
        yi = yf;
      })
    }
  }

}
