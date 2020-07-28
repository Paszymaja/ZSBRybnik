FROM golang:latest
ADD . /server
WORKDIR /server/
RUN go mod download
RUN GOOS=linux GOARCH=amd64 go build -o server server.go
EXPOSE 5001
CMD ["./server"]