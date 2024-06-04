# 🎯 MindCanvas provides a single space for organizing everything that matters similar to [Notion](https://www.notion.so/). It offers a clean and open surface for thinking, writing, and planning. It is made using NextJS, Tailwind CSS, Typescript, [EdgeStore](https://edgestore.dev/) For Storing Images, [Clerk](https://clerk.com/) For Authentication, [Convex](https://www.convex.dev/) As Our Database

## 🎯 Getting Started
First, Clone The Repo The Repository
```bash
git clone https://github.com/psykat1116/MindCanvas.git
```

## 🎯 Start The Server
Start The Server on the Local Server. Change The Folder Name To Lower Case.
```bash
cd MindCanvas
npm run dev
```

## 🎯 Setup The .env.local File
Create a .env.local File In The Root Folder With The Given Environment Variable
```bash
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
CONVEX_DEPLOY_KEY=
```

## 🎯 Setup Edge Store
Log In to the [Edge Store](https://edgestore.dev/) And Add A New Project. You Will Get Two Key
```bash
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```

## 🎯 Setup Clerk Authentication
Login Into The [Clerk](https://clerk.com/) Create A New Project And Select What Login Option You Want To Keep Then Create The Project. You Will Get Two Key
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## 🎯 Setup Convex And Integrate With Clerk Authentication
Create An Account In [Convex](https://www.convex.dev/) And Create A New Project
```bash
npm install convex
```

Go To The [Convex & Clerk](https://docs.convex.dev/auth/clerk) And Go Through The Following Steps Mentioned Below Complete Upto `Step 4` and then Run The Following Commands.
```bash
npm install @clerk/clerk-react
npx convex dev
```

At The Time Of Development `npx convex dev` Must Run All The Time During Development. The `Deployment URL` Will Be In Settings In Development Mode Then Put It To The Variable.
```bash
NEXT_PUBLIC_CONVEX_URL=
```

At The Time Of Deploying Go To The Project Details In Change From `Development` To `Production`.Then Go To The Project Settings and Copy The `Deployment URL` to `NEXT_PUBLIC_CONVEX_URL` And Create a New `Deploy Key` And Paste It To `CONVEX_DEPLOY_KEY`
```bash
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOY_KEY=
```

## 🎯 Tell Me You Face Any Problem During The Development & Production Into My Email From This [Profile](https://github.com/psykat1116) Or Tell Me In Issue Section. Tell Me You Want To Suggest Any Update. 
