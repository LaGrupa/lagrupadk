'use client';

import NextLink, {LinkProps} from 'next/link';
import {useT} from './i18n';

type Props = LinkProps & {
  locale?: string;
  href: string;
  children?: React.ReactNode;
};

export function I18nLink(props: Props) {
  const {locale} = useT();
  const targetLocale = props.locale ?? locale;
  const href =
    targetLocale === 'es'
      ? props.href
      : `/da${props.href === '/' ? '' : props.href}`;

  return <NextLink {...props} href={href} />;
}
