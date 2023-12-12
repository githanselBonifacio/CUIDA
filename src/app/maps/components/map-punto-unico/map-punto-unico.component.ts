import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import * as Mapboxgl from 'mapbox-gl';

(Mapboxgl as any).accessToken = 'pk.eyJ1IjoiaGFuc2Vib24iLCJhIjoiY2xqZGwwcm11MDF1MjNlazZlcDMzN3p3cCJ9.unVEZ1BzsP-9wdIdGqRK7A';

@Component({
  selector: 'app-map-punto-unico',
  templateUrl: './map-punto-unico.component.html',
  styleUrls: ['./map-punto-unico.component.css']
})
export class MapPuntoUnicoComponent implements AfterViewInit, OnChanges, OnInit {


  mapbox!: Mapboxgl.Map;

  @Input()
  latitud: number = 0.0;

  @Input()
  longitud: number = 0.0;

  @ViewChild('mapPoint') divMap?: ElementRef;

  ngOnInit(): void {

    Mapboxgl!.accessToken = 'pk.eyJ1IjoiaGFuc2Vib24iLCJhIjoiY2xqZGwwcm11MDF1MjNlazZlcDMzN3p3cCJ9.unVEZ1BzsP-9wdIdGqRK7A';
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitud'] && changes['longitud']) {
      this.ngAfterViewInit();
    }
  }
  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      if (!this.mapbox) {
        if (this.latitud !== 0 && this.longitud !== 0) {
          this.mapbox = new Mapboxgl.Map({
            container: this.divMap?.nativeElement, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [this.longitud, this.latitud], // starting position [lng, lat]
            zoom: 12,

          });
          const marker = new Mapboxgl.Marker({
            color: '#0033A0'
          })
            .setLngLat([this.longitud, this.latitud])
            .addTo(this.mapbox)
        }
      }

    });

  }
}
