import { Key, useEffect } from "react";
import Link from "next/link";
import { add } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/productSlice";
import styles from "./styles.module.css";
import { view } from "../store/viewProductSlice";

interface Rating {
  rate: number;
  count: number;
}

interface ProductValue {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: Rating;
}

export default function ShowProduct() {
  const dispatch = useDispatch();

  const { data: products, status } = useSelector((state:any) => state.product);
  const cartInsideProducts = useSelector((state:any) => state.cart);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const addToCart = (product: ProductValue) => {
    dispatch(add(product));
  };

  const viewProduct = (product: ProductValue) => {
    dispatch(view(product));
  };

  if (status === "Loading") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "200px",
        }}
      >
        <h2 style={{ color: "green", marginBottom: "10px" }}>
          Loading... Please wait
        </h2>
        <div className={styles.loader}></div>
      </div>
    );
  } else if (status === "Rejected") {
    return (
      <h2
        style={{
          color: "red",
          display: "flex",
          justifyContent: "center",
          marginTop: "500px",
        }}
      >
        Ooops Something went wrong!!
      </h2>
    );
  }

  return (
    <>
      <div style={{display:"flex"}}>
        <div style={{ margin: "20px" }}>
          <Link href={"/cart"}>
            <button style={cartButtonStyle}>
              Go to cart - {cartInsideProducts.length}
            </button>
          </Link>
        </div>

        <div style={{ margin: "20px" }}>
          <Link href={"/adminPage"}>
            <button style={adminButtonStyle}>Admin login</button>
          </Link>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          fontFamily: "monospace",
          fontSize: "15px",
        }}
      >
        {products.map((product: ProductValue, index: Key | null | undefined) => (
          <div key={index} style={cardStyle}>
            <img src={product.image} alt={product.title} style={imageStyle} />
            <h3>{product.title}</h3>
            <p>{product.description.slice(0, 40)}</p>
            <br />
            <p>
              Rating: <strong>{product.rating.rate}</strong>{" "}
            </p>
            <br />
            <h4>Price :${product.price}</h4>
            <br />
            <p>Product left: {product.rating.count}</p>
            <button style={buttonStyle} onClick={() => addToCart(product)}>
              add to cart
            </button>
            <br />
            <br />
            <Link href={"/productBrief"}>
              <button style={buttonStyle} onClick={() => viewProduct(product)}>
                view product
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

const cardStyle: React.CSSProperties = {
  border: "2px dashed green",
  borderRadius: "10px",
  padding: "16px",
  margin: "16px",
  marginLeft: "45px",
  width: "300px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  boxSizing: "border-box",
};

const imageStyle: React.CSSProperties = {
  width: "100px",
  height: "auto",
  marginBottom: "12px",
};

const buttonStyle: React.CSSProperties = {
  height: "40px",
  width: "140px",
  border: "1px solid gray",
  borderRadius: "10px",
  color: "black",
  backgroundColor: "greenyellow",
  fontSize: "18px",
  fontFamily: "monospace",
  cursor: "pointer",
  margin: "5px",
};

const cartButtonStyle: React.CSSProperties = {
  height: "40px",
  width: "150px",
  border: "1px solid gray",
  borderRadius: "10px",
  color: "black",
  backgroundColor: "yellow",
  fontSize: "18px",
  fontFamily: "monospace",
  cursor: "pointer",
  margin: "5px",
};

const adminButtonStyle: React.CSSProperties = {
  height: "40px",
  width: "150px",
  border: "1px solid gray",
  borderRadius: "10px",
  color: "black",
  backgroundColor: "greenyellow",
  fontSize: "18px",
  fontFamily: "monospace",
  cursor: "pointer",
  margin: "5px",
}