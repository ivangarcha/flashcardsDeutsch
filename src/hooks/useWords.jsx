import { useState } from "react"



const useWords = () => {
    const [words, setWords] = useState([])
    return {words, setWords}
}

export default useWords;