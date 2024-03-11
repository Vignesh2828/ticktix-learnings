import React, { Key, useState } from "react";
import { useSelector } from "react-redux";

interface CustomerValue {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
}

interface ProductValue {
  title: string;
}

export default function AdminPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const viewCustomers = useSelector((state: any) => state.viewCustomers);
  const orderedProducts = useSelector((state: any) => state.cart);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (userName === "admin" && password === "admin") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      alert("invalid credentials!");
    }
  };

  return (
    <>
      <div>
        {isLoggedIn ? (
          <div>
            <table style={tableOverAllStyle}>
              <thead>
                <tr>
                  <th style={tableStyle}>FirstName</th>
                  <th style={tableStyle}>LastName</th>
                  <th style={tableStyle}>Email</th>
                  <th style={tableStyle}>Phone</th>
                  <th style={tableStyle}>Address</th>
                  <th style={tableStyle}>Product</th>
                </tr>
              </thead>
              <tbody>
                {viewCustomers.map(
                  (customer: CustomerValue, index: Key | null | undefined) => (
                    <tr key={index}>
                      <td style={tableStyle}>{customer.FirstName}</td>
                      <td style={tableStyle}>{customer.LastName}</td>
                      <td style={tableStyle}>{customer.Email}</td>
                      <td style={tableStyle}>{customer.Phone}</td>
                      <td style={tableStyle}>{customer.Address}</td>
                      <td style={tableStyle}>
                        {orderedProducts.map((oproduct:ProductValue, index:Key | null | undefined) => (
                          <td key={index}>({oproduct.title})</td>
                        ))}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <button onClick={() => window.print()} style={buttonStyle}>
              Print
            </button>
          </div>
        ) : (
          <div style={loginStyle}>
            <form onSubmit={handleSubmit}>
              <label style={labelStyle}>
                UserName:
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="enter your username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
              <br />
              <label style={labelStyle}>
                Password:
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
              <button type="submit" style={buttonStyle}>
                Login
              </button>
              <a href="#">
                <h4 style={forgotStyle}>forgot password</h4>
              </a>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

const tableStyle: React.CSSProperties = {
  border: "1px solid black",
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid black",
};

const tableOverAllStyle: React.CSSProperties = {
  border: "1px solid black",
  borderCollapse: "collapse",
  width: "70%",
  margin: "80px",
  fontFamily: "monospace",
  fontSize: "18px",
};

const loginStyle: React.CSSProperties = {
  display: "flex",
  marginLeft: "750px",
  marginTop: "300px",
  width: "360px",
  height: "350px",
  padding: "20px",
  border: "2px solid #00bfff ",
  borderRadius: "20px",
};

const inputStyle: React.CSSProperties = {
  height: "45px",
  width: "300px",
  border: "1px solid gray",
  borderRadius: "8px",
  padding: "10px",
  margin: "10px",
  fontFamily: "monospace",
  fontSize: "18px",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "18px",
};

const buttonStyle: React.CSSProperties = {
  height: "45px",
  width: "120px",
  border: "1px solid #ff8c00",
  borderRadius: "8px",
  margin: "20px",
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
