# Event Management App

### Stack

- Rails 8
- React w/ TS using `vite_ruby` bundler
- GraphQL with Apollo as my client for querying data (super powerful and can be made even more powerful using codegen to synchronize your graph on the server with your frontend type definitions :D. The Apollo cache also allows for real time updates when performing mutations on data).
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

#### Specs

- bundle exec rspec --color

### Troubleshooting

- Something I consistently ran into was an issue with the 'vite-ruby-plugin' throwing the following error
  `error when starting dev server:
TypeError: Cannot read properties of undefined (reading 'meta')`
- if you encounter this issue, go into package json and make sure '^' is not included in the version as it forces yarn to resolve to the most recent patch of the plugin which is known to cause this issue. We want to be using version 5.1.1, not 5.1.2

### Assumptions

- I tried not to assume anything and followed the product spec as closely as possible.
- I did assume the page should be mobile responsive and made some decisions on the product based on how I personally think events pages should look (cards are a lot less noisy and more attractive to users)
- I also did take the liberty to use GraphQL with apollo as my client because these tools provide the facilities to paginate and cache, among other benefits they provide. Events sites process lots of data (which I'm assuming is why pagination was included as extra credit for the assignment) so laying the foundation for good caching / pagination practices at the start is important.
