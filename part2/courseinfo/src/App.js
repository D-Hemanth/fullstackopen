const Title = ({ title }) => {
  return(<h1>{title}</h1>)
}

const Header = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Content = ({ courseParts }) => {
  // console.log({ courseParts})
  return (
  // wrap the JSX expression in a fragment <> </> so that it has one parent element to the div 'root'
  // JSX returns coursePart which is a single element inside courseParts list using the map function
  <div>
    {courseParts.map(coursePart =>
      <Part partName={coursePart['name']} exercises={coursePart['exercises']} key={coursePart['id']} />
    )}
  </div>
  )
}

const Part = ({ partName, exercises }) => {
  return (
      <p>
      {partName} {exercises}
      </p>
  )
}

const Total = ({ courseParts }) => {
  // reduce() method returns a single value: the function's accumulated result.
  let total = courseParts.reduce(function(sum, part){
    return sum + part.exercises
  }, 0)
  // console.log(total);   
  return (
    <h4>Total of {total} exercises</h4>
  )
}

const Course = ({ course }) => {
    return (
      <div>
        <Header courseName={course.name} />
        <Content courseParts={course.parts} />
        <Total courseParts={course.parts} />
      </div>
    )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App