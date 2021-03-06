import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private API_URL:string = "http://localhost/api_comic/authors"; 

  constructor(private http: HttpClient) { }

  getAll():Observable<Author[]> {
    return this.http.get<Author[]>(this.API_URL);
  }

  getsAll():Observable<Author[]> {
    return this.http.get<Author[]>(`${this.API_URL}?_embed=comics&_sort=id&_order=desc`);
  }

  findById(id:Number):Observable<Author> {
    return this.http.get<Author>(`${this.API_URL}/${id}`);
  }

  addNew(data:Author):Observable<Author> {
    return this.http.post<Author>(this.API_URL, data);
  }

  update(id:Number, data:Author):Observable<Author> {
    return this.http.patch<Author>(`${this.API_URL}/${id}`, data);
  }

  delete(id:Number):Observable<Author> {
    return this.http.delete<Author>(`${this.API_URL}/${id}`);
  }

  findByWord(word:string):Observable<Author[]> {
    return this.http.get<Author[]>(`${this.API_URL}/search?_word=${word}`);
  }

  findname(word:string):Observable<Author> {
    return this.http.get<Author>(`${this.API_URL}/findbyname?_word=${word}`);
  }

}
