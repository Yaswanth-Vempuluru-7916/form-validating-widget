type GreetingsProps = {
  name: string;
};

const Greetings = ({ name }: GreetingsProps) => {
  return (
    <div className="text-xl font-semibold text-blue-600 bg-gray-100 p-4 rounded-lg shadow-md">
      {`Greetings, ${name}!`}
    </div>
  );
};

export default Greetings;
