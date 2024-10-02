import { useState } from 'react';
import { updateQuotaApi, QuotaApiParams } from '../api';

export const useQuotaApi = () => {
  const [loading, setLoading] = useState(false);

  const updateQuota = async (params: QuotaApiParams): Promise<boolean> => {
    setLoading(true);

    try {
      await updateQuotaApi(params);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateQuota };
};
