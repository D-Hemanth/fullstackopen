import Header from "./Header"
import Content from "./Content"

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