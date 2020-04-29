import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { CreateBossComponent } from './components/create-boss/create-boss.component';
import { HttpClientModule }    from '@angular/common/http';
import { ActiveBossListComponent } from './components/active-boss-list/active-boss-list.component';
import { ActiveBossComponent } from './components/active-boss/active-boss.component';
import { RaidbossinstanceComponent } from './components/raidbossinstance/raidbossinstance.component';
import { GetBossesComponent } from './components/get-bosses/get-bosses.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateBossComponent,
    ActiveBossListComponent,
    ActiveBossComponent,
    RaidbossinstanceComponent,
    GetBossesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
