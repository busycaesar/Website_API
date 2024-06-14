const registerUserApi = async (userData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/register-user`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    const { ok, message } = await response.json();
    console.log(message);
    if (!ok) throw new Error(message);
    return message;
  } catch (error) {
    console.log(error);
    throw new Error(message);
  }
};

export { registerUserApi };
