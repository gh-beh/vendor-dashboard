export interface Faq {
    question: string,
    answer: string,
    faqCatId: number,
    faqId: number,
    recordStatus: boolean,
}

export interface FaqCat {
    faqCatId: number,
    name: string,
    recordStatus: boolean,
}

export const NULL_FAQ: Faq = {
    question: '',
    answer: '',
    faqCatId: 0,
    faqId: 0,
    recordStatus: true,
};

export const NULL_FAQ_CAT: FaqCat = {
    faqCatId: 0,
    name: '',
    recordStatus: true,
};

export const MOCK_FAQ_CATS: FaqCat[] = [
    {
        faqCatId: 1,
        name: 'Category 1',
        recordStatus: true,
    },
    {
        faqCatId: 2,
        name: 'Category 2',
        recordStatus: true,
    },
    {
        faqCatId: 3,
        name: 'Category 3',
        recordStatus: false,
    },
];

export const MOCK_FAQS: Faq[] = [
    {
        question: 'What?',
        answer: 'Yes',
        faqCatId: 1,
        faqId: 1,
        recordStatus: true,
    }, {
        question: 'Who?',
        answer: 'Yes',
        faqCatId: 2,
        faqId: 2,
        recordStatus: false,
    }, {
        question: 'When?',
        answer: 'Yes',
        faqCatId: 3,
        faqId: 3,
        recordStatus: true,
    }, {
        question: 'Where?',
        answer: 'Yes',
        faqCatId: 2,
        faqId: 4,
        recordStatus: true,
    }, {
        question: 'Why?',
        answer: 'Yes',
        faqCatId: 1,
        faqId: 5,
        recordStatus: true,
    }, {
        question: 'How?',
        answer: 'Yes',
        faqCatId: 1,
        faqId: 6,
        recordStatus: true,
    },
];
