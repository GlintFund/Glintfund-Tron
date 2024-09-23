// import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@chakra-ui/react";

function WaitlistModal({ showModal, setShowModal, addToWaitlist, loading }) {
  // Close modal when user clicks outside or on close icon
  const closeModal = () => setShowModal(false);

  // Hook form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    if (data.name && data.email) {
      await addToWaitlist(data);
      reset();
      closeModal();
      showSuccessToast();
    } else {
      console.error("Form submission error: Name or email missing");
    }
  };

  const showSuccessToast = () => {
    toast.success("Successfully added to waitlist!", {
      duration: 5000,
      position: "top-center",

      iconTheme: {
        primary: "#341A41",
        secondary: "#fff",
      },
    });
  };

  if (!showModal) return null; // Don't render if showModal is false

  return (
    <div
      className="fixed  md:inset-0  lg:inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full sm:w-1/2 max-w-md  relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 text-3xl"
        >
          &times;
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold mb-4 text-purple-500">
          Join Our Waitlist
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">
              Name
            </label>
            <input
              className="w-full p-2 border rounded mt-1 text-black"
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              className="w-full p-2 border rounded mt-1 text-black"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <Button
            w="full"
            color="purple"
            text="white"
            type="submit"
            isDisabled={loading}
            isLoading={loading}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default WaitlistModal;
