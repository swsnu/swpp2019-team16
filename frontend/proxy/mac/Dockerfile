FROM envoyproxy/envoy:latest

COPY ./envoy.yaml /etc/envoy/envoy.yaml

EXPOSE 8080
EXPOSE 9901

CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml -l trace --log-path /tmp/envoy_info.log
