/**
 * http.test
 */

"use strict";


/* Node modules */
import {EventEmitter} from "events";


/* Third-party modules */
import {injectFlag} from "steeplejack/decorators/inject";


/* Files */
import {expect, proxyquire, sinon} from "../helper";


describe("HTTP test", function () {

    let HTTP;
    beforeEach(function () {

        this.request = sinon.stub();

        HTTP = proxyquire("../lib/http", {
            "request-promise-native": this.request
        }).HTTP;

    });

    describe("Injection", function () {

        it("should be injected correctly", function () {

            expect(HTTP[injectFlag]).to.be.eql({
                name: "$httpDriver",
                factory: false,
                deps: [
                    "StoreError"
                ]
            });

        });

    });

    describe("methods", function () {

        beforeEach(function () {
            this.StoreError = sinon.stub();
            this.obj = new HTTP(this.StoreError);

            expect(this.obj).to.be.instanceof(HTTP)
                .instanceof(EventEmitter);
        });

        describe("#_callUrl", function () {

            beforeEach(function () {
                this.call = (<any> this.obj)._callUrl;
                this.emit = sinon.spy(this.obj, "emit");
            });

            it("should use the default options and send to the request", function () {

                this.request.resolves("result");

                const opts = {
                    baseUrl: void 0,
                    body: null,
                    gzip: true,
                    headers: {},
                    json: true,
                    method: "method",
                    resolveWithFullResponse: false,
                    url: "url"
                };

                return this.call("method", "url")
                    .then((result: any) => {

                        expect(result).to.be.equal("result");

                        expect(this.request).to.be.calledOnce
                            .calledWithExactly(opts);

                        expect(this.emit).to.be.calledOnce
                            .calledWithExactly("log", "debug", "New HTTP request", opts);

                    });

            });

            it("should set optional params and send to the request", function () {

                this.request.resolves("result2");

                const transform = () => {};

                const opts = {
                    baseUrl: "a base URL",
                    body: "the body",
                    gzip: false,
                    headers: "some headers",
                    json: false,
                    method: "method2",
                    resolveWithFullResponse: true,
                    simple: false,
                    url: "a URL",
                    transform
                };

                this.obj.baseUrl = "a base URL";

                return (<any> this.obj)._callUrl("method2", "a URL", "some headers", "the body", {
                    resolveWithFullResponse: true,
                    gzip: false,
                    json: false,
                    simple: false,
                    transform
                })
                    .then((result: any) => {

                        expect(result).to.be.equal("result2");

                        expect(this.request).to.be.calledOnce
                            .calledWithExactly(opts);

                        expect(this.emit).to.be.calledOnce
                            .calledWithExactly("log", "debug", "New HTTP request", opts);

                    });

            });

            it("should wrap an error in the StoreError", function () {

                this.request.rejects("some error");

                return (<any> this.obj)._callUrl("method", "url")
                    .then(() => {
                        throw new Error("Invalid");
                    })
                    .catch((err: any) => {

                        expect(err).to.be.instanceof(this.StoreError);

                        expect(this.StoreError).to.be.calledOnce
                            .calledWithNew
                            .calledWithExactly(new Error("some error"));

                    });

            });

        });

        describe("public methods", function () {

            beforeEach(function () {
                this.call = sinon.stub(this.obj, "_callUrl");
            });

            describe("#del", function () {

                it("should call with minimum params", function () {

                    this.call.resolves("result");

                    return this.obj.del("del url")
                        .then((result: any) => {

                            expect(result).to.be.equal("result");

                            expect(this.call).to.be.calledOnce
                                .calledWithExactly("DELETE", "del url", void 0, void 0, void 0);

                        });

                });

                it("should call with header and opts set", function () {

                    this.call.resolves("result2");

                    return this.obj.del("del url2", "headers", "opts")
                        .then((result: any) => {

                            expect(result).to.be.equal("result2");

                            expect(this.call).to.be.calledOnce
                                .calledWithExactly("DELETE", "del url2", "headers", void 0, "opts");

                        });

                });

            });

            describe("#delete", function () {

                it("should call with minimum params", function () {

                    this.call.resolves("result");

                    return this.obj.delete("del url")
                        .then((result: any) => {

                            expect(result).to.be.equal("result");

                            expect(this.call).to.be.calledOnce
                                .calledWithExactly("DELETE", "del url", void 0, void 0, void 0);

                        });

                });

                it("should call with header and opts set", function () {

                    this.call.resolves("result2");

                    return this.obj.delete("del url2", "headers", "opts")
                        .then((result: any) => {

                            expect(result).to.be.equal("result2");

                            expect(this.call).to.be.calledOnce
                                .calledWithExactly("DELETE", "del url2", "headers", void 0, "opts");

                        });

                });

            });

            describe("#get", function () {

                it("should call with minimum params", function () {

                    this.call.resolves("result");

                    return this.obj.get("get url")
                        .then((result: any) => {

                            expect(result).to.be.equal("result");

                            expect(this.call).to.be.calledOnce
                                .calledWithExactly("GET", "get url", void 0, void 0, void 0);

                        });

                });

                it("should call with header and opts set", function () {

                    this.call.resolves("result2");

                    return this.obj.get("get url2", "headers", "opts")
                        .then((result: any) => {

                            expect(result).to.be.equal("result2");

                            expect(this.call).to.be.calledOnce
                                .calledWithExactly("GET", "get url2", "headers", void 0, "opts");

                        });

                });

            });

            describe("#post", function () {

                it("should call with minimum params", function () {

                    this.call.resolves("result");

                    return this.obj.post("post url")
                        .then((result: any) => {

                            expect(result).to.be.equal("result");

                            expect(this.call).to.be.calledOnce
                                .calledWithExactly("POST", "post url", void 0, {}, void 0);

                        });

                });

                it("should call with header and opts set", function () {

                    this.call.resolves("result2");

                    return this.obj.post("post url2", "data", "headers", "opts")
                        .then((result: any) => {

                            expect(result).to.be.equal("result2");

                            expect(this.call).to.be.calledOnce
                                .calledWithExactly("POST", "post url2", "headers", "data", "opts");

                        });

                });

            });

            describe("#put", function () {

                it("should call with minimum params", function () {

                    this.call.resolves("result");

                    return this.obj.put("put url")
                        .then((result: any) => {

                            expect(result).to.be.equal("result");

                            expect(this.call).to.be.calledOnce
                                .calledWithExactly("PUT", "put url", void 0, {}, void 0);

                        });

                });

                it("should call with header and opts set", function () {

                    this.call.resolves("result2");

                    return this.obj.put("put url2", "data", "headers", "opts")
                        .then((result: any) => {

                            expect(result).to.be.equal("result2");

                            expect(this.call).to.be.calledOnce
                                .calledWithExactly("PUT", "put url2", "headers", "data", "opts");

                        });

                });

            });

        });

    });

});
