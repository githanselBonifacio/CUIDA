import { Component, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [this.data["origen"].longitud, this.data["origen"].latitud],
      zoom: 15,

    });


    let limites = new mapboxgl.LngLatBounds();
    const markerOrigenHtml = `<div class="marker">Sede ${this.data["origen"].nombre}</div>`;
    let markerOrigen = new mapboxgl.Marker({
      color: "#d19004"
    })
      .setLngLat([this.data["origen"].longitud, this.data["origen"].latitud])
      .setPopup(new mapboxgl.Popup().setHTML(markerOrigenHtml))
      .addTo(map);
    limites.extend(markerOrigen.getLngLat())

    for (const tarea of this.data["tareas"]) {
      if (tarea.tipo != "DVISITA") {

        const markerHtml = `
            <div style=" font-size:0.8rem;text-align: center;">
              <div>${tarea.id}</div>
              <div>${formatoHora(new Date(tarea.fechaProgramada))}</div>
            </div>
        `;
        let marker = new mapboxgl.Marker({ color: "#0033A0" })
          .setLngLat([tarea.longitud, tarea.latitud])
          .setPopup(new mapboxgl.Popup().setHTML(markerHtml))
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
