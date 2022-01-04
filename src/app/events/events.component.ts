import {Component, OnDestroy, OnInit} from '@angular/core';
import {IntiEvent, MOCK_EVENTS, NULL_EVENT} from './event';
import {EventsService} from '../services/events.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {ImgurService} from '../services/imgur.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
  defaultImage = 'assets/img/img-default.png';
  startDate = new FormControl('');
  endDate = new FormControl('');
  displayEvents: IntiEvent[];
  mockEvents: IntiEvent[];
  showTable: boolean;
  showForm: boolean;
  formEvent: IntiEvent;
  emptyEvent: IntiEvent;
  createEvent: boolean;
  imageSrc = '';

  private ngUnsub: Subject<any> = new Subject();

  constructor(private eventService: EventsService, private imgur: ImgurService) { }

  ngOnInit() {
    /* MOCKING
    this.mockEvents = MOCK_EVENTS;
    this.mockEvents.sort((a, b) => a.status ? b.status ? 0 : -1 : b.status ? 1 : 0);
    this.displayEvents = this.mockEvents;
    */
    this.eventService.getEvents().pipe(takeUntil(this.ngUnsub))
        .subscribe(
        res => this.displayEvents = (res.length === 0 ? MOCK_EVENTS : res));
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
    this.imageSrc = this.formEvent.image;
    this.showTable = false;
    this.showForm = true;
    this.startDate.setValue(this.parseDate(event.startDate).toISOString());
    this.endDate.setValue(this.parseDate(event.endDate).toISOString());
  }

  hideForm() {
    this.imageSrc = '';
    this.showTable = true;
    this.showForm = false;
    this.formEvent = {...this.emptyEvent};
    this.startDate.reset();
    this.endDate.reset();
  }

  submitForm() {
    // Create JSON body and parse dates
    const submitEvent = {...this.formEvent};
    submitEvent.startDate = this.parseISO(this.startDate.value);
    submitEvent.endDate = this.parseISO(this.endDate.value);

    if (this.imageSrc !== '') {
      // POST to imgur and retrieve link
      const imgurLink = this.imgur.uploadImg(this.extractData(this.imageSrc));
      imgurLink.pipe(takeUntil(this.ngUnsub)).subscribe(res => {
        submitEvent.image = res['data']['link'];
        const response = this.createEvent ? this.eventService.addEvent(submitEvent) : this.eventService.updateEvent(submitEvent);
        response.pipe(takeUntil(this.ngUnsub)).subscribe();
      });
    } else {
      submitEvent.image = '';
      const response = this.createEvent ? this.eventService.addEvent(submitEvent) : this.eventService.updateEvent(submitEvent);
      response.pipe(takeUntil(this.ngUnsub)).subscribe();
    }
    this.hideForm();
  }

  extractData(dataUrl: string): string {
    // TODO: Add error checking for dataURL base64 extraction
    return dataUrl.split(',')[1];
  }

  parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(s => parseInt(s, 10));
    return new Date(year, month - 1, day);
  }

  parseISO(isoStr: string): string {
    const date = new Date(isoStr);
    console.log(isoStr);
    return date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear();
  }

  readURL(event: Event): void {
    if ('files' in event.target && event.target['files'][0]) {
      const file = event.target['files'][0];
      console.log(file);

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result as string;

      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imageSrc = '';
  }

  ngOnDestroy(): any {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
