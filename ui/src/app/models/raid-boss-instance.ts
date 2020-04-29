export class RaidBossInstance {

    bossDefId: string
    health: number
    instanceId: string
    leaderboard: Array<[string, number]>
    created: number
    updated: number
    groupId: string

    constructor(
        bossDefId: string,
        health: number,
        instanceId: string,
        leaderboard: Array<[string, number]>,
        created: number,
        updated: number,
        groupId: string) {
            this.bossDefId = bossDefId;
            this.health = health;
            this.instanceId = instanceId;
            this.leaderboard = leaderboard;
            this.created = created;
            this.updated = updated;
            this.groupId = groupId;
        }
}
