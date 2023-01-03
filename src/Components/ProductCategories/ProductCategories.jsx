import CategoryItem from "../../Common/CategoryItem/CategoryItem";
import CategoryTitle from "../../Common/CategoryTitle/CategoryTitle";
import classes from "./ProductCategories.module.css";

const ProductCategories = () => {
  return (
    <>
      <CategoryTitle>Shop our top categories</CategoryTitle>
      <div className={classes.container}>
        <CategoryItem
          clothes={"shoes2.png"}
          title={"A good walk requires the right shoes."}
        />
        <CategoryItem
          clothes={"clothes2.png"}
          title={"36,000 models of the best modern fashions."}
        />
        <CategoryItem
          clothes={"phone.png"}
          title={"Special offers and discounts on mobile phones."}
        />
        <CategoryItem
          clothes={"bag.png"}
          title={"The best sports bags for travel and outings."}
        />
        <CategoryItem
          clothes={"superMarket.png"}
          title={"Fresh vegetable will fulfill your life's needs."}
        />
        <CategoryItem
          clothes={"Stationery2.png"}
          title={"Office supplies and stationery with special discounts."}
        />
        <CategoryItem
          clothes={"book.png"}
          title={"The original New York Times bestseller."}
        />
        <CategoryItem
          clothes={"perfume.png"}
          title={"Special sale of men's and women's perfumes."}
        />
      </div>
    </>
  );
};

export default ProductCategories;
