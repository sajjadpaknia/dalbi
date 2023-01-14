import classes from "./Breadcrumbs.module.css";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

export default function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();
  return (
    <div className={classes.container}>
      {breadcrumbs.map(({ breadcrumb, match }) => (
        <div className={classes.item} key={match.pathname}>
          <Link to={match.pathname}>{breadcrumb.props.children}</Link>
        </div>
      ))}
    </div>
  );
}
