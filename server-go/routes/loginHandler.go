package routes

import (
	"database/sql"
	"errors"
	"log"

	"zsbrybnik.pl/server-go/utils"

	jwt "github.com/gbrlsnchs/jwt/v3"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type loginJSON struct {
	Login    string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type loginMySQLResult struct {
	CorrectLoginPassword bool   `json:"correctLoginPassword"`
	Password             string `json:"password"`
}

// LoginHandler - Handling login route
func LoginHandler(context *gin.Context) {
	var loginData loginJSON
	err := context.Bind(&loginData)
	utils.ErrorHandler(err, false)
	if err != nil {
		context.AbortWithError(400, errors.New("Bad Request"))
	} else {
		database, ok := context.MustGet("database").(*sql.DB)
		if !ok {
			log.Fatalln("Can't find database in gin-gonic context")
			context.AbortWithError(500, errors.New("Internal Server Error"))
		} else {
			query := "SELECT EXISTS(SELECT * FROM admins WHERE login = ?) AS correctLoginAndPassword, password FROM admins WHERE login = ?"
			result := database.QueryRow(query, loginData.Login, loginData.Login)
			var loginMySQLResult loginMySQLResult
			err = result.Scan(&loginMySQLResult.CorrectLoginPassword, &loginMySQLResult.Password)
			utils.ErrorHandler(err, false)
			if err != nil {
				context.AbortWithError(401, errors.New("Unauthorized"))
			} else {
				if loginMySQLResult.CorrectLoginPassword {
					passwordInBytes := []byte(loginData.Password)
					hashedPasswordInBytes := []byte(loginMySQLResult.Password)
					err := bcrypt.CompareHashAndPassword(hashedPasswordInBytes, passwordInBytes)
					utils.ErrorHandler(err, false)
					if err != nil {
						context.AbortWithError(401, errors.New("Unauthorized"))
					} else {
						tokenSignPayload := utils.CustomJWTPayload{
							Payload:  jwt.Payload{},
							Login:    loginData.Login,
							Password: loginMySQLResult.Password,
						}
						token, err := jwt.Sign(tokenSignPayload, utils.SecretKey)
						utils.ErrorHandler(err, false)
						context.JSON(200, gin.H{
							"token": string(token),
						})
					}
				}
			}
		}
	}
}
