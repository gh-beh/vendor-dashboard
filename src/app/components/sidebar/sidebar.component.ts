import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'computer', class: '' },
    { path: '/member-listing', title: 'Alumni Listing',  icon: 'person', class: '' },
    { path: '/event-activities', title: 'Event & Activities',  icon: 'account_balance', class: '' },
    // { path: '/loyalty-rewards', title: 'Loyalty & Rewards',  icon: 'redeem', class: '' },
    // { path: '/login', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

export const FAQ_ITEMS: RouteInfo[] = [
    { path: '/faq', title: 'Questions',  icon: 'question_answer', class: '' },
    { path: '/faq-categories', title: 'Categories',  icon: 'format_list_bulleted', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  faqItems: RouteInfo[];
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.faqItems = FAQ_ITEMS.filter(item => item);
  }
  isMobileMenu() {
      return $(window).width() <= 991;
  };
}
