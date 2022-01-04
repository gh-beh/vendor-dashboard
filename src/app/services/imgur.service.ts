import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {IntiEvent} from '../events/event';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImgurService {

  api = 'https://api.imgur.com/3/';
  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      return of(result as T);
    }
  }

  uploadImg(base64: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Client-ID e67403a19ebb167'});
    const options = {'headers': headers};
    const formData = new FormData();
    formData.append('image', base64);
    formData.append('type', 'base64');
    return this.httpClient.post<any>(this.api + 'image', formData, options)
        .pipe(
            catchError(this.handleError<any>('Upload to Imgur failed for input ' + base64, {}))
        );
  }
}
