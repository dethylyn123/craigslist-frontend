import { backendURL, successNotification, errorNotification, getLoggedUser } from "../utils/utils.js";

// calling function - important to execute the code inside the function
getLoggedUser();

document.addEventListener('DOMContentLoaded', () => {
  const form_posts = document.querySelector('form[name="form_posts"]');

  // Check if form_posts exists to avoid errors
  if (form_posts) {
    form_posts.onsubmit = async (e) => {
      e.preventDefault();

      // Disable button
      const submitButton = document.querySelector('form[name="form_posts"] input[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = 
        `<div class="col-sm-12 d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <b class="ms-2">Loading...</b>
        </div>`;

      // Get values of form (input, textarea, select) put it as form-data
      const formData = new FormData(form_posts);

      try {
        const response = await fetch(
          backendURL + "/api/posts",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
              "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
            },
            body: formData,
          }
        );

        // Get response if 200-299 status code
        if (response.ok) {
          successNotification("Successfully created post.", 10);
          // Reset Form
          form_posts.reset();
        } 
        // Get response if 422 status code
        else if (response.status === 422) {
          const json = await response.json();
          errorNotification(json.message, 10);
        }
      } catch (error) {
        errorNotification("An error occurred while creating the post.", 10);
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
      }
    };
  }
});
