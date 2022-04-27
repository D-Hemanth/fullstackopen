const Course = ({ course }) => {

    const Header = (props) => {
        return (
          <h1>{props.course}</h1>
        )
      }
      
    const Content = (props) => {
        console.log(props)
        return (
        // wrap the JSX expression in a fragment <> </> so that it has one parent element to the div 'root'
        <div>
            <Part part={props.parts[0]['name']} exercises={props.parts[0]['exercises']} />
            <Part part={props.parts[1]['name']} exercises={props.parts[1]['exercises']} />
            <Part part={props.parts[2]['name']} exercises={props.parts[2]['exercises']} />
        </div>
        )
    }
      
    const Part = (props) => {
    return (
        <p>
        {props.part} {props.exercises}
        </p>
    )
    }

    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
}

export default Course