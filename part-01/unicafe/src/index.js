import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Button({ children, onClick, variant }) {
   const classes = ["Button"];
   if (variant)
      classes.push(`Button--${variant}`)
   return (
      <button className={classes.join(" ")} onClick={onClick}>
         {children}
      </button>
   )
}

function percent(num, precision = 1) {
   return `${100 * num.toFixed(precision)}%`
}

function Statistics({ good, neutral, bad }) {
   const total = good + neutral + bad;
   if (total === 0)
      return <p>No feedback was given yet.</p>

   const average = (-bad + good) / total;
   const rows = [
      ["Good", good],
      ["Neutral", neutral],
      ["Bad", bad],
      ["Total", total],
   ]
   return (
      <>
         <table className="Statistics">
            <tbody>
               {rows.map(([name, value]) => (
                  <tr key={name}>
                     <td>{name}</td>
                     <td>{value}</td>
                     <td>{percent(value / total, 1)}</td>
                  </tr>
               ))}
            </tbody>
         </table>
         <div className="average-box">
            <strong>Average:</strong> {average.toFixed(3)}
            <div>(+1 for good; 0 for neutral; -1 for bad)</div>
         </div>
      </>
   )
}


export default function App() {
   const [neutral, setNeutral] = useState(0)
   const [good, setGood] = useState(0)
   const [bad, setBad] = useState(0)

   return (
      <div className="App">
         <h2>Give feedback</h2>
         <Button variant="good" onClick={() => setGood(good + 1)}>
            Good
         </Button>
         <Button onClick={() => setNeutral(neutral + 1)}>Neutral</Button>
         <Button variant="bad" onClick={() => setBad(bad + 1)}>Bad</Button>

         <h2>Statistics</h2>
         <Statistics bad={bad} neutral={neutral} good={good} />
      </div>
   )
}


ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById('root')
);

