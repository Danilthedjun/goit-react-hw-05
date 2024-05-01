import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p>This page does not exist</p>
      <p>
        Please visit out <Link to="/">home page</Link>
      </p>
    </div>
  );
}
