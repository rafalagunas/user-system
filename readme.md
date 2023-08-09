Build container
docker build . -t rafalagunas/user-system

Run container
docker run -p 8080:8080 -d rafalagunas/user-system
