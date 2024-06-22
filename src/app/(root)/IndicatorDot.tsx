export function IndicatorDot() {
  return (
    <span
      className="position-absolute start-0 translate-middle bg-danger rounded-circle _hidden"
      style={{ top: "10%", padding: "0.35rem" }}
    >
      <span className="visually-hidden">Some view options are modified</span>
    </span>
  );
}
