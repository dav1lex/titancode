"use client";

import { useState, useEffect } from 'react';

type ClientNumberProps = {
  value: number;
  currency?: string;
  options?: Intl.NumberFormatOptions;
};

export function ClientNumber({ value, currency, options = {} }: ClientNumberProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a placeholder or the raw number on the server and initial client render
    return <span>{value.toString()}</span>;
  }

  const formatOptions: Intl.NumberFormatOptions = {
    ...options,
  };

  if (currency) {
    formatOptions.style = 'currency';
    formatOptions.currency = currency;
  }

  // 'pl-PL' is used for dot separators, 'en-US' for comma.
  // We can make this dynamic based on language context if needed.
  const formattedValue = new Intl.NumberFormat('pl-PL', formatOptions).format(value);

  return <span>{formattedValue}</span>;
}