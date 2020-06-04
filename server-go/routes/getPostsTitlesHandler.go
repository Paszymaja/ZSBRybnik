package routes

import (
	"database/sql"
	"errors"
	"log"

	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/server-go/utils"
)

type postsTitlesJSON struct {
	Id    int    `json:"id"`
	Title string `json:"title"`
}

// GetPostsTitlesHandler Handling get-posts routes
func GetPostsTitlesHandler(context *gin.Context) {
	database, ok := context.MustGet("database").(*sql.DB)
	if !ok {
		log.Fatalln("Can't find database in gin-gonic context")
		context.AbortWithError(500, errors.New("Internal Server Error"))
	} else {
		query := "SELECT zsbrybnik.posts.id, zsbrybnik.posts.title FROM zsbrybnik.posts ORDER BY zsbrybnik.posts.id DESC"
		result, err := database.Query(query)
		utils.ErrorHandler(err, false)
		defer result.Close()
		if err != nil {
			context.AbortWithError(500, errors.New("Internal Server Error"))
		} else {
			var postsTitlesArray []postsTitlesJSON
			for result.Next() {
				var postsTitles postsTitlesJSON
				err := result.Scan(&postsTitles.Id, &postsTitles.Title)
				utils.ErrorHandler(err, false)
				postsTitlesArray = append(postsTitlesArray, postsTitles)
			}
			context.JSON(200, gin.H{
				"data": postsTitlesArray,
			})
		}
	}
}
