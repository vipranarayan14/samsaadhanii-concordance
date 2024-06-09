import Table from "react-bootstrap/Table";

import styles from "./styles.module.scss";

type Props = {
  padi: string;
  forms: Record<string, string>;
};

export function PadiTable({ padi, forms }: Props) {
  return (
    <Table
      responsive="md"
      striped
      className={`${styles.formsTable} align-middle text-center w-100`}
      style={{ minWidth: 400 }}
    >
      <thead>
        <tr>
          <th scope="col" style={{ width: "16%" }}>
            <span className="badge bg-secondary text-dark fs-6">
              <span className="d-inline d-md-none">{padi}</span>
              <span className="d-none d-md-inline">{`${padi}पदी`}</span>
            </span>
          </th>
          <th scope="col" style={{ width: "28%" }}>
            <span className="d-inline d-md-none">एक</span>
            <span className="d-none d-md-inline">एकवचनम्</span>
          </th>
          <th scope="col" style={{ width: "28%" }}>
            <span className="d-inline d-md-none">द्वि</span>
            <span className="d-none d-md-inline">द्विवचनम्</span>
          </th>
          <th scope="col" style={{ width: "28%" }}>
            <span className="d-inline d-md-none">बहु</span>
            <span className="d-none d-md-inline">बहुवचनम्</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" className="border-end">
            <span className="d-inline d-md-none">प्रथम</span>
            <span className="d-none d-md-inline">प्रथमपुरुषः</span>
          </th>
          <td>{forms.pe}</td>
          <td>{forms.pd}</td>
          <td>{forms.pb}</td>
        </tr>
        <tr>
          <th scope="row" className="border-end">
            <span className="d-inline d-md-none">मध्यम</span>
            <span className="d-none d-md-inline">मध्यमपुरुषः</span>
          </th>
          <td>{forms.me}</td>
          <td>{forms.md}</td>
          <td>{forms.mb}</td>
        </tr>
        <tr>
          <th scope="row" className="border-end">
            <span className="d-inline d-md-none">उत्तम</span>
            <span className="d-none d-md-inline">उत्तमपुरुषः</span>
          </th>
          <td>{forms.ue}</td>
          <td>{forms.ud}</td>
          <td>{forms.ub}</td>
        </tr>
      </tbody>
    </Table>
  );
}
