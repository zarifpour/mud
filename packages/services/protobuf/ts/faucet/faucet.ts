/* eslint-disable */
// @generated by protobuf-ts 2.8.0 with parameter eslint_disable
// @generated from protobuf file "faucet.proto" (package "faucet", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message faucet.LinkedTwitterPair
 */
export interface LinkedTwitterPair {
  /**
   * @generated from protobuf field: string username = 1;
   */
  username: string;
  /**
   * @generated from protobuf field: string address = 2;
   */
  address: string;
}
/**
 * @generated from protobuf message faucet.FaucetStore
 */
export interface FaucetStore {
  /**
   * @generated from protobuf field: map<string, string> addressToUsername = 1;
   */
  addressToUsername: {
    [key: string]: string;
  };
  /**
   * @generated from protobuf field: map<string, string> usernameToAddress = 2;
   */
  usernameToAddress: {
    [key: string]: string;
  };
  /**
   * Username to timestamp of latest drip.
   *
   * @generated from protobuf field: map<string, int64> latestDrip = 3;
   */
  latestDrip: {
    [key: string]: bigint;
  };
  /**
   * Global drip counter.
   *
   * @generated from protobuf field: uint64 totalDripCount = 4;
   */
  totalDripCount: bigint;
}
/**
 * @generated from protobuf message faucet.DripVerifyTweetRequest
 */
export interface DripVerifyTweetRequest {
  /**
   * @generated from protobuf field: string username = 1;
   */
  username: string;
  /**
   * @generated from protobuf field: string address = 2;
   */
  address: string;
}
/**
 * @generated from protobuf message faucet.DripDevRequest
 */
export interface DripDevRequest {
  /**
   * @generated from protobuf field: string signature = 1;
   */
  signature: string;
  /**
   * @generated from protobuf field: string address = 2;
   */
  address: string;
}
/**
 * @generated from protobuf message faucet.DripResponse
 */
export interface DripResponse {
  /**
   * @generated from protobuf field: string txHash = 1;
   */
  txHash: string;
}
/**
 * @generated from protobuf message faucet.GetLinkedTwittersRequest
 */
export interface GetLinkedTwittersRequest {}
/**
 * @generated from protobuf message faucet.GetLinkedTwittersResponse
 */
export interface GetLinkedTwittersResponse {
  /**
   * @generated from protobuf field: repeated faucet.LinkedTwitterPair linkedTwitters = 1;
   */
  linkedTwitters: LinkedTwitterPair[];
}
/**
 * @generated from protobuf message faucet.LinkedTwitterForAddressRequest
 */
export interface LinkedTwitterForAddressRequest {
  /**
   * @generated from protobuf field: string address = 1;
   */
  address: string;
}
/**
 * @generated from protobuf message faucet.LinkedTwitterForAddressResponse
 */
export interface LinkedTwitterForAddressResponse {
  /**
   * @generated from protobuf field: string username = 1;
   */
  username: string;
}
/**
 * @generated from protobuf message faucet.LinkedAddressForTwitterRequest
 */
export interface LinkedAddressForTwitterRequest {
  /**
   * @generated from protobuf field: string username = 1;
   */
  username: string;
}
/**
 * @generated from protobuf message faucet.LinkedAddressForTwitterResponse
 */
export interface LinkedAddressForTwitterResponse {
  /**
   * @generated from protobuf field: string address = 1;
   */
  address: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class LinkedTwitterPair$Type extends MessageType<LinkedTwitterPair> {
  constructor() {
    super("faucet.LinkedTwitterPair", [
      { no: 1, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<LinkedTwitterPair>): LinkedTwitterPair {
    const message = { username: "", address: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<LinkedTwitterPair>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: LinkedTwitterPair
  ): LinkedTwitterPair {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string username */ 1:
          message.username = reader.string();
          break;
        case /* string address */ 2:
          message.address = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === "throw")
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(message: LinkedTwitterPair, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* string username = 1; */
    if (message.username !== "") writer.tag(1, WireType.LengthDelimited).string(message.username);
    /* string address = 2; */
    if (message.address !== "") writer.tag(2, WireType.LengthDelimited).string(message.address);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.LinkedTwitterPair
 */
export const LinkedTwitterPair = new LinkedTwitterPair$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FaucetStore$Type extends MessageType<FaucetStore> {
  constructor() {
    super("faucet.FaucetStore", [
      {
        no: 1,
        name: "addressToUsername",
        kind: "map",
        K: 9 /*ScalarType.STRING*/,
        V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      },
      {
        no: 2,
        name: "usernameToAddress",
        kind: "map",
        K: 9 /*ScalarType.STRING*/,
        V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      },
      {
        no: 3,
        name: "latestDrip",
        kind: "map",
        K: 9 /*ScalarType.STRING*/,
        V: { kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 0 /*LongType.BIGINT*/ },
      },
      { no: 4, name: "totalDripCount", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
    ]);
  }
  create(value?: PartialMessage<FaucetStore>): FaucetStore {
    const message = { addressToUsername: {}, usernameToAddress: {}, latestDrip: {}, totalDripCount: 0n };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<FaucetStore>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: FaucetStore
  ): FaucetStore {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* map<string, string> addressToUsername */ 1:
          this.binaryReadMap1(message.addressToUsername, reader, options);
          break;
        case /* map<string, string> usernameToAddress */ 2:
          this.binaryReadMap2(message.usernameToAddress, reader, options);
          break;
        case /* map<string, int64> latestDrip */ 3:
          this.binaryReadMap3(message.latestDrip, reader, options);
          break;
        case /* uint64 totalDripCount */ 4:
          message.totalDripCount = reader.uint64().toBigInt();
          break;
        default:
          let u = options.readUnknownField;
          if (u === "throw")
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  private binaryReadMap1(
    map: FaucetStore["addressToUsername"],
    reader: IBinaryReader,
    options: BinaryReadOptions
  ): void {
    let len = reader.uint32(),
      end = reader.pos + len,
      key: keyof FaucetStore["addressToUsername"] | undefined,
      val: FaucetStore["addressToUsername"][any] | undefined;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case 1:
          key = reader.string();
          break;
        case 2:
          val = reader.string();
          break;
        default:
          throw new globalThis.Error("unknown map entry field for field faucet.FaucetStore.addressToUsername");
      }
    }
    map[key ?? ""] = val ?? "";
  }
  private binaryReadMap2(
    map: FaucetStore["usernameToAddress"],
    reader: IBinaryReader,
    options: BinaryReadOptions
  ): void {
    let len = reader.uint32(),
      end = reader.pos + len,
      key: keyof FaucetStore["usernameToAddress"] | undefined,
      val: FaucetStore["usernameToAddress"][any] | undefined;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case 1:
          key = reader.string();
          break;
        case 2:
          val = reader.string();
          break;
        default:
          throw new globalThis.Error("unknown map entry field for field faucet.FaucetStore.usernameToAddress");
      }
    }
    map[key ?? ""] = val ?? "";
  }
  private binaryReadMap3(map: FaucetStore["latestDrip"], reader: IBinaryReader, options: BinaryReadOptions): void {
    let len = reader.uint32(),
      end = reader.pos + len,
      key: keyof FaucetStore["latestDrip"] | undefined,
      val: FaucetStore["latestDrip"][any] | undefined;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case 1:
          key = reader.string();
          break;
        case 2:
          val = reader.int64().toBigInt();
          break;
        default:
          throw new globalThis.Error("unknown map entry field for field faucet.FaucetStore.latestDrip");
      }
    }
    map[key ?? ""] = val ?? 0n;
  }
  internalBinaryWrite(message: FaucetStore, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* map<string, string> addressToUsername = 1; */
    for (let k of Object.keys(message.addressToUsername))
      writer
        .tag(1, WireType.LengthDelimited)
        .fork()
        .tag(1, WireType.LengthDelimited)
        .string(k)
        .tag(2, WireType.LengthDelimited)
        .string(message.addressToUsername[k])
        .join();
    /* map<string, string> usernameToAddress = 2; */
    for (let k of Object.keys(message.usernameToAddress))
      writer
        .tag(2, WireType.LengthDelimited)
        .fork()
        .tag(1, WireType.LengthDelimited)
        .string(k)
        .tag(2, WireType.LengthDelimited)
        .string(message.usernameToAddress[k])
        .join();
    /* map<string, int64> latestDrip = 3; */
    for (let k of Object.keys(message.latestDrip))
      writer
        .tag(3, WireType.LengthDelimited)
        .fork()
        .tag(1, WireType.LengthDelimited)
        .string(k)
        .tag(2, WireType.Varint)
        .int64(message.latestDrip[k])
        .join();
    /* uint64 totalDripCount = 4; */
    if (message.totalDripCount !== 0n) writer.tag(4, WireType.Varint).uint64(message.totalDripCount);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.FaucetStore
 */
export const FaucetStore = new FaucetStore$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DripVerifyTweetRequest$Type extends MessageType<DripVerifyTweetRequest> {
  constructor() {
    super("faucet.DripVerifyTweetRequest", [
      { no: 1, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<DripVerifyTweetRequest>): DripVerifyTweetRequest {
    const message = { username: "", address: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<DripVerifyTweetRequest>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: DripVerifyTweetRequest
  ): DripVerifyTweetRequest {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string username */ 1:
          message.username = reader.string();
          break;
        case /* string address */ 2:
          message.address = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === "throw")
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: DripVerifyTweetRequest,
    writer: IBinaryWriter,
    options: BinaryWriteOptions
  ): IBinaryWriter {
    /* string username = 1; */
    if (message.username !== "") writer.tag(1, WireType.LengthDelimited).string(message.username);
    /* string address = 2; */
    if (message.address !== "") writer.tag(2, WireType.LengthDelimited).string(message.address);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.DripVerifyTweetRequest
 */
export const DripVerifyTweetRequest = new DripVerifyTweetRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DripDevRequest$Type extends MessageType<DripDevRequest> {
  constructor() {
    super("faucet.DripDevRequest", [
      { no: 1, name: "signature", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<DripDevRequest>): DripDevRequest {
    const message = { signature: "", address: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<DripDevRequest>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: DripDevRequest
  ): DripDevRequest {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string signature */ 1:
          message.signature = reader.string();
          break;
        case /* string address */ 2:
          message.address = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === "throw")
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(message: DripDevRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* string signature = 1; */
    if (message.signature !== "") writer.tag(1, WireType.LengthDelimited).string(message.signature);
    /* string address = 2; */
    if (message.address !== "") writer.tag(2, WireType.LengthDelimited).string(message.address);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.DripDevRequest
 */
export const DripDevRequest = new DripDevRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DripResponse$Type extends MessageType<DripResponse> {
  constructor() {
    super("faucet.DripResponse", [{ no: 1, name: "txHash", kind: "scalar", T: 9 /*ScalarType.STRING*/ }]);
  }
  create(value?: PartialMessage<DripResponse>): DripResponse {
    const message = { txHash: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<DripResponse>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: DripResponse
  ): DripResponse {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string txHash */ 1:
          message.txHash = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === "throw")
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(message: DripResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* string txHash = 1; */
    if (message.txHash !== "") writer.tag(1, WireType.LengthDelimited).string(message.txHash);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.DripResponse
 */
export const DripResponse = new DripResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetLinkedTwittersRequest$Type extends MessageType<GetLinkedTwittersRequest> {
  constructor() {
    super("faucet.GetLinkedTwittersRequest", []);
  }
  create(value?: PartialMessage<GetLinkedTwittersRequest>): GetLinkedTwittersRequest {
    const message = {};
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<GetLinkedTwittersRequest>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: GetLinkedTwittersRequest
  ): GetLinkedTwittersRequest {
    return target ?? this.create();
  }
  internalBinaryWrite(
    message: GetLinkedTwittersRequest,
    writer: IBinaryWriter,
    options: BinaryWriteOptions
  ): IBinaryWriter {
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.GetLinkedTwittersRequest
 */
export const GetLinkedTwittersRequest = new GetLinkedTwittersRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetLinkedTwittersResponse$Type extends MessageType<GetLinkedTwittersResponse> {
  constructor() {
    super("faucet.GetLinkedTwittersResponse", [
      { no: 1, name: "linkedTwitters", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => LinkedTwitterPair },
    ]);
  }
  create(value?: PartialMessage<GetLinkedTwittersResponse>): GetLinkedTwittersResponse {
    const message = { linkedTwitters: [] };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<GetLinkedTwittersResponse>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: GetLinkedTwittersResponse
  ): GetLinkedTwittersResponse {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* repeated faucet.LinkedTwitterPair linkedTwitters */ 1:
          message.linkedTwitters.push(LinkedTwitterPair.internalBinaryRead(reader, reader.uint32(), options));
          break;
        default:
          let u = options.readUnknownField;
          if (u === "throw")
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: GetLinkedTwittersResponse,
    writer: IBinaryWriter,
    options: BinaryWriteOptions
  ): IBinaryWriter {
    /* repeated faucet.LinkedTwitterPair linkedTwitters = 1; */
    for (let i = 0; i < message.linkedTwitters.length; i++)
      LinkedTwitterPair.internalBinaryWrite(
        message.linkedTwitters[i],
        writer.tag(1, WireType.LengthDelimited).fork(),
        options
      ).join();
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.GetLinkedTwittersResponse
 */
export const GetLinkedTwittersResponse = new GetLinkedTwittersResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class LinkedTwitterForAddressRequest$Type extends MessageType<LinkedTwitterForAddressRequest> {
  constructor() {
    super("faucet.LinkedTwitterForAddressRequest", [
      { no: 1, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<LinkedTwitterForAddressRequest>): LinkedTwitterForAddressRequest {
    const message = { address: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<LinkedTwitterForAddressRequest>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: LinkedTwitterForAddressRequest
  ): LinkedTwitterForAddressRequest {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string address */ 1:
          message.address = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === "throw")
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: LinkedTwitterForAddressRequest,
    writer: IBinaryWriter,
    options: BinaryWriteOptions
  ): IBinaryWriter {
    /* string address = 1; */
    if (message.address !== "") writer.tag(1, WireType.LengthDelimited).string(message.address);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.LinkedTwitterForAddressRequest
 */
export const LinkedTwitterForAddressRequest = new LinkedTwitterForAddressRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class LinkedTwitterForAddressResponse$Type extends MessageType<LinkedTwitterForAddressResponse> {
  constructor() {
    super("faucet.LinkedTwitterForAddressResponse", [
      { no: 1, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<LinkedTwitterForAddressResponse>): LinkedTwitterForAddressResponse {
    const message = { username: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<LinkedTwitterForAddressResponse>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: LinkedTwitterForAddressResponse
  ): LinkedTwitterForAddressResponse {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string username */ 1:
          message.username = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === "throw")
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: LinkedTwitterForAddressResponse,
    writer: IBinaryWriter,
    options: BinaryWriteOptions
  ): IBinaryWriter {
    /* string username = 1; */
    if (message.username !== "") writer.tag(1, WireType.LengthDelimited).string(message.username);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.LinkedTwitterForAddressResponse
 */
export const LinkedTwitterForAddressResponse = new LinkedTwitterForAddressResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class LinkedAddressForTwitterRequest$Type extends MessageType<LinkedAddressForTwitterRequest> {
  constructor() {
    super("faucet.LinkedAddressForTwitterRequest", [
      { no: 1, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<LinkedAddressForTwitterRequest>): LinkedAddressForTwitterRequest {
    const message = { username: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<LinkedAddressForTwitterRequest>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: LinkedAddressForTwitterRequest
  ): LinkedAddressForTwitterRequest {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string username */ 1:
          message.username = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === "throw")
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: LinkedAddressForTwitterRequest,
    writer: IBinaryWriter,
    options: BinaryWriteOptions
  ): IBinaryWriter {
    /* string username = 1; */
    if (message.username !== "") writer.tag(1, WireType.LengthDelimited).string(message.username);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.LinkedAddressForTwitterRequest
 */
export const LinkedAddressForTwitterRequest = new LinkedAddressForTwitterRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class LinkedAddressForTwitterResponse$Type extends MessageType<LinkedAddressForTwitterResponse> {
  constructor() {
    super("faucet.LinkedAddressForTwitterResponse", [
      { no: 1, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<LinkedAddressForTwitterResponse>): LinkedAddressForTwitterResponse {
    const message = { address: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<LinkedAddressForTwitterResponse>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: LinkedAddressForTwitterResponse
  ): LinkedAddressForTwitterResponse {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string address */ 1:
          message.address = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === "throw")
            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false) (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: LinkedAddressForTwitterResponse,
    writer: IBinaryWriter,
    options: BinaryWriteOptions
  ): IBinaryWriter {
    /* string address = 1; */
    if (message.address !== "") writer.tag(1, WireType.LengthDelimited).string(message.address);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message faucet.LinkedAddressForTwitterResponse
 */
export const LinkedAddressForTwitterResponse = new LinkedAddressForTwitterResponse$Type();
/**
 * @generated ServiceType for protobuf service faucet.FaucetService
 */
export const FaucetService = new ServiceType("faucet.FaucetService", [
  { name: "DripDev", options: {}, I: DripDevRequest, O: DripResponse },
  { name: "DripVerifyTweet", options: {}, I: DripVerifyTweetRequest, O: DripResponse },
  { name: "GetLinkedTwitters", options: {}, I: GetLinkedTwittersRequest, O: GetLinkedTwittersResponse },
  {
    name: "GetLinkedTwitterForAddress",
    options: {},
    I: LinkedTwitterForAddressRequest,
    O: LinkedTwitterForAddressResponse,
  },
  {
    name: "GetLinkedAddressForTwitter",
    options: {},
    I: LinkedAddressForTwitterRequest,
    O: LinkedAddressForTwitterResponse,
  },
]);
