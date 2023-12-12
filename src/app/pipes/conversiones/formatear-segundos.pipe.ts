import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearSegundos'
})
export class FormatearSegundosPipe implements PipeTransform {

  transform(segundos: number): string {
    const hours = Math.floor(segundos / 3600);
      const minutes = Math.floor((segundos % 3600) / 60);
      
      if(hours == 0){
        return `${minutes} min`
      }else {
        if(minutes == 0){
          return `${hours} hr(s)`;
        }else{
          return `${hours} hr(s) ${minutes} min`;
        }
        
      }
  }

}
