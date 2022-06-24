import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/vendor/open', title: 'Open Listings',  icon: 'computer', class: '' },
    { path: '/vendor/accepted', title: 'Accepted Listings',  icon: 'person', class: '' },
    { path: '/vendor/cancelled', title: 'Cancelled Listings',  icon: 'person', class: '' },
    { path: '/vendor/information', title: 'Vendor Information',  icon: 'person', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      return $(window).width() <= 991;
  };
}
