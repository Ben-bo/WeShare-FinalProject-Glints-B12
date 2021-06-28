# BackendTeam_F

# API List

| Routes | EndPoint                          | Description                                  |
| ------ | --------------------------------- | -------------------------------------------- |
| POST   | /api/weShare/user/register        | Register user                                |
| POST   | /api/weShare/user/login           | login user to get token for authentication   |
| PUT    | /api/weShare/user/editProfile/:id | API for edit user profile ( by /:id)         |
| GET    | /api/weShare/allCategory          | API for get all category include patient     |
| GET    | /api/weShare/category/:id         | API for get by id category include patient   |
| GET    | /api/weShare/category/details/:id | API for get category by id details           |
| POST   | /api/weShare/addCategory          | API for create category (developer only)     |
| PUT    | /api/weShare/editCategory         | API for edit category by id (developer only) |
| POST   | /api/weShare/addDonature          | create new donature                          |
| POST   | /api/weShare/addOpenDonation      | create new Open Donation                     |

# Last Update on (26 Juny 2021 | 15:38 WIB)

# -----------------------------------------

# LIST BACKEND DEVELOPER (TEAM F):

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
