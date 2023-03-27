import { ProductType } from "../context/ProductsProvider";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";
import { memo, ReactElement } from "react";

type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart}: PropsType): ReactElement => {

  const img: string = new URL(`../images/${product.sku}.png`, import.meta.url).href;

  const onAddToCart = () => {
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, quantity: 1 }});
  }

  const itemInCart = inCart ? ' → Item in Cart: ✔️' : null;

  const content = (
    <article className="product">
        <h3>{product.name}</h3>
        <div style={{backgroundColor: 'transparent', height: 200, width: 200}}>
          <img src={img} alt={product.name} className="product__img"/>
        </div>
        <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'vnd' }).format(product.price)}{itemInCart}</p>
        <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  )

  return content;
}

function areProductsEqual({ product: prevProduct, inCart: prevInCart}: PropsType, { product: nextProduct, inCart: nextInCart}: PropsType) {
  return (
    Object.keys(prevProduct).every(key => {
      return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
    }) && prevInCart === nextInCart
  )
}

const MemorizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemorizedProduct;