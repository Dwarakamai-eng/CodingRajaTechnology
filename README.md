# Blogging-System
 
- It's a simple and beautiful website dedicated to bloggers.
- Technology stack : [**MEAN**](https://en.wikipedia.org/wiki/MEAN_(solution_stack))
- [SRS document for Blogging System](https://github.com/Dhiraj-01/Blogging-System/blob/main/srs-blogging-system.pdf)

## Content
- [Features](#features)
- [Installation](#installtion)
- [How to run?](#how-to-run-)
- [Scrrenshots](#screenshots)
 
## Features
- login / register.
- show list of blogs.
- search blogs based on author, title, published date. 
- provide crud operations, create, edit, update, delete blogs.
- markdown syntax for blog content using [ngx-markdown](https://www.npmjs.com/package/ngx-markdown)

## Installtion
- Install [nodejs](https://nodejs.org/en/) and [angular cli](https://cli.angular.io/)
```
git clone https://github.com/Dhiraj-01/Blogging-System.git 
(or manually download this project)

cd backend
npm install

cd frontend
npm install
```

## How to Run ?
- you can directly double click on [run.bat](https://github.com/Dhiraj-01/Blogging-System/blob/main/run.bat) (windows only) file.  or follow this stpes.
```
cd backend
node index.js
   
cd frontend
ng serve -o
```
