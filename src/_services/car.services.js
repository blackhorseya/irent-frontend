const endpoint = `${process.env.REACT_APP_API_ENDPOINT || ''}`;

export const carService = {
  near,
};

function near(n, latitude, longitude) {
  const opts = {
    method: 'GET',
  };

  return fetch(
      `${endpoint}/api/v1/cars?n=${n}&latitude=${latitude}&longitude=${longitude}`,
      opts).then(handleResponse);
}

function handleResponse(resp) {
  return resp.json().then(body => {
    if (!resp.ok) {
      const error = (body && body.msg) || resp.statusText;
      return Promise.reject(error);
    }

    return {
      data: body.data,
      total: resp.headers.get('X-Total-Count'),
    };
  });
}
