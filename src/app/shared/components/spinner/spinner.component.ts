import { Component, Input } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  showSpinner = false;
  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.spinnerObservable.subscribe(show => {
      this.showSpinner = show;
    });
  }
}
