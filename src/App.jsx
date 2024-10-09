import { useState, useCallback, useEffect } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGen = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numAllowed) {
      str += '0123456789';
    }
    if (charAllowed) {
      str += '[]{}+@!%&*$';
    }

   
    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGen(); 
  }, [length, numAllowed, charAllowed, passwordGen]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md mx-auto shadow-2xl rounded-lg p-8 my-8 bg-gray-900 border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center text-orange-400 mb-6">Password Generator</h1>
        <input 
            type="text" 
            value={password} 
            className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200" 
            placeholder="Generated Password" 
            readOnly 
        />
        <button 
            className="w-full mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => navigator.clipboard.writeText(password)} 
        >
            Copy to Clipboard
        </button>
        <div className='flex flex-col mt-6 text-sm'>
          {/* Length Slider */}
          <div className='flex items-center justify-between mb-4'>
            <label className='text-gray-300'>Length: {length}</label>
            <input 
                type="range" 
                min={8} 
                max={100} 
                value={length} 
                className='cursor-pointer appearance-none w-full h-2 rounded-lg bg-gray-600 outline-none range-slider'
                onChange={(e) => setLength(Number(e.target.value))} 
            />
          </div>
          {/* Number Checkbox */}
          <div className='flex items-center mb-2'>
            <input 
                type="checkbox" 
                checked={numAllowed} 
                id='numberInput' 
                className='mr-2'
                onChange={() => setNumAllowed(prev => !prev)} 
            />
            <label htmlFor="numberInput" className='text-gray-300'>Include Numbers</label>
          </div>
          {/* Special Characters Checkbox */}
          <div className='flex items-center'>
            <input 
                type="checkbox" 
                checked={charAllowed} 
                id='charInput' 
                className='mr-2'
                onChange={() => setCharAllowed(prev => !prev)} 
            />
            <label htmlFor="charInput" className='text-gray-300'>Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
