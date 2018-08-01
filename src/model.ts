
interface Attacker {
    offensiveAbility: number
    critDamage: number
    percentageDamageBonus: Map<DamageType,number>
    durationBonus: Map<DamageType,number>
    flatDamage: Map<DamageType,number>
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
    resistance: Map<DamageType,number>
    percentAbsorbtion: number
    flatAbsorbtion: number
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

export {Attacker, Attack, Defender, DamageType, DamageInstance}