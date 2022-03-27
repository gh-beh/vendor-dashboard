import {Component, OnDestroy, OnInit} from '@angular/core';
import {Alumni, MOCK_MEMBERS, NULL_MEMBER} from '../models/alumni';
import {AlumniService} from '../services/alumni.service';
import {Subject} from 'rxjs';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent implements OnInit, OnDestroy {
  createAlumni: boolean;
  alumniForm: FormGroup;
  failToLoad = false;
  displayAlumni = [];
  alumnis: Alumni[];
  mockAlumni: Alumni[];
  showTable: boolean;
  showForm: boolean;
  formAlumni: Alumni;
  emptyAlumni: Alumni;
  submitted = false;
  searchText = '';

  private ngUnsub: Subject<any> = new Subject();

  constructor(private memberService: AlumniService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    /*
    this.mockMembers = MOCK_MEMBERS;
    this.mockMembers.sort((a, b) => a.gradYear < b.gradYear ? -1 : a.gradYear === b.gradYear ? 0 : 1);
    this.displayMembers = this.mockMembers;
    */
    this.getAlumnis();
    this.showTable = true;
    this.showForm = false;
    this.emptyAlumni = NULL_MEMBER;
    this.formAlumni = this.emptyAlumni;
    this.alumniForm = this.formBuilder.group(
        {
          name: ['', Validators.required],
          identificationCard: ['', Validators.required],
          studentId: ['', Validators.required],
          personalEmail: ['', [Validators.required, Validators.email]],
          studentHandphone: ['', Validators.required],
          studentTelephoneNumber: ['', Validators.required],
          graduatingCampus: ['', Validators.required],
          yearOfGraduation: ['', Validators.required, Validators.min(0)],
          graduatingProgramme: ['', Validators.required],
          graduatedProgrammeName: ['', Validators.required],
          levelOfStudy: ['', Validators.required],
        }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.alumniForm.controls;
  }

  getAlumnis() {
    this.memberService.getMembers().pipe(takeUntil(this.ngUnsub))
      .subscribe(
        res => {
          this.failToLoad = res.length === 0;
          this.alumnis = (res.length === 0 ? MOCK_MEMBERS : res);
          this.setDisplay();
        });
  }

  addMember() {
    this.createAlumni = true;
    this.displayForm(this.emptyAlumni);
  }

  editAlumni(alumni: Alumni) {
    this.createAlumni = false;
    this.displayForm(alumni);
  }

  removeAlumni(id: number) {
    this.memberService.deleteMember(id).pipe(takeUntil(this.ngUnsub)).subscribe(() =>
        this.getAlumnis());
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
    response.pipe(takeUntil(this.ngUnsub)).subscribe(() => {
      this.getAlumnis();
      this.hideForm();
    });
  }

  setDisplay() {
    this.displayAlumni = this.alumnis.filter(
      s => s.name.toLowerCase().includes(this.searchText.toLowerCase())
        || s.personalEmail.toLowerCase().includes(this.searchText.toLowerCase())
        || s.graduatingCampus.toLowerCase().includes(this.searchText.toLowerCase())
        || s.levelOfStudy.toLowerCase().includes(this.searchText.toLowerCase())
        || s.studentId.toLowerCase().includes(this.searchText.toLowerCase())
        || s.studentHandphone.toLowerCase().includes(this.searchText.toLowerCase()),
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
