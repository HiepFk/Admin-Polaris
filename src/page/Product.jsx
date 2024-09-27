import React from "react";
import { Page } from "@shopify/polaris";
import ProductTable from "../components/Product/ProductTable";

function Product() {
  return (
    <>
      <Page title="Product">
        <ProductTable />
      </Page>
    </>
  );
}

export default Product;
