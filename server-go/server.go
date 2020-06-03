package main

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"strconv"

	"github.com/gbrlsnchs/jwt/v3"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

type verifyTokenJSON struct {
	Token string `json:"token" binding:"required"`
}

type loginJSON struct {
	Login    string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type loginMySQLResult struct {
	CorrectLoginPassword bool   `json:"correctLoginPassword"`
	Password             string `json:"password"`
}

type postJSON struct {
	Id           int    `json:"id"`
	Title        string `json:"title"`
	Img          string `json:"img"`
	Introduction string `json:"introduction"`
	ImgAlt       string `json:"imgAlt"`
}

type postsTitlesJSON struct {
	Id    int    `json:"id"`
	Title string `json:"title"`
}

type customJWTPayload struct {
	jwt.Payload
	Login    string `json:"login"`
	Password string `json:"password"`
}

type changePasswordJSON struct {
	Token    string `json:"token"`
	Login    string `json:"login"`
	Password string `json:"password"`
}

type subpagesRoutesJSON struct {
	Route string `json:"route"`
}

type editPostJSON struct {
	Id           int    `json:"id"`
	Title        string `json:"title"`
	Img          string `json:"img"`
	Introduction string `json:"introduction"`
	ImgAlt       string `json:"imgAlt"`
	Token        string `json:"token"`
	Content      string `json:"content"`
}

type addUserJSON struct {
	Token    string `json:"token"`
	Login    string `json:"login"`
	Password string `json:"password"`
}
type addPostJSON struct {
	Token        string `json:"token"`
	Title        string `json:"title"`
	Introduction string `json:"introduction"`
	Img          string `json:"img"`
	ImgAlt       string `json:"imgAlt"`
	Content      string `json:"content"`
}

type idJSON struct {
	Id int `json:"id"`
}

func errorHandler(err error, critical bool) {
	if err != nil {
		if critical {
			log.Fatalln(err)
		} else {
			fmt.Println(err)
		}
	}
}

type deletePostJSON struct {
	Id    int    `json:"id"`
	Token string `json:"token"`
}

type getPostJSON struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

type getWholePostsJSON struct {
	Title        string `json:"title"`
	Content      string `json:"content"`
	Img          string `json:"img"`
	ImgAlt       string `json:"imgAlt"`
	Introduction string `json:"introduction"`
}

type addSubpageJSON struct {
	Token string `json:"token"`
	Route string `json:"route"`
}

func getSubpagesRoutesHandler(context *gin.Context) {
	database, ok := context.MustGet("database").(*sql.DB)
	if !ok {
		log.Fatalln("Can't find database in gin-gonic context")
		context.AbortWithError(500, errors.New("Internal Server Error"))
	} else {
		query := "SELECT zsbrybnik.subpages.route FROM zsbrybnik.subpages"
		result, err := database.Query(query)
		errorHandler(err, false)
		defer result.Close()
		var subpagesRoutesArray []subpagesRoutesJSON
		for result.Next() {
			var subpageRoute subpagesRoutesJSON
			err := result.Scan(&subpageRoute.Route)
			errorHandler(err, false)
			subpagesRoutesArray = append(subpagesRoutesArray, subpageRoute)
		}
		context.JSON(200, subpagesRoutesArray)
	}
}

func createBCryptHash(password string) string {
	passwordInBytes := []byte(password)
	hashedPasswordInBytes, err := bcrypt.GenerateFromPassword(passwordInBytes, 15)
	errorHandler(err, false)
	hashedPassword := string(hashedPasswordInBytes)
	return hashedPassword
}

func corsMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		context.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if context.Request.Method == "OPTIONS" {
			context.Abort()
			return
		}
		context.Next()
	}
}

func setDatabase(database *sql.DB) gin.HandlerFunc {
	return func(context *gin.Context) {
		context.Set("database", database)
		context.Next()
	}
}

func addSubpageHandler(context *gin.Context) {
	var addSubpageData addSubpageJSON
	err := context.Bind(&addSubpageData)
	errorHandler(err, false)
	if err != nil {
		context.AbortWithError(400, errors.New("Bad Request"))
	} else {
		err := verifyToken(addSubpageData.Token)
		errorHandler(err, false)
		if err != nil {

		}
	}
}

func addUserHandler(context *gin.Context) {
	var addUserData addUserJSON
	err := context.Bind(&addUserData)
	errorHandler(err, false)
	if err != nil {
		context.AbortWithError(400, errors.New("Bad Request"))
	} else {
		err := verifyToken(addUserData.Token)
		errorHandler(err, false)
		if err != nil {
			context.AbortWithError(403, errors.New("Forbidden"))
		} else {
			database, ok := context.MustGet("database").(*sql.DB)
			if !ok {
				log.Fatalln("Can't find database in gin-gonic context")
				context.AbortWithError(500, errors.New("Internal Server Error"))
			} else {
				query := "INSERT INTO zsbrybnik.admins (login, password) VALUES (?, ?)"
				result, err := database.Query(query, addUserData.Login, addUserData.Password)
				errorHandler(err, false)
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

func addPostHandler(context *gin.Context) {
	var addPostData addPostJSON
	err := context.Bind(&addPostData)
	errorHandler(err, false)
	if err != nil {
		context.AbortWithError(400, errors.New("Bad Request"))
	} else {
		err := verifyToken(addPostData.Token)
		errorHandler(err, false)
		if err != nil {
			context.AbortWithError(403, errors.New("Forbidden"))
		} else {
			database, ok := context.MustGet("database").(*sql.DB)
			if !ok {
				log.Fatalln("Can't find database in gin-gonic context")
				context.AbortWithError(500, errors.New("Internal Server Error"))
			} else {
				query := "SELECT MAX(id) as id FROM zsbrybnik.posts"
				result := database.QueryRow(query)
				var idData idJSON
				err := result.Scan(&idData.Id)
				errorHandler(err, false)
				if err != nil {
					context.AbortWithError(500, errors.New("Internal Server Error"))
				} else {
					id := idData.Id + 1
					query := "INSERT INTO zsbrybnik.posts (id, title, introduction, img, img_alt, content) VALUES (?, ?, ?, ?, ?, ?)"
					result, err := database.Query(query, id, addPostData.Title, addPostData.Introduction, addPostData.Img, addPostData.ImgAlt, addPostData.Content)
					errorHandler(err, false)
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

func deletePostHandler(context *gin.Context) {
	var deletePostData deletePostJSON
	err := context.Bind(&deletePostData)
	errorHandler(err, false)
	if err != nil {
		context.AbortWithError(400, errors.New("Bad Request"))
	} else {
		err := verifyToken(deletePostData.Token)
		errorHandler(err, false)
		if err != nil {
			context.AbortWithError(403, errors.New("Forbidden"))
		} else {
			database, ok := context.MustGet("database").(*sql.DB)
			if !ok {
				log.Fatalln("Can't find database in gin-gonic context")
				context.AbortWithError(500, errors.New("Internal Server Error"))
			} else {
				query := "DELETE FROM zsbrybnik.posts WHERE zsbrybnik.posts.id = ?"
				result, err := database.Query(query, deletePostData.Id)
				errorHandler(err, false)
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

func editPostHandler(context *gin.Context) {
	var editPostData editPostJSON
	err := context.Bind(&editPostData)
	errorHandler(err, false)
	if err != nil {
		context.AbortWithError(400, errors.New("Bad Request"))
	} else {
		err := verifyToken(editPostData.Token)
		errorHandler(err, false)
		if err != nil {
			context.AbortWithError(403, errors.New("Forbidden"))
		} else {
			database, ok := context.MustGet("database").(*sql.DB)
			if !ok {
				log.Fatalln("Can't find database in gin-gonic context")
				context.AbortWithError(500, errors.New("Internal Server Error"))
			} else {
				query := "UPDATE zsbrybnik.posts SET zsbrybnik.posts.title = ?, zsbrybnik.posts.content = ?, zsbrybnik.posts.img = ?, zsbrybnik.posts.img_alt = ?, zsbrybnik.posts.introduction = ? WHERE zsbrybnik.posts.id = ?"
				result, err := database.Query(query, editPostData.Title, editPostData.Content, editPostData.Img, editPostData.ImgAlt, editPostData.Introduction, editPostData.Id)
				errorHandler(err, false)
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

var secretKey = jwt.NewHS256([]byte("secret"))

func verifyToken(token string) error {
	var tokenStructure customJWTPayload
	tokenInBytes := []byte(token)
	_, err := jwt.Verify(tokenInBytes, secretKey, &tokenStructure)
	return err
}

func verifyTokenHandler(context *gin.Context) {
	var verifyTokenData verifyTokenJSON
	err := context.Bind(&verifyTokenData)
	errorHandler(err, false)
	context.JSON(200, verifyTokenData)
}

func loginHandler(context *gin.Context) {
	var loginData loginJSON
	err := context.Bind(&loginData)
	errorHandler(err, false)
	if err != nil {
		context.AbortWithError(400, errors.New("Bad Request"))
	} else {
		database, ok := context.MustGet("database").(*sql.DB)
		if !ok {
			log.Fatalln("Can't find database in gin-gonic context")
			context.AbortWithError(500, errors.New("Internal Server Error"))
		} else {
			query := "SELECT EXISTS(SELECT * FROM admins WHERE login = ?) AS correctLoginAndPassword, password FROM admins WHERE login = ?"
			result := database.QueryRow(query, loginData.Login, loginData.Login)
			var loginMySQLResult loginMySQLResult
			err = result.Scan(&loginMySQLResult.CorrectLoginPassword, &loginMySQLResult.Password)
			errorHandler(err, false)
			if err != nil {
				context.AbortWithError(401, errors.New("Unauthorized"))
			} else {
				if loginMySQLResult.CorrectLoginPassword {
					passwordInBytes := []byte(loginData.Password)
					hashedPasswordInBytes := []byte(loginMySQLResult.Password)
					err := bcrypt.CompareHashAndPassword(hashedPasswordInBytes, passwordInBytes)
					errorHandler(err, false)
					if err != nil {
						context.AbortWithError(401, errors.New("Unauthorized"))
					} else {
						tokenSignPayload := customJWTPayload{
							Payload:  jwt.Payload{},
							Login:    loginData.Login,
							Password: loginMySQLResult.Password,
						}
						token, err := jwt.Sign(tokenSignPayload, secretKey)
						errorHandler(err, false)
						context.JSON(200, gin.H{
							"token": string(token),
						})
					}
				}
			}
		}
	}
}

func getPostsTitlesHandler(context *gin.Context) {
	database, ok := context.MustGet("database").(*sql.DB)
	if !ok {
		log.Fatalln("Can't find database in gin-gonic context")
		context.AbortWithError(500, errors.New("Internal Server Error"))
	} else {
		query := "SELECT zsbrybnik.posts.id, zsbrybnik.posts.title FROM zsbrybnik.posts ORDER BY zsbrybnik.posts.id DESC"
		result, err := database.Query(query)
		errorHandler(err, false)
		defer result.Close()
		if err != nil {
			context.AbortWithError(500, errors.New("Internal Server Error"))
		} else {
			var postsTitlesArray []postsTitlesJSON
			for result.Next() {
				var postsTitles postsTitlesJSON
				err := result.Scan(&postsTitles.Id, &postsTitles.Title)
				errorHandler(err, false)
				postsTitlesArray = append(postsTitlesArray, postsTitles)
			}
			context.JSON(200, gin.H{
				"data": postsTitlesArray,
			})
		}
	}
}

func getPostHandler(context *gin.Context) {
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
		errorHandler(err, false)
		context.JSON(200, gin.H{
			"data": getPost,
		})
	}
}

func getWholePostsHandler(context *gin.Context) {
	id := context.DefaultQuery("id", "0")
	database, ok := context.MustGet("database").(*sql.DB)
	if !ok {
		log.Fatalln("Can't find database in gin-gonic context")
		context.AbortWithError(500, errors.New("Internal Server Error"))
	} else {
		query := "SELECT zsbrybnik.posts.title, zsbrybnik.posts.content, zsbrybnik.posts.img, zsbrybnik.posts.img_alt AS imgAlt, zsbrybnik.posts.introduction FROM zsbrybnik.posts WHERE zsbrybnik.posts.id = ?"
		result := database.QueryRow(query, id)
		var getWholePosts getWholePostsJSON
		err := result.Scan(&getWholePosts.Title, &getWholePosts.Content, &getWholePosts.Img, &getWholePosts.ImgAlt, &getWholePosts.Introduction)
		errorHandler(err, false)
		context.JSON(200, gin.H{
			"data": getWholePosts,
		})
	}
}

func getPostsHandler(context *gin.Context) {
	toSubstract := context.DefaultQuery("toSubstract", "0")
	database, ok := context.MustGet("database").(*sql.DB)
	if !ok {
		log.Fatalln("Can't find database in gin-gonic context")
		context.AbortWithError(500, errors.New("Internal Server Error"))
	} else {
		query := "SELECT zsbrybnik.posts.id, zsbrybnik.posts.title, zsbrybnik.posts.img, zsbrybnik.posts.introduction, zsbrybnik.posts.img_alt as imgAlt FROM zsbrybnik.posts WHERE zsbrybnik.posts.id > ((SELECT MAX(zsbrybnik.posts.id) as highestId FROM zsbrybnik.posts) - ?) AND zsbrybnik.posts.id <= ((SELECT MAX(zsbrybnik.posts.id) as highestId FROM zsbrybnik.posts) - ?) ORDER BY zsbrybnik.posts.id DESC"
		toSubstractAsNumber, err := strconv.Atoi(toSubstract)
		errorHandler(err, false)
		if err != nil {
			context.AbortWithError(400, errors.New("Bad Request"))
		} else {
			toSubstractBorderPost := strconv.Itoa(toSubstractAsNumber + 10)
			result, err := database.Query(query, toSubstractBorderPost, toSubstract)
			errorHandler(err, false)
			defer result.Close()
			if err != nil {
				context.AbortWithError(500, errors.New("Internal Server Error"))
			} else {
				var postsArray []postJSON
				for result.Next() {
					var post postJSON
					err := result.Scan(&post.Id, &post.Title, &post.Img, &post.Introduction, &post.ImgAlt)
					errorHandler(err, false)
					postsArray = append(postsArray, post)
				}
				context.JSON(200, gin.H{
					"data": postsArray,
				})
			}
		}
	}
}

func changePasswordHandler(context *gin.Context) {
	var changePassword changePasswordJSON
	err := context.Bind(&changePassword)
	errorHandler(err, false)
	if err != nil {
		context.AbortWithError(400, errors.New("Bad Request"))
	} else {
		err := verifyToken(changePassword.Token)
		errorHandler(err, false)
		if err != nil {
			context.AbortWithError(403, errors.New("Forbidden"))
		} else {
			passwordInBytes := []byte(changePassword.Password)
			hashedPasswordInBytes, err := bcrypt.GenerateFromPassword(passwordInBytes, 15)
			errorHandler(err, false)
			if err != nil {
				context.AbortWithError(500, errors.New("Internal Server Error"))
			} else {
				hashedPassword := string(hashedPasswordInBytes)
				database, ok := context.MustGet("database").(*sql.DB)
				if !ok {
					log.Fatalln("Can't find database in gin-gonic context")
					context.AbortWithError(500, errors.New("Internal Server Error"))
				} else {
					query := "UPDATE zsbrybnik.admins SET zsbrybnik.admins.password = ? WHERE zsbrybnik.admins.login = ?"
					result, err := database.Query(query, hashedPassword, changePassword.Login)
					errorHandler(err, false)
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

func main() {
	database, err := sql.Open("mysql", "root:@/zsbrybnik")
	errorHandler(err, true)
	defer database.Close()
	server := gin.Default()
	server.Use(corsMiddleware())
	server.Use(setDatabase(database))
	server.POST("/api/verify-token", verifyTokenHandler)
	server.POST("/api/login", loginHandler)
	server.GET("/api/get-posts", getPostsHandler)
	server.POST("/api/change-password", changePasswordHandler)
	server.GET("/api/get-subpages-routes", getSubpagesRoutesHandler)
	server.POST("/api/edit-post", editPostHandler)
	server.POST("/api/add-user", addUserHandler)
	server.POST("/api/add-post", addPostHandler)
	server.POST("/api/delete-post", deletePostHandler)
	server.GET("/api/get-posts-titles", getPostsTitlesHandler)
	server.GET("/api/get-post", getPostHandler)
	server.GET("/api/get-whole-posts", getWholePostsHandler)
	server.POST("/api/add-subpage", addSubpageHandler)
	server.Run(":5002")
}
