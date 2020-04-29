import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-bosses',
  templateUrl: './get-bosses.component.html',
  styleUrls: ['./get-bosses.component.sass']
})
export class GetBossesComponent implements OnInit {
  @Output() getGroupBossesSince: EventEmitter<any> = new EventEmitter();

  groupId : string = "";
  time : number = 1578433443806; // roughly arbitray start time

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.getGroupBossesSince.emit({
      groupId: this.groupId,
      time: this.time
    })
  }



}
