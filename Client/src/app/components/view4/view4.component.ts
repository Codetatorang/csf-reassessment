import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { Book, BookReview } from 'src/app/models/book.model';

@Component({
  selector: 'app-view4',
  templateUrl: './view4.component.html',
  styleUrls: ['./view4.component.scss']
})
export class View4Component implements OnInit {
  bookTitle!: string;
  apiBook!:BookReview;


  constructor(private service: ApicallService) { }

  ngOnInit(): void {
    this.bookTitle = this.service.booktitle;
    firstValueFrom(this.service.getBookFromApi(this.bookTitle)).then(
      (response) => {
        console.log("book found!");
        this.apiBook.title = response.title;
        this.apiBook.authors = response.authors;
        this.apiBook.description = response.description;
        // this.apiBook.title = response.title;
        // this.apiBook.authors = response.authors;
        // this.apiBook.= response.;
        // this.apiBook.title = response.title;
      }
    ).catch(
      (error) => {
        console.log("error occured: ", error);
      }
    )
  }

}
