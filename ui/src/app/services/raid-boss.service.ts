import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { RaidBossInstance } from '../models/raid-boss-instance';
import { RaidBossAttackResult } from '../models/raid-boss-attack-result';
import { WebsocketService } from "./websocket.service";
import { map } from 'rxjs/operators';
import { RaidBossServiceClient, UnaryResponse, ServiceError } from "../../_proto/raidbossservice_pb_service";
import { RaidBossCreate, RaidBossInstance as GrpcRaidBossInstance } from "../../_proto/raidbossservice_pb";
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
  private base_url = "localhost:4200/raidbossapi/raidboss/";

  private raidbossClient = new RaidBossServiceClient('https://justin-test-1.us-east1.apps.lbcs.io');

  constructor(private http: HttpClient, private webSocketService : WebsocketService) {
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

  // This converts a UnaryResponse to an Observable to do grpc calls
  fromUnary<T extends jspb.Message>(clientMethod: (...p) => UnaryResponse, request: jspb.Message, meta?: grpc.Metadata) {
    return new Observable<T>(obs => {
      const req = clientMethod(request || null, meta || null, (err: ServiceError, response: T) => {
        if (err) {
          obs.error(err);
        }

        obs.next(response);
        obs.complete();
      });

      return () => req.cancel();
    });
  }

  createBoss(groupId: string, bossDefinitionId: string): Observable<any> {

    let instance = "raidbossinstance-" + groupId + "-" + bossDefinitionId + "-" + Date.now();
    let message = new RaidBossCreate();
    message.setBossInstanceId(instance);
    message.setBossDefId(bossDefinitionId);
    message.setGroupId(groupId);


    let temp = this.raidbossClient.createRaidBoss(message, function(err, payload) {
      console.log("err " + err)
      console.log("err " + payload)

    });
    return null;

    //return this.http.post("http://" + this.base_url + "create/" + groupId + "/" + bossDefinitionId, null, {})
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
