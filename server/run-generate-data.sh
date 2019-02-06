#!/usr/bin/env bash
while true
do
	sh ts-node ./src/setup/generate-gap-data.ts
	sleep 60
done