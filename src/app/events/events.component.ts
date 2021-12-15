import {Component, OnDestroy, OnInit} from '@angular/core';
import {IntiEvent, MOCK_EVENTS, NULL_EVENT} from './event';
import {EventsService} from '../services/events.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-table-list',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
  startDate = new FormControl('');
  endDate = new FormControl('');
  displayEvents: IntiEvent[];
  mockEvents: IntiEvent[];
  showTable: boolean;
  showForm: boolean;
  formEvent: IntiEvent;
  emptyEvent: IntiEvent;
  createEvent: boolean;

  private ngUnsub: Subject<any> = new Subject();

  constructor(private eventService: EventsService) { }

  ngOnInit() {
    /* MOCKING
    this.mockEvents = MOCK_EVENTS;
    this.mockEvents.sort((a, b) => a.status ? b.status ? 0 : -1 : b.status ? 1 : 0);
    this.displayEvents = this.mockEvents;
    */
    this.eventService.getEvents().pipe(takeUntil(this.ngUnsub))
        .subscribe(
        res => this.displayEvents = res === [] ? MOCK_EVENTS : res);
    this.showTable = true;
    this.showForm = false;
    this.emptyEvent = NULL_EVENT;
    this.formEvent = this.emptyEvent;
  }

  addEvent() {
    this.createEvent = true;
    this.displayForm(this.emptyEvent);
  }

  editEvent(event: IntiEvent) {
    this.createEvent = false;
    this.displayForm(event);
  }

  displayForm(event: IntiEvent) {
    this.formEvent = {...event};
    this.showTable = false;
    this.showForm = true;
    this.startDate.setValue(this.parseDate(event.startDate).toISOString());
    this.endDate.setValue(this.parseDate(event.endDate).toISOString());
  }

  hideForm() {
    this.showTable = true;
    this.showForm = false;
    this.formEvent = {...this.emptyEvent};
    this.startDate.reset();
    this.endDate.reset();
  }

  submitForm() {
    // POST here
    const submitEvent = {...this.formEvent};
    submitEvent.startDate = this.parseISO(this.startDate.value);
    submitEvent.endDate = this.parseISO(this.startDate.value);
    if (this.createEvent) { this.eventService.addEvent(submitEvent); } else { this.eventService.updateEvent(submitEvent); }
    this.hideForm();
  }

  parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(s => parseInt(s, 10));
    return new Date(year, month - 1, day);
  }

  parseISO(isoStr: string): string {
    const date = new Date(isoStr);
    return date.getDate().toString() + '/' + date.getMonth().toString() + '/' + date.getFullYear();
  }

  ngOnDestroy(): any {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
