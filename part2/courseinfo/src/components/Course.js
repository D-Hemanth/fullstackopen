const Course = ({ course }) => {

    const Header = ({ courseName }) => {
        return (
          <h1>{courseName}</h1>
        )
      }
      
    const Content = ({ courseParts }) => {
        // console.log({ courseParts})
        return (
        // wrap the JSX expression in a fragment <> </> so that it has one parent element to the div 'root'
        <div>
            <Part partName={courseParts[0]['name']} exercises={courseParts[0]['exercises']} />
            <Part partName={courseParts[1]['name']} exercises={courseParts[1]['exercises']} />
            <Part partName={courseParts[2]['name']} exercises={courseParts[2]['exercises']} />
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

    return (
      <div>
        <Header courseName={course.name} />
        <Content courseParts={course.parts} />
      </div>
    )
}

export default Course