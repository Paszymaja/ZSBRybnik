package routes

import (
	"database/sql"
	"errors"
	"log"

	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/server-go/utils"
)

type addPostJSON struct {
	Title        string `json:"title"`
	Introduction string `json:"introduction"`
	Img          string `json:"img"`
	ImgAlt       string `json:"imgAlt"`
	Content      string `json:"content"`
}

type idJSON struct {
	ID int `json:"id"`
}

// AddPostHandler - Handling add-post route
func AddPostHandler(context *gin.Context) {
	token := context.GetHeader("Authorization")
	var addPostData addPostJSON
	err := context.Bind(&addPostData)
	utils.ErrorHandler(err, false)
	if err != nil {
		context.AbortWithError(400, errors.New("Bad Request"))
	} else {
		err := utils.VerifyToken(token)
		utils.ErrorHandler(err, false)
		if err != nil {
			context.AbortWithError(403, errors.New("Forbidden"))
		} else {
			database, ok := context.MustGet("database").(*sql.DB)
			if !ok {
				log.Fatalln("Can't find database in gin-gonic context")
				context.AbortWithError(500, errors.New("Internal Server Error"))
			} else {
				query := "SELECT MAX(id) as id FROM posts"
				result := database.QueryRow(query)
				var idData idJSON
				err := result.Scan(&idData.ID)
				utils.ErrorHandler(err, false)
				if err != nil {
					context.AbortWithError(500, errors.New("Internal Server Error"))
				} else {
					id := idData.ID + 1
					query := "INSERT INTO posts (id, title, introduction, img, img_alt, content) VALUES (?, ?, ?, ?, ?, ?)"
					result, err := database.Query(query, id, addPostData.Title, addPostData.Introduction, addPostData.Img, addPostData.ImgAlt, addPostData.Content)
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
}
