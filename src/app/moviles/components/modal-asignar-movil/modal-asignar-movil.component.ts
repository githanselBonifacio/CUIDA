import { Component,Inject ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MovilesService } from 'src/app/shared/services/moviles/moviles.service';
import { Desplazamiento } from '../../interfaces/desplazamiento.interface';
@Component({
  selector: 'app-modal-asignar-movil',
  templateUrl: './modal-asignar-movil.component.html',
  styleUrls: ['./modal-asignar-movil.component.css']
})
export class ModalAsignarMovilComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalAsignarMovilComponent>,
    @Inject(MAT_DIALOG_DATA) public desplazamiento: Desplazamiento,
    private movilesService: MovilesService,
  ) {}

  ngOnInit() {
    
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onConfirm():void{
   
    this.dialogRef.close(true)
    
  }
}
