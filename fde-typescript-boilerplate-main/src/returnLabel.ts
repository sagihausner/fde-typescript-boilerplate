import { API } from "./api";

export async function createReturnLabel(orderId: string): Promise<{ id: string; status: string; labelUrl: string }> {
    try {
        // Initiate return label creation
        const response = await API.post(`/api/v1/notch/orders/${orderId}/return-label`);
        const returnLabelId = (response.data as { returnLabel: { id: string } }).returnLabel.id;

        // Poll for label readiness
        const maxRetries = 20;
        const delayMs = 2000;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            const statusResponse = await API.get(`/api/v1/notch/orders/return-label?id=${returnLabelId}`);
            const { status, returnLabelUrl } = statusResponse.data as { status: string; returnLabelUrl: string };

            if (status === "failed") {
                throw new Error(`Return label creation failed on the server.`);
            }

            if (returnLabelUrl) {
                return { id: returnLabelId, status: status, labelUrl: returnLabelUrl };
            }

            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }

        throw new Error(`Return label not ready after ${maxRetries} attempts`);
    } catch (error: any) {
        console.error("Failed to create return label:", error.message ?? error);
        throw error;
    }
}
