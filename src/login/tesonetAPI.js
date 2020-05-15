export async function login(loginData) {
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
    throw new Error("Invalid password / username");
  }
  throw new Error("Request failed! Please try again later.");
}

export async function getData(token) {
  const url = "https://playground.tesonet.lt/v1/servers";
  try {
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
    throw new Error("Request failed!");
  } catch (error) {
    window.alert("Error!");
  }
}
