import { Component, OnInit } from '@angular/core';
import { Event, MOCK_EVENTS } from './event';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  mockEvents: Event[];
  showTable: boolean;
  showForm: boolean;
  formEvent: Event;
  emptyEvent: Event;

  constructor() { }

  ngOnInit() {
    this.mockEvents = MOCK_EVENTS;
    this.mockEvents.sort((a, b) => a.recordStatus ? b.recordStatus ? 0 : -1 : b.recordStatus ? 1 : 0);
    this.showTable = true;
    this.showForm = false;
    this.emptyEvent = {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      recordStatus: true,
      registerUrl: '',
      imgUrl: '',
      desc: '',
    };
    this.formEvent = this.emptyEvent;
  }

  toggleForm(event: Event) {
    this.formEvent = event;
    this.showTable = !this.showTable;
    this.showForm = !this.showForm;
  }
}
