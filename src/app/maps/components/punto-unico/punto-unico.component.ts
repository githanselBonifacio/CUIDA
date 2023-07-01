import { Component ,Inject, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Turno} from '../../../agenda/interfaces/turno.interface'
import  * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoiaGFuc2Vib24iLCJhIjoiY2xqZGwwcm11MDF1MjNlazZlcDMzN3p3cCJ9.unVEZ1BzsP-9wdIdGqRK7A';

@Component({
  selector: 'app-punto-unico',
  templateUrl: './punto-unico.component.html',
  styleUrls: ['./punto-unico.component.css']
})
export class PuntoUnicoComponent implements AfterViewInit{
  constructor(
    public dialogRef: MatDialogRef<PuntoUnicoComponent>,
    @Inject(MAT_DIALOG_DATA) public citaSeleccionada: Turno,
  ) {}

  @ViewChild('map') divMap?:ElementRef;

  ngAfterViewInit(): void {
      const map = new mapboxgl.Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [this.citaSeleccionada.longitud, this.citaSeleccionada.latitud], // starting position [lng, lat]
      zoom: 15, 
      
      });
      const marker = new mapboxgl.Marker({
        color:'#0033A0'
      })
      .setLngLat([this.citaSeleccionada.longitud, this.citaSeleccionada.latitud])
      .addTo(map)
  }
  

  onCerrar(): void {
    this.dialogRef.close(false);
  }
}
