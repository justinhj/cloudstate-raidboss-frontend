import { TestBed } from '@angular/core/testing';

import { RaidBossService } from './raid-boss.service';

describe('RaidBossService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaidBossService = TestBed.get(RaidBossService);
    expect(service).toBeTruthy();
  });
});
