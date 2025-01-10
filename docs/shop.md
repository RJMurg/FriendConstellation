# Starboard Shop
There's nothing people love more in video games than cosmetics.
Functionless items that make you look cool, or at least different.

In Starboard, players will be allowed to spend their hard-earned Stars on a variety of cosmetics.
These cosmetics will be purely visual, and will not affect gameplay in any way.

## Cosmetics
1. **Hats**
- Place a hat atop their card in the leaderboard.

2. **Fonts**
- Allow players to change the font of their name in the leaderboard.
- Restricted set of fonts to minimise download size.
- Also applies to the log

3. **Card Styles**
- Stylise the card in the leaderboard.
- Gradients, borders, etc.
- Maybe even custom images?

4. **Animations**
- Add animations to their card in the leaderboard.
- Shake, bounce, grow, etc.


## Architecture
The shop will be a separate page in the app, accessible from the navbar.
It will be a simple page with a list of items, and a cost.
Players will inform the Starmaster of their intent to purchase an item, and the Starmaster will manually the user.

**Database:**
A new table will need to be added, and another table will need to be modified to support this feature.

shop:
- `id`: The ID of the cosmetic
- `name`: The name of the cosmetic
- `description`: A description of what it does
- `type`: The category of the cosmetic (Hat, Font, Card, Animation)
- `cost`: The cost of the cosmetic
- `active`: Whether the cosmetic is available to purchase

users:
- `id`: The ID of the user
- `name`: The name of the user
- `stars`: The number of stars the user has
- `font`: The font of the user's name (Default to the Starboard font)
- `hat`: The hat the user has equipped (Default to nothing)
- `card`: The CSS of the user's card (Default to nothing)
- `animation`: The animation of the user's card (Default to nothing)