package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gbrlsnchs/jwt/v3"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

type verifyTokenJSON struct {
	Token string `json:"token" binding:"required"`
}

type loginJSON struct {
	Login    string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func errorHandler(err error, critical bool) {
	if err != nil {
		if critical {
			log.Fatalln(err)
		} else {
			fmt.Println(err)
		}
	}
}

func createBCryptHash(password string) string {
	passwordInBytes := []byte(password)
	hashedPasswordInBytes, err := bcrypt.GenerateFromPassword(passwordInBytes, 15)
	errorHandler(err, false)
	hashedPassword := string(hashedPasswordInBytes)
	return hashedPassword
}

func corsMiddleware() gin.HandlerFunc {
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

func setDatabase(database *sql.DB) gin.HandlerFunc {
	return func(context *gin.Context) {
		context.Keys["database"] = database
		context.Next()
	}
}

var secretKey = jwt.NewHS256([]byte("secret"))

/*func verifyToken(context *gin.Context, token string) error {
  _, err := jwt.Verify(token, secretKey,  )
}*/

func verifyTokenHandler(context *gin.Context) {
	var verifyTokenData verifyTokenJSON
	err := context.Bind(&verifyTokenData)
	errorHandler(err, false)
	context.JSON(200, verifyTokenData)
}

func loginHandler(context *gin.Context) {
	var loginData loginJSON
	err := context.Bind(&loginData)
	errorHandler(err, false)
}

func main() {
	database, err := sql.Open("mysql", "root:localhost@/zsbrybnik")
	errorHandler(err, true)
	defer database.Close()
	server := gin.Default()
	server.Use(corsMiddleware())
	server.Use(setDatabase(database))
	server.POST("/api/verify-token", verifyTokenHandler)
	server.POST("/api/login", loginHandler)
	server.Run(":5002")
}
