import classes from "./CategoryTitle.module.css";

const CategoryTitle = ({ children }) => {
  return (
    <div className={classes.title}>
      <p>{children}</p>
    </div>
  );
};

export default CategoryTitle;
