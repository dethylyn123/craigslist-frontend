import { backendURL, getLoggedUser } from "../utils/utils.js";

// Get Logged User Info
getLoggedUser();

// Get Admin Pages
// showNavAdminPages();

// Get All Data
getData();

async function getData() {
  try {
    // Add Loading indicator
    document.getElementById(
      "get_data"
    ).innerHTML = `<div class="col-sm-12 d-flex justify-content-center align-items-center">
                      <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                      </div>
                      <b class="ms-2">Loading Data...</b>
                  </div>`;

    // Get Carousel API Endpoint
    const response = await fetch(backendURL + "/api/posts/all", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
    });

    // Check if response is ok
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const json = await response.json();
    console.log(json);

    // Check if json is an array and has length greater than 0
    if (Array.isArray(json) && json.length > 0) {
      let container = "";
      json.forEach((element) => {
        const date = new Date(element.created_at).toLocaleString();
        const imageUrl = element.image ? `${backendURL}/storage/${element.image}` : '';

        container += `
        <div class="container-fluid mt-5 mb-5" style="border-radius: 25px; width: 100%;">
          <div class="row d-flex align-items-center justify-content-center" style="border-radius: 25px;">
              <div class="col-md-8">
                  <div class="card">
                      <div class="row g-0">
                          <div class="col-sm-5 d-flex align-items-center">`;

        container += `</div>
                          <div class="col-sm-7"> 
                  </div>
              </div>
          </div>
      </div>
      
      
      <div class="container-fluid" style="border-radius: 25px; width: 100%;">
          <div class="row d-flex align-items-center justify-content-center" style="border-radius: 25px;">
              <div class="col-md-8"> 
                  <div class="card" style="border-radius: 25px;">
                      <div class="d-flex justify-content-between p-2 px-3">
                          <div class="d-flex flex-row align-items-center">
                              <img src="assets/img/news-1.jpg" width="50" class="rounded-circle">
                              <div class="d-flex flex-column ml-2">
                                  <span class="font-weight-bold"><b>&nbsp; ${element.user.name}</b></span>
                              </div>
                          </div>
                          <div class="d-flex flex-row mt-1 ellipsis">
                              <small class="mr-2">${date}</small>
                              <i class="fa fa-ellipsis-h"></i>
                          </div>
                      </div>
                      <div class="p-2">
                          <h3><b>${element.title}</b></h3>
                          <p class="text-justify">${element.content}</p>
                          <img class="rounded" src="${imageUrl}" width="100%" height="400px">
                          <hr>
                          <form name="frm1" method="post">
                              <input type="hidden" id="commentid" name="Rcommentid">
                              <div class="form-group" style="margin-bottom: 20px;">
                                  <label for="comment">Write your comment:</label>
                                  <textarea class="form-control" rows="1" name="Rmsg" required style="width: 100%; border-radius: 25px;"></textarea>
                              </div>
                              <div class="form-group" style="text-align: right;">
                                  <input type="button" id="btncomment" name="btncomment" class="btn btn-primary" value="Comment" style="background-color: #BE79EF; color: #fff; border: none; border-radius: 25px; padding: 10px 20px; cursor: pointer;">
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;
      });
      document.getElementById("get_data").innerHTML = container;
    } else {
      document.getElementById("get_data").innerHTML = `
          <span class="text-center">No posts available.</span>
        `;
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    // Display error message to the user
    document.getElementById("get_data").innerHTML = `
          <span class="text-center">Failed to fetch posts. Please try again later.</span>
        `;
  }
}
