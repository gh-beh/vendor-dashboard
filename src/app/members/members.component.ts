import {Component, OnDestroy, OnInit} from '@angular/core';
import {Member, MOCK_MEMBERS, NULL_MEMBER} from './member';
import {MembersService} from '../services/members.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {
  createMember: boolean;
  displayMembers = MOCK_MEMBERS;
  mockMembers: Member[];
  showTable: boolean;
  showForm: boolean;
  formMember: Member;
  emptyMember: Member;

  private ngUnsub: Subject<any> = new Subject();

  constructor(private memberService: MembersService) { }

  ngOnInit() {
    /*
    this.mockMembers = MOCK_MEMBERS;
    this.mockMembers.sort((a, b) => a.gradYear < b.gradYear ? -1 : a.gradYear === b.gradYear ? 0 : 1);
    this.displayMembers = this.mockMembers;
    */
    this.memberService.getMembers()
        .subscribe(members => this.displayMembers = (members.length === 0 ? MOCK_MEMBERS : members));
    this.showTable = true;
    this.showForm = false;
    this.emptyMember = NULL_MEMBER;
    this.formMember = this.emptyMember;
  }

  addMember() {
    this.createMember = true;
    this.displayForm(this.emptyMember);
  }

  editMember(member: Member) {
    this.createMember = false;
    this.displayForm(member);
  }

  displayForm(member: Member) {
    this.formMember = {...member};
    this.showTable = false;
    this.showForm = true;
  }

  hideForm() {
    this.showTable = true;
    this.showForm = false;
    this.formMember = {...this.emptyMember};
  }

  submitForm() {
    // POST here
    const submitMember = {...this.formMember};
    if (this.createMember) { this.memberService.addMember(submitMember); } else { this.memberService.updateMember(submitMember); }
    this.hideForm();
  }

  ngOnDestroy(): any {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
