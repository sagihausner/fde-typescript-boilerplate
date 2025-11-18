export function generateOrderSummary(order: any): string {
    const orderDate = order.orderDate ?? "N/A";
    const status = order.state ?? "N/A";

    // Items
    const mapItem = order.mapItems?.SQUARE_8X8;
    const itemsSize = mapItem?.sizes ?? "N/A";

    // Price
    const totalAmount = order.totalCost ?? 0;
    const currency = order.currency ?? "EUR";

    // Discount
    const discount = order.discount?.applied
        ? `Discount: ${order.discount.promoCode} (${order.discount.description})`
        : "No discount";

    // Shipping
    const shippingAddressObj = order.shipping?.shippingAddress ?? {};
    const shipping = order.shipping
        ? `Shipping:
        Address: ${shippingAddressObj.addressStreet ?? ""} ${shippingAddressObj.addressStreet2 ?? ""}, ${shippingAddressObj.addressCity ?? ""}, ${shippingAddressObj.addressState ?? ""}, ${shippingAddressObj.addressZip ?? ""}, ${shippingAddressObj.addressCountry ?? ""}
        Shipped Date: ${order.shipping?.shippedDate ?? "N/A"}
        Arrival Date: ${order.shipping?.arrivalDate ?? "N/A"}
        Promised Arrival Date: ${order.shipping?.promisedArrivalDate ?? "N/A"}`
        : "No shipping info";

    // Tracking
    const statusUpdates = order.tracker?.statusUpdates ?? [];
    const latestUpdate = statusUpdates[statusUpdates.length - 1] ?? {};
    const tracking = order.tracker
        ? `Tracking:
        Carrier: ${order.tracker.carrier}
        Tracking Number: ${order.tracker.trackingNumber}
        URL: ${order.tracker.trackingUrl}
        Latest Status: ${latestUpdate.description ?? "N/A"}
        Latest Status At: ${latestUpdate.datetime ?? "N/A"}`
        : "No tracking info";

    return `Order Summary:
    Id: ${order.id}
    Order Date: ${orderDate}
    Status: ${status}

    Frames:
        Size: ${itemsSize}
        Price: ${totalAmount} ${currency}
        ${discount}

    ${shipping}

    ${tracking}`;
}