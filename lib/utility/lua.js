"use strict";
/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.nil = exports.returns = exports.VM = void 0;
const fs = require("fs");
const lua_vm_js_1 = require("lua.vm.js");
// Load the Lua marshalling interface
const INTERFACE = fs.readFileSync(require.resolve('../../interface.lua'), 'utf8');
class VM {
    // Create a new Lua VM instance
    constructor() {
        this.lua = new lua_vm_js_1.Lua.State();
        this.lua.execute(INTERFACE);
    }
    // Run a script on this Lua interop instance
    run(script, ...args) {
        // Execute the script and convert the results to their JS equivalent
        return this.lua.execute(`return js.from(...)`, ...this.lua.execute(script, ...args));
    }
    // Set a global key on this Lua interop instance
    set(key, value, proxy) {
        this.lua._G.set(key, proxy ? this.proxy(value, proxy) : this.value(value));
    }
    // If a proxy is provided, generate a Lua object with the shape of the proxy
    proxy(value, proxy) {
        const members = Object.entries(proxy).map(([key, value]) => typeof value === 'function'
            ? // Method calls are marshalled with the given value as 'this'
                // (for non-bound functions, lua.vm.js passes the first
                // function argument to JS as 'this')
                `${key} = function (...) return js.call(__proxy.${key}, __value, ...) end`
            : // Constants are just converted directly to their equivalent
                `${key} = js.to(__proxy.${key})`);
        // Pass the value and proxy as local arguments which will be bound into
        // the returned Lua object
        return this.lua.execute(`local __proxy, __value = ...; return {${members.join(',')}}`, proxy, value)[0];
    }
    // If a proxy is not provided, just convert the value directly to Lua
    value(value) {
        return this.lua.execute(`return js.to(...)`, value)[0];
    }
}
exports.VM = VM;
// Simulate Lua multi-return via unpacking the thrown array in js.call
function returns(...values) {
    throw values;
}
exports.returns = returns;
// JS undefined is translated to Lua nil; alias for clarity
exports.nil = undefined;
//# sourceMappingURL=lua.js.map