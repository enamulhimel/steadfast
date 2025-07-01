export interface CartItem {
  cartId: string;
  id: string;
  name: string;
  price: number;
  image: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  color?: string;
  size?: string;
}