import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, Validators, FormGroup, AbstractControl} from '@angular/forms';
import {MOCK_VENDOR, Vendor} from '../models/vendor';
import {Driver, MOCK_DRIVERS} from '../models/driver';
import {Bus, MOCK_BUSES} from '../models/bus';

@Component({
  selector: 'app-vendor-info',
  templateUrl: './vendor-info.component.html',
  styleUrls: ['./vendor-info.component.css']
})
export class VendorInfoComponent implements OnInit, OnDestroy {
  faqForm: FormGroup;
  vendor: Vendor;
  submitted = false;
  drivers: Driver[];
  buses: Bus[];

  private ngUnsub: Subject<any> = new Subject();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.vendor = MOCK_VENDOR;
    this.drivers = MOCK_DRIVERS;
    this.buses = MOCK_BUSES;
    this.faqForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        phoneNo: ['', Validators.required],
        icNo: ['', Validators.required],
        address: ['', Validators.required],
        permitStartDate: ['', Validators.required],
        permitEndDate: ['', Validators.required],
      },
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.faqForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.faqForm.invalid) { return; }
    // POST here
    const submitVendor = {...this.vendor};
    // const response = this.vendorService.updateVendor;
    // response.pipe(takeUntil(this.ngUnsub)).subscribe(() => {
    //   this.getFaqs();
    //   this.hideForm();
    // });
  }

  ngOnDestroy(): any {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
