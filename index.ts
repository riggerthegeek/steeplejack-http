/**
 * HTTP
 *
 * This is a simple wrapper for request-promise-native
 * to work with
 *
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Plugin} from "steeplejack/lib/plugin";


/* Files */
import * as driver from "./lib/http";


/* Add the modules to the plugin */
export const http = new Plugin([
    driver
]);
