import { useState } from "react";
import Heading from "./components/Heading";
import Section from "./components/Section";
import Counter from "./components/Counter";

function App() {
  const [ count, setCount ] = useState<number>(1)

  return (
    <>
      <Heading title={"Hello"} />
      <Section title={"Subheading"}>
        Welcome
      </Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
    </>
  )
}

export default App
