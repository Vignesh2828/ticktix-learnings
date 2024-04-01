import { useSelector, useDispatch } from "react-redux";
import { add } from "@/components/store/cartSlice";
import Link from "next/link";
import style from './style.module.css'
import { Key } from "react";
import { useRouter } from "next/router";
import { RootState } from "@/components/store/store";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { getProducts } from "@/components/store/productSlice";
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

export default function ProductBrief() {
  const router = useRouter();
  const { productId } = router.query;
  const productID = typeof productId === 'string' ? parseInt(productId) : 0;
  const selectedProduct = useSelector((state: RootState) => {
    return state.viewProduct.find((product) => product.id === productID);
  });
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts())
  },[productID])
  const addToCart = (product: ProductValue) => {
    dispatch(add(product));
  };

  if (!selectedProduct) {
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
  }

  return (
    <>
      <div style={{ padding: "20px", border: "1px solid #ccc"}}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            key={selectedProduct.id}
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
                src={selectedProduct.image}
                alt={selectedProduct.title}
                style={imageStyle}
              />
              <h1 style={{ fontFamily: "monospace" }}>{selectedProduct.title}</h1>
              <p
                style={{
                  fontFamily: "sans-serif",
                  wordWrap: "break-word",
                  width: "400px",
                }}
              >
                {selectedProduct.description}
              </p>
              <br />
              <h3>Rating : {selectedProduct.rating.rate} out of 5</h3>
              <br />
              <h3 style={{ fontFamily: "cursive" }} className={style.blink_text}>
                Only {selectedProduct.rating.count} left hurry up!
              </h3>
              <br />
              <h1>${selectedProduct.price}</h1>
              <br />
              <button
                style={cartButtonStyle}
                onClick={() => addToCart(selectedProduct)}
              >
                Add to cart
              </button>
              <Link href={"/checkout"}>
                <button
                  style={buttonStyle}
                  onClick={() => addToCart(selectedProduct)}
                >
                  Buy Now
                </button>
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

const imageStyle: React.CSSProperties = {
  width: "400px",
  height: "400px",
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
