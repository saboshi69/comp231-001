import { useState } from "react";
import { submitRestaurantData } from "../util/Http";

const CreateRestaurantPage = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    address: "",
    description: "",
    contactDetails: {
      phoneNumber: "",
      email: "",
    },
    operatingHours: {
      opening: "",
      closing: "",
    },
    menu: [""],
    images: [""],
    ratings: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await submitRestaurantData(formData);
      console.log("Data submitted successfully:", responseData);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 max-w-xl mx-auto space-y-4 p-6 border rounded-md shadow-md"
    >
      <div className="flex flex-col space-y-2">
        <label className="font-bold">Restaurant Name:</label>
        <input
          type="text"
          value={formData.restaurantName}
          onChange={(e) => setFormData((prev) => ({ ...prev, restaurantName: e.target.value }))}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-bold">Address:</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-bold">Phone Number:</label>
        <input
          type="tel"
          value={formData.contactDetails.phoneNumber}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              contactDetails: { ...prev.contactDetails, phoneNumber: e.target.value },
            }))
          }
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-bold">Description:</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-bold">Email:</label>
        <input
          type="email"
          value={formData.contactDetails.email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              contactDetails: { ...prev.contactDetails, email: e.target.value },
            }))
          }
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-bold">Opening Hour:</label>
        <input
          type="text"
          value={formData.operatingHours.opening}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              operatingHours: { ...prev.operatingHours, opening: e.target.value },
            }))
          }
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-bold">Closing Hour:</label>
        <input
          type="text"
          value={formData.operatingHours.closing}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              operatingHours: { ...prev.operatingHours, closing: e.target.value },
            }))
          }
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-bold">Menu Item:</label>
        <input
          type="text"
          value={formData.menu[0]}
          onChange={(e) => setFormData((prev) => ({ ...prev, menu: [e.target.value] }))}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-bold">Image URL:</label>
        <input
          type="url"
          value={formData.images[0]}
          onChange={(e) => setFormData((prev) => ({ ...prev, images: [e.target.value] }))}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-bold">Ratings:</label>
        <input
          type="number"
          value={formData.ratings}
          onChange={(e) => setFormData((prev) => ({ ...prev, ratings: e.target.value }))}
          className="p-2 border rounded-md"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default CreateRestaurantPage;
