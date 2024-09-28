import {
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Badge,
  useBreakpoints,
  Button,
  Tooltip,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { handleGetImage, formatDateTime } from "../../utils/utils";
import Modal from "../Modal";
import ModalRule from "./ModalRule";

function ProductTable({
  data,
  handleSeach,
  handleFilterRule,
  products,
  filterProducts,
  setProducts,
  setFilterProducts,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [idProductEdit, setIdProductEdit] = useState(null);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const [itemStrings, setItemStrings] = useState(["All", "Rules", "No Rule"]);

  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: (e) => {
      console.log(item);
      handleFilterRule(item);
    },
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions: [],
  }));
  const [selected, setSelected] = useState(0);

  const { mode, setMode } = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const [queryValue, setQueryValue] = useState("");

  const handleFiltersQueryChange = (value) => {
    setQueryValue(value);
    handleSeach(value);
  };
  // const handleFiltersQueryChange = useCallback((value) => {
  //   setQueryValue(value);
  //   handleSeach(value);
  // }, []);

  const handleFiltersClearAll = useCallback(() => {
    handleFiltersQueryChange("");
  }, []);

  const resourceName = {
    singular: "data",
    plural: "data",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);

  const rowMarkup = data.map(({ id, title, rule, lastUpdate, file }, index) => (
    <IndexTable.Row
      id={id}
      key={id}
      selected={selectedResources.includes(id)}
      position={index}
    >
      <IndexTable.Cell>
        <div className="d-flex gap-1 items-center">
          <img
            src={file ? URL.createObjectURL(file) : handleGetImage(index)}
            alt=""
            width="48px"
            height="48px"
          />
          <Tooltip content={id + ".  " + title}>
            <span className="product_name">{id + ".  " + title}</span>
          </Tooltip>
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>{rule ?? 0}</IndexTable.Cell>
      <IndexTable.Cell>
        {lastUpdate ? formatDateTime(lastUpdate) : formatDateTime()}
      </IndexTable.Cell>
      <IndexTable.Cell>
        {rule ? <Badge tone="success">Active</Badge> : <Badge>No rule</Badge>}
      </IndexTable.Cell>

      <IndexTable.Cell>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            setIdProductEdit(id);
            handleModal();
          }}
          icon={PlusIcon}
        >
          Add Rule
        </Button>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <>
      <LegacyCard>
        <IndexFilters
          queryValue={queryValue}
          queryPlaceholder="Searching in all"
          onQueryChange={(e) => handleFiltersQueryChange(e)}
          onQueryClear={() => handleFiltersQueryChange("")}
          cancelAction={{
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          }}
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
          filters={[]}
          appliedFilters={[]}
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        />

        <IndexTable
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={data.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Product" },
            { title: "Rule(s)" },
            { title: "Last update" },
            { title: "Status" },
            { title: "" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
      <Modal isOpen={isOpen} onClose={handleModal} title="Add rule">
        <ModalRule
          id={idProductEdit}
          onClose={handleModal}
          products={products}
          filterProducts={filterProducts}
          setProducts={setProducts}
          setFilterProducts={setFilterProducts}
        />
      </Modal>
    </>
  );
}

export default ProductTable;
