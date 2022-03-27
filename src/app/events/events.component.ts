import {Component, OnDestroy, OnInit} from '@angular/core';
import {IntiEvent, MOCK_EVENTS, NULL_EVENT} from './event';
import {EventsService} from '../services/events.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormControl, AbstractControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ImgurService} from '../services/imgur.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
  eventForm: FormGroup;
  defaultImage = 'assets/img/img-default.png';
  displayEvents: IntiEvent[];
  events: IntiEvent[];
  mockEvents: IntiEvent[];
  showTable: boolean;
  showForm: boolean;
  formEvent: IntiEvent;
  emptyEvent: IntiEvent;
  createEvent: boolean;
  imageSrc = '';
  imgurUpload = true;
  submitted = false;
  searchText = ''

  private ngUnsub: Subject<any> = new Subject();

  constructor(private eventService: EventsService, private imgur: ImgurService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    /* MOCKING
    this.mockEvents = MOCK_EVENTS;
    this.mockEvents.sort((a, b) => a.status ? b.status ? 0 : -1 : b.status ? 1 : 0);
    this.displayEvents = this.mockEvents;
    */
    this.getEvents();
    this.showTable = true;
    this.showForm = false;
    this.emptyEvent = NULL_EVENT;
    this.formEvent = this.emptyEvent;
    this.eventForm = this.formBuilder.group(
        {
          name: ['', Validators.required],
          description: ['', Validators.required],
          registerLink: ['', Validators.required],
          startDate: ['', Validators.required],
          endDate: ['', Validators.required],
          status: ['', Validators.required],
        }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.eventForm.controls;
  }

  getEvents() {
    this.eventService.getEvents().pipe(takeUntil(this.ngUnsub))
        .subscribe(
            res => {
              this.events = (res.length === 0 ? MOCK_EVENTS : res);
              this.setDisplay();
            });
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
    this.submitted = false;
    this.imgurUpload = true;
    this.imageSrc = this.formEvent.image;
    this.showTable = false;
    this.showForm = true;
    this.f.startDate.setValue(this.parseFromDBDate(event.startDate).toISOString());
    this.f.endDate.setValue(this.parseFromDBDate(event.endDate).toISOString());
  }

  hideForm() {
    this.imageSrc = '';
    this.showTable = true;
    this.showForm = false;
    this.formEvent = {...this.emptyEvent};
    this.f.startDate.reset();
    this.f.endDate.reset();
  }

  submitForm() {
    this.submitted = true;
    console.log(this.eventForm);
    if (this.eventForm.invalid) { return; }
    // Create JSON body and parse dates
    const submitEvent = {...this.formEvent};
    submitEvent.startDate = this.parseToDBDate(this.f.startDate.value);
    submitEvent.endDate = this.parseToDBDate(this.f.endDate.value);

    if (this.imageSrc !== '') {
      // POST to imgur and retrieve link
      const imgurLink = this.imgur.uploadImg(this.extractData(this.imageSrc));
      imgurLink.pipe(takeUntil(this.ngUnsub)).subscribe(res => {
        submitEvent.image = res['data']['link'];
          this.imgurUpload = submitEvent.image !== '';
          if (this.imgurUpload) {
            const response = this.createEvent ? this.eventService.addEvent(submitEvent) : this.eventService.updateEvent(submitEvent);
            response.pipe(takeUntil(this.ngUnsub)).subscribe(() => {
              this.getEvents();
              this.hideForm();
            });
          }
      });
    } else {
      submitEvent.image = '';
      const response = this.createEvent ? this.eventService.addEvent(submitEvent) : this.eventService.updateEvent(submitEvent);
      response.pipe(takeUntil(this.ngUnsub)).subscribe(() => {
        this.getEvents();
        this.hideForm();
      });
    }
  }

  removeEvent(id: number) {
    this.eventService.deleteEvent(id).pipe(takeUntil(this.ngUnsub)).subscribe(() =>
        this.getEvents());
  }

  extractData(dataUrl: string): string {
    // TODO: Add error checking for dataURL base64 extraction
    return dataUrl.split(',')[1];
  }

  parseFromDBDate(dateStr: string): Date {
    const [date, time] = dateStr.split(' ');
    const [year, month, day] = date.split('-').map(str => parseInt(str, 10));
    const [hour, min, sec] = date.split(':').map(str => parseInt(str, 10));
    return new Date(year, month - 1, day, hour, min, sec);
  }

  parseToDBDate(isoStr: string): string {
    // parse from ISO value into yyyy-mm-dd hh:mm:ss
    const [yyyymmdd, hhmmss] = new Date(isoStr).toISOString().split(/[T.Z]/);
    console.log(yyyymmdd, hhmmss);
    return `${yyyymmdd} ${hhmmss}`;
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

  setDisplay() {
    this.displayEvents = this.events.filter(
        s => s.name.toLowerCase().includes(this.searchText.toLowerCase())
            || s.description.toLowerCase().includes(this.searchText.toLowerCase())
            || s.registerLink.toLowerCase().includes(this.searchText.toLowerCase())
            || s.status === this.searchText,
    );
  }

  resetSearch() {
    this.searchText = '';
    this.setDisplay();
  }

  onClearSearch() {
    if (this.searchText === '') { this.setDisplay(); }
  }

  ngOnDestroy(): any {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
