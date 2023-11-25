import { Component, Inject, AfterViewInit, SimpleChanges, ViewChild, ElementRef, OnChanges } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tarea } from 'src/app/diagramas/interfaces/tarea-gantt.interface';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiaGFuc2Vib24iLCJhIjoiY2xqZGwwcm11MDF1MjNlazZlcDMzN3p3cCJ9.unVEZ1BzsP-9wdIdGqRK7A';

@Component({
  selector: 'app-map-ruta',
  templateUrl: './map-ruta.component.html',
  styleUrls: ['./map-ruta.component.css']
})
export class MapRutaComponent implements AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<MapRutaComponent>,
    @Inject(MAT_DIALOG_DATA) public tareas: Tarea[],
  ) { }

  @ViewChild('ruta') divMap?: ElementRef;


  ngAfterViewInit(): void {

    let map = new mapboxgl.Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [this.tareas[0].longitud, this.tareas[0].latitud], // starting position [lng, lat]
      zoom: 15,

    });

    let limites = new mapboxgl.LngLatBounds()

    for (let tarea of this.tareas) {
      if (tarea.tipo != "dvisita") {
        let marker = new mapboxgl.Marker({
          color: '#0033A0'
        })
          .setLngLat([tarea.longitud, tarea.latitud])
          .addTo(map);
        limites.extend(marker.getLngLat())
      }
    }

    map.fitBounds(limites, {
      padding: 50
    })
  }

}
