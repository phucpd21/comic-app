import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comic } from '../models/comic';

@Injectable({
	providedIn: 'root'
})
export class ComicService {

	private API_URL: string = 'http://localhost/api_comic/comics';

	constructor(private http: HttpClient) { }

	getAll(): Observable<Comic[]> {
		return this.http.get<Comic[]>(this.API_URL);
	}

	getsAll(): Observable<Comic[]> {
		return this.http.get<Comic[]>(`${this.API_URL}/_gets`);
	}

	getsAllbyTable(cate_id: Number = 0, au_id: Number = 0, views_status:string = ''): Observable<Comic[]> {

		if (cate_id && au_id) {
			return this.http.get<Comic[]>(`${this.API_URL}/_gets?cate_id=${cate_id}&au_id=${au_id}&views_status=${views_status}`);
		} else if (cate_id) {
			return this.http.get<Comic[]>(`${this.API_URL}/_gets?cate_id=${cate_id}&views_status=${views_status}`);
		} else if (au_id) {
			return this.http.get<Comic[]>(`${this.API_URL}/_gets?au_id=${au_id}&views_status=${views_status}`);
		} else {
			return this.http.get<Comic[]>(`${this.API_URL}/_gets?views_status=${views_status}`);
		}


	}

	findById(id: Number): Observable<Comic> {
		return this.http.get<Comic>(`${this.API_URL}/${id}`);
	}

	addNew(data: any): Observable<any> {
		return this.http.post<any>(this.API_URL, data);
	}

	update(id: Number, data: Comic): Observable<Comic> {
		return this.http.patch<Comic>(`${this.API_URL}/${id}`, data);
	}

	delete(id: Number): Observable<Comic> {
		return this.http.delete<Comic>(`${this.API_URL}/${id}`);
	}

	findByWord(word: any, cate_id:Number = 0, au_id:Number = 0, views_status:string = ''): Observable<Comic[]> {
		// return this.http.get<Comic[]>(`${this.API_URL}/${word}/_gets`);

		if (cate_id && au_id) {
			return this.http.get<Comic[]>(`${this.API_URL}/${word}/_gets?cate_id=${cate_id}&au_id=${au_id}&views_status=${views_status}`);
		} else if (cate_id) {
			return this.http.get<Comic[]>(`${this.API_URL}/${word}/_gets?cate_id=${cate_id}&views_status=${views_status}`);
		} else if (au_id) {
			return this.http.get<Comic[]>(`${this.API_URL}/${word}/_gets?au_id=${au_id}&views_status=${views_status}`);
		} else {
			return this.http.get<Comic[]>(`${this.API_URL}/${word}/_gets?views_status=${views_status}`);
		}
	}

	findFullWord(word: any): Observable<Comic> {
		return this.http.get<Comic>(`${this.API_URL}/${word}`);
	}

	uploadFile(data: any): Observable<any> {
		return this.http.post<any>(`${this.API_URL}/_uploadfile`, data);
	}

}
