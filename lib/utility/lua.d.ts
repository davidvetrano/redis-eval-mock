/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
export declare class VM {
    private readonly lua;
    constructor();
    run(script: string, ...args: any[]): any[];
    set(key: string, value: any, proxy?: any): void;
    private proxy;
    private value;
}
export declare function returns(...values: any[]): void;
export declare const nil: undefined;
//# sourceMappingURL=lua.d.ts.map