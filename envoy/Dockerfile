# Run an envoy proxy to convert the frontend grpc-web calls to grpc
# Your cloudstate proxy should be listening on port 9000
FROM envoyproxy/envoy-alpine:v1.14.1
COPY envoy.yaml /etc/envoy/envoy.yaml
CMD envoy -c /etc/envoy/envoy.yaml
