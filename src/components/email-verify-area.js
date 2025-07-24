'use client';
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
// internal
import ErrorMessage from "@components/error-message/error";
import Loader from "@components/loader/loader";
import { notifySuccess } from "@utils/toast";
import { useConfirmEmailQuery } from "src/redux/features/auth/authApi";

const EmailVerifyArea = ({ token }) => {
  const router = useRouter();
  const {data,isLoading,isError,error,isSuccess} = useConfirmEmailQuery(token)

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      notifySuccess("Register Success!");
    }
  }, [router,isSuccess]);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : isSuccess ? (
        <h2>{data?.message}</h2>
      ) : (
        <ErrorMessage message={error?.data?.error} />
      )}
    </div>
  );
};

export default EmailVerifyArea;
