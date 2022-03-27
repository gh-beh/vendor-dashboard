import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {FaqCat, NULL_FAQ_CAT} from '../models/faq';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqCatService {
  api = environment.dbApiUrl + 'faq/category';

  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      if (result.hasOwnProperty('error')) { result['error'] = error; }
      return of(result as T);
    }
  }

  getFaqCats(): Observable<FaqCat[]> {
    return this.httpClient.get<FaqCat[]>(this.api)
        .pipe(
            catchError(this.handleError<FaqCat[]>('getFaqCats', []))
        );
  }

  getFaqCat(id: number): Observable<FaqCat> {
    return this.httpClient.get<FaqCat>(this.api + '/' + id.toString())
        .pipe(
            catchError(this.handleError<FaqCat>('getFaqCat with id ' + id.toString, NULL_FAQ_CAT))
        );
  }

  addFaqCat(faqCat: FaqCat): Observable<any> {
    const {faqCatId, ...body} = faqCat;
    return this.httpClient.post<any>(this.api + '/add', body)
        .pipe(
            catchError(this.handleError<any>('addFaqCat with faq category' + faqCat.toString(), {}))
        );
  }

  updateFaqCat(faqCat: FaqCat): Observable<any> {
    const {faqCatId, ...body} = faqCat
    return this.httpClient.put<any>(this.api + '/update/' + faqCatId.toString(), body)
        .pipe(
            catchError(this.handleError<any>('updateFaq with id ' + faqCat.faqCatId.toString(), {}))
        );
  }

  deleteFaqCat(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.api + '/delete/' + id.toString())
        .pipe(
            catchError(this.handleError<any>('deleteFaqCat with id ' + id.toString(), { error: ''}))
        );
  }
}
