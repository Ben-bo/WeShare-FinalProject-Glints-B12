# BackendTeam_F

# API List

| Routes | EndPoint                                         | Description                                         |
| ------ | ------------------------------------------------ | --------------------------------------------------- |
| POST   | /api/weShare/user/register                       | Register user                                       |
| POST   | /api/weShare/user/login                          | login user to get token for authentication          |
| GET    | /api/weShare/user/:id                            | API get User by/:id                                 |
| PUT    | /api/weShare/user/forgetPassword                 | API for changed Password                            |
| PUT    | /api/weShare/user/verifyAccount/:id              | API for verify Account ( by /:id)                   |
| PUT    | /api/weShare/user/editProfile/:id                | API for edit user profile ( by /:id)                |
| GET    | /api/weShare/allCategory                         | API for get all category include Opendonation       |
| GET    | /api/weShare/category/details/:id                | API for get Opendonation by category id             |
| POST   | /api/weShare/addCategory                         | API for create category (developer only)            |
| PUT    | /api/weShare/editCategory                        | API for edit category by id (developer only)        |
| POST   | /api/weShare/createDonature                      | create new donature                                 |
| GET    | /api/weShare/allDonature                         | get all donature                                    |
| GET    | /api/weShare/donatureById/:id                    | get donature by id                                  |
| GET    | /api/weShare/myDonation?UserId=1&Type=1          | get my donation by UserId and DonationTypeId        |
| POST   | /api/weShare/openDonation/create                 | create new Open Donation                            |
| GET    | /api/weShare/OpenDonation                        | get all Open Donation                               |
| GET    | /api/weShare/OpenDonation/:idOpenDonation        | detail Open Donation                                |
| PUT    | /api/weShare/OpenDonation/update/:idOpenDonation | update Open Donation                                |
| DELETE | /api/weShare/OpenDonation/delete/:idOpenDonation | delete Open Donation                                |
| GET    | /api/weShare/OpenDonation/my                     | Get openDonation by id user                         |
| GET    | /api/weShare/category/urgent                     | Get openDonation need donation urgently             |
| GET    | /api/weShare/category/newest                     | Get Newest openDonation                             |
| GET    | /api/weShare/category/donationTitle              | Get openDonation by title                           |
| GET    | /api/weShare/category/donation                   | Get Opendonation by category id and donationType id |
| POST   | /api/weShare/createPayment                       | create payment                                      |
| GET    | /api/weShare/getPayment                          | Get all payment                                     |
| PUT    | /api/weShare/updatePayment/:id                   | update payment by id                                |
| DELETE | /api/weShare/createPayment/:id                   | Delete payment by id                                |

# Last Update on (15 July 2021 | 23:00 WIB)

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
