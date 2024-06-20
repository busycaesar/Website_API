export const registerUserApi = async (userData) => {
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
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const validateUserApi = async (userData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/validate-user`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    const { ok, message } = await response.json();

    console.log(message);

    if (!ok) throw new Error(message);
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
