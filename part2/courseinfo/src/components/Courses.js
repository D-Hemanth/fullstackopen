const Header = ({ courseName }) => {
  return (
  <h2>{courseName}</h2>
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
    // console.log('what is happening', sum, part.exercises);
    return sum + part.exercises
  }, 0)
  // console.log(total);   
  return (
    <h4>Total of {total} exercises</h4>
  )
}

const Courses = ({ courses }) => {

  // console.log(courses);
  // use map array method to iterate over the courses list, so we can call Header,Content,Total for each course element of courses list
  return(
    <>
      {courses.map(course => (
        <div key={course.id}>
          <Header courseName={course.name} />
          <Content courseParts={course.parts} />
          <Total courseParts={course.parts} />
        </div>
      ))}
    </>
  )
}

export default Courses