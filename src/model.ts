
interface Attacker {
    offensiveAbility: number
    critDamage: number
    damageType: DamageType
    percentageDamageBonus: {DamageType:number}
    durationBonus: {DamageType:number}
    flatDamage: {DamageType:number}
    weaponSpeed: number
    attackSpeed: number
}

interface Attack {
    damage: [{DamageType:number}]
    weaponDamage: number 
}

interface Defender {
    armor: number
    armorAbsorbtion: number
    defensiveAbility: number
    absorbtion: number
}

enum DamageType {
    PHYISCAL,
    INTERNAL_TRAUMA,
    FIRE,
    BURN,
    COLD,
    FROSTBURN,
    LIGHTNING,
    ELECTROCUTE,
    ACID,
    POISON,
    BLEED,
    VITALITY,
    VITALITY_DECAY,
    AETHER,
    CHAOS
}

export {Attacker, Attack, Defender, DamageType}