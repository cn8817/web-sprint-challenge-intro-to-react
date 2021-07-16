//Each individual Character component

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledCharacter = styled.div`
background: rgba(255,255,255,0.5);
margin:3% 20%;
padding:2%2%;
color:black;
border: 2px solid black;
border-radius: 10px;

button{
  padding: 1% 4%;
  border:1.8px solid black;
  border-radius: 10px;
}
`
 


export default function Character(props){
    const { characterId, close } = props
    const [characterData, setCharacterData] = useState(null)

    useEffect(() => {
        const clickHandler = () => {
            console.log('click')
        }
        document.addEventListener('click', clickHandler)

        return () => {
            console.log('unmount')
            document.removeEventListener('click', clickHandler)
        }
    }, [])

    useEffect(() => { //getting data from each character 
        axios.get('https://swapi.dev/api/people')
        .then(res => {
            setCharacterData(res.data)
        })
        .catch(err => console.log(err))
    }, [characterId])

    return (
        <StyledCharacter>
            <div> 
                { characterData && 
                <>
                <h3>{characterData.name}</h3>
                <p>gender: {characterData.gender}</p>
                <p>birth year: {characterData.birth_year}</p>
                <p>height: {characterData.height}</p>
                <p>mass: {characterData.mass}</p>
                <p>eye color: {characterData.eye_color}</p>
                <p>hair color: {characterData.hair_color}</p>
                <p>skin color: {characterData.skin_color}</p>
                <button onClick={close}>close</button>
                </>
                }
            </div>
        </StyledCharacter>
    );
}
