import { Component ,Input, AfterViewInit, ViewChild, ElementRef, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import  * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoiaGFuc2Vib24iLCJhIjoiY2xqZGwwcm11MDF1MjNlazZlcDMzN3p3cCJ9.unVEZ1BzsP-9wdIdGqRK7A';

@Component({
  selector: 'app-map-punto-unico',
  templateUrl: './map-punto-unico.component.html',
  styleUrls: ['./map-punto-unico.component.css']
})
export class MapPuntoUnicoComponent implements AfterViewInit, OnChanges{
  
  @Input()
  latitud :number = 0.0;

  @Input() 
  longitud: number = 0.0;


  @ViewChild('map') divMap?:ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitud'] && changes['longitud']) {
      this.ngAfterViewInit();
    }
  }
  ngAfterViewInit(): void {
    if (this.latitud !== 0 && this.longitud !== 0) {
          const map = new mapboxgl.Map({
          container: this.divMap?.nativeElement, // container ID
          style: 'mapbox://styles/mapbox/streets-v12', // style URL
          center: [this.longitud, this.latitud], // starting position [lng, lat]
          zoom: 12, 
          
          });
          const marker = new mapboxgl.Marker({
            color:'#0033A0'
          })
          .setLngLat([this.longitud, this.latitud])
          .addTo(map)
      }
    }
}
