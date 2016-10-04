/**
 * http
 */

"use strict";


/* Node modules */
import {EventEmitter} from "events";


/* Third-party modules */
import * as _ from "lodash";
import {Inject} from "steeplejack/decorators/inject";
import {Promise} from "es6-promise";
const request = require("request-promise-native");


/* Files */


@Inject({
    name: "$httpDriver",
    deps: [
        "StoreError"
    ]
})
export class HTTP extends EventEmitter {


    protected _baseUrl: string;


    /**
     * Constructor
     *
     * Gets the dependencies
     *
     * @param {object} _StoreError
     */
    constructor (protected _StoreError: any) { super(); }


    get baseUrl () : string {
        return this._baseUrl;
    }


    set baseUrl (url : string) {
        this._baseUrl = url;
    }


    /**
     * Call URL
     *
     * Builds and executes the API call.
     *
     * @param {string} method
     * @param {string} url
     * @param {*} headers
     * @param {*} body
     * @param {*} opts
     * @returns {Promise}
     * @private
     */
    protected _callUrl (
        method : string,
        url : string,
        headers : any = {},
        body : any = null,
        opts : any = {}
    ) : Promise<any> {

        const httpOpts = _.defaults(opts, {
            baseUrl: this.baseUrl,
            body,
            gzip: true,
            headers,
            json: true,
            method,
            resolveWithFullResponse: false,
            url
        });

        /* Emit the call to the logger */
        this.emit("log", "debug", "New HTTP request", httpOpts);

        /* Make the call to the API */
        return request(httpOpts)
            .catch((err: Error) => {
                /* Error - wrap in StoreError */
                throw new this._StoreError(err);
            });

    }


    /**
     * Del
     *
     * Performs a DELETE request on the server. The
     * data is set to an empty object as, although
     * technically allowable, shouldn't really be
     * used.
     *
     * @param {string} url
     * @param {*} headers
     * @param {*} opts
     * @returns {Promise<any>}
     */
    public del (url : string, headers : any = void 0, opts : any = void 0) : Promise<any> {
        return this._callUrl("DELETE", url, headers, void 0, opts);
    }


    /**
     * Delete
     *
     * Performs a DELETE request on the server. The
     * data is set to an empty object as, although
     * technically allowable, shouldn't really be
     * used.
     *
     * @param {string} url
     * @param {*} headers
     * @param {*} opts
     * @returns {Promise<any>}
     */
    public delete () : Promise<any> {
        const args = arguments;
        return this.del.apply(this, args);
    }


    /**
     * Get
     *
     * Performs a GET request on the server
     *
     * @param {string} url
     * @param {*} headers
     * @param {*} opts
     * @returns {Promise<any>}
     */
    public get (url : string, headers : any = void 0, opts : any = void 0) : Promise<any> {
        return this._callUrl("GET", url, headers, void 0, opts);
    }


    /**
     * Post
     *
     * Performs a POST request on the server
     *
     * @param {string} url
     * @param {*} data
     * @param {*} headers
     * @param {*} opts
     * @returns {Promise<any>}
     */
    public post (url : string, data : any = {}, headers : any = void 0, opts : any = void 0) : Promise<any> {
        return this._callUrl("POST", url, headers, data, opts);
    }


    /**
     * Put
     *
     * Performs a PUT request on the server
     *
     * @param {string} url
     * @param {*} data
     * @param {*} headers
     * @param {*} opts
     * @returns {Promise<any>}
     */
    public put (url : string, data : any = {}, headers : string = void 0, opts : string = void 0) : Promise<any> {
        return this._callUrl("PUT", url, headers, data, opts);
    }


}
