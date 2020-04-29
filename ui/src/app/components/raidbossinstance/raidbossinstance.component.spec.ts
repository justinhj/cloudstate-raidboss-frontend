import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidbossinstanceComponent } from './raidbossinstance.component';

describe('RaidbossinstanceComponent', () => {
  let component: RaidbossinstanceComponent;
  let fixture: ComponentFixture<RaidbossinstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidbossinstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidbossinstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
