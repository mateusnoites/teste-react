import { useState } from "react"

function Titulo({ cor }) {
  const [texto, setTexto] = useState("Título inicial")
  const [inputText, setInputText] = useState("")
  return (
    <div>
      <h1 style={{color: cor ? cor : "black"}}>{texto}</h1>
      <input value={inputText} onChange={(e) => {setInputText(e.target.value)}} type="text"></input>
      <button onClick={() => {setTexto(inputText)}}>Mudar</button>
    </div>
  )
}

export default Titulo