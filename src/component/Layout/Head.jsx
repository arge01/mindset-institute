/* eslint-disable @next/next/no-page-custom-font */
import React from 'react';

import { default as NextHead } from 'next/head';

function Head({ title }) {
  return (
    <NextHead>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1.0"
      />
      <title>{`${process.env.NEXT_PUBLIC_APP_NAME} | ${
        title ? title : 'Home'
      }`}</title>
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
}

export default Head;
