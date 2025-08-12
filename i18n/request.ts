// i18n/request.ts (root-level)
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  return {
    // Load locale messages from src/messages/{locale}.json
    messages: (await import(`../src/messages/${locale}.json`)).default
  };
});
