type ConsoleGreeting = () => void;

const consoleGreeting: ConsoleGreeting = (): void => {
  console.log(
    "%cA ty czego tu szukasz? 🤔",
    "font-family: Roboto; font-size: 48px;",
  );
};

export default consoleGreeting;
