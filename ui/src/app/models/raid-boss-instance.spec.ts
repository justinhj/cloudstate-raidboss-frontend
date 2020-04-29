import { RaidBossInstance } from './raid-boss-instance';

describe('RaidBossInstance', () => {
  it('should create an instance', () => {
    expect(new RaidBossInstance("",0.0,"",[],0,0,"")).toBeTruthy();
  });
});
