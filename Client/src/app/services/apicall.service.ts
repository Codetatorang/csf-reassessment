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
  
  //attributes to store
  private _view1Value!: string;
  private _view1type!: string;
  
  public get view1type(): string {
    return this._view1type;
  }
  public set view1type(value: string) {
    this._view1type = value;
  }

  public get view1Value(): string {
    return this._view1Value;
  }
  public set view1Value(value: string) {
    this._view1Value = value;
  }

  constructor(private http:HttpClient, private router:Router) { }

  fetchBooksByChar( char:string):Observable<Book>{
    // todo: implement after fixing backend parsing issue
    return this.http.get<Book>(this.api_url + "/searchchar/" + char);
  }

  fetchBookDetails(title:string):Observable<Book>{
    // title.replace(' ', '%20');
    // title.replace(/ /g,"%20");
    return this.http.get<Book>(this.api_url + "/" + title.replace(/ /g, "%20"));
  }

  getBookFromApi(title:string):Observable<Book>{
    return this.http.get<Book>(this.api_url + "/api/" + title);
  }

}
