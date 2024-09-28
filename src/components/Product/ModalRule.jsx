import React, { useState, useEffect, useCallback } from "react";
import {
  FormLayout,
  TextField,
  Button,
  ButtonGroup,
  Icon,
} from "@shopify/polaris";
import { DeleteIcon, PlusIcon } from "@shopify/polaris-icons";

function ModalRule({
  id,
  onClose,
  products,
  filterProducts,
  setProducts,
  setFilterProducts,
}) {
  const [data, setData] = useState({
    id,
    title: "",
    start: "",
    end: "",
    arrayRule: [],
  });

  const [ruleItems, setRuleItems] = useState([]);

  const handleInputChange = useCallback(
    (field) => (value) => {
      setData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    },
    []
  );

  const handleSetRule = () => {
    const arrayRuleItem = JSON.parse(localStorage.getItem("updatedRuleItems"));

    setRuleItems(arrayRuleItem ?? []);

    if (arrayRuleItem && arrayRuleItem.length) {
      const rule = arrayRuleItem.find((item) => item.id === id);

      if (rule)
        setData({
          ...rule,
          arrayRule: Array.isArray(rule.arrayRule) ? rule.arrayRule : [],
        });

      if (rule.arrayRule.length) {
        handleSetProduct(rule.arrayRule.length);
      }
    }
  };

  const handleAddRule = () => {
    const newRule = {
      buyFrom: "",
      buyTo: "",
      discount: "",
    };

    setData({ ...data, arrayRule: [...data.arrayRule, newRule] });
  };

  const handleRemoveRule = (index) => {
    const updatedArrayRule = data.arrayRule.filter((_, i) => i !== index);
    setData((prevData) => ({
      ...prevData,
      arrayRule: updatedArrayRule,
    }));
  };

  const handleValueRule = (index, key, value) => {
    const updatedArrayRule = data.arrayRule.map((rule, i) => {
      if (i === index) {
        return { ...rule, [key]: value };
      }
      return rule;
    });

    setData((prevData) => ({
      ...prevData,
      arrayRule: updatedArrayRule,
    }));
  };

  const handleSetProduct = (lengthRule) => {
    const updatedProducts = products.map((item) => {
      if (item.id === id) {
        return { ...item, rule: lengthRule };
      }
      return item;
    });

    setProducts([...updatedProducts]);
    const updatedFilterProducts = filterProducts.map((item) => {
      if (item.id === id) {
        return { ...item, rule: lengthRule };
      }
      return item;
    });

    setFilterProducts([...updatedFilterProducts]);
  };

  const handeleSaveRule = () => {
    const updatedRuleItems = ruleItems.map((item) =>
      item.id === data.id ? data : item
    );

    if (data.arrayRule.length) {
      handleSetProduct(data.arrayRule.length);
    }

    if (!ruleItems.some((item) => item.id === data.id)) {
      updatedRuleItems.push(data);
    }

    setRuleItems(updatedRuleItems);

    localStorage.setItem("updatedRuleItems", JSON.stringify(updatedRuleItems));

    onClose();
  };

  useEffect(() => {
    handleSetRule();
  }, [id]);

  return (
    <FormLayout>
      <FormLayout.Group condensed>
        <TextField
          label="Title campaign"
          value={data.title}
          onChange={handleInputChange("title")}
          autoComplete="off"
        />
        <TextField
          label="Start date"
          value={data.start}
          onChange={handleInputChange("start")}
          autoComplete="off"
          type="Date"
          max={data.end}
        />
        <TextField
          label="End date"
          value={data.end}
          onChange={handleInputChange("end")}
          autoComplete="off"
          type="Date"
          min={data.start}
        />
        <Icon tone="base" />
      </FormLayout.Group>

      {[...data.arrayRule]?.map((item, index) => {
        return (
          <FormLayout.Group condensed key={item}>
            <TextField
              label="Buy from"
              value={item.buyFrom}
              onChange={(value) => handleValueRule(index, "buyFrom", value)}
              autoComplete="off"
              type="Date"
              max={item.buyTo}
            />
            <TextField
              label="Buy to"
              value={item.buyTo}
              onChange={(value) => handleValueRule(index, "buyTo", value)}
              autoComplete="off"
              type="Date"
              min={item.buyFrom}
            />
            <TextField
              label="Discount per item(%)"
              value={item.discount}
              onChange={(value) => handleValueRule(index, "discount", value)}
              autoComplete="off"
            />
            <div onClick={() => handleRemoveRule(index)}>
              <Icon
                source={DeleteIcon}
                tone="base"
                onClick={() => handleRemoveRule(index)}
              />
            </div>
          </FormLayout.Group>
        );
      })}

      <Button variant="primary" icon={PlusIcon} onClick={handleAddRule}>
        Add
      </Button>

      <ButtonGroup>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handeleSaveRule} variant="primary">
          Save
        </Button>
      </ButtonGroup>
    </FormLayout>
  );
}

export default ModalRule;
