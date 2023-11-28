import React, { useState, useEffect } from 'react';
import gif from './Picture/password.gif';
import { AiOutlineReload } from "react-icons/ai";

const App: React.FC = () => {

  const [slide, ChangeSlide] = useState<number>(8);
  const [pass, setPass] = useState<string>('');
  const [copy, setCopy] = useState<string>('Copy')
  const [strength, setStrength] = useState<string>("weak")
  const [upper, setUpper] = useState<boolean>(false);
  const [lower, setLower] = useState<boolean>(false);
  const [number, setNumber] = useState<boolean>(false);
  const [symbol, setSymbol] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true)

  const testing = (e: React.ChangeEvent<HTMLInputElement>) => {
    ChangeSlide(Number(e.target.value))
  }

  const copyProcess = () => {
    setCopy("Copied")
    navigator.clipboard.writeText(pass)
    setTimeout(() => setCopy("Copy"), 3000)
  }

  useEffect(() => {

    let uCase: string = '';
    let lCase: string = '';
    let num: string = '';
    let sym: string = '';

    const check = () => {
      if (!upper && !lower && !number && !symbol) {
        setLower(true)
        console.log("checked")
      }
    }

    const upperValue = () => {
      if (upper) {
        uCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      }
      else {
        uCase = '';
      }
    }

    const lowerValue = () => {
      if (lower) {
        lCase = 'abcdefghijklmnopqrstuvwxyz';
      }
      else {
        lCase = '';
      }
    }

    const numValue = () => {
      if (number) {
        num = '1234567890'
      }
      else {
        num = ''
      }
    }

    const symValue = () => {
      if (symbol) {
        sym = '!@#$%^&*()<>,.?/[]{}-=_+|/';
      }
      else {
        sym = ''
      }
    }

    const generator = () => {
      const length: number = slide;
      const value: string = uCase + lCase + num + sym
      console.log(value)
      let result: string = '';

      for (let i = 0; i < length; i++) {
        result += value.charAt(Math.floor(Math.random() * value.length));
      }
      setPass(result)

      if (upper && lower && number && symbol) {
        setStrength("Strong")
      }

      else if ((upper && lower && number) || (upper && lower && symbol) || (upper && number && symbol) || (lower && number && symbol)) {
        setStrength("Medium")
      }

      else if ((upper && symbol) || (lower && symbol)) {
        setStrength("Average")
      }

      else {
        setStrength("Weak")
      }
    }

    check()
    upperValue()
    lowerValue()
    numValue()
    symValue()
    generator()
  }, [reload, lower, number, slide, symbol, upper])



  return (
    <div className="App">
      <img alt="gif" className="Gif" src={gif} />
      <h2 className='Heading'>PASSWORD GENERATOR</h2>
      <p className='Content'>Create strong and secure passwords to keep your account safe online.</p>
      <form className='Inputs' onSubmit={(e) => e.preventDefault()}>
        <input className="Input" type="text" placeholder='Generate random' value={pass} readOnly />
        <i className='Reload' onClick={() => setReload(!reload)}><AiOutlineReload /></i>
        <button className='Button' onClick={copyProcess} >{copy}</button>
      </form>
      <p className='Type' style={{ color: strength === "Medium" ? "blue" : strength === "Strong" ? "green" : strength === "Average" ? "orange" : undefined }}>{strength}</p>
      <p className='Length'>Password Length:{slide}</p>
      <div className='SliderContainer'>
        <input type="range" min="8" max="20" value={slide} onChange={testing} className="slider" />
      </div>
      <div className='Checkbox-Container'>
        <div className='Wrap'>
          <label htmlFor="Upper" className='U'>UpperCase</label>
          <input type="checkbox" id="Upper" name="letters1" checked={upper} onChange={() => setUpper(!upper)} value="UpperCase" />
        </div>
        <div className='Wrap'>
          <label htmlFor="Lower" className='L'> LowerCase</label>
          <input type="checkbox" id="Lower" name="letters2" checked={lower} onChange={() => setLower(!lower)} value="LowerCase" />
        </div>
        <div className='Wrap'>
          <label htmlFor="Number" className='N'> Numbers</label>
          <input type="checkbox" id="Number" name="letters3" checked={number} onChange={() => setNumber(!number)} value="Numbers" />
        </div>
        <div className='Wrap'>
          <label htmlFor="Symbols" className='S'> Symbols</label>
          <input type="checkbox" id="Symbols" name="letters4" checked={symbol} onChange={() => setSymbol(!symbol)} value="Symbols" />
        </div>
      </div>
    </div>
  );
}

export default App
