const Button = (props: {
  text: string | undefined;
  handleCallback: Function;
}) => {
  return (
    <>
      <button onClick={props.handleCallback}>{props.text}</button>
    </>
  );
};

export default Button;
