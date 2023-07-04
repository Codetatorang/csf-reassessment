import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.scss']
})
export class View1Component {
  @Output()
  currentVal!: string;
  @Output()
  currentChoice!:string;

  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'Q', 'W', 'X', 'Y', 'Z'];

  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private router:Router) { }

  setValue(button: HTMLButtonElement, event:MouseEvent) {
    console.log("input detected:", button.value);
    this.currentVal = button.value;
    console.log("ref name: ");
    this.router.navigateByUrl('/view2');
  }
}
