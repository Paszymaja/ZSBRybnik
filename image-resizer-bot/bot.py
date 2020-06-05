from pymysql import connect
import cv2
import requests

database = connect(host="localhost", user="root", passwd="")
cursor = database.cursor()
cursor.execute("SELECT COUNT(*) FROM zsbrybnik.posts")
numberOfPosts = cursor.fetchone()[0]
cursor.execute("SELECT img FROM zsbrybnik.posts")
postsImagesResultTuple = cursor.fetchall()
postsImages = []


def workWithImage(postId: int):
    try:
        res = requests.get(postsImages[postId])
        image = res.content
        with open("tempImg"+str(postId)+".jpg", "wb") as file:
            print(postId)
            file.write(image)
            file.close()
    except Exception as _err:
        print(_err)


for i in range(numberOfPosts):
    postsImages.append(postsImagesResultTuple[i][0])

for i in range(numberOfPosts):
    if i > 3:
        break
    workWithImage(i)


database.close()
