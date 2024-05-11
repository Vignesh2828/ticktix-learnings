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
import { getSpecificProducts } from "@/components/store/specificProductSlice";
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

interface SpecificProductState {

      id: number;
      title: string;
      image: string;
      description: string;
      category: string; 
      price: number;
      rating: Rating
    }

export default function ProductBrief() {
  const router = useRouter();
  const { productId } = router.query;
  const productID = typeof productId === 'string' ? parseInt(productId) : 0;
  console.log("router id is", productID)

  const specificProducts = useSelector((state:RootState) => state.viewSpecificProduct.data)
  const loading = useSelector((state:RootState) => state.viewSpecificProduct.loading)
  console.log("specificProducts:", specificProducts);

   const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(getSpecificProducts(productID));
    }
  }, [dispatch, productID, productId]);


  const addToCart = (product: ProductValue) => {
    dispatch(add(product));
  };

  if (loading) {
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
        {specificProducts.map((product: SpecificProductState, index: Key | null | undefined) =>(
          <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            key={product.id}
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
              <h3 style={{ fontFamily: "cursive" }} className={style.blink_text}>
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
        </ul>
        ))}
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