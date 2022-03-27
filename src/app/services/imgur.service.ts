import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImgurService {

  // api = environment.serverUrl;

  api = 'https://api.imgur.com/3/';
  apiKey = environment.imgurApiKey;
  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      return of(result as T);
    }
  }

  // uploadImg(base64: string): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('image', base64);
  //   formData.append('type', 'base64');
  //   return this.httpClient.post<any>(this.api + 'image-upload', formData)
  //       .pipe(catchError(this.handleError<any>('Image upload failed for input ' + base64, {data: {link: ''}})));
  // }

  uploadImg(base64: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': `Client-ID ${this.apiKey}`});
    const options = {'headers': headers};
    const formData = new FormData();
    formData.append('image', base64);
    formData.append('type', 'base64');
    return this.httpClient.post<any>(this.api + 'image', formData, options)
        .pipe(
            catchError(this.handleError<any>('Upload to Imgur failed for input ' + base64, {data: {link: ''}}))
        );
  }
}
