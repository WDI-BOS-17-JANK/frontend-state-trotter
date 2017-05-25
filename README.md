# State Trotter
## A States Bucket-list App built by JANK (Joe Belmonte, Arlo Feirman, Nikki Riser, and Kelly English-James)
- [State Trotter Express.js Backend API Repo](https://github.com/WDI-BOS-17-JANK/backend-state-trotter)
- [State Trotter Frontend Repo](https://github.com/WDI-BOS-17-JANK/frontend-state-trotter)
- [State Trotter Deployed API](https://mysterious-plains-14810.herokuapp.com/)
- [State Trotter Deployed SPA](https://wdi-bos-17-jank.github.io/frontend-state-trotter/)

## About State Trotter
State Trotter is a bucket list app divded by state.

## How to Use the App
1. Select a state where you want to add a goal to achieve. Add a bucket-list item (a goal) for that state by creating a goal you want to achieve and the date you want to achieve it by. Check off goals you've completed. Create more goals and see the items you have and have not completed.

## Technologies Used
- Front-end: HTML, CSS, SCSS, JavaScript, jQuery, AJAX, Bootstrap, Handlebars.js
- Back-end: Express.js, MongoDB, (RESTful API), Node modules

## Strategy for Planning, Development, & Problem-Solving:
I came up with the idea of building a Japanese/English language flashcard web app because this app would be a good starting point for a
Japanese/English dictionary app that I would like to build in the future. Before joining GA, I found a set of data made public that consists of Japanese words/phrases matched with definitions in English and Japanese and imported it into a database I built in MySQL, but had difficulty representing Japanese unicode characters. I decided to take this opportunity to work on a project that allows me to work on overcoming this difficulty so that I could apply what I learn onto my future project. As for this flashcard app, the vision is to have it be used by people who would like to memorize Japanese words and short phrases via repetition.
In building this app, I followed the recommended schedule provided by the General Assembly consultants. I started with making a wireframe, and then proceeded on to making user stories, which allowed me to think in a user’s perspective. I initially built the app with simple buttons and forms that would allow me to test out the ajax calls to the API later on. Moving on to the backend, I built my database, tables, and relationships between the user and flashcard resources. Once I finished building my backend, I revisited the frontend and started building the code to ping the API and receive data back.
I had the most trouble with Rails API, especially understanding the path that the server takes to return a response back to a client. What helped me a lot during the development process was to use console.log and ‘debugger’ at every step of the code in order to pinpoint where exactly I am getting the error responses, and to check what data is being returned at each stage. This strategy has helped me immensely throughout the development process.

## API Routes
#### Users
| Verb   | URI Pattern          | Controller#Action |
|--------|----------------------|-------------------|
| POST   | /sign-up             | users#signup      |
| POST   | /sign-in             | users#signin      |
| DELETE | /sign-out/:id        | users#signout     |
| PATCH  | /change-password/:id | users#changepw    |
- post ‘/sign-up’ => ‘users#signup’
- post ‘/sign-in’ => ‘users#signin’
- delete ‘/sign-out/:id’ => ‘users#signout’
- patch ‘/change-password/:id’ => ‘users#changepw’
#### Items (Goals)
| Verb   | URI Pattern      | Controller#Action      |
|--------|------------------|------------------------|
| GET    | /items      | items#index       |
| GET    | /items/:id  | items#show        |
| POST   | /items      | items#create      |
| PATCH  | /items/:id  | items#update      |
| DELETE | /items/:id  | items#destroy     |
- get ‘/items/’ => ‘items#index’
- get ‘/items/:id’ => 'items#show'
- post ‘/items/’ => ‘items#create’
- patch ‘/items/:id’ => ‘items#update’
- delete ‘/items/:id’ => ‘items#destroy’

## Entity Relationship Diagram
 [State Trotter ERD](https://www.dropbox.com/s/9rsuenwt6w0ldam/ERD-revised-2.png?dl=0)

## Wireframe:
 [State Trotter WireFrame](https://drive.google.com/file/d/0B085YpY7Y_tmVUJtVDVpbnNJUkk/view)

## User Stories:
### As a user, I want to:
#### Authentication
- Sign up so that I can sign in
- Sign in
- Change my password
- [STRETCH Goal] Be able to upload a profile photo (optional)

#### Bucket-list Items
- Be able to see a map of the US.
- Select a state, which should indicate for each state whether I have at least 1 bucket list item there
- Created some bucket list items there but not completed any not created any bucket lists items there
- I want to be able to click on a state and view a list of my items for that state.
- From there, I should be able to edit/delete/add to those items.
- For each item, I want to be able to record: Title, Location, Description, Due date, Created date, Completed date, GPS location (STRETCH), Category
- Flag for completed/incompleted
- Flag for public/private (private by default) (optional) [STRETCH]
- Add a photo (optional) [STRETCH]
- State (automatically filled with bucket-list items where appropriate)
- I should be able to view all of my bucket list items regardless of state

Remaining STRETCH Bucket list item goals:
To get ideas for new items, I would like to be able to navigate to a Discover page.  From there, I would like to be able to see/search
Suggestions from a third party API based on the state
Suggestions based on other users’ public items
I should then be able to easily add those items to my list (making edits to any field as necessary)
I want to add comments to list items for other people and allow other people to comment on my public list items
I want to earn badges for completing certain milestones
Certain number of states
Certain number of items
All states in a certain region

## Unsolved Problems:
 Revisiting STRETCH goals for user stories.
