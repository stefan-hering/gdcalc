import { pth } from "../src/formulas";
import { suite, test } from "mocha";
import { expect } from "chai";

suite("pth", () => {
    test("should calculate", () => {
        expect(pth(1500,1500)).to.equal(90);
    });
});