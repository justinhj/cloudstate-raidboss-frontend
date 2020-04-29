import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBossComponent } from './create-boss.component';

describe('CreateBossComponent', () => {
  let component: CreateBossComponent;
  let fixture: ComponentFixture<CreateBossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
