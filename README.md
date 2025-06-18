# F-UNO Card Game

A mobile implementation of the classic card game UNO with a twist - now with password-protected turns! Play with friends by passing around a single device.

## Download

You can download the APK directly from Expo:
👉 [Download F-UNO APK](https://expo.dev/accounts/pratham29/projects/uno-game/builds/2f2f90b9-9243-4015-881f-0e9483d2f069)

## Features

- 🔐 Password-protected turns for each player
- 🎨 Colorful UI matching classic UNO colors
- ♻️ Full game logic including:
  - All special cards (Skip, Reverse, Draw Two, Wild, Wild Draw Four)
  - F-UNO calling when down to last card
  - Score tracking across multiple rounds
- 📱 Optimized for mobile devices
- 🔄 Automatic deck reshuffling
- 📊 Scoreboard to track progress

## Game Rules (Inspired by UNO)

This game is inspired by the classic UNO card game. Note that this is an independent implementation and not affiliated with Mattel's official UNO game.

### Basic Rules:
- Match cards by color or number/symbol
- Call "F-UNO!" when you play your second-to-last card
- First player to reach 500 points wins
- Special cards have special effects:
  - **Skip**: Next player misses a turn
  - **Reverse**: Changes direction of play
  - **Draw Two**: Next player draws 2 cards
  - **Wild**: Choose the next color
  - **Wild Draw Four**: Choose color + next player draws 4 cards

## How to Play

1. Enter player names (2-4 players)
2. Set a 4-digit code for each player
3. Pass the device to the current player
4. Enter your code when it's your turn
5. Play cards matching the current color or symbol
6. Draw a card if you can't play
7. Call "F-UNO!" when you have one card left
8. First to empty their hand wins the round

## Development

This app was built with:
- React Native
- Expo
- JavaScript

## Disclaimer

This game is inspired by the classic UNO card game but is an independent implementation. The name "F-UNO" and all game code are original work. This project is not affiliated with or endorsed by Mattel, Inc., the official rights holder of UNO.

## License

MIT License - Free to use and modify
