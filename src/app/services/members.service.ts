import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {IntiEvent, NULL_EVENT} from '../events/event';
import {catchError} from 'rxjs/operators';
import {Member, NULL_MEMBER} from '../members/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  api = environment.dbApiUrl + 'member';

  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      return of(result as T);
    }
  }

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.api)
        .pipe(
            catchError(this.handleError<Member[]>('getMembers', []))
        );
  }

  getMember(id: number): Observable<Member> {
    return this.httpClient.get<Member>(this.api + '/' + id.toString())
        .pipe(
            catchError(this.handleError<Member>('getMember with id ' + id.toString, NULL_MEMBER))
        );
  }

  addMember(member: Member): Observable<any> {
    const {id, ...body} = member;
    return this.httpClient.post<any>(this.api + '/add', body)
        .pipe(
            catchError(this.handleError<any>('addMember with member ' + member.toString(), {}))
        );
  }

  updateMember(member: Member): Observable<any> {
    return this.httpClient.post<any>(this.api + '/update/' + member.id.toString(), event)
        .pipe(
            catchError(this.handleError<any>('updateMember with id ' + member.id.toString(), {}))
        );
  }

  deleteMember(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + '/delete/' + id.toString())
        .pipe(
            catchError(this.handleError<any>('deleteMember with id ' + id.toString(), {}))
        );
  }
}
