package routes

import (
	"errors"

	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/server-go/utils"
)

type verifyTokenJSON struct {
	Token string `json:"token" binding:"required"`
}

// VerifyTokenHandler - Handling verify-token route
func VerifyTokenHandler(context *gin.Context) {
	var verifyTokenData verifyTokenJSON
	err := context.Bind(&verifyTokenData)
	utils.ErrorHandler(err, false)
	err = utils.VerifyToken(verifyTokenData.Token)
	utils.ErrorHandler(err, false)
	if err != nil {
		context.AbortWithError(403, errors.New("Forbidden"))
	} else {
		context.JSON(200, "Ok!")
	}
}
