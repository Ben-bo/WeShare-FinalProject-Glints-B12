# BackendTeam_F

# API List

| Routes | EndPoint                                         | Description                                  |
| ------ | ------------------------------------------------ | -------------------------------------------- | --- |
| POST   | /api/weShare/user/register                       | Register user                                |
| POST   | /api/weShare/user/login                          | login user to get token for authentication   |
| GET    | /api/weShare/user/:id                            | API get user by/:id                          |
| PUT    | /api/weShare/user/editProfile/:id                | API for edit user profile ( by /:id)         |
| GET    | /api/weShare/allCategory                         | API for get all category include patient     |
| GET    | /api/weShare/category/:id                        | API for get by id category include patient   |
| GET    | /api/weShare/category/details/:id                | API for get category by id details           |
| POST   | /api/weShare/addCategory                         | API for create category (developer only)     |
| PUT    | /api/weShare/editCategory                        | API for edit category by id (developer only) |
| POST   | /api/weShare/createDonature                      | create new donature                          |
| GET    | /api/weShare/allDonature                         | get all donature                             |
| GET    | /api/weShare/donatureById/:id                    | get donature by id                           |
| GET    | /api/weShare/myDonation                          | get my donation                              |
| POST   | /api/weShare/openDonation/create                 | create new Open Donation                     |
| GET    | /api/weShare/OpenDonation                        | get all Open Donation                        |
| GET    | /api/weShare/OpenDonation/:idOpenDonation        | detail Open Donation                         |
| PUT    | /api/weShare/OpenDonation/update/:idOpenDonation | update Open Donation                         |
| DELETE | /api/weShare/OpenDonation/delete/:idOpenDonation | delete Open Donation                         |
| GET    | /api/weShare/OpenDonation/my                     | Get openDonation by id user                  |     |

# Last Update on (5 July 2021 | 21:22 WIB)

# -----------------------------------------

# BACKEND DEVELOPER (TEAM F):

```
$ Budi Hartono      (BackEnd Leader)
$ Nandra            (BackEnd Co-Leader)
$ Ari seno          (Developer)
$ Beni Iskandar     (Developer)
```

---

# How to run

## Server

```bash
$ cd server
$ npm i
$ npm start
```

## Client

```bash
$ cd client
$ npm i
$ npm start
```
