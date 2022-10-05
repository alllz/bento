import axios from 'axios';
import produce, { Draft } from 'immer';
import { useCallback, useEffect, useRef } from 'react';

type RequestKey = string;
export const useMultipleRequests = <T extends any>(
  requests: (RequestKey | null)[],
) => {
  const responsesRef = useRef<
    Record<
      RequestKey,
      { data: T | null; error: Error | null; isLoading: boolean }
    >
  >({});

  const retrieveResponse = useCallback(async (requestKey: RequestKey) => {
    responsesRef.current = produce(responsesRef.current, (draft) => {
      draft[requestKey] = { ...draft[requestKey], isLoading: true };
    });

    try {
      const response = await axios.get<T>(requestKey);
      responsesRef.current = produce(responsesRef.current, (draft) => {
        draft[requestKey] = {
          data: response.data as Draft<T>,
          error: null,
          isLoading: false,
        };
      });
    } catch (error: any) {
      responsesRef.current = produce(responsesRef.current, (draft) => {
        draft[requestKey] = {
          ...draft[requestKey],
          error,
          isLoading: false,
        };
      });
    }
  }, []);

  useEffect(() => {
    requests.forEach((requestKey) => {
      if (requestKey && !responsesRef.current[requestKey]) {
        retrieveResponse(requestKey);
      }
    });
  }, [requests]);

  const refetch = useCallback(() => {
    requests.forEach((requestKey) => {
      if (requestKey) {
        retrieveResponse(requestKey);
      }
    });
  }, [requests]);

  return { responses: Object.values(responsesRef.current), refetch };
};
