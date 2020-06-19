package routes

import (
	"database/sql"
	"errors"
	"log"

	"github.com/gin-gonic/gin"
	"zsbrybnik.pl/server-go/utils"
)

type subpagesRoutesJSON struct {
	Route string `json:"route"`
	Title string `json:"title"`
}

// GetSubpagesRoutesHandler - handling get-subpages-routes route
func GetSubpagesRoutesHandler(context *gin.Context) {
	language := context.Query("language")
	database, ok := context.MustGet("database").(*sql.DB)
	if !ok {
		log.Fatalln("Can't find database in gin-gonic context")
		context.AbortWithError(500, errors.New("Internal Server Error"))
	} else {
		query := "SELECT route, title FROM subpages WHERE language = \"pl\""
		result, err := database.Query(query)
		utils.ErrorHandler(err, false)
		defer result.Close()
		var subpagesRoutesArray []subpagesRoutesJSON
		for result.Next() {
			var subpageRoute subpagesRoutesJSON
			err := result.Scan(&subpageRoute.Route, &subpageRoute.Title)
			utils.ErrorHandler(err, false)
			subpagesRoutesArray = append(subpagesRoutesArray, subpageRoute)
		}
		if language != "pl" {
			query := "SELECT route, title FROM subpages WHERE language = ?"
			result, err := database.Query(query, language)
			utils.ErrorHandler(err, false)
			defer result.Close()
			for result.Next() {
				var subpageRoute subpagesRoutesJSON
				err := result.Scan(&subpageRoute.Route, &subpageRoute.Title)
				utils.ErrorHandler(err, false)
				for i, value := range subpagesRoutesArray {
					if value.Route == subpageRoute.Route {
						subpagesRoutesArray[i].Title = subpageRoute.Title
					}
				}
			}
		} else {
			context.JSON(200, subpagesRoutesArray)
		}
	}
}
