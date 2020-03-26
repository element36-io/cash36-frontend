#!/bin/bash

CERTCHECK="/etc/letsencrypt/live/$1/privkey.pem"

while [ ! -f "$CERTCHECK" ]; do echo "wait for file $CERTCHECK";sleep 5; done

echo "starting nginx"
nginx -g daemon: off;
