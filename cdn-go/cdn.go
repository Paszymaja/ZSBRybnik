package main

import (
	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/cdn-go/utils"
)

func main() {
	server := gin.Default()
	server.Use(utils.CorsMiddleware())
	server.Static("/", "./public")
	server.Run(":5002")
}
