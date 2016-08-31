/**
 * index.test
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Plugin} from "steeplejack/lib/plugin";


/* Files */
import {expect} from "../helper";
import * as driver from "../../lib/http";
import {http} from "../../index";


describe("config test", function () {

    it("should create a plugin", function () {

        expect(http).to.be.instanceof(Plugin);

        expect(http.modules).to.be.an("array")
            .have.length(1);

        expect(http.modules[0]).to.be.equal(driver);

    });

});
