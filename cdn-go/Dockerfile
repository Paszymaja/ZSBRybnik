FROM golang:latest
ADD . /cdn
WORKDIR /cdn
RUN go mod download
RUN GOOS=linux GOARCH=amd64 go build -o cdn cdn.go
EXPOSE 5002
CMD ["./cdn"]