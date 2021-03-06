import { Component, OnInit } from '@angular/core';
import { RaidBossService } from '../../services/raid-boss.service';
import { RaidBossInstance } from 'src/app/models/raid-boss-instance';
import { flatMap } from "rxjs/operators";

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

  // Note this requires read side DB and is not implemented in the cloudstate version yet
  // getGroupBossesSince(event) {
  //   this.raidBossService.getGroupBossesSince(event.groupId, event.time).subscribe(bosses => {
  //     map((boss: RaidBossInstance) => {
  //       var existing = this.raidbosses.find(b1 => b1.instanceId == boss.instanceId);
  //       if(existing) {
  //         existing = boss
  //       } else {
  //         this.raidbosses.push(boss)
  //       }
  //     })(bosses);
  //   });
  // }

  addRaidBoss(raidBoss) {
    this.raidBossService.createBoss(raidBoss.instanceId, raidBoss.groupId, raidBoss.bossDefinitionId)
    .pipe(
      flatMap(result =>
        this.raidBossService.viewBoss(raidBoss.instanceId))
    ).subscribe(boss => {

      var existingBoss = this.raidbosses.find(boss => raidBoss.instanceId == boss.instanceId);
      if(existingBoss) {
        // update local boss
        console.log("Updating boss ", boss.instanceId, existingBoss);
        if(existingBoss) {
          existingBoss.health = boss.health;
        }
      } else {
        console.log("Adding boss ", boss, "from", raidBoss, " event");
        this.raidbosses.push(boss);
      }
    });
  }

  attackRaidBoss(event) {
    this.raidBossService.attackBoss(event.bossInstanceId, event.playerId, event.damage)
    .pipe(
      flatMap(result =>
        this.raidBossService.viewBoss(event.bossInstanceId))
    )
    .subscribe(
      result  => {
        // update local boss things that have changed
        var x = this.raidbosses.find(boss => boss.instanceId == event.bossInstanceId);
        if(x) {
          x.health = result.health
          x.leaderboard = result.leaderboard
          x.killedBy = result.killedBy
        }
    });
  }

}
