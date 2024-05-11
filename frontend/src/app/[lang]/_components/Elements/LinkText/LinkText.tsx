import Link, { LinkProps } from 'next/link'
type ILinkText<T> = React.AnchorHTMLAttributes<HTMLAnchorElement> & React.PropsWithChildren<T>

export const LinkText = ({ href, children, ...restProps }: ILinkText<LinkProps>) => {
  return (
    <Link href={href || ''} {...restProps}>
      {children}
    </Link>
  )
}
