type Props = {
  title: string;
};

export function AccordionTitle({ title }: Props) {
  return <span className="fs-5">{title}</span>;
}
