# Catchem-All
A "Pokemon Trading Card Game" Application
Project Link: 'https://github.com/Frankie-Woodward/Catchem-All'

Wireframe 

Splash Page

| Pokemon Battle Art |
| |
| Enter Here |

Main Page

| Pokemon TCG Card Manager |

| Navbar: |
| [Home] [Decks] [Profile] [Logout] |
| |
| +--------------------------------+
| | |
| | Pokemon Card Collection |
| | |
| | [Card 1] [Card 2] ... |
| | |
| +--------------------------------+
| Links |

User Page

| User's Pokemon Decks |

| Navbar: |
| [Home] [Decks] [Profile] [Logout] |
| |
| +--------------------------------+
| | |
| | User's Custom Decks |
| | |
| | [Deck 1] [Deck 2] ... |
| | |
| +--------------------------------+
| |

Individual Official Deck Page

| Official Pokemon TCG Deck Viewer |

| Navbar: |
| [Home] [Decks] [Profile] [Logout] |
| |
| +----------------------------------+
| | |
| | Deck: [Official Deck] |
| | |
| | +--------------------------+ |
| | | |
| | | [Card 1] [Card 2] |
| | | |
| | | [Card 3] [Card 4] |
| | | |
| | | [Card 5] [Card 6] |
| | | |
| | | ... |
| | | |
| | +--------------------------+ |
| | |
| +----------------------------------+
| |

![image](https://github.com/Frankie-Woodward/Catchem-All/assets/142553084/298f7873-5787-4034-ac99-9f46e89315fa)


Technologies:

"axios": "^1.5.0",
"bootstrap": "^5.3.2",
"connect-livereload": "^0.6.1",
"dotenv": "^16.3.1",
"ejs": "^3.1.9",
"express": "^4.18.2",
"livereload": "^0.9.3",
"method-override": "^3.0.0",
"mongoose": "^7.5.2"

I also utilized bootstrap for my card search object

Install:

1. User goes to home page
2. User creates a profile and joins a faction
3. User creates a new deck after viewing their profile
4. User goes to home page to click on a deck of their choice
5. User selects all desired cards on that deck's page. 
6. At the bottom the user can click to add all selected cards to their deck

USER STORIES
1. Users will be shown the rarest cards and only all decks that are currently being used for the official trading card game
2. They can browse cards, search cards, and click on a card to view all contents
3. Users will want to be able to save or "like" a card and add it to their collection for later view
4. Users will then be able to signup and start saving cards in their own custom decks!

   
Unsolved Issues and Stretch Goals for future use

1. My first issue was with trying to add the api into my projeect:
    I had difficulty finding the correct endpoint
    I was beginning to think i was being too ambitious
    Sense of relief once I figured it out
    Scott warned me that it was more of a stretch

2. My second issue was trying to display all cards from the api on their respective decks' page

3. Third issue was trying to implement the deck search. I was only able to retrieve one card from the searched pokemon. Will implement complete feature in future update

4. Accessing the decks array in my schema to add cards to it:
    Tweaked the schema to ensure I was accessing an array of object
    Created js code on the ejs itself
    Was able to access both user and deck information and add the "favorite" button to the bottom of each deck's page

5. I also plan to implement full user authentication for login and password

6. I also would like to add a custom logo as well as an animations screen as an opener to my site
