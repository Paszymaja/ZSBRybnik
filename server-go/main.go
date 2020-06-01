package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

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

func main() {
	database, err := sql.Open("mysql", "root:localhost:3306/zsbrybnik")
	errorHandler(err, true)
	defer database.Close()
	server := gin.Default()
	server.Run(":5002")
}
