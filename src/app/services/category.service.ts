import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Category } from "src/app/models/category";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private API_URL:string = "http://localhost/api_comic/categories";

    constructor(private http: HttpClient) {}

    getAll():Observable<Category[]> {
        return this.http.get<Category[]>(this.API_URL);
    }

    getsAll(sort:string = 'id', order:string = 'desc'):Observable<Category[]> {
        return this.http.get<Category[]>(`${this.API_URL}?_embed=comics&_sort=${sort}&_order=${order}`);
    }

    findById(id:Number):Observable<Category> {
        return this.http.get<Category>(`${this.API_URL}/${id}?_embed=comics`);
    }

    addNew(data:Category):Observable<Category> {
        return this.http.post<Category>(this.API_URL, data);
    }

    update(id:Number, data:Category):Observable<Category> {
        console.log(`${this.API_URL}/${id}`);
        return this.http.patch<Category>(`${this.API_URL}/${id}`, data);
    }

    delete(id:Number):Observable<Category> {
        return this.http.delete<Category>(`${this.API_URL}/${id}`);
    }

    findByWord(word:any): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.API_URL}/search?_word=${word}`);
      }

    findname(word:string): Observable<Category> {
        return this.http.get<Category>(`${this.API_URL}/findbyname?_word=${word}`);
    } 
}
