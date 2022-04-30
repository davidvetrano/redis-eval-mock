"use strict";
/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.status_reply = exports.error_reply = exports.pcall = exports.call = exports.replicate_commands = void 0;
const deasync = require("deasync");
const lua_1 = require("../utility/lua");
// https://redis.io/commands/eval
// TODO: Reject Redis random commands prior to calling this
function replicate_commands() {
    return true;
}
exports.replicate_commands = replicate_commands;
function call(cmd, ...args) {
    // The Lua VM can only handle synchronous calls, so we need to force the
    // Redis library (which may be using process ticks to simulate actual
    // network calls) to execute syncronously
    const command = deasync(this[cmd.toLowerCase()].bind(this));
    const result = command(...args);
    return result != null ? result : lua_1.nil;
}
exports.call = call;
function pcall(cmd, ...args) {
    try {
        return call.call(this, cmd, ...args);
    }
    catch (err) {
        return error_reply.call(this, String(err));
    }
}
exports.pcall = pcall;
function error_reply(err) {
    return { err };
}
exports.error_reply = error_reply;
function status_reply(ok) {
    return { ok };
}
exports.status_reply = status_reply;
//# sourceMappingURL=redis.js.map