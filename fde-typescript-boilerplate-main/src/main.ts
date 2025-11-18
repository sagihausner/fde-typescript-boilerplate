import { API } from "./api";
import { generateOrderSummary } from "./orderSummary";
import { createReturnLabel } from "./returnLabel";

async function main() {
    const orderId = "B931E0C3";
    try {
        // Fetch order
        const response = await API.get(`/order/${orderId}`);
        const rawOrder = response.data;

        // Generate and print summary
        const summary = generateOrderSummary(rawOrder);
        console.log(summary);

        // Create return label
        console.log("\n=== Creating Return Label ===");
        const returnLabel = await createReturnLabel(orderId);

        console.log("\nReturn Label:");
        console.log(`   Id: ${returnLabel.id}`);
        console.log(`   Status: ${returnLabel.status}`);
        console.log(`   Label URL: ${returnLabel.labelUrl}`);
        
    } catch (err: any) {
        if (err.response?.status === 404) {
            console.error("Order not found!");
        } else {
            console.error("Failed:", err.message);
        }
    }
}

main();
