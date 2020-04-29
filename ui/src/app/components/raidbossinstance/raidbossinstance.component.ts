import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RaidBossInstance } from 'src/app/models/raid-boss-instance';

@Component({
  selector: 'app-raidbossinstance',
  templateUrl: './raidbossinstance.component.html',
  styleUrls: ['./raidbossinstance.component.sass']
})
export class RaidbossinstanceComponent implements OnInit {

  @Input() activeBoss : RaidBossInstance;
  @Output() attackRaidBoss: EventEmitter<any> = new EventEmitter();

  playerId:string = "";
  damage:number = 10;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.attackRaidBoss.emit({
      bossInstanceId: this.activeBoss.instanceId,
      playerId: this.playerId,
      damage: this.damage
    })
  }

}
