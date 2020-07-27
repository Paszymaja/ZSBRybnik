package utils

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/allegro/bigcache"
	jwt "github.com/gbrlsnchs/jwt/v3"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

// CustomJWTPayload - Template struct to JWT payload
type CustomJWTPayload struct {
	jwt.Payload
	Login string `json:"login"`
	Role  string `json:"role"`
}

// LoadEnvFile - Loading .env file
func LoadEnvFile() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
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

// SetCache - Setting cache in context
func SetCache(cache *bigcache.BigCache) gin.HandlerFunc {
	return func(context *gin.Context) {
		context.Set("cache", cache)
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
