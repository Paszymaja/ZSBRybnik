package main

import (
	"database/sql"

	"zsbrybnik.pl/server-go/routes"
	"zsbrybnik.pl/server-go/utils"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	database, err := sql.Open("mysql", "root:@/zsbrybnik")
	utils.ErrorHandler(err, true)
	defer database.Close()
	server := gin.Default()
	server.Use(utils.CorsMiddleware())
	server.Use(utils.SetDatabase(database))
	server.POST("/api/verify-token", routes.VerifyTokenHandler)
	server.POST("/api/login", routes.LoginHandler)
	server.GET("/api/get-posts", routes.GetPostsHandler)
	server.POST("/api/change-password", routes.ChangePasswordHandler)
	server.GET("/api/get-subpages-routes", routes.GetSubpagesRoutesHandler)
	server.POST("/api/edit-post", routes.EditPostHandler)
	server.POST("/api/add-user", routes.AddUserHandler)
	server.POST("/api/add-post", routes.AddPostHandler)
	server.POST("/api/delete-post", routes.DeletePostHandler)
	server.GET("/api/get-posts-titles", routes.GetPostsTitlesHandler)
	server.GET("/api/get-post", routes.GetPostHandler)
	server.GET("/api/get-whole-posts", routes.GetWholePostsHandler)
	server.POST("/api/add-subpage", routes.AddSubpageHandler)
	server.POST("/api/edit-subpage", routes.EditSubpageHandler)
	server.GET("/api/get-subpage", routes.GetSubpageHandler)
	server.Run(":5002")
}
