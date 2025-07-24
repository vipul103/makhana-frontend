import ShopMainArea from "@components/shop/shop-main-area";

export const metadata = {
  title: "Shop - Harri Shop",
};

export default async function ShopPage({searchParams}) {
  const { Category, category, brand, priceMin, max, priceMax, color } = await searchParams;
  return (
    <ShopMainArea
      Category={Category}
      category={category}
      brand={brand}
      priceMin={priceMin}
      max={max}
      priceMax={priceMax}
      color={color}
    />
  );
}
