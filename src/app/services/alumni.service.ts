import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Alumni, NULL_MEMBER} from '../models/alumni';

@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  api = environment.dbApiUrl + 'alumni';

  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      return of(result as T);
    }
  }

  getMembers(): Observable<Alumni[]> {
    return this.httpClient.get<Alumni[]>(this.api)
        .pipe(
            catchError(this.handleError<Alumni[]>('getMembers', []))
        );
  }

  getMember(id: number): Observable<Alumni> {
    return this.httpClient.get<Alumni>(this.api + '/' + id.toString())
        .pipe(
            catchError(this.handleError<Alumni>('getMember with id ' + id.toString, NULL_MEMBER))
        );
  }

  addMember(member: Alumni): Observable<any> {
    const {alumniId, ...body} = member;
    return this.httpClient.post<any>(this.api + '/add', body)
        .pipe(
            catchError(this.handleError<any>('addMember with member ' + member.toString(), {}))
        );
  }

  updateMember(member: Alumni): Observable<any> {
    const {alumniId, ...body} = member;
    return this.httpClient.put<any>(this.api + '/update/' + alumniId.toString(), body)
        .pipe(
            catchError(this.handleError<any>('updateMember with id ' + member.alumniId.toString(), {}))
        );
  }

  deleteMember(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.api + '/delete/' + id.toString())
        .pipe(
            catchError(this.handleError<any>('deleteMember with id ' + id.toString(), {}))
        );
  }
}
