import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const signUp = async (data) => {
  try {
    const res = await fetch(`/api/auth/signup`, {
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
    const res = await fetch(`/api/auth/signin`, {
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
    const res = await fetch(`/api/user/update/${id}`, {
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

    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signOut = async () => {
  try {
    const res = await fetch(`/api/auth/logout`, {
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

export const submitRestaurantData = async (data) => {
  try {
    const response = await fetch(`/api/restaurant/create-restaurant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllRestaurants = async () => {
  try {
    const response = await fetch(`/api/restaurant/get-all-restaurants`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to send data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchRestaurant = async (searchQuery) => {
  try {
    const response = await fetch(`/api/restaurant/search-restaurant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery }),
    });

    if (!response.ok) {
      throw new Error("Failed to send data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRestaurantById = async (id) => {
  try {
    const response = await fetch(`/api/restaurant/get-restaurant/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to send data");
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const submitReview = async (data) => {
  try {
    const response = await fetch(`/api/review/create-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to send data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllReviews = async () => {
  try {
    const response = await fetch(`/api/review/get-all-reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to send data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await fetch(`/api/review/delete-review/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to send data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateReview = async (data, id) => {
  try {
    const response = await fetch(`/api/review/update-review/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to send data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReview = async (id) => {
  try {
    const response = await fetch(`/api/review/get-reviews/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to send data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSearch = async (search) => {
  try {
    const res = await fetch(
      `/api/restaurant/get-searched-restaurants?${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
