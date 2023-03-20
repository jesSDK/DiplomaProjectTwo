# Kuromi Kards
Kuromi kards is an online memory game, flip cards to remember their positions and match them up in as few flips as possible

![Site Preview](https://i.imgur.com/68I7Bte.png)

## Features
This website built with HTML, CSS, and Javascript offers users a game of pair matching. By selecting cards on the grid, you are presented with an image, find the matching image in as little flips as possible to get a higher score. The site also allows for a quick replay with a randomised grid of cards each play.
The website has a responsive design to allow users of any device to play. 
- Cards being flipped.
![Flipped Cards](https://i.imgur.com/KdLI4QA.png)

- The game being won.
![Win Condition Met](https://i.imgur.com/dIBla0l.png)


## Bugs
- Ocassionally on a match, it wont register. (Currently unable to reproduce)
- ~~On Deployment to GitHub Pages, sometimes one image will 404 for an unknown reason.~~ Fixed! There was a typo in the file name kuromIFour.png vs kuromiFour.png

## Design
- I opted to not use flexboxes in this design as it is a relatively simple page not requiring much positioning
- I wanted to keep the layout simple for this project to keep it as straight forward for the user as possible, 
- Styled using the colour scheme of Kuromi, with fonts from google fonts that were in a similar style to the sanrio branding. The cards and font colour are also coloured from kuromi's design. 
- I also used images of Kuromi for the cards to keep consistent with the theme
## Testing
- HTML validated by https://validator.w3.org/
- CSS validated by https://jigsaw.w3.org/css-validator/validator
- JS validated by https://jshint.com/
- Tested across a variety of browsers and devices. 
    - known devices/browsers tested on: Desktop Chrome, Desktop Edge, Desktop Firefox, iPhone 12 Chrome, iPhone 12 Safari.
    - I also let a group of different users test on different devices and took into account their feedback on responsiveness.

## Deployment
- The project was deployed on GitHub Pages
    - Under repository settings visit 'code and automation' then click 'pages'
    - Under 'source' I selected the master branch
    - Save
- The project is live at https://jessdk.github.io/DiplomaProjectTwo/

## Attributions 
- Core game logic is based on https://www.webtips.dev/memory-game-in-javascript
- The shuffle algorithim used is based on https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm