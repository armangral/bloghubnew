/* eslint-disable @typescript-eslint/no-explicit-any */
export const extractApiErrorMessage = (error: any): string => {
  return (
    error?.response?.data?.message || error?.message || "Something went wrong"
  );
};
