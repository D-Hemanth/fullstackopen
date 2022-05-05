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

export default Total