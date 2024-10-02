import {
  BASE_URL,
  ERROR_MESSAGES,
  HTTP_METHODS,
  HEADERS,
  NETWORK_ERROR,
  HTTP_ERROR,
} from './apiConstants';

export interface QuotaApiParams {
  flightCount: number;
  reason: string;
  actionType: string;
}

export interface QuotaApiResponse {
  success: boolean;
  message?: string;
}

export const updateQuotaApi = async (
  params: QuotaApiParams
): Promise<QuotaApiResponse> => {
  try {
    const endpoint = `${BASE_URL}/200`;

    const response = await fetch(endpoint, {
      method: HTTP_METHODS.POST,
      headers: {
        [HEADERS.CONTENT_TYPE]: HEADERS.APPLICATION_JSON,
      },
      body: JSON.stringify(params),
    });

    if (response.ok) {
      await response.text();
      return { success: true };
    } else {
      // Handle HTTP error responses
      const message = ERROR_MESSAGES[response.status] || ERROR_MESSAGES.DEFAULT;
      console.error(`${HTTP_ERROR}: ${response.status}`);
      return { success: false, message };
    }
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: NETWORK_ERROR,
    };
  }
};
