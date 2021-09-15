import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path?: string;
  title: string;
  icon?: string;
  class?: string;
  expanded?: boolean;
  sub?: RouteInfo[];
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/stock",
    title: "Juguetes",
    icon: "zmdi zmdi-toys",
    class: ""
  },
  {
    path: "/sales",
    title: "Ventas",
    icon: "zmdi zmdi-shopping-basket",
    class: ""
  },
  {
    title: 'Balance',
    icon: "tim-icons icon-chart-pie-36",
    path: "/balance",
    sub: [
      {title: 'Gastos', path: '/expenses', icon: 'zmdi zmdi-money-box'},
      {title: 'Saldos', path: '/balance', icon: 'zmdi zmdi-balance-wallet'}
    ]
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  toggleSubMenu(item) {
    item.expanded = !item.expanded;
  }
}
