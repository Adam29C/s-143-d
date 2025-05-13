// src/components/ErrorPage.jsx
import React from "react";
import PagesIndex from "../PagesIndex";

const ErrorPage = () => (
  // <div>
  //   <h1>Unexpected Application Error!</h1>
  //   <p>404 Not Found</p>
  //   <p>You can provide a way better UX than this when your app throws errors by providing your own ErrorBoundary or errorElement prop on your route.</p>
  // </div>
  <div className="page-not-found">
  <div className="message-box">
    <h1>404</h1>
    <p >Page not found</p>
    <div className="buttons-con">
      <div className="action-link-wrap">
        <PagesIndex.Link to="/" className="link-button link-back-button">
          Go Back
        </PagesIndex.Link>
        <PagesIndex.Link to="/admin/dashboard" className="link-button">
          Go to Home Page
        </PagesIndex.Link>
      </div>
    </div>
  </div>
</div>

);

export default ErrorPage;
