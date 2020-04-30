#!/bin/bash
mkdir -p ./ui/src/_proto/cloudstate
mkdir -p ./ui/src/_proto/google/api

echo "Compiling protobuf definitions"

OUT_DIR="./ui/src/_proto"
PROTOC_GEN_TS_PATH="./ui/node_modules/.bin/protoc-gen-ts"

echo "Compile cloudstate entity key"
echo "httpbody.proto"
protoc \
    --proto_path="ui/node_modules/cloudstate/protoc/include/" \
    --proto_path="ui/node_modules/cloudstate/proto/google/api/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-web:${OUT_DIR}/google/api" \
    ui/node_modules/cloudstate/proto/google/api/httpbody.proto

echo "http.proto"
protoc \
    --proto_path="ui/node_modules/cloudstate/proto/google/api/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/google/api" \
    --ts_out="service=grpc-web:${OUT_DIR}/google/api" \
    ui/node_modules/cloudstate/proto/google/api/http.proto

echo "annotations.proto"
protoc \
    --proto_path="ui/node_modules/cloudstate/protoc/include/" \
    --proto_path="ui/node_modules/cloudstate/proto/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-web:${OUT_DIR}" \
    ui/node_modules/cloudstate/proto/google/api/annotations.proto

echo "entity_key.proto"
protoc \
    --proto_path="ui/node_modules/cloudstate/protoc/include/" \
    --proto_path="ui/node_modules/cloudstate/proto/cloudstate/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/cloudstate" \
    --ts_out="service=grpc-web:${OUT_DIR}/cloudstate" \
    ui/node_modules/cloudstate/proto/cloudstate/entity_key.proto

echo "eventing.proto"
protoc \
    --proto_path="ui/node_modules/cloudstate/protoc/include/" \
    --proto_path="ui/node_modules/cloudstate/proto/cloudstate/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/cloudstate" \
    --ts_out="service=grpc-web:${OUT_DIR}/cloudstate" \
    ui/node_modules/cloudstate/proto/cloudstate/eventing.proto

echo "Compiling Raidboss Service"
protoc \
  --proto_path="proto/" \
  --proto_path=ui/node_modules/cloudstate/proto \
  --proto_path=ui/node_modules/cloudstate/protoc/include \
  --proto_path=proto \
  --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
  --js_out="import_style=commonjs,binary:${OUT_DIR}" \
  --ts_out="service=grpc-web:${OUT_DIR}" \
  raidbossservice.proto
