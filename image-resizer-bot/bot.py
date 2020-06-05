from pymysql import connect
import cv2
import requests
import os

os.mkdir("./temp", 0o0755)
os.mkdir("./output", 0o0755)
database = connect(host="localhost", user="root", passwd="")
cursor = database.cursor()
cursor.execute("SELECT COUNT(*) FROM zsbrybnik.posts")
numberOfPosts = cursor.fetchone()[0]
cursor.execute("SELECT img FROM zsbrybnik.posts")
postsImagesResultTuple = cursor.fetchall()
postsImages = []

dim = (250, 250)


def workWithImage(postId: int):
    try:
        res = requests.get(postsImages[postId])
        image = res.content
        with open("./temp/tempImg"+str(postId)+".jpg", "wb") as file:
            file.write(image)
            file.close()
        cv2Image = cv2.imread("./temp/tempImg"+str(postId)+".jpg", 1)
        data = cv2.resize(cv2Image, dim)
        cv2.imwrite("./output/tempImg"+str(postId)+".jpg", data)
    except Exception as _err:
        print(_err)


for i in range(numberOfPosts):
    postsImages.append(postsImagesResultTuple[i][0])

for i in range(numberOfPosts):
    workWithImage(i)


database.close()
