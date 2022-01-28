import {Component, OnDestroy, OnInit} from '@angular/core';
import {Faq, FaqCat, MOCK_FAQ_CATS, MOCK_FAQS, NULL_FAQ} from './faq';
import {FaqService} from '../services/faq.service';
import {FaqCatService} from '../services/faq-cat.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, OnDestroy {
  mockFaqs: Faq[];
  displayFaqs: Faq[];
  faqCats: FaqCat[];
  showTable: boolean;
  showForm: boolean;
  formFaq: Faq;
  emptyFaq: Faq;
  createFaq: boolean;

  private ngUnsub: Subject<any> = new Subject();

  constructor(private faqService: FaqService, private faqCatService: FaqCatService) { }

  ngOnInit() {
    /* MOCKING
    this.mockFaqs = MOCK_FAQS;
    this.mockFaqs.sort((a, b) =>
      a.recordStatus
        ? b.recordStatus ? 0 : -1
        : b.recordStatus ? 1 : 0);
    this.displayFaqs = this.mockFaqs;
    */
    this.faqCatService.getFaqCats().pipe(takeUntil(this.ngUnsub))
        .subscribe(res => {
          this.faqCats = (res.length === 0 ? MOCK_FAQ_CATS : res);
          this.faqCats.sort((a, b) =>
              a.faqCatId < b.faqCatId
                  ? -1
                  : a.faqCatId > b.faqCatId ? 1 : 0);
        });
    this.faqService.getFaqs().pipe(takeUntil(this.ngUnsub))
        .subscribe(res =>
            this.displayFaqs = (res.length === 0 ? MOCK_FAQS : res));
    this.showTable = true;
    this.showForm = false;
    this.emptyFaq = NULL_FAQ;
    this.formFaq = this.emptyFaq;
  }

  addFaq() {
    this.createFaq = true;
    this.displayForm(this.emptyFaq);
  }

  editFaq(faq: Faq) {
    this.createFaq = false;
    this.displayForm(faq);
  }

  displayForm(faq: Faq) {
    this.formFaq = {...faq};
    this.showTable = false;
    this.showForm = true;
  }

  hideForm() {
    this.showTable = true;
    this.showForm = false;
    this.formFaq = {...this.emptyFaq};
  }

  submitForm() {
    // POST here
    const submitFaq = {...this.formFaq};
    const response = this.createFaq
        ? this.faqService.addFaq(submitFaq)
        : this.faqService.updateFaq(submitFaq);
    response.pipe(takeUntil(this.ngUnsub)).subscribe();
    this.hideForm();
  }

  ngOnDestroy(): any {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
