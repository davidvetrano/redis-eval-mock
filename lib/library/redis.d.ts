/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
import { RedisClient } from 'redis';
export declare function replicate_commands(this: RedisClient): boolean;
export declare function call(this: RedisClient, cmd: string, ...args: any[]): any;
export declare function pcall(this: RedisClient, cmd: string, ...args: any[]): any;
export declare function error_reply(this: RedisClient, err: string): {
    err: string;
};
export declare function status_reply(this: RedisClient, ok: string): {
    ok: string;
};
//# sourceMappingURL=redis.d.ts.map