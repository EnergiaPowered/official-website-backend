# API Reference

## Getting Started

- Base URL: The backend app when running locally is hosted by default at http://127.0.0.1:4000/, and is hosted on https://energia21.herokuapp.com, which is set as a proxy in the frontend configuration.
- Authentication: This version of the application does not require authentication or API keys

## Error Handling

Errors are returned as JSON objects in the following formate:

```json
{
  "success": false,
  "error": 400,
  "message": "bad request"
}
```

### The API will return 6 error types when requests fail:

- 400: Bad Request
- 404: Resource Not Found
- 422: Not Processable
- 500: Internal Server
- 403: Forbidden
- 401: Unauthorized

## Endpoints

#### Blogs Router

##### GET/ blogs

- General: Returns a list of all blog objects
- Sample: http://127.0.0.1:4000/blogs

_blogs:_

```javascript
[
  {
    title: "Self Driving Cars",
    body: "Dummy Text",
    author: "Esraa",
    category: "Embedded Systems",
    image_url: "URL",
    _id: "60",
  },
  {
    title: "Programmiing",
    body: "Dummy Text",
    author: "Mostafa Kamal",
    category: "C++",
    image_url: "URL",
    _id: "61",
  },
  {
    title: "Backend",
    body: "Dummy Text",
    author: "Abdullah Adel",
    category: "Web Development",
    image_url: "URL",
    _id: "62",
  },
];
```

---

##### POST/ blogs

- General:
  - Responds with 400 status if the body of the request is empty.
  - Else, Creates a new blog using the title, body, author, category and image_url of the request body.
- Sample: http://127.0.0.1:4000/blogs

_request body:_

```javascript
{
    "title": 'Frontend',
    "body": 'Dummy Text',
    "author": 'Waleed Hesham',
    "category": 'Web Development',
    "image_url": 'URL'
  }
```

---

##### PUT/ blogs/:id

- General:
  - Responds with 400 status if the body of the request is empty.
  - Responds with 404 status if there is no blog with the given 'id' from the request parameters.
  - Else, updates the blog with the given 'id' from the request parameters using the request body .
- Sample: http://127.0.0.1:4000/blogs/62

_Request Body:_

```javascript
{
  	"title": 'Backend',
    "body": 'Dummy Text',
    "author": 'Ali',
    "category": 'Web Development',
    "image_url": 'URL'
}
```

---

##### DELETE/ blogs/:id

- General:

  - Responds with 401 status if the user trying to delete the blog is not authenticated.
  - Responds with 403 status if the user trying to delete the blog is not an administrator.
  - Responds with 404 status if there is no blog with the given 'id' from the request parameters.
  - Else, deletes the blog with the given 'id' from the request parameters from the database.

- Sample: http://127.0.0.1:4000/blogs/60

_deleted blog:_

```javascript
{
    "title": 'Self Driving Cars',
    "body": 'Dummy Text',
    "author": 'Esraa',
    "category": 'Embedded Systems',
    "image_url": 'URL',
    "_id": "60"
  }
```

---

##### DELETE/blogs

- General: Deletes all of the blogs from the database.
- Sample: http://127.0.0.1:4000/blogs

_blogs:_

```javascript
[];
```

---

---

#### Committees Router

##### GET/ committees

- General: Returns a list of all committee objects
- Sample: http://127.0.0.1:4000/committees

_committees:_

```javascript
[
  {
    title: "C++",
    icon_class: "Dummy Text",
    mission: "Dummy Text",
    vision: "Dummy Text",
    jobDescription: [],
    _id: "70",
  },
  {
    title: "Web Development",
    icon_class: "Dummy Text",
    mission: "Dummy Text",
    vision: "Dummy Text",
    jobDescription: [],
    _id: "71",
  },
  {
    title: "Android Development",
    icon_class: "Dummy Text",
    mission: "Dummy Text",
    vision: "Dummy Text",
    jobDescription: [],
    _id: "72",
  },
];
```

---

##### POST/ committees

- General:
  - Responds with 400 status if the body of the request is empty.
  - Else, Creates a new committee using the title, icon_class, mission, vision and jobDescription of the request body.
- Sample: http://127.0.0.1:4000/committees

_request body:_

```javascript
{
    "title": 'HR',
    "icon_class": 'Dummy Text',
    "mission": 'Dummy Text',
    "vision": 'Dummy Text',
    "jobDescription": [],
    "_id": "73"
}
```

---

##### PUT/ committees/:id

- General:
  - Responds with 400 status if the body of the request is empty.
  - Responds with 404 status if there is no committee with the given 'id' from the request parameters.
  - Else, updates the committee with the given 'id' from the request parameters using the request body .
- Sample: http://127.0.0.1:4000/committees/72

_Request Body:_

```javascript
{
  	"title": 'PR',
    "icon_class": 'Dummy Text',
    "mission": 'Dummy Text',
    "vision": 'Dummy Text',
    "jobDescription": [],
    "_id": "73"
}
```

---

##### DELETE/ committees/:id

- General:

  - Responds with 401 status if the user trying to delete the committee is not authenticated.

  - Responds with 403 status if the user trying to delete the committee is not an administrator.

  - Responds with 404 status if there is no committee with the given 'id' from the request parameters.
  - Else, deletes the committee with the given 'id' from the request parameters from the database.

- Sample: http://127.0.0.1:4000/committees/70

_deleted committee:_

```javascript
{
    "title": 'C++',
    "icon_class": 'Dummy Text',
    "mission": 'Dummy Text',
    "vision": 'Dummy Text',
    "jobDescription": [],
    "_id": "70"
  }
```

---

##### DELETE/committees

- General:

  - Responds with 404 status if there is no committee.

  - Else, deletes all of the committees from the database.

- Sample: http://127.0.0.1:4000/committees

_blogs:_

```javascript
[];
```

---

---

#### Contact Info Router

##### GET/ contactInfo

- General: Returns a JSON object of the contact information
- Sample: http://127.0.0.1:4000/contactInfo

_response:_

```javascript
{
  "address": 'Cairo',
  "email": 'Energia@gmail.com',
  "phone": '123456789',
  "image": 'Dummy Text'
  }
```

---

#### Crew Router

##### GET/ crew

- General: Returns a list of all member objects
- Sample: http://127.0.0.1:4000/crew

_members:_

```javascript
[
  {
    ID: "200",
    name: "Abdullah Adel",
    committee: "Web Development",
    position: "member",
    imageID: "Dummy Text",
    isBest: true,
    _id: "80",
  },
  {
    ID: "201",
    name: "Asmaa",
    committee: "Android Development",
    position: "head",
    imageID: "Dummy Text",
    isBest: true,
    _id: "81",
  },
];
```

---

##### POST/ crew

- General:
  - Responds with 400 status if the body of the request is empty.
  - Else, Creates a new member using the ID, name, committee, position, imageID and isBest from the request body.
- Sample: http://127.0.0.1:4000/crew/member

_request body:_

```javascript
{
    "ID": '202',
    "name": 'Mostafa',
    "committee": 'C++',
    "position": 'member',
    "imageID": 'Dummy Text',
    "isBest": true
}
```

---

##### PUT/ crew/:id

- General:
  - Responds with 400 status if the body of the request is empty.
  - Responds with 404 status if there is no member with the given 'id' from the request parameters.
  - Else, updates the member with the given 'id' from the request parameters using the request body .
- Sample: http://127.0.0.1:4000/crew/72

_Request Body:_

```javascript
{
    "ID": '202',
    "name": 'Mostafa',
    "committee": 'Web Development',
    "position": 'head',
    "imageID": 'Dummy Text',
    "isBest": true
}
```

---

##### DELETE/ crew/:id

- General:

  - Responds with 404 status if there is no member with the given 'id' from the request parameters.
  - Else, deletes the member with the given 'id' from the request parameters from the database.

- Sample: http://127.0.0.1:4000/crew/70

_deleted member:_

```javascript
{
    "ID": '202',
    "name": 'Mostafa',
    "committee": 'Web Development',
    "position": 'head',
    "imageID": 'Dummy Text',
    "isBest": true,
    "_id": "82"
}
```

---

##### DELETE/crew

- General:

  - Responds with 404 status if there is no members.

  - Else, deletes all of the members from the database.

- Sample: http://127.0.0.1:4000/crew

_members:_

```javascript
[];
```

---

---

#### Events Router

##### GET/ events

- General: Returns a list of all event objects
- Sample: http://127.0.0.1:4000/events

_events:_

```javascript
[
  {
    name: "Dummy Text",
    startDate: "Dummy Date",
    endDate: "Dummy Date",
    status: "Dummy Text",
    category: "Dummy Date",
    eventDescription: "Dummy Date",
    eventDetails: "Dummy Date",
    eventLocation: "Dummy Date",
    eventImageID: "Dummy Text",
    _id: "90",
  },
  {
    name: "Dummy Text",
    startDate: "Dummy Date",
    endDate: "Dummy Date",
    status: "Dummy Text",
    category: "Dummy Date",
    eventDescription: "Dummy Date",
    eventDetails: "Dummy Date",
    eventLocation: "Dummy Date",
    eventImageID: "Dummy Text",
    _id: "91",
  },
];
```

---

##### POST/ events

- General:
  - Responds with 400 status if the body of the request is empty.
  - Else, Creates a new event using the name, startDate, endDate, status, category, eventDescription, eventDetails, eventLocation, and eventImageID from the request body.
- Sample: http://127.0.0.1:4000/events

_request body:_

```javascript
{
    "name": 'Dummy Text',
    "startDate": 'Dummy Date',
    "endDate": 'Dummy Date',
    "status": 'Dummy Text',
    "category": 'Dummy Date',
    "eventDescription": 'Dummy Date',
    "eventDetails": 'Dummy Date',
    "eventLocation": 'Dummy Date',
    "eventImageID": 'Dummy Text'
}
```

---

##### PUT/ events/:id

- General:
  - Responds with 400 status if the body of the request is empty.
  - Responds with 404 status if there is no event with the given 'id' from the request parameters.
  - Else, updates the event with the given 'id' from the request parameters using the request body .
- Sample: http://127.0.0.1:4000/events/91

_Request Body:_

```javascript
{
    "name": 'Dummy Text',
    "startDate": 'Dummy Date',
    "endDate": 'Dummy Date',
    "status": 'Dummy Text',
    "category": 'Dummy Date',
    "eventDescription": 'Dummy Date',
    "eventDetails": 'Dummy Date',
    "eventLocation": 'Dummy Date',
    "eventImageID": 'Dummy Text'
  }
```

---

##### DELETE/ events/:id

- General:

  - Responds with 401 status if the user trying to delete the event is not authenticated.
  - Responds with 403 status if the user trying to delete the event is not an administrator.

  - Responds with 404 status if there is no event with the given 'id' from the request parameters.
  - Else, deletes the event with the given 'id' from the request parameters from the database.

- Sample: http://127.0.0.1:4000/events/90

_deleted event:_

```javascript
{
    "name": 'Dummy Text',
    "startDate": 'Dummy Date',
    "endDate": 'Dummy Date',
    "status": 'Dummy Text',
    "category": 'Dummy Date',
    "eventDescription": 'Dummy Date',
    "eventDetails": 'Dummy Date',
    "eventLocation": 'Dummy Date',
    "eventImageID": 'Dummy Text',
    "_id": "90"
}
```

---

##### DELETE/events

- General:

  - Responds with 404 status if there is no events.

  - Else, deletes all of the events from the database.

- Sample: http://127.0.0.1:4000/events

_events:_

```javascript
[];
```

---

---

#### Login Router

##### POST/ login

- General:
  - Responds with 400 status if the email or the password are invalid.
  - Responds with 400 status if the user is not verified.
  - Else, Generates a json web token and returns it back to the user.
- Sample: http://127.0.0.1:4000/login

_request body:_

```javascript
{
    "email": 'waleed@gmail.com',
    "password": 'Aa1bcdef'
}
```

---

---

#### Message Router

##### GET/ message

- General: Returns a list of all message objects
- Sample: http://127.0.0.1:4000/events

_messages:_

```javascript
[
  {
    name: "Esraa",
    email: "Esraa@gmail.com",
    message: "Dummy Text",
    _id: "100",
  },
  {
    name: "Mostafa",
    email: "Mostafa@gmail.com",
    message: "Dummy Text",
    _id: "101",
  },
];
```

---

##### POST/ message

- General:
  - Responds with 400 status if the body of the request is empty.
  - Else, Creates a new message using the name, email and message from the request body.
- Sample: http://127.0.0.1:4000/message

_request body:_

```javascript
{
    "name": 'Abdullah',
    "email": 'Abdullah@gmail.com',
    "message": 'Dummy Text'
}
```

---

---

#### Reset Password Router

##### POST/ forget_password

- General:
  - Responds with 404 status if the email is invalid.
  - Else, sends an email to the user to reset the password.
- Sample: http://127.0.0.1:4000/forget_password

_request body:_

```javascript
{
    "email": 'waleed@gmail.com'
}
```

---

##### POST/ reset

- General:
  - Responds with 400 status if the password is invalid.
  - Responds with 400 status if reset token is expired (after 24 hours from sending the mail).
  - Else, resets the password with the new one from the request body.
- Sample: http://127.0.0.1:4000/reset

_request body:_

```javascript
{
    "password": 'Aa1bcdef'
}
```

---

---

#### Users Router

##### GET/ me

- General:
  - Responds with 401 status if the user is not authenticated.
  - Else, returns a token contains the password, versionKey and the object id of the user.
- Sample: http://127.0.0.1:4000/me

_user:_

```javascript
{
    "password": 'Aa1bcdef',
    "__v": 'Dummy Text'
    "_id": '120'
}
```

---

##### POST/ users

- General:
  - Responds with 400 status if the body of the request is invalid.
  - Responds with 400 status if the email which the user trying to sign up with is already signed up before.
  - Responds with 400 status if the confirm password does not match the password.
  - Else, Creates a new user using firstname, lastname, phone, email, password, isGraduated, university, faculty, department and graduationYear from the request body, then sends a verification email to the user mail.
- Sample: http://127.0.0.1:4000/users

_request body:_

```javascript
{
    'firstname': "waleed",
    'lastname': "hesham",
    'phone': "01234567891",
    'email': "waleed@gmail.com",
    'password': "Aa1bcdef",
    'isGraduated': false,
    'university': "cairo",
    'faculty': "engineering",
    'department': "computer",
    'graduationYear': 2024
}
```

---

##### PUT/ users

- General:
  - Responds with 401 status if the user trying to update himself is not authenticated.
  - Responds with 400 status if the body of the request is not valid.
  - Else, updates the user using the request body and send the updated data to the user.
- Sample: http://127.0.0.1:4000/users

_Request Body:_

```javascript
{
    'firstname': "waleed",
    'lastname': "hesham",
    'phone': "01234567891",
    'password': "Aa1bcdef",
    'confirm_password': "Aa1bcdef",
    'university': "cairo",
    'faculty': "engineering",
    'department': "computer",
    'graduationYear': 2024,
    'isGraduated': true
  }
```

---

##### DELETE/users

- General:

  - Responds with 401 status if the user trying to delete himself is not authenticated.
  - Responds with 404 status if the '\_id' of the user is not found.
  - Else, deletes the user from the database.

- Sample: http://127.0.0.1:4000/users

_request body:_

```javascript
{
  "user": {
    'firstname': "waleed",
    'lastname': "hesham",
    'phone': "01234567891",
    'email': "waleed@gmail.com",
    'password': "Aa1bcdef",
    'isGraduated': false,
    'university': "cairo",
    'faculty': "engineering",
    'department': "computer",
    'graduationYear': 2024,
    '_id': "121"
  }
}
```

---

---

#### Verify Router

##### GET/ verify

- General:
  - Responds with 404 status if the user is not found.
  - Responds with 400 status if the user token is not verified.
  - Responds with 400 status and sends a new verification mail if the old one has expired.
  - Else, marks the user as verified.
- Sample: http://127.0.0.1:4000/verify

---

---
