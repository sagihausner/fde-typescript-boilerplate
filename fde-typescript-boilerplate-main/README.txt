Files:
    api.ts – Defines the API client with baseURL and headers
    getOrder.ts – Fetches the raw order data from the API
    orderSummary.ts – Transformer that converts raw order data into a summary string with relevant fields
    returnLabel.ts – Creates a return label and polls for it with wait and retry logic until ready
    main.ts – Executes the program, returning the order summary and return label info while handling exceptions

Wait and retry mechanism:
    Since return labels may take time to generate, the system waits and retries until the label is ready

Summary fields:
    The chosen fields capture essential order information for the LLM to use: general details (ID, status, date), 
    item details (size, price, discount), shipping details, and tracking details. This ensures the LLM can answer 
    the most important questions regarding customer needs
