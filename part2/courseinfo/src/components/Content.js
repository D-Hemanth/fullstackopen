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

export default Content