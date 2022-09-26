import { CoursePart } from '../types';

// Helper function for exhaustive type checking
// With TypeScript, we can use a method called exhaustive type checking. Its basic principle is that if we encounter an unexpected value,
// we call a function that accepts a value with the type never and also has the return type never.
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// We are explicitly defining the parameter types using an inline interface i.e. { coursePart: CoursePart } where CoursePart is union of 4 different interface types
// and we also explicitly state the return type as JSX.Element of the function (i.e., a react component) i.e. ({ coursePart }: { coursePart: CoursePart }): JSX.Element
const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br></br>
            <em>{coursePart.description}</em>{' '}
          </p>
        </>
      );
    case 'groupProject':
      return (
        <>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br></br>
            <em>project exercises {coursePart.groupProjectCount}</em>
          </p>
        </>
      );
    case 'submission':
      return (
        <>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br></br>
            <em>{coursePart.description}</em>
            <br></br>
            <>submit to {coursePart.exerciseSubmissionLink}</>
          </p>
        </>
      );
    case 'special':
      return (
        <>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br></br>
            <em>{coursePart.description}</em>
            <br></br>
            <>required skills: {coursePart.requirements.join(', ')}</>
          </p>
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
