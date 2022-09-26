import { CoursePart } from '../types';
import Part from './Part';

// We are explicitly defining the parameter types using an inline interface i.e. { courseParts: CoursePart[] } where CoursePart[] is array of 4 different interface objects
// and we also explicitly state the return type as JSX.Element of the function (i.e., a react component) i.e. ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element
const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return (
    <div>
      {courseParts.map((coursePart, index) => (
        <Part key={index} coursePart={coursePart} />
      ))}
    </div>
  );
};

export default Content;
