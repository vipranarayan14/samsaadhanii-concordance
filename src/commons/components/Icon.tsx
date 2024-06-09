type Props = {
  children: React.ReactNode;
};

export function Icon({ children }: Props) {
  return <span className="_icon">{children}</span>;
}
