# Onitama

## WELCOME

Welcome to Onitama!
Published by **Arcane Wonders** in 2014, and designed by **Shimpei Sato**, Onitama is a delightful strategy game loosely related to Chess.

Players move their pawns using cards that they pass back and forth as they play. Once someone captures their opponent's sage, or moves their own sage to their opponent's temple, they win!

### Purpose

I created this project during my time as a student at General Assembly, for the SOLE PURPOSE of honing my skills and demonstrating those skills to the programming industry.

**I do not in any way profit from this game**, or any links included in the game, beyond gaining the interest of potential employers or collaborators. I also include links to the publisher's official site, for those who are interested in purchasing a copy, which I will do again here: ![Arcane Wonders](hhttps://www.arcanewonders.com/product/onitama/)

### Documentation

The pages with a high line-count have **MENUS** that you can open to help you find your way around. You'll find a few js pages with callback functions for different aspects of the program:
**eventHandlers.js** - functions that help handle events
**movement.js** - functions related to pawns and squares
**movementCards.js** - functions that help the movement cards work!

In the **ASSETS** folder, you'll find all images used on the site, plus a few alternate images. All image sources are attributed in the **FOOTER** on the **index.html**

### Game Wire Frames

At the top of your page, You'll see the title of the game, my name (with a link to my LinkedIn page), and the **About Game** button.
![The Header](https://media.git.generalassemb.ly/user/38109/files/afcb4c00-0a45-11ec-9ff8-eea8e7e903d9)

If you click it, you'll get the About page modal:
![About Modal](https://media.git.generalassemb.ly/user/38109/files/25cfb300-0a46-11ec-9550-7750ffbdedf9)

You can scroll to read through the modal, then click "Let's play!" to close it.
![The Game Area](https://media.git.generalassemb.ly/user/38109/files/af32b580-0a45-11ec-8774-72e3eda60d41)

Here's where the party is. The **Game Area** executes allllll of the game logic buried in Java Script.

When you first land on the page, startGame() executes, creating the pawns and dealing the cards that will be used by the players.

The game then runs on 3 higher-order Event Listeners that are looking for specific things:

Did the player hover their mouse over a card?
Did the player click on the board?
Did the player click on a card they're allowed to use?

Whenever one of these events happen, A scaffolded series of questions and answers are triggered, leading to the following functionality.

When a player picks a card, they can then pick one of their pawns and see the legal squares highlighted for them. They can switch between pawns at will, and go back and select their other card.
![Mid-Game](https://media.git.generalassemb.ly/user/38109/files/2b79c880-0a47-11ec-9945-f84593f89666)

Once a player picks a highlighted square, their move is rendered, and, if the game isn't ended by the move, the turn is passed to the other player.

Once a win-condition is satisfied, the **Win Screen** appears!
![Win Screen](https://media.git.generalassemb.ly/user/38109/files/2caaf580-0a47-11ec-95cb-97bf73dcffca)

Finally, in the **FOOTER** of the page, players can see who created or licenses the artwork, and where to find it.
![The Footer](https://media.git.generalassemb.ly/user/38109/files/afcb4c00-0a45-11ec-8968-b482bb401211)

### Thank You!

Have fun with Onitama! I had a wonderful time programming this game, and it will always hold a special place in my heart. If you're interested in collaborating, or just finding out what I'm up to these days, you can find me here on ![LinkedIn](https://www.linkedin.com/in/benjamin-papac-738a99217/)

**-Sincerely,**
**Benjamin**
