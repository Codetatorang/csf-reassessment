import { Component, Input, OnInit } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.scss']
})
export class View2Component implements OnInit{
  
  @Input()
  currentVal!:string;

  title !:string
  constructor(private service:ApicallService){}

  
  ngOnInit(): void {
    console.log("currentVal: ", this.currentVal);
  }

  // todo: a link clicked, navigate to view 3 and output the title, view 3 calls the service 
}
