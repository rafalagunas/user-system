#!/bin/bash
docker build . -t rafalagunas/user-system
docker run -p 8080:8080 -d rafalagunas/user-system