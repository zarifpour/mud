/* eslint-disable */
// @generated by protobuf-ts 2.8.0 with parameter eslint_disable
// @generated from protobuf file "ecs-stream.proto" (package "ecsstream", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { ECSStreamService } from "./ecs-stream";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { ECSStreamBlockBundleReply } from "./ecs-stream";
import type { ECSStreamBlockBundleRequest } from "./ecs-stream";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * The Stream Service definition.
 *
 * @generated from protobuf service ecsstream.ECSStreamService
 */
export interface IECSStreamServiceClient {
  /**
   * Opens a cursor to receive the latest ECS events and additional data specified via request.
   *
   * @generated from protobuf rpc: SubscribeToStreamLatest(ecsstream.ECSStreamBlockBundleRequest) returns (stream ecsstream.ECSStreamBlockBundleReply);
   */
  subscribeToStreamLatest(
    input: ECSStreamBlockBundleRequest,
    options?: RpcOptions
  ): ServerStreamingCall<ECSStreamBlockBundleRequest, ECSStreamBlockBundleReply>;
}
/**
 * The Stream Service definition.
 *
 * @generated from protobuf service ecsstream.ECSStreamService
 */
export class ECSStreamServiceClient implements IECSStreamServiceClient, ServiceInfo {
  typeName = ECSStreamService.typeName;
  methods = ECSStreamService.methods;
  options = ECSStreamService.options;
  constructor(private readonly _transport: RpcTransport) {}
  /**
   * Opens a cursor to receive the latest ECS events and additional data specified via request.
   *
   * @generated from protobuf rpc: SubscribeToStreamLatest(ecsstream.ECSStreamBlockBundleRequest) returns (stream ecsstream.ECSStreamBlockBundleReply);
   */
  subscribeToStreamLatest(
    input: ECSStreamBlockBundleRequest,
    options?: RpcOptions
  ): ServerStreamingCall<ECSStreamBlockBundleRequest, ECSStreamBlockBundleReply> {
    const method = this.methods[0],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<ECSStreamBlockBundleRequest, ECSStreamBlockBundleReply>(
      "serverStreaming",
      this._transport,
      method,
      opt,
      input
    );
  }
}
