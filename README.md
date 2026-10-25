# GoRevise

GoRevise turns any block of text into a fill-in-the-blank quiz, so you can test yourself on notes, articles, or study material instead of just re-reading them.

## How it works

1. **Paste your text** — drop in notes, a summary, or any passage you want to revise.
2. **Pick the words to blank out** — click through the text and highlight the words you want to be quizzed on.
3. **Take the quiz** — fill in the blanks from memory and submit.
4. **Review your score** — see a percentage breakdown plus which answers were right or wrong, with the correct answer shown on hover.
5. **Save it for later** — finished quizzes are stored locally in your browser, so you can come back and retake them without retyping anything.

## Tech stack

- [React](https://react.dev/) 17 + [React Router](https://reactrouter.com/) v6
- [Chakra UI](https://chakra-ui.com/) for styling and components
- [Framer Motion](https://www.framer.com/motion/) for animations
- Created with [Create React App](https://create-react-app.dev/)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 16+
- npm

### Setup

```bash
git clone https://github.com/<your-username>/GoRevise.git
cd GoRevise
npm install
```

### Run

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

### Test

```bash
npm test
```

## Project structure

```
src/
  Component/   # Pages and UI components (Home, Create, Quiz, About, Progress, etc.)
  utils/        # Quiz grading logic and local-storage persistence
```
