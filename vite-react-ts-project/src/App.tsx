import { KeyboardEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Counter from "./components/Counter";

interface User {
  id: number,
  usernames: string,
}

type fibFunc = (n: number) => number;

const fib: fibFunc = (n: number) => {
  if(n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}

const myNum: number = 37;

function App() {
  const [ count, setCount ] = useState<number>(0);
  const [ users, setUsers ] = useState<User[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null!);

  console.log(inputRef?.current);
  console.log(inputRef?.current?.value);

  useEffect(() => {
    console.log('mounting');
    console.log('Users: ', users);
    
    return () => console.log('unmounting');
  }, [users]);

  const addOne = useCallback(
    (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void => 
    setCount(prev => prev + 1)
  , [])

  const result = useMemo<number>(() => 
    fib(myNum)
  , [myNum]);

  return (
    <div className="App">
      {/* <h1>{count}</h1>
      <button onClick={addOne}>Add</button>
      <h2>{result}</h2>
      <input ref={inputRef} type="text" /> */}

      <Counter>{(num: number) => <>Current Count: {num}</>}</Counter>
    </div> 
  )
}

export default App
