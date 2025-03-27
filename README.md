# LinkedIn Clone
Welcome to LinkedIn Clone, a frontend-only professional networking application built using React, Bootstrap, JavaScript, CSS, Redux and LocalStorage.  

This project is designed to replicate LinkedIn’s core features, such as:  
- Viewing the posts.
- Adding comments.
- Like posts.
- Realtime update likes.
- Managing user profiles.  
- Exploring job listings.
- Saving jobs  
- Connecting with other users.  

Everything is handled on the frontend—there’s no backend, but we use LocalStorage to persist data like likes, saved jobs, and connections.  

---
## Project Goals  
Our goal is simple: **to build a LinkedIn-like UI that feels real, even without a backend!**  

✔️ **Create a sleek, professional UI** that mirrors LinkedIn.  
✔️ **Implement state management** using React & LocalStorage.  
✔️ **Ensure seamless navigation** with React Router.  
✔️ **Make it fully responsive** using Bootstrap.  
✔️ **Use JSON files** as a mock database for posts, jobs, and users. 

## Built With
We’re using a modern frontend tech stack to make this project scalable and user-friendly:  

| Technology        | Purpose |
|------------------|---------|
| **React.js**      | UI development with a component-based structure |
| **React Router**  | Enables seamless page navigation |
| **Redux** | State management for global data handling |
| **Bootstrap 5**   | Styling & responsive design |
| **HTML5 & CSS3**  | Basic structure and additional styling |
| **JavaScript (ES6+)** | Handles dynamic content & user interactions |
| **LocalStorage**  | Stores user interactions (likes, saved jobs, connections) |
| **JSON**         | Mock data source for posts, jobs, and users |
| **Netlify** | Deployment platform for hosting the app |

---
##  Key Features  
Here’s what you can expect from the app:  

### 🔑 **Login Page (Static UI Only)**  
- Simple **email & password fields** (no authentication but with validation).  
- Clicking login **redirects** to the Home Page.  

### 🏠 **Home Page (Post Feed)**  
- **Displays posts** dynamically from a `posts.json`.
- **Suggests People You Know** dynamically from a `users.json`
- Users can **like, comment, and share** posts.  
- Liked posts and comments stay **saved in LocalStorage**.  

### 👤 **User Profile**  
- Shows **profile picture, name, bio, and posts**.
- Suggests People You Know (Reused Component)
- Displays **Analytics** dynamically from a `jobs.json`
- Users can **edit their bio & job information** (saved in LocalStorage).  

### 💼 **Job Listings**  
- Jobs are fetched from `jobs.json`.  
- Users can **save jobs** to LocalStorage.  
- Clicking a View Details **opens a detailed job description**.  

### 🔗 **Connections**  
- Suggests **People You May Know**  dynamically from a `users.json`.  
- Clicking **Connect** adds them to the **My Connections** .  

### 📱 **Fully Responsive Design**  
- Works **perfectly** on **mobile, tablet, and desktop**.  
- Uses **Bootstrap Grid & CSS media queries**.  

---




---
