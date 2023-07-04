import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.scss']
})
export class View1Component {
  @Output()
  currentVal = new EventEmitter<string>;

  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'Q', 'W', 'X', 'Y', 'Z'];

  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private router:Router, private service:ApicallService) { }



  setValue(button: HTMLButtonElement) {
    this.currentVal.emit(button.value);
    //transfer value to component view 2 via service
    this.service.view1Value = button.value;
    if(button.value in this.letters)
      this.service.view1type = "Number";
    else
      this.service.view1type = "Letter";

    this.router.navigateByUrl('/view2');
  }
}
