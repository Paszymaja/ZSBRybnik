package routes

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/server-go/utils"
)

type postJSON struct {
	Id           int    `json:"id"`
	Title        string `json:"title"`
	Img          string `json:"img"`
	Introduction string `json:"introduction"`
	ImgAlt       string `json:"imgAlt"`
}

// GetPostsHandler - Handling get-post route
func GetPostsHandler(context *gin.Context) {
	toSubtract := context.DefaultQuery("toSubtract", "0")
	database, ok := context.MustGet("database").(*sql.DB)
	if !ok {
		log.Fatalln("Can't find database in gin-gonic context")
		context.AbortWithError(500, errors.New("Internal Server Error"))
	} else {
		query := "SELECT zsbrybnik.posts.id, zsbrybnik.posts.title, zsbrybnik.posts.img, zsbrybnik.posts.introduction, zsbrybnik.posts.img_alt as imgAlt FROM zsbrybnik.posts WHERE zsbrybnik.posts.id > ((SELECT MAX(zsbrybnik.posts.id) as highestId FROM zsbrybnik.posts) - ?) AND zsbrybnik.posts.id <= ((SELECT MAX(zsbrybnik.posts.id) as highestId FROM zsbrybnik.posts) - ?) ORDER BY zsbrybnik.posts.id DESC"
		toSubstractAsNumber, err := strconv.Atoi(toSubtract)
		utils.ErrorHandler(err, false)
		if err != nil {
			context.AbortWithError(400, errors.New("Bad Request"))
		} else {
			toSubstractBorderPost := strconv.Itoa(toSubstractAsNumber + 10)
			fmt.Println(toSubstractBorderPost, toSubtract)
			result, err := database.Query(query, toSubstractBorderPost, toSubtract)
			utils.ErrorHandler(err, false)
			defer result.Close()
			if err != nil {
				context.AbortWithError(500, errors.New("Internal Server Error"))
			} else {
				var postsArray []postJSON
				for result.Next() {
					var post postJSON
					err := result.Scan(&post.Id, &post.Title, &post.Img, &post.Introduction, &post.ImgAlt)
					utils.ErrorHandler(err, false)
					postsArray = append(postsArray, post)
				}
				context.JSON(200, postsArray)
			}
		}
	}
}
