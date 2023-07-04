import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  private api_url = "localhost:8080/findbook";
  constructor(private http:HttpClient, private router:Router) { }

  fetchBooksByTitle(data:Book, title:string):Observable<Book>{
    // todo: implement after fixing backend parsing issue
    return this.http.get<Book>(this.api_url + "/" + title);
  }

  fetchBookDetails(title:string):Observable<Book>{
    return this.http.get<Book>(this.api_url + "/" + title);
  }

}
