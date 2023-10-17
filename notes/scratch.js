
//1. create a new user through console, //POST /api/user
fetch('/api/users', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `sILyCF9J--PE9D_FGz4GoD-0VBa8p0gSpARE`
    },
    body: JSON.stringify({
      email: 'edwarddong@google.edu',
      username: 'edward911',
      firstName: 'Edward',
      lastName: 'Dong',
      password: '123456'
    })
  }).then(res => res.json()).then(data => console.log(data));

//2. get user infor for current session.
//http://localhost:8000/api/session

//3. to logout.
fetch('/api/session', {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `sILyCF9J--PE9D_FGz4GoD-0VBa8p0gSpARE`
    }
  }).then(res => res.json()).then(data => console.log(data));


//1. login a user through console, //POST /api/session
fetch('/api/session', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `sILyCF9J--PE9D_FGz4GoD-0VBa8p0gSpARE`
    },
    body: JSON.stringify({ credential: 'edward911', password: '123456' })
  }).then(res => res.json()).then(data => console.log(data));
