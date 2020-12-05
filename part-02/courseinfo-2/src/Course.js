import React from 'react'


export default function Course({ course }) {

   const totalExercises = course.parts
      .map(part => part.exercises)
      .reduce((a, b) => a + b);

   return (
      <div className="Course">
         <CourseHeader name={course.name} />
         <CourseContent parts={course.parts} />
         <CourseTotalExercises exercises={totalExercises} />
      </div>
   )
}

const CourseHeader = ({ name }) => (
   <h2>{name}</h2>
)

const CourseContent = ({ parts }) => (
   <ol>
      {parts.map(part => (
         <li key={part.id}>
            {part.name} <span className="Course__part-exercises">
               ({part.exercises} exercises)
            </span>
         </li>
      ))}
   </ol>
)

const CourseTotalExercises = ({ exercises }) => (
   <p className="Course__total-exercises">
      Total number of exercises: {exercises}
   </p>
)
