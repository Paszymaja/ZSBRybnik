package utils

import (
	"github.com/gin-gonic/gin"
)

// CorsMiddleware - Protecting page against Cross Origin Attacks
func CorsMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		context.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if context.Request.Method == "OPTIONS" {
			context.Abort()
			return
		}
		context.Next()
	}
}
