import {Component, OnDestroy, OnInit} from '@angular/core';
import {Alumni, MOCK_MEMBERS, NULL_MEMBER} from './alumni';
import {AlumniService} from '../services/alumni.service';
import {Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent implements OnInit, OnDestroy {
  createAlumni: boolean;
  failToLoad = false;
  displayAlumni = MOCK_MEMBERS;
  mockAlumni: Alumni[];
  showTable: boolean;
  showForm: boolean;
  formAlumni: Alumni;
  emptyAlumni: Alumni;
  tempPassword = new FormControl('');

  private ngUnsub: Subject<any> = new Subject();

  constructor(private memberService: AlumniService) { }

  ngOnInit() {
    /*
    this.mockMembers = MOCK_MEMBERS;
    this.mockMembers.sort((a, b) => a.gradYear < b.gradYear ? -1 : a.gradYear === b.gradYear ? 0 : 1);
    this.displayMembers = this.mockMembers;
    */
    this.memberService.getMembers().pipe(takeUntil(this.ngUnsub))
        .subscribe(members => {
          this.displayAlumni = (members.length === 0 ? MOCK_MEMBERS : members);
          this.failToLoad = true;
        });
    this.showTable = true;
    this.showForm = false;
    this.emptyAlumni = NULL_MEMBER;
    this.formAlumni = this.emptyAlumni;
  }

  addMember() {
    this.createAlumni = true;
    this.displayForm(this.emptyAlumni);
  }

  editAlumni(alumni: Alumni) {
    this.createAlumni = false;
    this.displayForm(alumni);
  }

  displayForm(alumni: Alumni) {
    this.formAlumni = {...alumni};
    this.showTable = false;
    this.showForm = true;
  }

  hideForm() {
    this.showTable = true;
    this.showForm = false;
    this.formAlumni = {...this.emptyAlumni};
  }

  submitForm() {
    // POST here
    const submitAlumni = {...this.formAlumni};
    const response = this.createAlumni ? this.memberService.addMember(submitAlumni) : this.memberService.updateMember(submitAlumni);
    response.pipe(takeUntil(this.ngUnsub)).subscribe();
    this.hideForm();
  }

  ngOnDestroy(): any {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
