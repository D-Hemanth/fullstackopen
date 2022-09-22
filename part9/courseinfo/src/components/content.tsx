import { CourseParts } from '../types';

// We are explicitly defining the parameter types using an interface i.e. { courseParts: courseParts[] }
// and we also explicitly state the return type as JSX.Element of the function (i.e., a react component) i.e. ({ courseParts }: { courseParts: courseParts[] }): JSX.Element
const Content = ({
  courseParts,
}: {
  courseParts: CourseParts[];
}): JSX.Element => {
  return (
    <div>
      {courseParts.map((coursePart, index) => (
        <p key={index}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
