import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

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