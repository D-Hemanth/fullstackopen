import { CoursePart } from '../types';

// We are explicitly defining the parameter types using an interface i.e. { courseParts: CoursePart[] }
// and we also explicitly state the return type as JSX.Element of the function (i.e., a react component) i.e. ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element
const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
