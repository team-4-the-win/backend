# Photonix
### Frontend

#### David Murray Raimon || Soo Kim || Jenny Godley || Sarah Zawatsky


Photonix is an image hosting website to store users' images. This is the API that provides users the ability to see all images, see one image, update an image, create an image, and delete an image.  The API also provides authorization features for users to create accounts, log in, change their passwords, and log out.

#### Deployed Frontend App:
https://team-4-the-win.github.io/photo-frontend/

#### Frontend Repo:
https://github.com/team-4-the-win/photo-frontend

#### Backend Repo:
https://github.com/team-4-the-win/backend

#### Backend:
https://blooming-cliffs-96004.herokuapp.com

#### Technologies Used:
- express
- mongoDB
- AWS

#### Unsolved Problems:
- n/a

#### Planning & Process

Our team started by making a list of tasks to complete in the backend.  From there, we each selected a file for which we would be responsible. There were a few bugs that needed fixing, for example, syntax based on bodyParser versus multer.  From there, we each tested CRUD features in Postman and made changes as necessary.

#### MVP User Stories
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to upload an image to AWS.
- As a signed in user, I would like to update the meta-data of my image on AWS.
- As a signed in user, I would like to see the name of all images on AWS.
- As a signed in user, I would like to see the thumbnail of all images on AWS.
- As a signed in user, I would like to delete the reference of my image from the database.
- As a signed in user, I would like to see the following meta-data for any image:
  - date created/uploaded
  - date modified
  - owner (user who uploaded the image)
  - tag

#### Entity Relationship Diagram
[Imgur](https://i.imgur.com/YBiz4Gp.jpg)*

*please disregard misspelling

#### Paths and Methods
| User Routes      | User Methods |   | Upload Routes    | Upload Methods |
|------------------|--------------|---|------------------|----------------|
| /sign-up         | POST         |   | /fileUploads     | GET            |
| /sign-in         | POST         |   | /fileUploads/:id | GET            |
| /change-password | PATCH        |   | /fileUploads     | POST           |
| /sign-out        | DELETE       |   | /fileUploads/:id | PATCH          |
|                  |              |   | /fileUploads/:id | DELETE         |
