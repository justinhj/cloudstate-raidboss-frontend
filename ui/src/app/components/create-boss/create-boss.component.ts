import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-create-boss',
  templateUrl: './create-boss.component.html',
  styleUrls: ['./create-boss.component.sass']
})
export class CreateBossComponent implements OnInit {

  @Output() createRaidBoss: EventEmitter<any> = new EventEmitter();

  groupId:string;
  bossDefinitionId:string;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.createRaidBoss.emit({
      groupId: this.groupId,
      bossDefinitionId : this.bossDefinitionId
    })
  }

}
