import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {passwordGenerator()}, [length, charAllowed, numberAllowed, passwordGenerator])

  return (
    <>
      <div class="bg-slate-800 w-full max-w-2xl mx-auto my-4 rounded-lg text-center text-2xl px-6 py-6">
        <div class="py-2 text-white">
          Password Generator
        </div>
        <div class="rounded-lg shadow overflow-hidden flex">
          <input 
            type='text'
            value={password}
            class="w-full outline-none px-1 py-1"
            placeholder='Password'
            readOnly
          />
          <button class="bg-sky-700 text-white px-3 text-center text-2xl">
            Ctrl+V
          </button>
        </div>
        <div class="py-3 space-x-8 flex text-xl text-orange-500">
          <div class="space-x-2">
            <input 
              type="range"
              min={8}
              max={100}
              value={length}
              class="cursor-pointer"
              onChange={e => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div class="space-x-2">
            <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberAllowed"
              onChange={() => {setNumberAllowed((prev) => !prev)}} 
            />
            <label htmlFor="numberAllowed">Numbers</label>
          </div>
          <div class="space-x-2">
            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id="charAllowed"
              onChange={() => {setCharAllowed((prev) => !prev)}} 
            />
            <label htmlFor="charAllowed">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
