import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Character from './components/Character';
import styled from 'styled-components';

const StyledName = styled.div`
background: rgba(255,255,255,0.5);
margin:3% 20%;
padding:2% 2%;
border: 2px solid ${props => props.theme.black};
border-radius: 10px;

button{
  margin-left:20%;
  padding: 1% 4%;
  border:1.8px ${props => props.theme.black};
  border-radius: 10px;
}

div{
  margin:5%;
}
`


const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [starWarsData, setStarWarsData] = useState([])
  const [currentCharacter, setCurrentCharacter] = useState(null)

  const openDetails = open => {
    setCurrentCharacter(open)
  }

  const closeDetails = () => {
    setCurrentCharacter(null)
  }

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  useEffect(() => { //api call
    axios.get('https://swapi.dev/api/people')
    .then(res => {
      console.log(res.data)
      setStarWarsData(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  const Characters = props => ( //character name with expand details button
    <div>
      {props.data.name}
      <button onClick = {() => openDetails(props.data)}>
        details
      </button>
    </div>
  )



  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <StyledName>
        <div>
      { starWarsData.map(data => {
        return <Characters key = {data.name} data={data}/>
      })}
      </div>
      </StyledName>
      <div>
      { currentCharacter && <Character characterId = {currentCharacter} close={closeDetails}/>}
      </div>
    </div>
  );
}

export default App;





