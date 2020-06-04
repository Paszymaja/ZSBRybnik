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
}

// GetPostHandler - Handling get-post route
func GetPostHandler(context *gin.Context) {
	id := context.DefaultQuery("id", "0")
	database, ok := context.MustGet("database").(*sql.DB)
	if !ok {
		log.Fatalln("Can't find database in gin-gonic context")
		context.AbortWithError(500, errors.New("Internal Server Error"))
	} else {
		query := "SELECT zsbrybnik.posts.title, zsbrybnik.posts.content FROM zsbrybnik.posts WHERE zsbrybnik.posts.id = ?"
		result := database.QueryRow(query, id)
		var getPost getPostJSON
		err := result.Scan(&getPost.Title, &getPost.Content)
		utils.ErrorHandler(err, false)
		context.JSON(200, gin.H{
			"data": getPost,
		})
	}
}
