'use client';
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { EmailTwo, Location, MobileTwo, UserTwo } from "@svg/index";
import { useUpdateProfileMutation } from "src/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@utils/toast";
import ErrorMessage from "@components/error-message/error";

// Validation schema
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  email: Yup.string().required("Email is required!").email("Invalid email format!"),
  phone: Yup.string().required("Phone is required!").min(10, "Phone must be at least 10 digits!"),
  address: Yup.string().required("Address is required!"),
  bio: Yup.string().required("Bio is required!").min(20, "Bio must be at least 20 characters!"),
});

const UpdateUser = () => {
  const { user } = useSelector((state) => state.auth);
  const [updateProfile] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      bio: user?.bio || "Hi there, this is my bio...",
    },
  });

  const onSubmit = (data) => {
    updateProfile({
      id: user?._id,
      ...data,
    }).then((result) => {
      if (result?.error) {
        notifyError(result?.error?.data?.message || "Failed to update profile.");
      } else {
        notifySuccess(result?.data?.message || "Profile updated successfully.");
      }
    });
    reset();
  };

  return (
    <div className="profile__info">
      <h3 className="profile__info-title">Personal Details</h3>
      <div className="profile__info-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Name */}
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Enter your username"
                  />
                  <span><UserTwo /></span>
                  <ErrorMessage message={errors.name?.message} />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                  />
                  <span><EmailTwo /></span>
                  <ErrorMessage message={errors.email?.message} />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("phone")}
                    type="text"
                    placeholder="Enter your number"
                  />
                  <span><MobileTwo /></span>
                  <ErrorMessage message={errors.phone?.message} />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("address")}
                    type="text"
                    placeholder="Enter your address"
                  />
                  <span><Location /></span>
                  <ErrorMessage message={errors.address?.message} />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <textarea
                    {...register("bio")}
                    placeholder="Enter your bio"
                    value={watch("bio")}
                  />
                  <ErrorMessage message={errors.bio?.message} />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="col-xxl-12">
              <div className="profile__btn">
                <button type="submit" className="tp-btn">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
