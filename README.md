## Guidelines

1. Users must first Login/Signup. They can see their dashboard and all of their details after they have logged in.
2. Users who have not logged in will be immediately redirected to the login page.
3. When you log in, a token is generated and stored in the browser's storage using Redux. It also expires after two days for security reasons. The user is immediately logged out when the token expires.
4. Users can modify any detail just by clicking the modify button.
5. When a user clicks the edit button, a modal opens in which they must update or add their data before clicking the submit button to make the changes visible.
6. To change the profile picture, users must click Upload Photo, select a file, click Upload, and then click Submit. The image is then uploaded to Cloudinary using their API, and the URL is saved in the MongoDB database.
7. Users can add or remove other platform users from their connections on the connections page.

Live Link: https://mobilics-frontend.vercel.app
Frontend Code: https://github.com/abhirupkumar/mobilics-frontend
Backend Code: https://github.com/abhirupkumar/mobilics-backend
