import React, { useEffect, useState } from "react";
import { Button, Page } from "@shopify/polaris";
import ProductTable from "../components/Product/ProductTable";
import { getListProduct } from "../apis/product";
import Modal from "../components/Modal";
import ModalProduct from "../components/Product/ModalProduct";
import Pagination from "../components/Product/Pagination";
import useTitle from "../hook/useTitle";

function Product() {
  useTitle("Product");

  const [isOpen, setIsOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [keySearch, setKeySearch] = useState("");
  const [isHasRule, setIsHasRule] = useState("ALL");

  const [newProduct, setNewProduct] = useState(null);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleGetListProduct = async () => {
    try {
      const res = await getListProduct();
      setProducts(res);
      setFilterProducts(res.slice(0, 10));
      setLoading([]);
    } catch (error) {
      setLoading([]);
      setProducts([]);
    }
  };

  useEffect(() => {
    handleGetListProduct();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handlePagination = (type) => {
    switch (type) {
      case "first":
        setCurrentPage(1);
        break;
      case "last":
        setCurrentPage(Math.ceil(products.length / itemsPerPage));
        break;
      case "next":
        setCurrentPage(currentPage + 1);
        break;
      default:
        setCurrentPage(currentPage - 1);
    }
  };

  const handleSeach = (value) => {
    setKeySearch(value);
    setCurrentPage(1);
    let filterProduct = [...products].filter((item) =>
      item.title.toLowerCase().startsWith(value.toLowerCase())
    );

    filterProduct = filterProduct.filter((item) =>
      isHasRule === "All" ? item : isHasRule === true ? item.rule : !item.rule
    );

    handleSetProduct(filterProduct);
  };

  const handleFilterRule = (value) => {
    const rule = value === "All" ? "All" : value === "Rules" ? true : false;
    setIsHasRule(rule);
    setCurrentPage(1);

    let filterProduct = [...products].filter((item) =>
      rule === "All" ? item : rule === true ? item.rule : !item.rule
    );

    filterProduct = filterProduct.filter((item) =>
      keySearch
        ? item.title.toLowerCase().startsWith(value.toLowerCase())
        : item
    );

    handleSetProduct(filterProduct);
  };

  const handleSetProduct = (data = products) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    setFilterProducts(currentItems);
  };

  const handleAddProduct = (product) => {
    setNewProduct(product);
    setKeySearch("");
    setIsHasRule("all");
    products.unshift({ ...product, id: products.length + 1 });
    handleSetProduct();
  };

  useEffect(() => {
    handleSetProduct();
  }, [currentPage]);

  return (
    <Page
      title="Product"
      primaryAction={
        <Button variant="primary" onClick={() => handleModal()}>
          Add Product
        </Button>
      }
    >
      <ProductTable
        data={filterProducts}
        handleSeach={handleSeach}
        handleFilterRule={handleFilterRule}
        products={products}
        filterProducts={filterProducts}
        setProducts={setProducts}
        setFilterProducts={setFilterProducts}
      />
      <Modal isOpen={isOpen} onClose={handleModal} title="Add Product">
        <ModalProduct
          onClose={handleModal}
          handleAddProduct={handleAddProduct}
        />
      </Modal>
      <Pagination
        handlePagination={handlePagination}
        currentPage={currentPage}
        total={products.length}
        itemsPerPage={itemsPerPage}
      />
    </Page>
  );
}

export default Product;
