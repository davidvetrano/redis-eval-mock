"use strict";
/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.callback = exports.argument = void 0;
// Extract the actual arguments from the supplied arguments
// https://www.npmjs.com/package/redis#sending-commands
function argument(input) {
    return input.reduce((args, arg) => args.concat(arg), []);
}
exports.argument = argument;
// Extract the callback from the arguments; if there isn't one, return a no-op
function callback(args) {
    return typeof args[args.length - 1] === 'function' ? args.pop() : () => { };
}
exports.callback = callback;
// Convert the Lua/JS response to what Redis would return
// https://redis.io/commands/eval#conversion-between-lua-and-redis-data-types
function response(value) {
    switch (typeof value) {
        case 'string':
            return value;
        case 'number':
            return Math.floor(value);
        case 'boolean':
            return value ? 1 : null;
        case 'object':
            if (Array.isArray(value)) {
                return value.map(response);
            }
            if (value) {
                if (typeof value.err === 'string') {
                    throw new Error(value.err);
                }
                if (typeof value.ok === 'string') {
                    return value.ok;
                }
                return [];
            }
        // falls through
        case 'undefined':
        default:
            return null;
    }
}
exports.response = response;
//# sourceMappingURL=redis.js.map