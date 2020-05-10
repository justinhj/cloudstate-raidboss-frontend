export class LeaderboardEntry {
    playerId: string;
    score: number;
    constructor(
        playerId: string,
        score: number
    ) {
        this.playerId = playerId;
        this.score = score;
    }
}

export class RaidBossInstance {

    bossDefId: string
    health: number
    instanceId: string
    leaderboard: LeaderboardEntry []
    created: number
    updated: number
    groupId: string
    killedBy: string

    constructor(
        bossDefId: string,
        health: number,
        instanceId: string,
        leaderboard: LeaderboardEntry [],
        created: number,
        updated: number,
        groupId: string,
        killedBy: string) {
            this.bossDefId = bossDefId;
            this.health = health;
            this.instanceId = instanceId;
            this.leaderboard = leaderboard;
            this.created = created;
            this.updated = updated;
            this.groupId = groupId;
            this.killedBy = killedBy;
        }
}
