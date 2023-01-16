import LaunchIcon from '@mui/icons-material/Launch';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link';
import { ReactNode } from 'react';
import { textHighlight, textNoHighlight, withBackground, withoutBackground } from "../../utils/tailwindcss";

interface LinkProps {
  href: string;
}

interface BackgroundLinkProps extends LinkProps {
  isClicked?: boolean;
  children?: ReactNode;
}
export function BackgroundLink(props: BackgroundLinkProps) {
  const {
    href,
    isClicked = false,
    children
  } = props;

  return (
    <Link
      href={href}
      className={isClicked 
        ? withBackground 
        : withoutBackground
      }
    >
      {children}
    </Link>
  )
}

interface TextLinkProps extends LinkProps {
  isClicked?: boolean;
  children?: ReactNode;
}
export function TextLink(props: TextLinkProps) {
  const {
    href,
    isClicked = false,
    children
  } = props;

  return (
    <Link
      href={href}
      className={isClicked 
        ? textHighlight
        : textNoHighlight
      }
    >
      {children}
    </Link>
  )
}

export function TwitterLink(props: LinkProps) {
  const {
    href,
  } = props;

  return (
    <Link
      href={href}
    >
      <TwitterIcon />
    </Link>
  )
}

export function WebLink(props: LinkProps) {
  const {
    href,
  } = props;

  return (
    <Link
      href={href}
    >
      <LaunchIcon />
    </Link>
  )
}

export function DiscordLink(props: LinkProps) {
  const {
    href,
  } = props;

  return (
    <Link
      href={href}
    >
      Disc
    </Link>
  );
}
