import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {startLoadingIndicator, stopLoadingIndicator} from "@btapai/ng-loading-indicator";
import {ItemsService} from "../../services/items.service";
import {Competition, CompetitionProduct} from "../../models/competition.product";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as _ from 'lodash';

@Component({
  selector: "app-price-alerts",
  templateUrl: "price-alerts.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./price-alerts.component.scss'],
})
export class PriceAlertsComponent implements OnInit {
  items: any[];
  alerts: CompetitionProduct[];
  currentItem: CompetitionProduct;

  closeResult = '';
  constructor(private itemsService: ItemsService, private modalService: NgbModal) {
    this.getCompetitions();
  }

  ngOnInit() {}

  @startLoadingIndicator()
  getCompetitions() {
    this.itemsService.getCompetitions()
      .then(items => _.map(items, item => _.assign(item, {isCollapsed: true})))
      .then(items => this.items = items)
      .then(items => this.alerts = _.filter(items, this.filterAlerts))
      .then(this.triggerLoadingIndicatorStop)
      .catch(this.triggerLoadingIndicatorStop)
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }

  log(text) {
    alert(text);
  }

  open(content, item: CompetitionProduct) {
    this.currentItem = item;
    this.modalService.open(content, {modalDialogClass: 'dark-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${JSON.stringify(result)}`;
      console.log(this.closeResult);
      this.addNewCompetition(result);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  toggleItem(item) {
    item.isCollapsed = !item.isCollapsed;
  }

  checkCompetitionUpdate(item: CompetitionProduct, comp: Competition) {
    const allChecked = _.every(item.competitions, {checked: true});
    const promise = allChecked ? this.itemsService.syncItemCompetitions(item) : this.itemsService.updateCompetition(item, comp);
    promise.then(this.updateCompetition);
  }

  syncCompetitions(item: CompetitionProduct) {
    this.itemsService.syncItemCompetitions(item).then(this.updateCompetition);
  }

  private updateCompetition = (item: CompetitionProduct) => {
    const index = _.findIndex(this.items, (it) => it.id === item.id);
    this.items.splice(index, 1, item);
    this.alerts = _.filter(this.items, this.filterAlerts);
  }

  private filterAlerts(item: CompetitionProduct): boolean {
    return _.some(item.competitions, comp => comp.newPrice !==  comp.oldPrice);
  }

  private async addNewCompetition(competitionData) {
    console.log(`Nuew competition to ${this.currentItem.code} -> ${JSON.stringify(competitionData)}`);
    const newItem = await this.itemsService.newCompetitions(this.currentItem, competitionData.owner_id, competitionData.item_id);
    this.currentItem = undefined;
    const item = _.find(this.items, item => item.code === newItem.code);
    if (item) item.competitions = newItem.competitions;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
