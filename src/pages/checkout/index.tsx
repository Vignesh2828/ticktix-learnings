import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addCustomer } from "@/components/store/customerSlice";
import React, { useState } from "react";

interface FormValues {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
}

const defaultValues = {
  FirstName: "",
  LastName: "",
  Email: "",
  Phone: "",
  Address: "",
};

export default function CheckOutPage() {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const OnSubmit = (data: FormValues) => {
    setSuccessMessage(`your order booked successfully ${data.FirstName}`);
    alert(`your order booked successfully ${data.FirstName}`);
    dispatch(addCustomer(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <div>
          <h1
            style={{
              fontFamily: "monospace",
              margin: "20px",
              fontSize: "40px",
              marginLeft: "800px",
            }}
          >
            CheckOut Now
          </h1>
          <p style={successStyle}>{successMessage}</p>
        </div>
        <div style={loginStyle}>
          <label style={labelStyle}>
            FirstName:
            <Controller
              name="FirstName"
              control={control}
              rules={{
                required: "FirstName Required",
                maxLength: {
                  value: 20,
                  message: "20 characters only allowed",
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "only characters allowed",
                },
              }}
              render={({ field }) => (
                <input
                  style={inputStyle}
                  {...field}
                  placeholder="Enter your firstname"
                />
              )}
            />
            <p style={errorStyle}>{errors.FirstName?.message}</p>
          </label>
          <br />
          <label style={labelStyle}>
            LastName:
            <Controller
              name="LastName"
              control={control}
              rules={{
                required: "LastName Required",
                maxLength: {
                  value: 20,
                  message: "20 chars only allowed",
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "only chars allowed",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  style={inputStyle}
                  placeholder="Enter your LastName"
                />
              )}
            />
            <p style={errorStyle}>{errors.LastName?.message}</p>
          </label>
          <br />
          <label style={labelStyle}>
            Email:
            <Controller
              name="Email"
              control={control}
              rules={{
                required: "Email Required",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "invalid email format",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  style={inputStyle}
                  placeholder="Enter your Email"
                />
              )}
            />
            <p style={errorStyle}>{errors.Email?.message}</p>
          </label>
          <br />
          <label style={labelStyle}>
            Phone:
            <Controller
              name="Phone"
              control={control}
              rules={{
                required: "Phone number Required",
                maxLength: {
                  value: 10,
                  message: "only 10 numbers",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "invalid number",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  style={inputStyle}
                  placeholder="Enter your number"
                />
              )}
            />
            <p style={errorStyle}>{errors.Phone?.message}</p>
          </label>
          <br />
          <label style={labelStyle}>
            Address:
            <Controller
              name="Address"
              control={control}
              rules={{
                required: "Address Required",
                pattern: {
                  value: /[A-Za-z0-9'\.\-\s\,]/,
                  message: "invalid number",
                },
              }}
              render={({ field }) => (
                <textarea
                  {...field}
                  style={inputStyle}
                  placeholder="Enter your address"
                />
              )}
            />
            <p style={errorStyle}>{errors.Address?.message}</p>
          </label>
          <button style={buttonStyle}>Place order</button>
        </div>
      </form>
    </>
  );
}

const errorStyle: React.CSSProperties = {
  color: "red",
};

const successStyle: React.CSSProperties = {
  color: "green",
  fontFamily: "cursive",
  fontSize: "25px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "40px",
};

const loginStyle: React.CSSProperties = {
  margin: "20px auto",
  width: "80%",
  padding: "20px",
  border: "2px solid #00bfff",
  borderRadius: "20px",
};

const inputStyle: React.CSSProperties = {
  height: "45px",
  width: "100%",
  border: "1px solid gray",
  borderRadius: "8px",
  padding: "10px",
  margin: "10px 0",
  fontFamily: "monospace",
  fontSize: "18px",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "18px",
};

const buttonStyle: React.CSSProperties = {
  height: "45px",
  width: "100%",
  border: "1px solid #ff8c00",
  borderRadius: "8px",
  margin: "20px 0",
  color: "white",
  backgroundColor: "#ff8c00",
  fontSize: "18px",
  fontFamily: "sans-serif",
  cursor: "pointer",
};

const forgotStyle: React.CSSProperties = {
  textDecoration: "underline",
  fontFamily: "monospace",
};
