type CartItem = {
  product_id: string;
  quantity: number;
};

export const CartList = () => {
  const carts: CartItem[] = []

  return (
    <div>
      <ul>
        {carts.map((item: CartItem) => (
          <li key={item.product_id}>
            Product ID: {item.product_id}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};
