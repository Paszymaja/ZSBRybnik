package utils

import (
	"database/sql"
	"fmt"
	"log"

	jwt "github.com/gbrlsnchs/jwt/v3"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

// CustomJWTPayload - Template struct to JWT payload
type CustomJWTPayload struct {
	jwt.Payload
	Login    string `json:"login"`
	Password string `json:"password"`
}

// ErrorHandler - Basic error handling function
func ErrorHandler(err error, critical bool) {
	if err != nil {
		if critical {
			log.Fatalln(err)
		} else {
			fmt.Println(err)
		}
	}
}

// SetDatabase - Setting database in context
func SetDatabase(database *sql.DB) gin.HandlerFunc {
	return func(context *gin.Context) {
		context.Set("database", database)
		context.Next()
	}
}

// SecretKey - JWT secret key
var SecretKey = jwt.NewHS256([]byte("secret"))

// VerifyToken - Verifing user token
func VerifyToken(token string) error {
	var tokenStructure CustomJWTPayload
	tokenInBytes := []byte(token)
	_, err := jwt.Verify(tokenInBytes, SecretKey, &tokenStructure)
	return err
}

// CreateBCryptHash - Creating a hashed password
func CreateBCryptHash(password string) string {
	passwordInBytes := []byte(password)
	hashedPasswordInBytes, err := bcrypt.GenerateFromPassword(passwordInBytes, 15)
	ErrorHandler(err, false)
	hashedPassword := string(hashedPasswordInBytes)
	return hashedPassword
}

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