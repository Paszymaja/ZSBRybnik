package routes

import (
	"database/sql"
	"errors"
	"log"

	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/server-go/utils"
)

type getSubpageJSON struct {
	Route string `json:"route"`
}

type subpageDataJSON struct {
	Title        string `json:"title"`
	DisplayTitle string `json:"displayTitle"`
	Content      string `json:"content"`
}

// GetSubpageHandler - Handling get-subpage route
func GetSubpageHandler(context *gin.Context) {
	route := context.Query("route")
	database, ok := context.MustGet("database").(*sql.DB)
	if !ok {
		log.Fatalln("Can't find database in gin-gonic context")
		context.AbortWithError(500, errors.New("Internal Server Error"))
	} else {
		query := "SELECT zsbrybnik.subpages.title, zsbrybnik.subpages.display_title AS displayTitle, zsbrybnik.subpages.content FROM zsbrybnik.subpages WHERE zsbrybnik.subpages.route = ?"
		result := database.QueryRow(query, route)
		var subpageData subpageDataJSON
		err := result.Scan(&subpageData.Title, &subpageData.DisplayTitle, &subpageData.Content)
		utils.ErrorHandler(err, false)
		if err != nil {
			context.AbortWithError(500, errors.New("Internal Server Error"))
		} else {
			context.JSON(200, subpageData)
		}
	}
}
