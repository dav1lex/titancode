"use client";

import { useMemo } from 'react';

type ClientNumberProps = {
  value: number;
  currency?: string;
  options?: Intl.NumberFormatOptions;
};

export function ClientNumber({ value, currency, options = {} }: ClientNumberProps) {
  const formattedValue = useMemo(() => {
    const formatOptions: Intl.NumberFormatOptions = {
      ...options,
    };

    if (currency) {
      formatOptions.style = 'currency';
      formatOptions.currency = currency;
    }

    // 'pl-PL' is used for dot separators, 'en-US' for comma.
    // TODO: Make this dynamic based on language context if needed.
    return new Intl.NumberFormat('pl-PL', formatOptions).format(value);
  }, [currency, options, value]);

  return <span suppressHydrationWarning>{formattedValue}</span>;
}