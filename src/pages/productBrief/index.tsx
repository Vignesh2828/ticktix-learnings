import { useSelector, useDispatch } from "react-redux";
import { add } from "@/components/store/cartSlice";
import Link from "next/link";
import styles from './style.module.css'
import { Key } from "react";

interface Rating {
  rate: number;
  count: number;
}

interface ProductValue {
  title : string;
  image : string;
  description : string;
  rating : Rating;
  price : number;
}

export default function ProductBrief() {
  const selectedProducts = useSelector((state: any) => state.viewProduct);
  console.log(selectedProducts);
  const dispatch = useDispatch();

  const addToCart = (product: ProductValue) => {
    dispatch(add(product));
  };

  return (
    <>
      <div style={{ padding: "20px", border: "1px solid #ccc"}}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {selectedProducts.map((product: ProductValue, index: Key | null | undefined) => (
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
                <h1 style={{ fontFamily: "monospace" }}>{product.title}</h1>
                <p
                  style={{
                    fontFamily: "sans-serif",
                    wordWrap: "break-word",
                    width: "400px",
                  }}
                >
                  {product.description}
                </p>
                <br />
                <h3>Rating : {product.rating.rate} out of 5</h3>
                <br />
                <h3 style={{ fontFamily: "cursive" }} className={styles.blink_text}>
                  Only {product.rating.count} left hurry up!
                </h3>
                <br />
                <h1>${product.price}</h1>
                <br />
                <button
                  style={cartButtonStyle}
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
                <Link href={"/checkout"}>
                  <button
                    style={buttonStyle}
                    onClick={() => addToCart(product)}
                  >
                    Buy Now
                  </button>
                </Link>
              </span>
            </li>
          ))}
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
