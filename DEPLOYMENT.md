# Deployment Guide - MERN Data Science Portfolio

This guide outlines the step-by-step process to deploy your portfolio website for free. We will set up a cloud database on **MongoDB Atlas** and host the unified application on **Render**.

---

## Step 1: Push Your Code to GitHub

1. Open your terminal in the root folder of your project (`c:\Users\jabhi\Desktop\Portfolio`).
2. Run the following commands to initialize Git and commit your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Data Science Portfolio"
   ```
3. Go to [GitHub](https://github.com/) and create a new public or private repository named `Portfolio`.
4. Run the commands provided by GitHub to link your local code and push it:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/Portfolio.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Set Up MongoDB Atlas (Cloud Database)

Since your local database is only accessible on your computer, you need a free cloud database for production:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and log in or register.
2. Click **Create** to deploy a new database cluster (select the **M0 Free Tier**).
3. Under **Security Quickstart**:
   - Create a database user (e.g., username `abhinav` and a secure password). Keep these credentials safe!
   - Under **IP Access List**, add `0.0.0.0/32` (this allows Render to connect to your database).
4. Navigate to **Database** -> **Connect** -> **Drivers**.
5. Copy your connection string (it looks like this):
   ```
   mongodb+srv://abhinav:<db_password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
6. Replace `<db_password>` with the password you created for your database user.

---

## Step 3: Deploy on Render (Free Hosting)

Render will host your Express server and serve the compiled static React frontend automatically.

1. Create a free account at [Render](https://render.com/).
2. On your Render Dashboard, click **New +** and select **Web Service**.
3. Link your GitHub account and select your `Portfolio` repository.
4. Configure the Web Service settings:
   - **Name:** `abhinav-jindal-portfolio`
   - **Region:** Choose a region close to your target audience (e.g., Singapore or Oregon).
   - **Runtime:** `Node`
   - **Build Command:** `npm run install-all && npm run build`
   - **Start Command:** `npm start`
5. Scroll down and click **Advanced** -> **Add Environment Variable**:
   - `NODE_ENV` = `production` (This triggers the static file server in Express).
   - `MONGODB_URI` = `YOUR_MONGODB_ATLAS_CONNECTION_STRING` (The string you copied in Step 2).
   - `PORT` = `10000` (Render's default port).
   - *(Optional)* `EMAIL_USER` = Your Gmail address (to enable the SMTP email notifier).
   - *(Optional)* `EMAIL_PASS` = Your Gmail App Password (not your standard password).
   - *(Optional)* `RECEIVER_EMAIL` = `jabhinav198@gmail.com`
6. Click **Deploy Web Service**.

---

## Step 4: Access Your Live Portfolio!

Render will install dependencies, build the React app, start the Express server, and connect to MongoDB Atlas. Once the build completes, Render will provide your public URL:
`https://abhinav-jindal-portfolio.onrender.com`

---

## Local Verification Commands
Before deploying, you can run a mock production build locally to test it:
```bash
# Build the React files
npm run build

# Start the server in production mode
set NODE_ENV=production
npm start
```
Now, navigate to `http://localhost:5000/` to verify that the Express server is serving the compiled React build directly.
