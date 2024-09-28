import { Button, Icon, InlineStack } from "@shopify/polaris";
import { ChevronRightIcon, ChevronLeftIcon } from "@shopify/polaris-icons";
import React from "react";

function Pagination({ handlePagination, currentPage, total, itemsPerPage }) {
  return (
    <div className="pagination">
      <InlineStack distribution="center">
        <Button onClick={() => handlePagination("first")}>Frist</Button>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePagination("previous")}
        >
          <Icon source={ChevronLeftIcon} tone="base" />
        </Button>
        <Button
          disabled={currentPage >= Math.ceil(total / itemsPerPage)}
          onClick={() => handlePagination("next")}
        >
          <Icon source={ChevronRightIcon} tone="base" />
        </Button>
        <Button onClick={() => handlePagination("last")}>Last</Button>
      </InlineStack>
    </div>
  );
}

export default Pagination;
