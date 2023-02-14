import { logDOM } from "@testing-library/react";
import classes from "./Specifications.module.css";

export default function Specifications({ data }) {
  return (
    <ul className={classes.container}>
      <table className={classes.table}>
        <tbody>
          {Object.keys(data.specifications).map((key, idx) => {
            return (
              <tr key={idx}>
                <td className={classes.table__title}>{key}</td>
                <td>{data.specifications[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ul>
  );
}
