import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { Book } from 'src/app/models/book.model'
@Component({
  selector: 'app-view3',
  templateUrl: './view3.component.html',
  styleUrls: ['./view3.component.scss']
})
export class View3Component implements OnInit, OnDestroy{
  @Input()
  bookTitle!:string;

  bookDetails!:Book;

  constructor(private service:ApicallService){}

  ngOnInit(): void {
    //todo: test with generic book, change back to this.booktitle later
      firstValueFrom(this.service.fetchBookDetails("The Outsider")).then(
        (response) => {
          console.log("Good response", response);
          this.bookDetails.bookId = response.bookId;
          this.bookDetails.authors = response.authors;
          this.bookDetails.description = response.description;
          this.bookDetails.edition = response.edition;
          this.bookDetails.format = response.format;
          this.bookDetails.title = response.title;
          this.bookDetails.pages = response.pages;
          this.bookDetails.rating = response.rating;
          this.bookDetails.ratingCount = response.ratingCount;
          this.bookDetails.reviewCount = response.reviewCount;
          this.bookDetails.genres = response.genres;
          this.bookDetails.imageUrl = response.imageUrl;
          
        }
      ).catch(
        (error) => {
          console.log("Error Occured: ", error);
        }
      )
  }

  ngOnDestroy(): void {
      
  }
}
