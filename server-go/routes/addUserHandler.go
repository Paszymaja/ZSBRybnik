package routes

import (
	"database/sql"
	"errors"
	"log"
	"math/rand"
	"os"
	"strings"
	"time"

	"github.com/emersion/go-sasl"
	"github.com/emersion/go-smtp"
	"github.com/gin-gonic/gin"
	"golang.org/x/exp/errors/fmt"
	"zsbrybnik.pl/server-go/utils"
)

type addUserJSON struct {
	Login string `json:"login"`
	Email string `json:"email"`
	Role  string `json:"role"`
}

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

// AddUserHandler - Handling add-user route
func AddUserHandler(context *gin.Context) {
	token := context.GetHeader("Authorization")
	err := utils.VerifyToken(token)
	utils.ErrorHandler(err, false)
	if err == nil {
		err := utils.VerifyToken(token)
		utils.ErrorHandler(err, false)
		if err == nil {
			var addUserData addUserJSON
			err := context.Bind(&addUserData)
			utils.ErrorHandler(err, false)
			if err == nil {
				database, ok := context.MustGet("database").(*sql.DB)
				if ok {
					password := randomString(10)
					bcrytedPassword := utils.CreateBCryptHash(password)
					query := "INSERT INTO users (login, password, email, role) VALUES (?, ?, ?, ?)"
					result, err := database.Query(query, addUserData.Login, bcrytedPassword, addUserData.Email, addUserData.Role)
					utils.ErrorHandler(err, false)
					defer result.Close()
					if err == nil {
						var zsbEmail string = os.Getenv("EMAIL")
						var zsbEmailPassword string = os.Getenv("EMAIL_PASSWORD")
						auth := sasl.NewPlainClient("", zsbEmail, zsbEmailPassword)
						mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
						to := []string{addUserData.Email}
						msg := strings.NewReader("To: " + addUserData.Email +
							"\r\nSubject: Twoje konto ZSB\r\n" + mime + "<html><body><h1>Twoje hasło to: " + password + "</h1></body></html>")
						fmt.Println(zsbEmail, zsbEmailPassword)
						err := smtp.SendMail("smtp.gmail.com:587", auth, zsbEmail, to, msg)
						utils.ErrorHandler(err, false)
						if err == nil {
							context.Status(200)
						} else {
							context.AbortWithError(500, errors.New("Internal Server Error"))
						}
					} else {
						context.AbortWithError(500, errors.New("Internal Server Error"))
					}
				} else {
					log.Fatalln("Can't find database in gin-gonic context")
					context.AbortWithError(500, errors.New("Internal Server Error"))
				}
			} else {
				context.AbortWithError(400, errors.New("Bad Request"))
			}
		} else {
			context.AbortWithError(401, errors.New("Unauthorized"))
		}
	} else {
		context.AbortWithError(403, errors.New("Forbidden"))
	}
}

var seededRand *rand.Rand = rand.New(
	rand.NewSource(time.Now().UnixNano()))

func stringWithCharset(length int, charset string) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

func randomString(length int) string {
	return stringWithCharset(length, charset)
}
