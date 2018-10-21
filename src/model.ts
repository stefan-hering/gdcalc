
interface Attacker {
    offensiveAbility: number
    critDamage: number
    percentageDamageBonus: {DamageType:number}
    durationBonus: {DamageType:number}
    flatDamage: {DamageType:number}
    weaponSpeed: number
    attackSpeed: number
}

interface Attack {
    damage: DamageInstance[]
    weaponDamage: number 
}

interface DamageInstance {
    type: DamageType
    value: number
}

interface Defender {
    armor: number
    armorAbsorbtion: number
    defensiveAbility: number
    resistance: {DamageType:number}
    percentAbsorbtion: number
    flatAbsorbtion: number
}

interface Simulation {
    attacker: Attacker
    attacks : Attack[]
    defender: Defender
    time : number
}

enum DamageType {
    PHYISCAL = "Physical",
    INTERNAL_TRAUMA = "Internal trauma",
    FIRE = "Fire",
    BURN = "Burn",
    COLD = "Cold",
    FROSTBURN = "Frostburn",
    LIGHTNING = "Lightning",
    ELECTROCUTE = "Electrocute",
    ACID = "Acid",
    POISON = "Poison",
    BLEED = "Bleed",
    VITALITY = "Vitality",
    VITALITY_DECAY= "Vitality decay",
    AETHER = "Aether",
    CHAOS = "Chaos"
}

export {Attacker, Attack, Defender, DamageType, DamageInstance, Simulation}