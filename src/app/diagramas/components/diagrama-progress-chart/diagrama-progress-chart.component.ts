import { trigger, transition, style, animate, state } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';


@Component({
  selector: 'app-diagrama-progress-chart',
  templateUrl: './diagrama-progress-chart.component.html',
  styleUrls: ['./diagrama-progress-chart.component.css'],
  animations: [
    trigger('animatePercentage', [
      transition(':enter', [
        style({ strokeDashoffset: '{{ strokeOffsetMax}}' }),
        animate('500ms', style({ strokeDashoffset: '{{ strokeOffset }}' }))
      ]),

    ])
  ]
})
export class DiagramaProgressChartComponent implements AfterViewInit {

  @ViewChild('contentRing') contentRing?: ElementRef;

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.buildChart();
    });
  }


  @Input() title: string = '';
  @Input() value!: number;

  //optional
  @Input() widthLine: number = 12;
  @Input() colors = {
    primary: "#1465bb",
    secondary: "#81c9fa"
  };


  ratioCircle: number = 0;

  get widthContent() {
    return this.contentRing?.nativeElement.offsetWidth;

  }
  get heightContent() {
    return this.contentRing?.nativeElement.offsetHeight;
  }

  get lenghtCircle() {
    return this.ratioCircle * 2 * Math.PI;
  }

  get percentage() {
    return (this.lenghtCircle - this.lenghtCircle * (this.value / 100));
  }
  get percentagePx() {
    return `${this.percentage.toFixed(2)}px`;
  }

  buildChart() {
    const ratioAspect = this.heightContent / this.widthContent;
    const deltaResize = 0.85;
    let size = (ratioAspect > 1) ? this.widthContent * deltaResize : this.heightContent * deltaResize;

    const chartSgvElement = document.getElementById("chart-sgv");
    if (chartSgvElement) {
      chartSgvElement.style.width = `${size.toFixed(1)}px`;
      chartSgvElement.style.height = `${size.toFixed(1)}px`;

      //circles
      const primaryCircle = document.getElementById("primaryCircle");
      const secondaryCircle = document.getElementById("secondaryCircle");

      const x = (size / 2);
      const y = (size / 2);
      this.ratioCircle = (size / 2) * deltaResize;

      primaryCircle?.setAttribute("cx", `${x.toFixed(2)}`);
      primaryCircle?.setAttribute("cy", `${y.toFixed(2)}`);
      primaryCircle?.setAttribute("r", `${this.ratioCircle.toFixed(2)}`);

      secondaryCircle?.setAttribute("cx", `${x.toFixed(2)}`);
      secondaryCircle?.setAttribute("cy", `${y.toFixed(2)}`);
      secondaryCircle?.setAttribute("r", `${this.ratioCircle.toFixed(2)}`);
    }
  }
}

