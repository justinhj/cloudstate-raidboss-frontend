import { Component, OnInit, Input, Output } from '@angular/core';
import { RaidBossService } from '../../services/raid-boss.service';
import { RaidBossInstance } from 'src/app/models/raid-boss-instance';

@Component({
  selector: 'app-active-boss',
  templateUrl: './active-boss.component.html',
  styleUrls: ['./active-boss.component.sass']
})
export class ActiveBossComponent implements OnInit {

  @Input() raidBossInstance: RaidBossInstance;

  constructor(private raidBossService: RaidBossService) { }

  ngOnInit() {
  }

}
