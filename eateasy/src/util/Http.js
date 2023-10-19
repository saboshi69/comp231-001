import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
const apiBaseUrl = "http://localhost:3000";

export const signUp = async (data) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signIn = async (data) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    console.log(responseData);
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateUser = async (data, id) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/user/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    console.log("🚀 ~ file: http.ts:44 ~ updateUser ~ responseData:", responseData);
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/user/delete/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("🚀 ~ file: http.ts:96 ~ deleteUser ~ errorData", errorData);
      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    console.log("🚀 ~ file: http.ts:116 ~ deleteUser ~ responseData:", responseData);

    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signOut = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/auth/logout`, {
      method: "GET",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
