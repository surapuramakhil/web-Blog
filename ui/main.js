function loadLoginForm () {
    var loginHtml = `
        <form class="navbar-form navbar-right">
            <input type="text" id="username" placeholder="Email" class="form-control">
            <input type="password" id="password" placeholder="Password" class="form-control">
            <button type="submit" id="login_btn" class="btn btn-primary">Sign in</button>
            <button type="submit" id="register_btn" class="btn btn-success">Register</button>
        </form>
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.innerHTML = 'Sucess!';
              } else if (request.status === 403) {
                  submit.innerHTML = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.innerHTML = 'Sign in';
              } else {
                  alert('Something went wrong on the server');
                  submit.innerHTML = 'Sign in';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.innerHTML = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.innerHTML = 'Registered!';
              }else if (request.status === 500) {
                  console.log('Could not register the user' + this.responseText );
                  register.innerHTML = 'Register';
              }else{
                console.log('response received   ' + this.responseText + request.status);
                alert( this.responseText );
                  register.innerHTML = 'Register';
              }
              loadLogin();
          }
          //not done yet
        };
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.innerHTML = 'Registering';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
    <form class="navbar-form navbar-right">
          <button type="submit" id="login_btn" class="btn btn-primary">Create-Article</button>
          <a href="/logout" class="btn btn-danger">Logout</a>  
        </form>
        <div class="navbar-header navbar-right">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span> 
          </button>
          <a class="navbar-brand" >Hi ${username}</a>
        </div>`;
}



function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = "<h4><small>RECENT POSTS</small></h4>";
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<hr>
                          <h2><a href="/blog/${articleData[i].title}">${articleData[i].heading}</a></h2>
                          <h5><span class="glyphicon glyphicon-time"></span> Post by ${articleData[i].username}, ${articleData[i].date}.</h5>
                          <h5><span class="label label-danger">Food</span> <span class="label label-primary">Ipsum</span></h5><br>
                          <p>${articleData[i].content}</p>
                          <br><br>
                          <hr>`;
                }
                content += "</ul>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML = 'Oops! Could not load all articles!';
            }
        }
    };
    
    request.open('GET', '/blog', true);
    request.send();
}


// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();

              


              /*`<li>
                    <a href="/blog/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`
    
    <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>


<button type="submit" id="register_btn" class="btn btn-danger">Logout</button>


                    */

              