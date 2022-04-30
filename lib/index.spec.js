"use strict";
/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const evalsha = require("redis-evalsha");
const redis = require("redis-mock");
const index_1 = require("./index");
describe('index', () => {
    let client;
    let scripts;
    let doExec;
    beforeEach(() => {
        client = (0, index_1.default)(redis.createClient());
        scripts = new evalsha(client);
        doExec = util.promisify(scripts.exec.bind(scripts));
    });
    it('proxies eval commands correctly', async () => {
        scripts.add('empty', 'return nil');
        expect(await doExec('empty', [], [])).toBe(null);
    });
    it('handles secondary cases', async () => {
        scripts.add('empty', 'return nil');
        expect((0, index_1.default)(client)).toBe(client);
        expect(() => scripts.exec('empty', [], [])).not.toThrow();
    });
});
//# sourceMappingURL=index.spec.js.map