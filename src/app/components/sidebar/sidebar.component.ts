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
    title: "Productos",
    icon: "zmdi zmdi-shape",
    sub:  [
      {title: 'Juguetes', path: '/products', icon: 'zmdi zmdi-toys'},
      {title: 'Stock', path: '/stock', icon: 'zmdi zmdi-widgets'},
      {title: 'Inflación', path: '/competition', icon: 'zmdi zmdi-notifications'},
    ]
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
      {title: 'Saldos', path: '/balance', icon: 'zmdi zmdi-balance-wallet'},
      {title: 'Performance', path: '/performance', icon: 'tim-icons icon-chart-pie-36'}
    ]
  },
  {
    title: 'Analisis de mercado',
    icon: "zmdi zmdi-search-in-file",
    path: "/analist",
    sub: [
      {title: 'Best Sellers', path: '/bestsellers', icon: 'tim-icons icon-trophy'},
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
