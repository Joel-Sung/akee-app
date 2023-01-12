import LaunchIcon from '@mui/icons-material/Launch';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link';
import { withBackground, withoutBackground } from "../../utils/tailwindcss";

interface LinkProps {
  href: string;
}

interface MyLinkProps extends LinkProps {
  isClicked?: boolean;
  children?: React.ReactNode;
}
export function MyLink(props: MyLinkProps) {
  const {
    href,
    isClicked = false,
    children
  } = props;

  return (
    <Link
      href={href}
      className={isClicked ? withBackground : withoutBackground}
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
