# FPLDashboardV2
You all know and love the fpl-dashboard, well here's the new and improved one! :)

Dev steps:
  - Need to have docker desktop installed
    
  - Backend: 
    - cd backend
    - pip3 freeze > requirements.txt
    - docker build . -t backend
    - docker run --name backend --rm --network dashboard -p 8000:8000 backend

  - Frontend:
    - cd Frontend
    - npm install
    - npm start
      OR
    - docker build . -t frontend
    - docker run --rm --name frontend --network dashboard -p 3000:3000 frontend

Backend testing:
  - go to localhost:8000/docs

Frontend testing:
  - localhost:3000
    
