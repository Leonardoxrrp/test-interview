export interface QuotaApiParams {
    flightCount: number;
    reason: string;
    actionType: string;
  }
  
  export const updateQuotaApi = async (params: QuotaApiParams): Promise<void> => {
    const response = await fetch('https://httpstat.us/200', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    await response.text();
  };
  