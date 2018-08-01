import { probabilityToHit, calculateHitRoll } from "../src/formulas";
import { suite, test } from "mocha";
import { expect } from "chai";

suite("probabilityToHit", () => {
    test("should calculate properly", () => {
        expect(probabilityToHit(2600,2600)).to.be.closeTo(90,1);
        expect(probabilityToHit(1500,1500)).to.be.closeTo(90,1);
        expect(probabilityToHit(1100,1100)).to.be.closeTo(90,1);

        expect(probabilityToHit(3000,2300)).to.be.closeTo(110,1);
        expect(probabilityToHit(800,500)).to.be.closeTo(103,1);
        expect(probabilityToHit(1800,5000)).to.be.closeTo(66,1);
    });
});

suite("hitRoll", () => {
    test("should always hit over 100 pth", () => {
        expect(calculateHitRoll(0,100,0.3)).to.be.greaterThan(0);
        expect(calculateHitRoll(1,100,0.3)).to.be.greaterThan(0);
        expect(calculateHitRoll(0,250,0.3)).to.be.greaterThan(0);
    });
    test("should miss below 100 pth", () => {
        expect(calculateHitRoll(1,99,0.3)).to.equal(0);
        expect(calculateHitRoll(0.99,98,0.3)).to.equal(0);
        expect(calculateHitRoll(0.7,66,0.3)).to.equal(0);
    });
    test("should crit starting at 90", () => {
        expect(calculateHitRoll(0.9,90,0.3)).to.be.closeTo(1.4,0.001);
        expect(calculateHitRoll(0.91,92,0.3)).to.be.closeTo(1.4,0.001);
    });
    test("should use crit damage parameter", () => {
        expect(calculateHitRoll(0.9,90,0.3)).to.be.closeTo(1.4,0.001);
        expect(calculateHitRoll(0.91,92,0.5)).to.be.closeTo(1.6,0.001);
    });
    test("should calculate thresholds correctly", () => {
        expect(calculateHitRoll(0.9,90,0.3)).to.be.closeTo(1.4,0.001);
        expect(calculateHitRoll(1,105,0.3)).to.be.closeTo(1.5,0.001);
        expect(calculateHitRoll(1,120,0.3)).to.be.closeTo(1.6,0.001);
        expect(calculateHitRoll(1,130,0.3)).to.be.closeTo(1.7,0.001);
        expect(calculateHitRoll(1,135,0.3)).to.be.closeTo(1.8,0.001);
    });
})