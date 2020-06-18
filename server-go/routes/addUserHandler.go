package routes

import (
	"database/sql"
	"errors"
	"log"

	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/server-go/utils"
)

type addUserJSON struct {
	Token    string `json:"token"`
	Login    string `json:"login"`
	Password string `json:"password"`
}

// AddUserHandler - Handling add-user route
func AddUserHandler(context *gin.Context) {
	var addUserData addUserJSON
	err := context.Bind(&addUserData)
	utils.ErrorHandler(err, false)
	if err != nil {
		context.AbortWithError(400, errors.New("Bad Request"))
	} else {
		err := utils.VerifyToken(addUserData.Token)
		utils.ErrorHandler(err, false)
		if err != nil {
			context.AbortWithError(403, errors.New("Forbidden"))
		} else {
			database, ok := context.MustGet("database").(*sql.DB)
			if !ok {
				log.Fatalln("Can't find database in gin-gonic context")
				context.AbortWithError(500, errors.New("Internal Server Error"))
			} else {
				query := "INSERT INTO admins (login, password) VALUES (?, ?)"
				result, err := database.Query(query, addUserData.Login, addUserData.Password)
				utils.ErrorHandler(err, false)
				defer result.Close()
				if err != nil {
					context.AbortWithError(500, errors.New("Internal Server Error"))
				} else {
					context.JSON(200, gin.H{
						"status": "Ok!",
					})
				}
			}
		}
	}
}
