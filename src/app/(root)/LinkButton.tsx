import Button from "react-bootstrap/Button";

export const LinkButton: typeof Button = ({ ...props }) => {
  return (
    <Button
      variant="link"
      size="sm"
      className="text-nowrap"
      style={{ textDecorationLine: "none" }}
      {...props}
    />
  );
};
