import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { RaidBossInstance } from '../models/raid-boss-instance';
import { RaidBossAttackResult } from '../models/raid-boss-attack-result';
import { WebsocketService } from "./websocket.service";
import { map } from 'rxjs/operators';

const FEED_URL = "ws://localhost:4200/raidbossapi/stream/raidboss/all-events";

export interface RaidBossEventMessage {
  type:string;
  groupId:string;
  bossInstanceId:string;
  time:number; // time created, time killed
  bossDefinitionId:string;
  leaderboard; // not sent with create TODO array of [string, number]
}

@Injectable({
  providedIn: 'root'
})
export class RaidBossService implements OnInit {

  public messages: Subject<RaidBossEventMessage>;

  // TODO hostname should go in config
  base_url = "localhost:4200/raidbossapi/raidboss/"

/*
  TODO how should you handle polymorphism on the client side?
  in this case it would make sense to just aggregate the fields into a common structure
  with type being the main difference.
  ideally you'd want to handle a more divergent polymorphic message class

    [Log] response:
    note type RaidBossCreated
    {"groupId":"TopDudes1",
    "bossInstanceId":"raidbossinstance-TopDudes1-BigHairyNero-1573700238567",
    "time":1573700250042,
    "type":"RaidBossCreated",
    "bossDefinitionId":"BigHairyNero"}
    note type RaidBossDied
    [Log] response:
    {"leaderboard":[["Justin",910]],
    "groupId":"TopDudes1",
    "time":1573700283034,
    "bossInstanceId":"raidbossinstance-TopDudes1-BigHairyNero-1573700238567",
    "type":"RaidBossDied",
    "bossDefinitionId":"BigHairyNero"}
 */

  constructor(private http: HttpClient, private webSocketService : WebsocketService) {
    webSocketService.connect(FEED_URL).subscribe({
      next: (response: MessageEvent) => {
        let data = JSON.parse(response.data);
        console.log(`Received data ${JSON.stringify(data)}`);
        // return {
        //   type: data.type,
        //   groupId: data.groupId,
        //   bossInstanceId: data.bossInstanceId,
        //   time: data.time, // time created, time killed
        //   bossDefinitionId: data.bossDefinitionId,
        //   leaderboard: data.leaderboard // not sent with create TODO array of [string, number]
        // };
      }
    });
  }

  createBoss(groupId: string, bossDefinitionId: string): Observable<any> {
    return this.http.post("http://" + this.base_url + "create/" + groupId + "/" + bossDefinitionId, null, {})
  }

  // case class RaidBossAttackResultMessage(
  //   damage: Long,
  //   health: Long)

  // Handle attacks
  attackBoss(bossInstanceId: string, playerId: string, damage: number) : Observable<any> {
    return this.http.put("http://" + this.base_url + "attack/" + bossInstanceId + "/"
      + playerId + "/" + damage, null, {})
  }

  // Get all bosses by group Id and date, used for example when a player wants to find bosses
  // to fight or view dead ones...
  getGroupBossesSince(groupId: string, time: number) : Observable<any> {
    return this.http.get("/raidbossapi/raidboss/list/" + groupId + "/" + time)
  }

  ngOnInit() {
  }
}
