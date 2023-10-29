import Spinner from "react-bootstrap/Spinner";

export function Loader() {
  return (
    <div className="text-center">
      <Spinner animation="border" className="m-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
