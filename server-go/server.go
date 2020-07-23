package main

import (
	"database/sql"
	"os"
	"time"

	"zsbrybnik.pl/server-go/routes"
	"zsbrybnik.pl/server-go/utils"

	"github.com/allegro/bigcache"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	utils.LoadEnvFile()
	databaseUser := os.Getenv("DATABASE_USER")
	databaseName := os.Getenv("DATABASE_NAME")
	databasePassword := os.Getenv("DATABASE_PASSWORD")
	database, err := sql.Open("mysql", databaseUser+":"+databasePassword+"@/"+databaseName)
	utils.ErrorHandler(err, true)
	defer database.Close()
	cache, err := bigcache.NewBigCache(bigcache.DefaultConfig(10 * time.Minute))
	utils.ErrorHandler(err, true)
	server := gin.Default()
	mainAppURL := os.Getenv("MAIN_APP_URL")
	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{mainAppURL},
		AllowHeaders:     []string{"Origin", "Access-Control-Allow-Headers", "Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization"},
		AllowMethods:     []string{"GET", "HEAD", "OPTIONS", "POST", "PUT"},
		AllowCredentials: true,
	}))
	server.Use(utils.SetDatabase(database))
	server.Use(utils.SetCache(cache))
	server.POST("/api/verify-token", routes.VerifyTokenHandler)
	server.POST("/api/login", routes.LoginHandler)
	server.GET("/api/get-posts", routes.GetPostsHandler)
	server.POST("/api/change-password", routes.ChangePasswordHandler)
	server.GET("/api/get-subpages-routes", routes.GetSubpagesRoutesHandler)
	server.GET("/api/get-subpages-categories", routes.GetSubpagesRoutesCategoriesHandler)
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
