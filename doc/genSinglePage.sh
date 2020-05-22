#!/bin/bash

SRC=./src
TARGET=./src/singlepage.md

git pull

cat api.md > $TARGET
cat $SRC/toc.md >> $TARGET
cat $SRC/swagger.md >>  $TARGET
cat $SRC/submitCustomerData.md >> $TARGET
cat $SRC/manual-buy.md >> $TARGET
cat $SRC/admin-login.md >> $TARGET


