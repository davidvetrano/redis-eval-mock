"use strict";
/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpack_limit = exports.unpack_one = exports.unpack = exports.pack = void 0;
const lua_1 = require("../utility/lua");
// The Lua-to-JS string translation appears to truncate at nulls,
// so use the safe base64 rather than the more accurate binary
const ENCODING = 'base64';
function mp_pack(msgpack, args) {
    return msgpack.encode(args).toString(ENCODING);
}
function mp_unpack_full(msgpack, value, limit, offset) {
    const results = msgpack.decode(Buffer.from(value, ENCODING));
    if (limit < 0 || offset < 0) {
        throw RangeError(`Invalid request to unpack with offset of ${offset} and limit of ${limit}.`);
    }
    const end = Math.min(offset + (limit || Infinity), results.length);
    return [end === results.length ? -1 : end, ...results.slice(offset, end)];
}
// https://github.com/antirez/lua-cmsgpack
function pack(...args) {
    return mp_pack(this, args);
}
exports.pack = pack;
function unpack(msgpack) {
    const results = mp_unpack_full(this, msgpack, 0, 0);
    (0, lua_1.returns)(...results.slice(1));
}
exports.unpack = unpack;
function unpack_one(msgpack, offset = 0) {
    const results = mp_unpack_full(this, msgpack, 1, offset);
    (0, lua_1.returns)(...results.slice(0, 2));
}
exports.unpack_one = unpack_one;
function unpack_limit(msgpack, limit, offset = 0) {
    const results = mp_unpack_full(this, msgpack, limit, offset);
    (0, lua_1.returns)(...results);
}
exports.unpack_limit = unpack_limit;
//# sourceMappingURL=cmsgpack.js.map