
/**
 * PTH formula taken from http://grimdawn.com/guide/gameplay/combat.php#q19
 * @param oa Offensive ability of attack
 * @param da Defensive ability of attackee
 */
let pth = (oa:number, da:number) => {
    return ((((oa / ((da / 3.5) + oa)) * 300) * 0.3) + (((((oa * 3.25) + 10000) - (da * 3.25)) / 100) * 0.7)) - 50;
}

export {pth};