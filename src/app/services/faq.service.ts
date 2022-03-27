import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Faq, NULL_FAQ} from '../faq/faq';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  api = environment.dbApiUrl + 'faq';

  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      return of(result as T);
    }
  }

  getFaqs(): Observable<Faq[]> {
    return this.httpClient.get<Faq[]>(this.api)
        .pipe(
            catchError(this.handleError<Faq[]>('getFaqs', []))
        );
  }

  getFaq(id: number): Observable<Faq> {
    return this.httpClient.get<Faq>(this.api + '/' + id.toString())
        .pipe(
            catchError(this.handleError<Faq>('getFaq with id ' + id.toString, NULL_FAQ))
        );
  }

  addFaq(faq: Faq): Observable<any> {
    const {faqId, ...body} = faq;
    return this.httpClient.post<any>(this.api + '/add', body)
        .pipe(
            catchError(this.handleError<any>('addFaq with faq ' + faq.toString(), {}))
        );
  }

  updateFaq(faq: Faq): Observable<any> {
    const {faqId, faqCatId, ...body} = faq;
    return this.httpClient.put<any>(this.api + '/update/' + faqId.toString(), {...body, faqCatId: faqCatId.toString()})
        .pipe(
            catchError(this.handleError<any>('updateFaq with id ' + faq.faqId.toString(), {}))
        );
  }

  deleteFaq(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.api + '/delete/' + id.toString())
        .pipe(
            catchError(this.handleError<any>('deleteFaq with id ' + id.toString(), {}))
        );
  }
}
