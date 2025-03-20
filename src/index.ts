interface Greeting {
  message: string;
  name: string;
}

function SayHello(payload: Greeting) {
  return `Hello ${payload.message}! ${payload.message}`;
}

const payload: Greeting = {
  name: "Sylus",
  message: "Typescript is working!",
};

console.log(SayHello(payload));
