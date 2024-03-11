import { useSelector } from "react-redux";
import Link from "next/link";
import { remove, clearCart } from "@/components/store/cartSlice";
import { useDispatch } from "react-redux";
import { Key } from "react";

interface Rating {
  rate: number;
  count: number;
}
interface ProductValue {
  id: number;
  title: string;
  image: string;
  description: string;
  rating: Rating;
  price: number;
}

const cartPage = () => {
  const cartItems = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const removeCart = (id: number) => {
    dispatch(remove(id));
  };

  //calculate the total price of carts here
  const totalPriceOfCart = cartItems.reduce(
    (acc: any, product: { price: any }) => acc + product.price,
    0
  );

  const clear = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <nav
        style={{ marginBottom: "20px", padding: "10px", background: "#f0f0f0" }}
      >
        <Link href={"/"}>
          <button style={homeButtonStyle}>go to home</button>
        </Link>
        ---
        <button onClick={clear} style={clearButtonStyle}>
          clear cart
        </button>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <h2>
            Total Price({cartItems.length} items): $
            {Math.round(totalPriceOfCart)}
          </h2>
        </div>
      </nav>
      <h3 style={{ color: "#333" }}>Cart Page</h3>
      <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        <h4 style={{ color: "#555" }}>Cart Items:</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cartItems.map(
            (product: ProductValue, index: Key | null | undefined) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ flex: "1" }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={imageStyle}
                  />
                  <h3>{product.title}</h3> - <h1>${product.price}</h1>
                </span>
                <button
                  style={{
                    background: "#f44336",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "30px",
                  }}
                  onClick={() => removeCart(product.id)}
                >
                  Remove
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <br />
      <Link href={"/checkout"}>
        <button style={homeButtonStyle}>checkout</button>
      </Link>
    </>
  );
};

export default cartPage;

const imageStyle: React.CSSProperties = {
  width: "100px",
  height: "100px",
  marginBottom: "12px",
};

const homeButtonStyle: React.CSSProperties = {
  width: "100px",
  height: "40px",
  backgroundColor: "yellow",
  borderRadius: "10px",
  cursor: "pointer",
  border: "1px solid gray",
};

const clearButtonStyle: React.CSSProperties = {
  width: "100px",
  height: "40px",
  background: "#f44336",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  border: "1px solid gray",
};
