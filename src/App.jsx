import { useState } from 'react'
import {Configuration, OpenAIApi} from 'openai';
import OptionSelection from './components/OptionSelection';
import { arrayItems } from './AIOptions';
import Translation from './components/Translation';
import './App.css'

function App() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');
  const selectOption = (option) => {
    setOption(option);
  };
  const doStuff = async () => {
    let object = {...option, prompt: input};

    const response = await openai.createCompletion(object);

    setResult(response.data.choices[0].text);
  }
  return (
  <div className='App'>
    {Object.values(option).length === 0 ? (
    <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
    ) : ( <Translation doStuff={doStuff} setInput={setInput} result={result} />)}
  </div>
  )
  /*const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => { 
    const res = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  console.log(res.data.data[0].url);
}
  return (
    <div className='app-main'>
      <h3>Generate an Image using Open AI API</h3>
      <input className='app-input' type="text"
      placeholder='Please type something to generate an image'
      onChange={() => setPrompt(e.target.value)} />
      <button onClick={generateImage}>Generate an Image</button>
      {result.length > 0 ? <img className='result-image' src={result} alt='result' /> : <></>}
    </div>
  )*/
}

export default App
