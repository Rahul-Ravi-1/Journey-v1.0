# Push this project to GitHub

You’ll create the repo on GitHub first, then run these in your project folder.

---

## 1. Create the repo on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click **New** (or the **+** menu → **New repository**).
3. Set:
   - **Repository name:** e.g. `Journey_Final`
   - **Public** or **Private**
   - **Do not** check “Add a README”, “Add .gitignore”, or “Choose a license” (you already have a project).
4. Click **Create repository**.
5. Leave the page open; you’ll need the repo URL (e.g. `https://github.com/YourUsername/Journey_Final.git`).

---

## 2. In your project folder (Command Prompt)

Open Command Prompt and go to your project:

```cmd
cd c:\Users\rahul\Desktop\Dev\Journey_Final
```

### Step 1: Initialize Git (if not already)

```cmd
git init
```

### Step 2: Add all files

```cmd
git add .
```

### Step 3: First commit

```cmd
git commit -m "Initial commit"
```

### Step 4: Add your GitHub repo as remote

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name:

```cmd
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Example:

```cmd
git remote add origin https://github.com/rahul/Journey_Final.git
```

### Step 5: Rename branch to main (if needed)

```cmd
git branch -M main
```

### Step 6: Push to GitHub

```cmd
git push -u origin main
```

If GitHub asks for login, use your GitHub username and a **Personal Access Token** (not your password). Create one at: **GitHub → Settings → Developer settings → Personal access tokens**.

---

## Summary (copy-paste in Command Prompt after creating the repo)

```cmd
cd c:\Users\rahul\Desktop\Dev\Journey_Final
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values.

---

## If you added but didn’t commit yet (staged too much)

Unstage everything, then add again so `.gitignore` applies:

```cmd
cd c:\Users\rahul\Desktop\Dev\Journey_Final
git reset
git add .
```

Then commit and push as in the steps above.

---

## If you already committed node_modules / too much stuff

A `.gitignore` is now in the project so `node_modules` and `.next` are ignored. To **stop tracking** them and clean up:

```cmd
cd c:\Users\rahul\Desktop\Dev\Journey_Final
git rm -r --cached node_modules
git rm -r --cached .next
git add .
git commit -m "Remove node_modules and .next from repo, add .gitignore"
```

Then push as usual: `git push -u origin main` (or `git push` if you already set upstream).
