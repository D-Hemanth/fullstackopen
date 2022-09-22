import { CourseParts } from '../types';

// We are explicitly defining the parameter types using an interface i.e. { courseParts: courseParts[] }
// and we also explicitly state the return type as JSX.Element of the function (i.e., a react component) i.e. ({ courseParts }: { courseParts: courseParts[] }): JSX.Element
const Total = ({
  courseParts,
}: {
  courseParts: CourseParts[];
}): JSX.Element => {
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
