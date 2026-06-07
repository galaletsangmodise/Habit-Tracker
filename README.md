Habit Tracker

A single page habit tracking web app built with HTML, CSS, and JavaScript. 

https://galishabittracker.netlify.app/


Features

- Add a habit with a name, target days per week, and a category
- Form validation with inline error message
- Mark habits as done using a checkbox
- Streak counter that increases when checked and decreases when unchecked
- Live summary showing total habits, how many are done today, and overall completion percentage

Project Structure


habit-tracker/
├── index.html      
├── style.css      
└── script.js      

Built With

- HTML5 - semantic structure and accessible form elements
- CSS - custom properties, flexbox layout, responsive card design
- JavaScript - DOM manipulation, event listeners, array methods

How It Works
HTML

The page is divided into three sections: a summary bar at the top, an add-habit form in the middle, and a habit list below. Each section has a unique `id` that JavaScript uses to find and update it.

CSS

CSS custom properties (variables) defined in `:root` control the colour palette across the whole app. A `.hidden` utility class is toggled by JavaScript to show and hide the error message. A `.completed` class applies a strikethrough style to habits that are marked done.

JavaScript

The app stores all habits in a single `habits` array. Every action — adding, deleting, checking — updates that array and then re-renders the list from scratch. Key functions:

Setup & Usage

1. Clone the repository:

```bash
git clone https://github.com/your-username/habit-tracker.git
```

1. Open `index.html` in your browser — no installs needed.


What I Learned

- How to structure a single-page JS app without a framework
- How to validate forms using JavaScript without `alert()`
- How to use `data-*` attributes to link DOM elements back to data objects
- How to use `closest()` to traverse the DOM from a button back to its parent list item
- CSS custom properties and how to toggle utility classes with JavaScript
