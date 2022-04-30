"use strict";
/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const msgpack = require("msgpack5");
const cjson = require("./library/cjson");
const cmsgpack = require("./library/cmsgpack");
const redis = require("./library/redis");
const Lua = require("./utility/lua");
const Redis = require("./utility/redis");
const EVAL = Symbol();
function default_1(client) {
    // If we've already mocked this client, just return it
    if (client[EVAL]) {
        return client;
    }
    const send_command = client.send_command && client.send_command.bind(client);
    const lua = new Lua.VM();
    // Mock the libraries provided by Redis
    lua.set('redis', client, redis);
    lua.set('cjson', JSON, cjson);
    lua.set('cmsgpack', msgpack(), cmsgpack);
    client[EVAL] = {
        // There is no script cache, so always return NOSCRIPT
        evalsha(...input) {
            Redis.callback(Redis.argument(input))(new Error('NOSCRIPT'), null);
        },
        // Use lua.vm.js to evaluate the provided script
        eval(...input) {
            const args = Redis.argument(input);
            const cb = Redis.callback(args);
            try {
                const script = String(args.shift());
                const count = parseInt(args.shift(), 10);
                // Redis passes all arguments as strings
                lua.set('KEYS', args.slice(0, count).map(String));
                lua.set('ARGV', args.slice(count).map(String));
                cb(null, Redis.response(lua.run(script)[0]));
            }
            catch (err) {
                cb(err, null);
            }
        },
        // Ensure eval commands are sent to the new methods
        send_command(command, args = [], cb) {
            return command in client[EVAL] || !send_command
                ? client[command](...args, cb)
                : send_command(command, args, cb);
        },
    };
    return Object.assign(client, client[EVAL]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map