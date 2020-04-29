import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBossComponent } from './active-boss.component';

describe('ActiveBossComponent', () => {
  let component: ActiveBossComponent;
  let fixture: ComponentFixture<ActiveBossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
