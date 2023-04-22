const player1 = "Player 1";
const player2 = "Player 2";

const unitTypes = {
    MELEE: { hp: 100, armor: 10, strength: 20 },
    RANGED: { hp: 80, armor: 5, strength: 15 },
    ARTILLERY: { hp: 120, armor: 15, strength: 30 },
};

class Unit {
    constructor(type, player, hp, armor, strength) {
        this.type = type;
        this.player = player;
        this.hp = hp;
        this.armor = armor;
        this.strength = strength;
    }
}

function createUnit(type, player) {
    const unitStats = unitTypes[type];
    return new Unit(type, player, unitStats.hp, unitStats.armor, unitStats.strength);
}
