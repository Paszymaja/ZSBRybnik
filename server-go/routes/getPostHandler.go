package routes

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"

	"github.com/allegro/bigcache"
	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/server-go/utils"
)

type getPostJSON struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	Author  string `json:"author"`
}

type getPostInAnotherLangJSON struct {
	PolishTitle        string         `json:"polishTitle"`
	PolishContent      string         `json:"polishContent"`
	PolishAuthor       string         `json:"polishAuthor"`
	AnotherLangTitle   sql.NullString `json:"anotherLangTitle"`
	AnotherLangContent sql.NullString `json:"anotherLangContent"`
	AnotherLangAuthor  sql.NullString `json:"anotherLangAuthor"`
}

// GetPostHandler - Handling get-post route
func GetPostHandler(context *gin.Context) {
	id := context.Query("id")
	language := context.Query("language")
	cache, ok := context.MustGet("cache").(*bigcache.BigCache)
	var getPost getPostJSON
	if ok {
		if value, err := cache.Get("post-" + id + "-" + language); err == nil {
			err = json.Unmarshal(value, &getPost)
			utils.ErrorHandler(nil, false)
		} else {
			database, ok := context.MustGet("database").(*sql.DB)
			if ok {
				var query string
				var result *sql.Row
				if language != "pl" {
					query = "SELECT polish_posts.title AS polishPostsTitle, polish_posts.content AS polishPostsContent, polish_posts.author AS polishPostsAuthor, another_lang_posts.title AS anotherLangPostsTitle, another_lang_posts.content AS anotherLangPostsContent, another_lang_posts.author AS anotherLangPostsAuthor FROM posts AS polish_posts LEFT JOIN (SELECT posts.title, posts.content, posts.author, posts.post_id FROM posts WHERE posts.post_id = ? AND posts.language = ?) as another_lang_posts ON another_lang_posts.post_id=polish_posts.post_id WHERE polish_posts.post_id = ? AND polish_posts.language = \"pl\""
					result = database.QueryRow(query, id, language, id)
					var tempGetPost getPostInAnotherLangJSON
					err := result.Scan(&tempGetPost.PolishTitle, &tempGetPost.PolishContent, &tempGetPost.PolishAuthor, &tempGetPost.AnotherLangTitle, &tempGetPost.AnotherLangContent, &tempGetPost.AnotherLangAuthor)
					utils.ErrorHandler(err, false)
					if tempGetPost.AnotherLangTitle.Valid && tempGetPost.AnotherLangContent.Valid && err == nil {
						getPost = getPostJSON{Title: tempGetPost.AnotherLangTitle.String, Content: tempGetPost.AnotherLangContent.String, Author: tempGetPost.AnotherLangAuthor.String}
					} else {
						getPost = getPostJSON{Title: tempGetPost.PolishTitle, Content: tempGetPost.PolishContent, Author: tempGetPost.PolishAuthor}
					}
				} else {
					query = "SELECT title, content, author FROM posts WHERE post_id = ? AND language=\"pl\""
					result = database.QueryRow(query, id)
					err := result.Scan(&getPost.Title, &getPost.Content, &getPost.Author)
					utils.ErrorHandler(err, false)
				}
				getPostInBytes, err := json.Marshal(getPost)
				utils.ErrorHandler(err, false)
				cache.Set("post-"+id+"-"+language, getPostInBytes)
			} else {
				log.Fatalln("Can't find database in gin-gonic context")
				context.AbortWithError(500, errors.New("Internal Server Error"))
				return
			}
		}
		context.JSON(200, getPost)
	} else {
		utils.ErrorHandler(nil, true)
	}
}
