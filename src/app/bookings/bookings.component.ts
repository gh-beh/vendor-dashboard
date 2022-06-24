import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AbstractControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {Booking, MOCK_BOOKINGS, NULL_BOOKING} from '../models/booking';
import {Driver, MOCK_DRIVERS} from '../models/driver';
import {Bus, MOCK_BUSES} from '../models/bus';

@Component({
  selector: 'app-table-list',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit, OnDestroy {
  bookingForm: FormGroup;
  bookings: Booking[] = [];
  showTable = true;
  showForm = false;
  formBooking: Booking;
  emptyBooking: Booking;
  submitted = false;
  driverMappings: any = {};
  busMappings: any = {};
  driverIdMappings: any[] = [];
  busIdMappings: any[] = [];
  drivers: Driver[] = [];
  buses: Bus[] = [];

  private ngUnsub: Subject<any> = new Subject();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBookings();
    this.drivers = MOCK_DRIVERS;
    this.buses = MOCK_BUSES;
    this.showTable = true;
    this.showForm = false;
    this.formBooking = NULL_BOOKING;
    this.bookingForm = this.formBuilder.group(
        {
          vehicle: ['', Validators.required],
          driver: ['', Validators.required],
        }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.bookingForm.controls;
  }

  getDriverMappings(busMapping: any) {
    const mapping = {};
    const busPlateNos = Object.values(this.busMappings);
    for (const driver of this.drivers) {
      if (busPlateNos.find(bpn => bpn === driver.busPlateNo)) {
        mapping[driver.id] = driver.name;
      }
    }
    this.driverMappings = mapping;
    this.driverIdMappings = Object.keys(mapping);
  }

  getBusMappings(passengerCount: number, busType: string) {
    const mapping = {};
    for (const bus of this.buses) {
      if (bus.capacity >= passengerCount && bus.busType === busType) {
        mapping[bus.id] = bus.busPlateNo;
      }
    }
    this.busMappings = mapping;
    this.busIdMappings = Object.keys(mapping);
  }

  getBookings() {
    this.bookings = MOCK_BOOKINGS;
  }

  editBooking(booking: Booking) {
    this.displayForm(booking);
  }

  displayForm(booking: Booking) {
    this.formBooking = {...booking};
    this.submitted = false;
    this.showTable = false;
    this.showForm = true;
    this.getBusMappings(booking.passengerCount, booking.busType);
    this.getDriverMappings(this.busMappings);
  }

  hideForm() {
    this.showTable = true;
    this.showForm = false;
    this.formBooking = {...this.emptyBooking};
    this.driverMappings = {};
    this.busMappings = {};
  }

  submitForm() {
    this.submitted = true;
    // console.log(this.startTime);
    if (this.bookingForm.invalid) { return; }
    // // Create JSON body and parse dates
    // const submitEvent = {...this.formBooking};
    // submitEvent.startDate = this.parseToDBDate(this.f.startDate.value, this.f.startTime.value);
    // submitEvent.endDate = this.parseToDBDate(this.f.endDate.value,  this.f.endTime.value);
    //
    // if (this.imageSrc !== submitEvent.image) {
    //   // POST to imgur and retrieve link
    //   const imgurLink = this.imgur.uploadImg(this.extractData(this.imageSrc));
    //   imgurLink.pipe(takeUntil(this.ngUnsub)).subscribe(res => {
    //     submitEvent.image = res['data']['link'];
    //       this.imgurUpload = submitEvent.image !== '';
    //       if (this.imgurUpload) {
    //         const response = this.createEvent ? this.eventService.addEvent(submitEvent) : this.eventService.updateEvent(submitEvent);
    //         response.pipe(takeUntil(this.ngUnsub)).subscribe(() => {
    //           this.getEvents();
    //           this.hideForm();
    //         });
    //       }
    //   });
    // } else {
    //   submitEvent.image = submitEvent.image || '';
    //   const response = this.createEvent ? this.eventService.addEvent(submitEvent) : this.eventService.updateEvent(submitEvent);
    //   response.pipe(takeUntil(this.ngUnsub)).subscribe(() => {
    //     this.getEvents();
    this.hideForm();
    //   });
    // }
  }

  parseFromDBDate(dateStr: string): Date {
    // from yyyy-mm-dd hh:mm:ss to date
    const [date, time] = dateStr.split(' ');
    const [year, month, day] = date.split('-').map(str => parseInt(str, 10));
    const [hour, min, sec] = time.split(':').map(str => parseInt(str, 10));
    return new Date(year, month - 1, day, hour, min, sec);
  }

  parseToDBDate(date: Date, time: NgbTimeStruct): string {
    // parse from ISO value into yyyy-mm-dd hh:mm:ss
    const {hour, minute} = time;
    date.setHours(hour);
    date.setMinutes(minute);
    // Fix timezone to GMT +8, en-GB locale format "dd/mm/yyyy, hh:mm:ss"
    const [dd, mm] = date.toLocaleString('en-GB', {timeZone: 'Singapore'}).split(/[/, ]/);
    let [, , yyyy] = date.toLocaleString('en-GB', {timeZone: 'Singapore'}).split(/[/, ]/);
    const [, , , , hhmmss] = date.toString().split(' ');
    // Manual error catching to prevent bad data passed into db crashing api server
    if (parseInt(yyyy, 10) < 1970) { yyyy = '1970' }
    return `${yyyy}-${mm}-${dd} ${hhmmss}`;
  }

  ngOnDestroy(): any {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
