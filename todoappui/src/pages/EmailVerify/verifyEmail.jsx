// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom"; // Import useParams

// import axios from "axios";

// const VerificationComponent = () => {
//   const { id, token } = useParams(); // Retrieve userId and token from the URL

//   const verifyUser = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/users/${id}/verify/${token}`
//       );

//       if (response.status === 200) {
//         // Verification successful, you can show a success message or redirect the user
//         console.log("Email verified successfully");
//       } else {
//         // Handle other status codes or error messages
//         console.error("Email verification failed");
//       }
//     } catch (error) {
//       // Handle network errors or other exceptions
//       console.error("An error occurred while verifying email:", error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     verifyUser();
//   };

//   useEffect(() => {
//     // Optionally, you can call verifyUser() automatically when the component is mounted
//     // verifyUser();
//   }, []);

//   return (
//     <div>
//       <h1>Email Verification</h1>
//       <p>Click the button below to verify your email:</p>
//       <form onSubmit={handleSubmit}>
//         <button type="submit">Verify Email</button>
//       </form>
//     </div>
//   );
// };

// export default VerificationComponent;
import { useEffect, useState } from "react";
import axios from "axios";

function EmailVerification({ match }) {
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    if (match && match.params) {
      const { id, token } = match.params;

      axios
        .get(`http://localhost:3001/users/${id}/verify/${token}`)
        .then((response) => {
          // Handle successful verification
          setVerificationStatus(response.data.message);
        })
        .catch((error) => {
          // Handle verification failure
          setVerificationStatus(`Error: ${error.response.data.message}`);
        });
    }
  }, [match]);

  return (
    <div>
      {verificationStatus !== null ? (
        <div>
          {verificationStatus === "Email verified successfully" ? (
            <p>Verification Successful! {verificationStatus}</p>
          ) : (
            <p>{verificationStatus}</p>
          )}
        </div>
      ) : (
        <p>Verifying...</p>
      )}
    </div>
  );
}

export default EmailVerification;
