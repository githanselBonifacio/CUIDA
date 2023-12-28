import { Component, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tarea } from 'src/app/diagramas/interfaces/tarea-gantt.interface';
import { DatePipe } from '@angular/common';
import { formatoHora } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiaGFuc2Vib24iLCJhIjoiY2xqZGwwcm11MDF1MjNlazZlcDMzN3p3cCJ9.unVEZ1BzsP-9wdIdGqRK7A';

@Component({
  selector: 'app-map-ruta',
  templateUrl: './map-ruta.component.html',
  styleUrls: ['./map-ruta.component.css'],
})
export class MapRutaComponent implements AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<MapRutaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  @ViewChild('ruta') divMap?: ElementRef;


  ngAfterViewInit(): void {

    let map = new mapboxgl.Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [this.data["origen"].longitud, this.data["origen"].latitud],
      zoom: 15,

    });

    let limites = new mapboxgl.LngLatBounds();

    let markerOrigen = new mapboxgl.Marker({ color: "#0033A0" })
      .setLngLat([this.data["origen"].longitud, this.data["origen"].latitud])
      .addTo(map);
    limites.extend(markerOrigen.getLngLat())

    for (const tarea of this.data["tareas"]) {
      if (tarea.tipo != "DVISITA") {
        const markerHtml = document.createElement("div");
        markerHtml.innerHTML = `
        <div class="marker" style="transform: translate(-50%,-50%); display: flex;flex-direction: column;justify-content: center;clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 55% 90%, 50% 100%, 45% 90%, 0% 90%);"> 
            <div class="hora" style=" font-size:0.8rem; background-color: gray;color: white;padding: 0.5rem;border-radius: 5px;text-align: center;">
              <div>${tarea.id}</div>
              <div>${formatoHora(new Date(tarea.fechaProgramada))}</div>
            </div>
        </div>
        `;
        let marker = new mapboxgl.Marker({ element: markerHtml })
          .setLngLat([tarea.longitud, tarea.latitud])
          .addTo(map);
        limites.extend(marker.getLngLat())
      }
    }

    if (!limites.isEmpty()) {
      map.fitBounds(limites, {
        padding: 70
      })
    }

  }

}
