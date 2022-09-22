// We are explicitly defining the parameter types using an inline interface i.e. { courseName: string }
// and we also explicitly state the return type as JSX.Element of the function (i.e., a react component) i.e. ({ courseName }: { courseName: string }): JSX.Element
const Header = ({ courseName }: { courseName: string }): JSX.Element => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

export default Header;
