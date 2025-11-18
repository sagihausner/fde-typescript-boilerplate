import { API } from "./api";
import { generateOrderSummary } from "./orderSummary";

export async function getOrderSummary(orderId: string): Promise<string> {
  const response = await API.get(`/orders/${orderId}`);
  const rawOrder = response.data;

  return generateOrderSummary(rawOrder);
}