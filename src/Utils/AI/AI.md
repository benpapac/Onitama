# What the hell is the target?

The goal is to search a decision tree as optimally as possible.
I want to prune bad branches without traversing beyond the first suboptimal node.
I want to compare nodes at each depth, and go down the most optimal branch from those nodes.

## So, bfs...##

In bfs, I look at the current scenario ( the head ) and get its evaluation. I want to know where I'm starting.

- This is taken care of by miniMax edge case: if(depth === 0 || there's a winner).

Next, I look at EACH of the children, and filter for the best one.

- From the head, I have n pawns available.
- Each pawn has 2 cards (known variable).
- each card has x, or y, moves.

... That means I have to examine ( n \* (x+y) ) potential threats.
