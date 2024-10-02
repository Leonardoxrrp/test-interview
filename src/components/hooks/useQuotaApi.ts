// src/hooks/useQuotaApi.ts

import { useState } from 'react';
import { updateQuotaApi, QuotaApiParams } from '../api';
import { ERROR_MESSAGES } from '../api/apiConstants';

export const useQuotaApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateQuota = async (params: QuotaApiParams): Promise<boolean> => {
    setLoading(true);
    setError('');

    try {
      const response = await updateQuotaApi(params);

      if (response.success) {
        return true;
      } else {
        setError(response.message || ERROR_MESSAGES.DEFAULT);
        return false;
      }
    } catch (err) {
      setError(ERROR_MESSAGES.DEFAULT);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateQuota };
};
