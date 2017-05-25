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
We decided to use the 50 US states to frame our bucket list project.  We know that some
people aspire to visit all 50 use states as a life goal, so we wanted to build and app
that would help to track progress against that goal.  We decided on this framework in
one of our first team meetings, and then met all day Saturday to game plan and get started.

We spent a couple of hours on the planning phase, which helped quite a bit.  We
reviewed the user stories and wireframes and made sure to cross reference our plans
with the project prompt to ensure that we would meet requirements.  We used the project
planning website Trello for tracking tasks and assigning them to individuals.

From there we took split into pairs for programming.  We rotated pairs over the course
of the work but also met frequently as a team, at least once in the morning and evenings
to game plan and also throughout the day, which helped to keep everyone on track.

Programming progressed slowly but steadily.  One of our main challenges in the last
day was that we realized the way we had divided our code up between files (events.js
versus ui.js specifically) was flawed and needed to be refactored.  We spent about
2 hours late Wednesday on that.  Ultimately we were successful in revising the code,
but it did cost us some time and aggravation along the way.  In the end, it was a
good lesson to carry forward.

Ultimately we were not able to complete most of our stretch goals, but we instead
we chose to focus on putting together a working app that satisfied all requirements.
We also learned quite a bit about working collaboratively through GitHub and
resolving merge conflicts when they arose.

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
