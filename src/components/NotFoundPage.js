import React, { Component } from 'react';

class NotFoundPage extends Component {

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="not-found-title">
          <h1>404 Requested Page Not Found</h1>
        </div>
      </div>
    )
  }
}

export default NotFoundPage;