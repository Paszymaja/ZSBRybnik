import React, { ComponentType } from "react";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback: ComponentType<FallbackProps> = ({
  error,
  componentStack,
  resetErrorBoundary,
}) => {
  return <></>;
};

export default ErrorFallback;
