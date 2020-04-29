import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBossListComponent } from './active-boss-list.component';

describe('ActiveBossListComponent', () => {
  let component: ActiveBossListComponent;
  let fixture: ComponentFixture<ActiveBossListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBossListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBossListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
