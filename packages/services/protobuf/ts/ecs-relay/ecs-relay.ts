/* eslint-disable */
// @generated by protobuf-ts 2.8.0 with parameter eslint_disable
// @generated from protobuf file "ecs-relay.proto" (package "ecsrelay", syntax proto3)
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
 * Identifies a client connecting to Relay Service.
 *
 * @generated from protobuf message ecsrelay.Identity
 */
export interface Identity {
  /**
   * @generated from protobuf field: string name = 1;
   */
  name: string;
}
/**
 * @generated from protobuf message ecsrelay.Message
 */
export interface Message {
  /**
   * @generated from protobuf field: uint32 version = 1;
   */
  version: number;
  /**
   * @generated from protobuf field: bytes data = 2;
   */
  data: Uint8Array;
  /**
   * @generated from protobuf field: int64 timestamp = 3;
   */
  timestamp: bigint;
  /**
   * @generated from protobuf field: string id = 4;
   */
  id: string;
}
/**
 * @generated from protobuf message ecsrelay.SubscriptionRequest
 */
export interface SubscriptionRequest {
  /**
   * @generated from protobuf field: ecsrelay.Identity identity = 1;
   */
  identity?: Identity;
  /**
   * @generated from protobuf field: ecsrelay.Subscription subscription = 2;
   */
  subscription?: Subscription;
}
/**
 * @generated from protobuf message ecsrelay.Subscription
 */
export interface Subscription {
  /**
   * @generated from protobuf field: string label = 1;
   */
  label: string;
}
/**
 * @generated from protobuf message ecsrelay.PushRequest
 */
export interface PushRequest {
  /**
   * @generated from protobuf field: ecsrelay.Identity identity = 1;
   */
  identity?: Identity;
  /**
   * @generated from protobuf field: string label = 2;
   */
  label: string;
  /**
   * @generated from protobuf field: repeated ecsrelay.Message messages = 3;
   */
  messages: Message[];
}
/**
 * @generated from protobuf message ecsrelay.PushResponse
 */
export interface PushResponse {}
/**
 * @generated from protobuf message ecsrelay.CountIdentitiesRequest
 */
export interface CountIdentitiesRequest {}
/**
 * @generated from protobuf message ecsrelay.CountIdentitiesResponse
 */
export interface CountIdentitiesResponse {
  /**
   * @generated from protobuf field: uint32 count = 1;
   */
  count: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class Identity$Type extends MessageType<Identity> {
  constructor() {
    super("ecsrelay.Identity", [{ no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }]);
  }
  create(value?: PartialMessage<Identity>): Identity {
    const message = { name: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<Identity>(this, message, value);
    return message;
  }
  internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Identity): Identity {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string name */ 1:
          message.name = reader.string();
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
  internalBinaryWrite(message: Identity, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* string name = 1; */
    if (message.name !== "") writer.tag(1, WireType.LengthDelimited).string(message.name);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message ecsrelay.Identity
 */
export const Identity = new Identity$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Message$Type extends MessageType<Message> {
  constructor() {
    super("ecsrelay.Message", [
      { no: 1, name: "version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
      { no: 2, name: "data", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
      { no: 3, name: "timestamp", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 0 /*LongType.BIGINT*/ },
      { no: 4, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<Message>): Message {
    const message = { version: 0, data: new Uint8Array(0), timestamp: 0n, id: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<Message>(this, message, value);
    return message;
  }
  internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Message): Message {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* uint32 version */ 1:
          message.version = reader.uint32();
          break;
        case /* bytes data */ 2:
          message.data = reader.bytes();
          break;
        case /* int64 timestamp */ 3:
          message.timestamp = reader.int64().toBigInt();
          break;
        case /* string id */ 4:
          message.id = reader.string();
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
  internalBinaryWrite(message: Message, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* uint32 version = 1; */
    if (message.version !== 0) writer.tag(1, WireType.Varint).uint32(message.version);
    /* bytes data = 2; */
    if (message.data.length) writer.tag(2, WireType.LengthDelimited).bytes(message.data);
    /* int64 timestamp = 3; */
    if (message.timestamp !== 0n) writer.tag(3, WireType.Varint).int64(message.timestamp);
    /* string id = 4; */
    if (message.id !== "") writer.tag(4, WireType.LengthDelimited).string(message.id);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message ecsrelay.Message
 */
export const Message = new Message$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SubscriptionRequest$Type extends MessageType<SubscriptionRequest> {
  constructor() {
    super("ecsrelay.SubscriptionRequest", [
      { no: 1, name: "identity", kind: "message", T: () => Identity },
      { no: 2, name: "subscription", kind: "message", T: () => Subscription },
    ]);
  }
  create(value?: PartialMessage<SubscriptionRequest>): SubscriptionRequest {
    const message = {};
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<SubscriptionRequest>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: SubscriptionRequest
  ): SubscriptionRequest {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* ecsrelay.Identity identity */ 1:
          message.identity = Identity.internalBinaryRead(reader, reader.uint32(), options, message.identity);
          break;
        case /* ecsrelay.Subscription subscription */ 2:
          message.subscription = Subscription.internalBinaryRead(
            reader,
            reader.uint32(),
            options,
            message.subscription
          );
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
  internalBinaryWrite(message: SubscriptionRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* ecsrelay.Identity identity = 1; */
    if (message.identity)
      Identity.internalBinaryWrite(message.identity, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
    /* ecsrelay.Subscription subscription = 2; */
    if (message.subscription)
      Subscription.internalBinaryWrite(
        message.subscription,
        writer.tag(2, WireType.LengthDelimited).fork(),
        options
      ).join();
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message ecsrelay.SubscriptionRequest
 */
export const SubscriptionRequest = new SubscriptionRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Subscription$Type extends MessageType<Subscription> {
  constructor() {
    super("ecsrelay.Subscription", [{ no: 1, name: "label", kind: "scalar", T: 9 /*ScalarType.STRING*/ }]);
  }
  create(value?: PartialMessage<Subscription>): Subscription {
    const message = { label: "" };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<Subscription>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: Subscription
  ): Subscription {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* string label */ 1:
          message.label = reader.string();
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
  internalBinaryWrite(message: Subscription, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* string label = 1; */
    if (message.label !== "") writer.tag(1, WireType.LengthDelimited).string(message.label);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message ecsrelay.Subscription
 */
export const Subscription = new Subscription$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PushRequest$Type extends MessageType<PushRequest> {
  constructor() {
    super("ecsrelay.PushRequest", [
      { no: 1, name: "identity", kind: "message", T: () => Identity },
      { no: 2, name: "label", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
      { no: 3, name: "messages", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Message },
    ]);
  }
  create(value?: PartialMessage<PushRequest>): PushRequest {
    const message = { label: "", messages: [] };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<PushRequest>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: PushRequest
  ): PushRequest {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* ecsrelay.Identity identity */ 1:
          message.identity = Identity.internalBinaryRead(reader, reader.uint32(), options, message.identity);
          break;
        case /* string label */ 2:
          message.label = reader.string();
          break;
        case /* repeated ecsrelay.Message messages */ 3:
          message.messages.push(Message.internalBinaryRead(reader, reader.uint32(), options));
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
  internalBinaryWrite(message: PushRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    /* ecsrelay.Identity identity = 1; */
    if (message.identity)
      Identity.internalBinaryWrite(message.identity, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
    /* string label = 2; */
    if (message.label !== "") writer.tag(2, WireType.LengthDelimited).string(message.label);
    /* repeated ecsrelay.Message messages = 3; */
    for (let i = 0; i < message.messages.length; i++)
      Message.internalBinaryWrite(message.messages[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message ecsrelay.PushRequest
 */
export const PushRequest = new PushRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PushResponse$Type extends MessageType<PushResponse> {
  constructor() {
    super("ecsrelay.PushResponse", []);
  }
  create(value?: PartialMessage<PushResponse>): PushResponse {
    const message = {};
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<PushResponse>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: PushResponse
  ): PushResponse {
    return target ?? this.create();
  }
  internalBinaryWrite(message: PushResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message ecsrelay.PushResponse
 */
export const PushResponse = new PushResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CountIdentitiesRequest$Type extends MessageType<CountIdentitiesRequest> {
  constructor() {
    super("ecsrelay.CountIdentitiesRequest", []);
  }
  create(value?: PartialMessage<CountIdentitiesRequest>): CountIdentitiesRequest {
    const message = {};
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<CountIdentitiesRequest>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: CountIdentitiesRequest
  ): CountIdentitiesRequest {
    return target ?? this.create();
  }
  internalBinaryWrite(
    message: CountIdentitiesRequest,
    writer: IBinaryWriter,
    options: BinaryWriteOptions
  ): IBinaryWriter {
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message ecsrelay.CountIdentitiesRequest
 */
export const CountIdentitiesRequest = new CountIdentitiesRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CountIdentitiesResponse$Type extends MessageType<CountIdentitiesResponse> {
  constructor() {
    super("ecsrelay.CountIdentitiesResponse", [{ no: 1, name: "count", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }]);
  }
  create(value?: PartialMessage<CountIdentitiesResponse>): CountIdentitiesResponse {
    const message = { count: 0 };
    globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
    if (value !== undefined) reflectionMergePartial<CountIdentitiesResponse>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: CountIdentitiesResponse
  ): CountIdentitiesResponse {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* uint32 count */ 1:
          message.count = reader.uint32();
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
    message: CountIdentitiesResponse,
    writer: IBinaryWriter,
    options: BinaryWriteOptions
  ): IBinaryWriter {
    /* uint32 count = 1; */
    if (message.count !== 0) writer.tag(1, WireType.Varint).uint32(message.count);
    let u = options.writeUnknownFields;
    if (u !== false) (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message ecsrelay.CountIdentitiesResponse
 */
export const CountIdentitiesResponse = new CountIdentitiesResponse$Type();
/**
 * @generated ServiceType for protobuf service ecsrelay.ECSRelayService
 */
export const ECSRelayService = new ServiceType("ecsrelay.ECSRelayService", [
  { name: "Authenticate", options: {}, I: Identity, O: Identity },
  { name: "Revoke", options: {}, I: Identity, O: Identity },
  { name: "Ping", options: {}, I: Identity, O: Identity },
  { name: "CountAuthenticated", options: {}, I: CountIdentitiesRequest, O: CountIdentitiesResponse },
  { name: "CountConnected", options: {}, I: CountIdentitiesRequest, O: CountIdentitiesResponse },
  { name: "Subscribe", options: {}, I: SubscriptionRequest, O: Subscription },
  { name: "Unsubscribe", options: {}, I: SubscriptionRequest, O: Subscription },
  { name: "OpenStream", serverStreaming: true, options: {}, I: Identity, O: Message },
  { name: "Push", options: {}, I: PushRequest, O: PushResponse },
]);
