import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { RaidBossInstance, LeaderboardEntry } from '../models/raid-boss-instance';
import { WebsocketService } from "./websocket.service";
import { RaidBossServiceClient, ServiceError } from "../../_proto/raidbossservice_pb_service";
import { RaidBossCreate, RaidBossAttack, RaidBossInstance as GrpcRaidBossInstance, LeaderboardEntry as GrpcLeaderboardEntry, RaidBossView } from "../../_proto/raidbossservice_pb";
import { environment } from '../../environments/environment';
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

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

  private raidbossClient = new RaidBossServiceClient(environment.cloudstatehost);

  constructor(private http: HttpClient, private webSocketService : WebsocketService) {
    // This is dead for now but can be used to ingest data from a websocket
    // if you have a streaming source of events
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

  private fromGrpcLeaderboard(grpcEntries: GrpcLeaderboardEntry[]): LeaderboardEntry[] {

    var entries: LeaderboardEntry[] = []

    grpcEntries.forEach(
      function(entry) {
        entries.push(new LeaderboardEntry(entry.getPlayerId(), entry.getScore()));
      }
    );

    return entries;
  }

  private fromGrpcRaidBoss(grpcInstance: GrpcRaidBossInstance): RaidBossInstance {
    return new RaidBossInstance(grpcInstance.getBossDefId(),
      grpcInstance.getHealth(),
      grpcInstance.getBossInstanceId(),
      this.fromGrpcLeaderboard(grpcInstance.getLeaderboardList()),
      grpcInstance.getCreated(),
      grpcInstance.getUpdated(),
      grpcInstance.getGroupId(),
      grpcInstance.getKilledBy());
  }

  createBoss(instance: string, groupId: string, bossDefinitionId: string): Observable<Empty> {

    let message = new RaidBossCreate();
    message.setBossInstanceId(instance);
    message.setBossDefId(bossDefinitionId);
    message.setGroupId(groupId);

    console.log("Sending boss create ", message.getBossInstanceId(), " ", message.getBossDefId(), " ", message.getGroupId());

    return new Observable<Empty>(obs => {
      const req = this.raidbossClient.createRaidBoss(message, (err: ServiceError, response: Empty) => {
        if (err) {
          obs.error(err);
        }

        obs.next(response);
        obs.complete();
      });

      return () => req.cancel();
    });
  }

  // Handle attacks
  attackBoss(bossInstanceId: string, playerId: string, damage: number) : Observable<Empty> {
    let message = new RaidBossAttack();
    message.setBossInstanceId(bossInstanceId);
    message.setDamage(damage);
    message.setPlayerId(playerId);

    return new Observable<Empty>(obs => {
      const req = this.raidbossClient.attackRaidBoss(message, (err: ServiceError, response: Empty) => {
        if (err) {
          obs.error(err);
        }

        obs.next(response);
        obs.complete();
      });

      return () => req.cancel();
    });

  }


  // Handle views
  viewBoss(bossInstanceId: string) : Observable<RaidBossInstance> {
    let message = new RaidBossView();
    message.setBossInstanceId(bossInstanceId);

    console.log("Sending boss view ", message.getBossInstanceId());

    return new Observable<RaidBossInstance>(obs => {
      const req = this.raidbossClient.viewRaidBoss(message, (err: ServiceError, response: GrpcRaidBossInstance) => {
        if (err) {
          console.log("err boss view ", err);

          obs.error(err);
        }

        console.log("boss view ", response);

        obs.next(this.fromGrpcRaidBoss(response));
        obs.complete();
      });

      return () => req.cancel();
    });

  }

  // Get all bosses by group Id and date, used for example when a player wants to find bosses
  // to fight or view dead ones...
  // TODO this requires read-side projection and is not implemented yet
  getGroupBossesSince(groupId: string, time: number) : Observable<any> {
    return this.http.get("/raidbossapi/raidboss/list/" + groupId + "/" + time)
  }

  ngOnInit() {
  }
}
