import react, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function EmailVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `https://localhost:3001/users/${param.id}/verify/${param.token}/`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      <Fragment>
        {validUrl ? (
          <div>
            <h1>Success</h1>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        ) : (
          <h1>404 Not Found</h1>
        )}
      </Fragment>
    </>
  );
}
