/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useJwt } from "react-jwt";
import { loadStateFn } from "../utils/localStorage";

export const useAuthenticator = () => {
  const token = loadStateFn();
  const { decodedToken, isExpired } = useJwt(token);

  return useMemo(
    () => ({
      decodedToken,
      isExpired,
    }),
    [decodedToken],
  );
};
