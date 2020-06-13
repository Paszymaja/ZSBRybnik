package routes

import (
	"database/sql"
	"errors"
	"log"

	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/server-go/utils"
)

type getPostJSON struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	Author  string `json:"author"`
}

// GetPostHandler - Handling get-post route
func GetPostHandler(context *gin.Context) {
	id := context.DefaultQuery("id", "0")
	database, ok := context.MustGet("database").(*sql.DB)
	if !ok {
		log.Fatalln("Can't find database in gin-gonic context")
		context.AbortWithError(500, errors.New("Internal Server Error"))
	} else {
		query := "SELECT title, content, author FROM posts WHERE id = ?"
		result := database.QueryRow(query, id)
		var getPost getPostJSON
		err := result.Scan(&getPost.Title, &getPost.Content, &getPost.Author)
		utils.ErrorHandler(err, false)
		context.JSON(200, getPost)
	}
}
