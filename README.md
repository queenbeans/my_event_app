# Event Management App

### Stack

- Rails 8
- React w/ TS using `vite_ruby` bundler
- GraphQL with Apollo as my client for querying data (super powerful and can be made even more powerful using codegen to synchronize your graph on the server with your frontend type definitions :D. The Apollo cache also allows for real time updates when performing mutations on data)
- SQLite - PG is kind of overkill for this
- Wrote some specs using RSpec, which is kind of industry standard instead of the default rails testing framework

### Run Instructions

### 1. Prerequisites

- Ruby 3.3.0+
- Node.js 20+
- SQLite
- Yarn

### 2. Installation

#### Clone the repository

- git clone git@github.com:queenbeans/my_event_app.git

#### Install Ruby and JavaScript dependencies by running the following commands

- bundle install
- yarn install
- vite dev

#### Setup the database

rails db:prepare

#### Optional -- add some seed data using a seed generator I created which makes use of the Faker library (also quite standard)

But feel free to just create the data from scratch to test see my empty state :)

- rails db:seed

#### That should be it

Once you've run both vite and the rails server, you should be able to view the app on port 3000

Navigate to localhost:3000
The events page is the root for this application but can also be reached at localhost:3000/events
The admin page can be reached by going to localhost:3000/admin per the assignment instructions
