import { Component, OnInit } from '@angular/core';
import {Reward, MOCK_REWARDS} from './reward';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
  mockRewards: Reward[];
  showTable: boolean;
  showForm: boolean;
  formReward: Reward;
  emptyReward: Reward;

  constructor() { }

  ngOnInit() {
    this.mockRewards = MOCK_REWARDS;
    this.mockRewards.sort((a, b) => a.recordStatus ? b.recordStatus ? 0 : -1 : b.recordStatus ? 1 : 0);
    this.showTable = true;
    this.showForm = false;
    this.emptyReward = {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      recordStatus: true,
      loyaltyType: '',
      imgUrl: '',
      desc: '',
      barcode: '',
    };
    this.formReward = this.emptyReward;
  }

  toggleForm(reward: Reward) {
    this.formReward = reward;
    this.showTable = !this.showTable;
    this.showForm = !this.showForm;
  }
}
