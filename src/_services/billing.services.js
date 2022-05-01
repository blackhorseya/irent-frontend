const endpoint = `${process.env.REACT_APP_API_ENDPOINT || ''}`;

export const billingService = {
  getArrears,
};

function getArrears(id, token) {
  const opts = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  return fetch(
      `${endpoint}/api/v1/billing/${id}/arrears`, opts).then(handleResponse);
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
