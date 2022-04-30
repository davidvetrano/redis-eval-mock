/*!
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
import { MessagePack } from 'msgpack5';
export declare function pack(this: MessagePack, ...args: any[]): string;
export declare function unpack(this: MessagePack, msgpack: string): void;
export declare function unpack_one(this: MessagePack, msgpack: string, offset?: number): void;
export declare function unpack_limit(this: MessagePack, msgpack: string, limit: number, offset?: number): void;
//# sourceMappingURL=cmsgpack.d.ts.map