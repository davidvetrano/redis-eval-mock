"use strict";
/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const redis = require("redis-mock");
const index_1 = require("../index");
describe('cjson', () => {
    let client;
    let doEval;
    beforeEach(() => {
        client = (0, index_1.default)(redis.createClient());
        doEval = util.promisify(client.eval.bind(client));
    });
    it('decodes null to its internal constant', async () => {
        expect(await doEval('return cjson.decode(ARGV[1]) == cjson.null', 0, 'null')).toBe(1);
        expect(await doEval('return cjson.decode(ARGV[1]) == nil', 0, 'null')).toBe(null);
    });
    it('encodes provided arguments', async () => {
        expect(await doEval('return cjson.encode(ARGV)', 0, 1, 'two', false)).toBe('["1","two","false"]');
    });
});
//# sourceMappingURL=cjson.spec.js.map