"use strict";
/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
// https://www.kyne.com.au/~mark/software/lua-cjson-manual.html
function encode(value) {
    return this.stringify(value);
}
exports.encode = encode;
function decode(value) {
    return this.parse(value);
}
exports.decode = decode;
module.exports.null = null;
// TODO: Implement configuration methods
//# sourceMappingURL=cjson.js.map