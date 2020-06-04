package routes

import (
	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/server-go/utils"
)

type VerifyTokenJSON struct {
	Token string `json:"token" binding:"required"`
}

// VerifyTokenHandler - Handling verify-token route
func VerifyTokenHandler(context *gin.Context) {
	var verifyTokenData VerifyTokenJSON
	err := context.Bind(&verifyTokenData)
	utils.ErrorHandler(err, false)
	context.JSON(200, verifyTokenData)
}
