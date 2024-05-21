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
    const response = await fetch(backendURL + "/api/posts", {
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
        <div class="container-fluid mb-5" style="border-radius: 25px; width: 100%;">
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
      
      
      
      
      
      <div class="container-fluid mt-5 mb-5" style="border-radius: 25px; width: 100%;">
      <div class="row">
        <!-- Example of a single post -->
        <div class="col-sm-4">
          <div class="card" style="border-radius: 50px;">
            <div class="card-body">
            <div class="d-flex flex-row mt-2 ellipsis float-end">
                              <small class="mr-2">${date}</small>
                              <i class="fa fa-ellipsis-h"></i>
              </div>
              <h5 class="card-title mt-4"><b>${element.title}</b></h5>
              <p class="card-text">${element.content}</p>
              <img class="rounded" src="${imageUrl}" width="100%" height="400px">
            </div>
          </div>
        </div>
        <!-- Add more posts here -->
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
