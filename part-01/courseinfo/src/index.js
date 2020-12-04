import React from 'react'
import ReactDOM from 'react-dom'


const CourseHeader = ({ title }) => (
   <h1>{title}</h1>
)

const CourseContent = ({ parts }) => (
   <ol>
      {parts.map(part => (
         <li key={part.title}>
            {part.title} ({part.numExercises} exercises)
         </li>
      ))}
   </ol>
)

const CourseTotalExercises = ({ numExercises }) => (
   <p>Total number of exercises: {numExercises}</p>
)

const App = () => {
   const course = {
      title: 'Half Stack application development',
      parts: [
         { title: 'Fundamentals of React', numExercises: 10 },
         { title: 'Using props to pass data', numExercises: 7 },
         { title: 'State of a component', numExercises: 14 },
      ]
   }
   const totalExercises = course.parts
      .map(part => part.numExercises)
      .reduce((a, b) => a + b);

   return (
      <div>
         <CourseHeader title={course.title} />
         <CourseContent parts={course.parts} />
         <CourseTotalExercises numExercises={totalExercises} />
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById('root'))