export const login = async (loginData) => {
  const url = "https://playground.tesonet.lt/v1/tokens";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  if (response.ok) {
    const jsonresponse = await response.json();
    return jsonresponse;
  }
  if (response.status === 401) {
    throw new Error("Check username and password! Could not log you in!");
  }
  throw new Error("Problems occurred! Please try again later.");
};

export const getServers = async (token) => {
  const url = "https://playground.tesonet.lt/v1/servers";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const jsonresponse = await response.json();
    return jsonresponse;
  }
  throw new Error("Some problems occurred! Please try again later.");
};
