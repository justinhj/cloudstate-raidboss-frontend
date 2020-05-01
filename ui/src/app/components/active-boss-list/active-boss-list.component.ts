import { Component, OnInit } from '@angular/core';
import { RaidBossService } from '../../services/raid-boss.service';
import { RaidBossInstance } from 'src/app/models/raid-boss-instance';
import map from "lodash/fp/map";

// TODO rename this, it is just a list of boss instances
// not an active boss list

@Component({
  selector: 'app-active-boss-list',
  templateUrl: './active-boss-list.component.html',
  styleUrls: ['./active-boss-list.component.sass']
})
export class ActiveBossListComponent implements OnInit {

  activeBoss : RaidBossInstance;

  raidbosses: RaidBossInstance[] = [
  ]

  constructor(private raidBossService: RaidBossService) {
  }

  ngOnInit() {
  }

  clickRaidBoss(boss) {
    this.activeBoss = boss
  }

  getGroupBossesSince(event) {
    this.raidBossService.getGroupBossesSince(event.groupId, event.time).subscribe(bosses => {
      map((boss: RaidBossInstance) => {
        var existing = this.raidbosses.find(b1 => b1.instanceId == boss.instanceId);
        if(existing) {
          existing = boss
        } else {
          this.raidbosses.push(boss)
        }
      })(bosses);
    });
  }

  addRaidBoss(raidBoss) {
    this.raidBossService.createBoss(raidBoss.groupId, raidBoss.bossDefinitionId).subscribe(boss => {
      this.raidbosses.push(boss);
    });
  }

  attackRaidBoss(event) {
    this.raidBossService.attackBoss(event.bossInstanceId, event.playerId, event.damage).subscribe(
      result  => {
        // if(result.damage > 0 && result.health == 0) {
        //   // TODO react to player killed boss
        // } else if (result.health == 0) {
        //   // TODO react to boss was dead
        // } else {
        //   // TODO react to normal damage event
        // }
        // update local boss
        var x = this.raidbosses.find(boss => boss.instanceId == event.bossInstanceId);
        if(x) {
          x.health = result.health
        }
    });
  }

}
