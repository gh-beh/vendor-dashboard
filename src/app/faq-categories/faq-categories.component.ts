import {Component, OnDestroy, OnInit} from '@angular/core';
import {FaqCat, MOCK_FAQ_CATS, NULL_FAQ_CAT} from '../faq/faq';
import {FaqCatService} from '../services/faq-cat.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-faq-category',
  templateUrl: './faq-categories.component.html',
  styleUrls: ['./faq-categories.component.css']
})
export class FaqCategoryComponent implements OnInit, OnDestroy {
  displayFaqCats: FaqCat[];
  showTable: boolean;
  showForm: boolean;
  formFaqCat: FaqCat;
  emptyFaqCat: FaqCat;
  createFaqCat: boolean;

  private ngUnsub: Subject<any> = new Subject();

  constructor(private faqCatService: FaqCatService) { }

  ngOnInit() {
    this.faqCatService.getFaqCats().pipe(takeUntil(this.ngUnsub))
        .subscribe(res =>
            this.displayFaqCats = (res.length === 0 ? MOCK_FAQ_CATS : res));
    this.showTable = true;
    this.showForm = false;
    this.emptyFaqCat = NULL_FAQ_CAT;
    this.formFaqCat = this.emptyFaqCat;
  }

  addFaqCat() {
    this.createFaqCat = true;
    this.displayForm(this.emptyFaqCat);
  }

  editFaqCat(faqCat: FaqCat) {
    this.createFaqCat = false;
    this.displayForm(faqCat);
  }

  displayForm(faqCat: FaqCat) {
    this.formFaqCat = {...faqCat};
    this.showTable = false;
    this.showForm = true;
  }

  hideForm() {
    this.showTable = true;
    this.showForm = false;
    this.formFaqCat = {...this.emptyFaqCat};
  }

  submitForm() {
    // POST here
    const submitFaq = {...this.formFaqCat};
    const response = this.createFaqCat
        ? this.faqCatService.addFaqCat(submitFaq)
        : this.faqCatService.updateFaqCat(submitFaq);
    response.pipe(takeUntil(this.ngUnsub)).subscribe();
    this.hideForm();
  }

  ngOnDestroy(): any {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
