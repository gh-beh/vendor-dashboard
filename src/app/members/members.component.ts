import { Component, OnInit } from '@angular/core';
import {Member, MOCK_MEMBERS} from './member';

@Component({
  selector: 'app-user-profile',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  mockMembers: Member[];
  showTable: boolean;
  showForm: boolean;
  formMember: Member;
  emptyMember: Member;

  constructor() { }

  ngOnInit() {
    this.mockMembers = MOCK_MEMBERS;
    this.mockMembers.sort((a, b) => a.gradYear < b.gradYear ? -1 : a.gradYear === b.gradYear ? 0 : 1);
    this.showTable = true;
    this.showForm = false;
    this.emptyMember = {
      name: '',
      id: '',
      email: '',
      addr: '',
      contactNo: '',
      city: '',
      gradUni: '',
      gradProg: '',
      gradYear: 0,
    };
    this.formMember = this.emptyMember;
  }

  toggleForm(member: Member) {
    this.formMember = member;
    this.showTable = !this.showTable;
    this.showForm = !this.showForm;
  }
}
