import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      styles={{
        width: "100px",
        height: "100px",
        diaplay: "block",
      }}
    ></Spinner>
  );
};

export default Loader;
