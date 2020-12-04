import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function randInt(end) {
   return Math.round(Math.random() * (end - 1))
}

function argMax(values) {
   let n = values.length;
   if (n === 0)
      return -1
   let imax = 0;
   for (let i = 1; i < n; i++) {
      if (values[i] > values[imax])
         imax = i;
   }
   return imax;
}

const Anectode = ({ text, votes }) => {
   return (
      <div className="anectode">
         <p>{text}</p>
         <div className="anectode__votes">{votes} votes</div>
      </div>
   )
}

const App = ({ anecdotes }) => {
   const [selected, setSelected] = useState(0)
   const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
   const hasVotes = votes.some(val => val > 0);
   const mostVoted = (hasVotes) ? argMax(votes) : -1;

   const selectRandomAnectode = () => {
      if (anecdotes.length === 1)
         return 0
      let randIndex;
      do {
         randIndex = randInt(anecdotes.length)
      } while (randIndex === selected)
      setSelected(randIndex)
   }

   const incrementVotes = () => {
      setVotes([
         ...votes.slice(0, selected),
         votes[selected] + 1,
         ...votes.slice(selected + 1)
      ])
   }


   return (
      <div className="App">
         <section>
            <h1>Anectodes of the day</h1>
            <Anectode text={anecdotes[selected]} votes={votes[selected]} />
            <button onClick={selectRandomAnectode}>Next anectode</button>
            <button onClick={incrementVotes}>Vote</button>
         </section>

         <section>
            <h1>Most voted anectode</h1>
            {hasVotes
               ? <Anectode text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
               : "No votes have been given yet."
            }
         </section>
      </div>
   )
}

const anecdotes = [
   'If it hurts, do it more often',
   'Adding manpower to a late software project makes it later!',
   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
   'Premature optimization is the root of all evil.',
   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
   <App anecdotes={anecdotes} />,
   document.getElementById('root')
)