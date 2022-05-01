const endpoint = `${process.env.REACT_APP_API_ENDPOINT || ''}`;

export const bookingService = {
  list,
  book,
  cancel,
};

function list(token) {
  const opts = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  return fetch(`${endpoint}/api/v1/bookings`, opts).then(handleResponse);
}

function book(id, projID, token) {
  const opts = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({id: id, project_id: projID}),
  };

  return fetch(`${endpoint}/api/v1/bookings`, opts).then(handleResponse);
}

function cancel(id, token) {
  const opts = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  return fetch(`${endpoint}/api/v1/bookings/${id}`, opts).then(handleResponse);
}

function handleResponse(resp) {
  return resp.json().then(body => {
    if (!resp.ok) {
      const error = (body && body.msg) || resp.statusText;
      return Promise.reject(error);
    }

    return {
      data: body.data,
    };
  });
}
