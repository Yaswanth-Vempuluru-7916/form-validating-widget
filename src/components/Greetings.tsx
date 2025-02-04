type GreetingsProps = {
  name: string;
};

const Greetings = ({ name }: GreetingsProps) => {
  return <>{`Greetings, ${name}!`}</>;
};

export default Greetings;
