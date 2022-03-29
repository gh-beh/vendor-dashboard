import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {IntiEvent, NULL_EVENT} from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  api = environment.dbApiUrl + 'event';

  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      return of(result as T);
    }
  }

  getEvents(): Observable<IntiEvent[]> {
    return this.httpClient.get<IntiEvent[]>(this.api)
        .pipe(
            catchError(this.handleError<IntiEvent[]>('getEvents', []))
        );
  }

  getEvent(id: number): Observable<IntiEvent> {
    return this.httpClient.get<IntiEvent>(this.api + '/' + id.toString())
        .pipe(
            catchError(this.handleError<IntiEvent>('getEvent with id ' + id.toString, NULL_EVENT))
        );
  }

  addEvent(event: IntiEvent): Observable<any> {
    const {eventId, status, ...body} = event;
    return this.httpClient.post<any>(this.api + '/add', {...body, status: parseInt(status, 10)})
        .pipe(
            catchError(this.handleError<any>('addEvent with event ' + event.toString(), {}))
        );
  }

  updateEvent(event: IntiEvent): Observable<any> {
    const {eventId, status, ...body} = event;
    return this.httpClient.put<any>(this.api + '/update/' + eventId.toString(), {...body, status: parseInt(status, 10)})
        .pipe(
            catchError(this.handleError<any>('updateEvent with id ' + event.eventId.toString(), {}))
        );
  }

  deleteEvent(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.api + '/delete/' + id.toString())
        .pipe(
            catchError(this.handleError<any>('deleteEvent with id ' + id.toString(), {}))
        );
  }
}
