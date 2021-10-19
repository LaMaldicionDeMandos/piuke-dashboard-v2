import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {startLoadingIndicator, stopLoadingIndicator} from "@btapai/ng-loading-indicator";
import {ItemsService} from "../../services/items.service";
import {CompetitionProduct} from "../../models/competition.product";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-price-alerts",
  templateUrl: "price-alerts.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./price-alerts.component.scss'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class PriceAlertsComponent implements OnInit {
  items: CompetitionProduct[];

  closeResult = '';
  constructor(private itemsService: ItemsService, private modalService: NgbModal) {
    this.getCompetitions();
  }

  ngOnInit() {}

  @startLoadingIndicator()
  getCompetitions() {
    this.itemsService.getCompetitions()
      .then(items => this.items = items)
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

  open(content) {
    this.modalService.open(content, {modalDialogClass: 'dark-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
