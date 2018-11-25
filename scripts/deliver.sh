#!/bin/bash

cd ../server
export JENKINS_NODE_COOKIE=dontKillMe
pm2 restart npm || pm2 start npm -- start

