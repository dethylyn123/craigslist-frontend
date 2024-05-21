function setRouter() {
    switch (window.location.pathname) {
        // If you are logged in you cant access outside pages
        case "/login.html":
        case "/signup.html":
        case "/":
            if (localStorage.getItem("token")) {
                window.location.pathname = "/index.html"
            }
            break;
        // If you are not logged in you can't access dashboard pages
        case "/index.html":
        case "/ai.html":
        case "/all.html":
        case "/create_post.html":
        case "/users-profilee.html":
        case "/your_posts.html":
        case "/wel.html":
            if (!localStorage.getItem("token")) {
                window.location.pathname = "/login.html";
            }
            break;
    }
}

export {setRouter};