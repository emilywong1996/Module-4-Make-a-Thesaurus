// Main code: https://youtu.be/9KaMsGSxGno
// Fetching and map: https://www.codingthesmartway.com/how-to-fetch-api-data-with-react/

import React, { useState } from 'react';

function Form() {
    // Sets the state for the user's input for the word
    const [word, setWord] = useState({
        word: ""
    })

    // This allows the state to be periodically changed when the user inputs the information on the form
    function changeHandler(e) {
        // Gets the id, value, word, and type of the word to newWord
        // https://www.w3schools.com/react/react_es6_spread.asp
        const newWord={...word};
        // newWord will target the id with the value that the user puts in
        newWord[e.target.id] = e.target.value;
        // sets the word from setWord at const [setWord] with the user inputted values
        setWord(newWord);
    }

    // This will submit the values that the user put in
    function submitHandler(e) {
        // Prevents the page from refreshing
        e.preventDefault();

        // Enters the url to the API and including the word value that the user wanted to search for
        const url = `https://api.datamuse.com/words?ml=${word.word}`;

        // fetches the url with the response, then returns a json.  Then the word is set to setWord
        fetch(url).then(res => {
            console.log(res)
            return res.json()
        })
        .then(word => {
            setWord(word)
        })
        // Catches an error if there's an error with getting the response
        .catch(err => {
            console.log(err)
        }) 
    }

    return (
        // Form gets submitted when submit button gets selected.  The list displays as a bullet list, this gets mapped
        <div>
            <h2>Make a Thesaurus: What Means like this?</h2>
            <label>Type in a word that means like it:</label>
            <form autoComplete="off" onSubmit= {(e) => submitHandler(e)}>
                <input onChange={(e)=>changeHandler(e)} id="word" value={word.word} type="text" placeholder="word"/>
                <button type="submit">Search it now!</button>
            </form>
            <div>
                Word searches powered by <a href="https://datamuse.com/api/">Datamuse API</a>
            </div>
            <div>
                Once searched, you'll receive the word / score / tags associated with the word that means like yours!
            </div>
            <div>
                {word.length > 0 && (
                    <ul>
                        {word.map(word => (
                            <li key={word.id}>{word.word} / {word.score} / {word.tags} </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Form;