import React, { useState, useEffect } from 'react';
import {CaretLeftFill,CaretRightFill} from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {check} from '../../redux/action/Action'
import './Pagination.css'

function Pagination({ page }) {
 
  const dispatch = useDispatch()
  const numberOfPages = []
  for (let i = 1; i <=page; i++) {
    numberOfPages.push(i)
  }

  const [currentButton, setCurrentButton] = useState(1)
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons]
    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'
    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    }
    else if (currentButton >= 1 && currentButton <= 2) {
      tempNumberOfPages = [1, 2, 3, dotsInitial, numberOfPages.length]
    }

    else if (currentButton === 3) {
      const sliced = numberOfPages.slice(0, 4)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    }

    else if (currentButton > 3 && currentButton < numberOfPages.length - 2) {               // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5] 
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) // [1, '...', 4, 5, 6, '...', 10]
    }
    
    else if (currentButton > numberOfPages.length - 3) {                 // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4) 
      tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
    }
    
    else if (currentButton === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3 
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or 
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1) 
    }
    else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2)
    }

    else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2)
    }

    setArrOfCurrButtons(tempNumberOfPages)

     window.scrollTo(0, 0)
     dispatch(check(currentButton))
  }, [currentButton])
 
  
  

  return (
    <div className="pagination-container">
      <Link
       href="#"
        className={`${currentButton === 1 ? 'disabled' : ''}`}
        onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
       
      >
        <CaretLeftFill />
      </Link>

      {arrOfCurrButtons.map(((item, index) => {
        return <Link
          href="#"
          key={index}
          className={`${currentButton === item ? 'active' : ''}`}
          onClick={() => setCurrentButton(item)}
        >
          {item}
        </Link>
      }))}

      <a
        href="#"
        className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
        onClick={()=>setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
      >
        <CaretRightFill />
      </a>
    </div>
  );
}


export default Pagination