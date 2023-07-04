import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.scss']
})
export class View2Component implements OnInit{

  // @ViewChild('letterVal') child:HTMLDivElement;

// showStatus($event: Event) {
// throw new Error('Method not implemented.');
// }
  
  // @Input()
  // currentVal = new EventEmitter<string>;

  title !:string
  value !:string
  result:string[] = [];
  constructor(private service:ApicallService, private router:Router){}

  
  ngOnInit(): void {
    this.title = this.service.view1type;
    this.value = this.service.view1Value;

    firstValueFrom(this.service.fetchBooksByChar(this.value)).then(
      (response) =>{
        console.log("good response", response);
      }
    ).catch(
      (error) => {
        console.log("Error has occured: ", error);
      }
    )
  }

  // todo: a link clicked, navigate to view 3 and output the title, view 3 calls the service 
  urlClick(bookTitle:string){
    this.service.booktitle = bookTitle;
    this.router.navigateByUrl("/view3");
  }
}
