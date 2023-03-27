import { ProductType } from "../context/ProductsProvider";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";
import { ReactElement } from "react";

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
        <img src={img} alt={product.name} className="product__img" />
        <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'vnd' }).format(product.price)}{itemInCart}</p>
        <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  )

  return content;
}

export default Product