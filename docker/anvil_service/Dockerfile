FROM ubuntu:26.04 AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y wget --fix-missing --fix-broken

RUN wget https://github.com/foundry-rs/foundry/releases/download/nightly-62cdea8ff9e6efef011f77e295823b5f2dbeb3a1/foundry_nightly_linux_amd64.tar.gz && \
tar -xzf foundry_nightly_linux_amd64.tar.gz;

FROM ubuntu:26.04

WORKDIR /app
RUN apt-get update && apt-get install -y curl --fix-missing --fix-broken
COPY --from=builder /app/anvil .
COPY --from=builder /app/cast .
COPY --from=builder /app/forge .
EXPOSE 8545

CMD ["./anvil"]
