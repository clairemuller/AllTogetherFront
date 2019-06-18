# [AllTogether](https://all-together-app.herokuapp.com/)

### What is AllTogether?
AllTogether is a home inventory app to help users keep track of and find belongings in their home. I myself was using a Google sheet to inventory my home and I realized that I now have the skills to turn it into a website!

A user can add rooms, locations inside each room (box #1, closet, etc), and finally items in those locations. Everything can easily and immediately be created, read, updated or deleted. The items table can also be sorted alphabetically by clicking on any header (thanks to [W3 Schools](https://www.w3schools.com/howto/howto_js_sort_table.asp)).

I also implemented Google OAuth using an npm package, [React Google Login](https://www.npmjs.com/package/react-google-login). After completing this project, I refactored the CSS using SASS.

### How does it work?
The site's backend uses Ruby on Rails to created nested belongs_to/has_many relationships. Each item belongs to a location, with each location belonging to a room. A new user will be prompted to first add the rooms in their home, as well as any locations inside of each room that they wish to add. Items can then be created and added to rooms/locations, with a category to make things even more organized. Users can optionally add a note to keep track of any additional info they wish, such as the price of an item or a reminder.

### What are future plans?
* search bar to make finding an item even easier
* add pictures of items/receipts for purchased items
* Facebook login
* user can have multiple properties

### Technologies used
* React.js
* Ruby on Rails
* PostgreSQL
* SASS
* Google OAuth

[link to back end repo](https://github.com/clairemuller/AllTogetherBack)
