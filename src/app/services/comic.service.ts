import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comic } from '../models/comic';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private API_URL:string = 'http://localhost/api_comic/comics'; 

  constructor(private http: HttpClient) { }

  getAll():Observable<Comic[]> {
    return this.http.get<Comic[]>(this.API_URL);
  }

  getsAll():Observable<Comic[]> {
    return this.http.get<Comic[]>(`${this.API_URL}/_fulldata`);
  }

  findById(id:Number):Observable<Comic> {
    return this.http.get<Comic>(`${this.API_URL}/${id}`);
  }

  addNew(data:any):Observable<any> {

    // let headers = new HttpHeaders({
    //   'Content-Type' :'application/json',
    //   "Access-Control-Allow-Methods" : "GET, POST, OPTIONS, DELETE, PUT",
    //   // "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept, Authorization, X-Request-With, X-CLIENT-ID, X-CLIENT-SECRET",
    //   "Access-Control-Allow-Headers" : "*",
    //   "Access-Control-Allow-Origin" : "*",
    //   "Accept" : "application/json",
    // });
    // let optisons = {
    //   headers: headers
    // }

    return this.http.post<any>(this.API_URL, data);
  }

  update(id:Number, data:Comic):Observable<Comic> {
    return this.http.patch<Comic>(`${this.API_URL}/${id}`, data);
  }

  delete(id:Number):Observable<Comic> {
    return this.http.delete<Comic>(`${this.API_URL}/${id}`);
  }

}
