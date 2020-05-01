import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { RaidBossInstance } from '../models/raid-boss-instance';
import { RaidBossAttackResult } from '../models/raid-boss-attack-result';
import { WebsocketService } from "./websocket.service";
import { map } from 'rxjs/operators';
import { RaidBossServiceClient, UnaryResponse, ServiceError } from "../../_proto/raidbossservice_pb_service";
import { RaidBossCreate, RaidBossAttack, RaidBossInstance as GrpcRaidBossInstance, LeaderboardEntry } from "../../_proto/raidbossservice_pb";
import {grpc} from "@improbable-eng/grpc-web";
import * as jspb from "google-protobuf";

//const FEED_URL = "ws://localhost:4200/raidbossapi/stream/raidboss/all-events";

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
  //private base_url = "localhost:4200/raidbossapi/raidboss/";

  // TODO hostname should go in config
  private raidbossClient = new RaidBossServiceClient('https://justin-test-1.us-east1.apps.lbcs.io');

  constructor(private http: HttpClient, private webSocketService : WebsocketService) {
    // This is dead for now but can be used to ingest data from a websocket
    // webSocketService.connect(FEED_URL).subscribe({
    //   next: (response: MessageEvent) => {
    //     let data = JSON.parse(response.data);
    //     console.log(`Received data ${JSON.stringify(data)}`);
    //     // return {
    //     //   type: data.type,
    //     //   groupId: data.groupId,
    //     //   bossInstanceId: data.bossInstanceId,
    //     //   time: data.time, // time created, time killed
    //     //   bossDefinitionId: data.bossDefinitionId,
    //     //   leaderboard: data.leaderboard // not sent with create TODO array of [string, number]
    //     // };
    //   }
    // });
  }

  private fromGrpcRaidBoss(grpcInstance: GrpcRaidBossInstance): RaidBossInstance {
    return new RaidBossInstance(grpcInstance.getBossDefId(),
      grpcInstance.getHealth(),
      grpcInstance.getBossInstanceId(),
      [], // TODO need to convert leaderboard type
      grpcInstance.getCreated(),
      grpcInstance.getUpdated(),
      grpcInstance.getGroupId());
  }

  createBoss(groupId: string, bossDefinitionId: string): Observable<RaidBossInstance> {

    let instance = "raidbossinstance-" + groupId + "-" + bossDefinitionId + "-" + Date.now();
    let message = new RaidBossCreate();
    message.setBossInstanceId(instance);
    message.setBossDefId(bossDefinitionId);
    message.setGroupId(groupId);

    return new Observable<RaidBossInstance>(obs => {
      const req = this.raidbossClient.createRaidBoss(message, (err: ServiceError, response: GrpcRaidBossInstance) => {
        if (err) {
          obs.error(err);
        }

        obs.next(this.fromGrpcRaidBoss(response));
        obs.complete();
      });

      return () => req.cancel();
    });
  }

  // case class RaidBossAttackResultMessage(
  //   damage: Long,
  //   health: Long)

  // Handle attacks
  attackBoss(bossInstanceId: string, playerId: string, damage: number) : Observable<RaidBossInstance> {
    // return this.http.put("http://" + this.base_url + "attack/" + bossInstanceId + "/"
    //   + playerId + "/" + damage, null, {})

    let message = new RaidBossAttack();
    message.setBossInstanceId(bossInstanceId);
    message.setDamage(damage);
    message.setPlayerId(playerId);

    return new Observable<RaidBossInstance>(obs => {
      const req = this.raidbossClient.attackRaidBoss(message, (err: ServiceError, response: GrpcRaidBossInstance) => {
        if (err) {
          obs.error(err);
        }

        obs.next(this.fromGrpcRaidBoss(response));
        obs.complete();
      });

      return () => req.cancel();
    });

  }

  // Get all bosses by group Id and date, used for example when a player wants to find bosses
  // to fight or view dead ones...
  // TODO this requires read-side projection
  getGroupBossesSince(groupId: string, time: number) : Observable<any> {
    return this.http.get("/raidbossapi/raidboss/list/" + groupId + "/" + time)
  }

  ngOnInit() {
  }
}
