import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
   constructor(
    public dialogRef: MatDialogRef<ToastComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}
  
onConfirm():void{
    this.dialogRef.close(true);
  }

}
