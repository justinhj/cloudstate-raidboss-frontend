import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title : string = 'Raid Boss - Cloudstate example';
  description : string = 'Summon and attack raid bosses'

  constructor() {

  }

}
