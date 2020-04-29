import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBossesComponent } from './get-bosses.component';

describe('GetBossesComponent', () => {
  let component: GetBossesComponent;
  let fixture: ComponentFixture<GetBossesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBossesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBossesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
