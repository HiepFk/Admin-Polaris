import {
  Form,
  FormLayout,
  TextField,
  Button,
  DropZone,
  LegacyStack,
  Thumbnail,
  Text,
  ButtonGroup,
  InlineError,
} from "@shopify/polaris";
import { NoteIcon } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

function ModalProduct({ onClose, handleAddProduct }) {
  const [data, setData] = useState({
    title: "",
    price: "",
    desc: "",
    file: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    price: "",
    desc: "",
    file: "",
  });

  const handleInputChange = useCallback(
    (field) => (value) => {
      setData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    },
    []
  );

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setData((prevData) => ({
        ...prevData,
        file: acceptedFiles[0],
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: "",
      }));
    },
    []
  );

  const handleError = () => {
    const newErrors = {};
    const { title, price, desc, file } = data;

    if (title.trim() === "") {
      newErrors.title = "Title is required";
    }
    if (price.trim() === "") {
      newErrors.price = "Price is required";
    }
    if (desc.trim() === "") {
      newErrors.desc = "Description is required";
    }

    if (!file) {
      newErrors.file = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!handleError()) return;

    handleAddProduct(data);

    setData({ title: "", price: "", desc: "", address: "", file: "" });
    onClose();
  };

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !data.file && (
    <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
  );

  const uploadedFiles = data.file && (
    <LegacyStack vertical>
      <LegacyStack alignment="center">
        <Thumbnail
          size="small"
          alt={data.file.name}
          source={
            validImageTypes.includes(data.file.type)
              ? window.URL.createObjectURL(data.file)
              : NoteIcon
          }
        />
        <div>
          {data.file.name}
          <Text variant="bodySm" as="p">
            {data.file.size} bytes
          </Text>
        </div>
      </LegacyStack>
    </LegacyStack>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={data.title}
          onChange={handleInputChange("title")}
          label="Title"
          autoComplete="off"
          error={errors.title}
        />
        <TextField
          value={data.price}
          onChange={handleInputChange("price")}
          label="Price"
          autoComplete="off"
          error={errors.price}
        />

        <span className="label">Image</span>

        <div className={errors.file ? "error_drag" : ""}>
          <DropZone onDrop={handleDropZoneDrop} variableHeight>
            {uploadedFiles}
            {fileUpload}
          </DropZone>
        </div>

        {errors.file && (
          <InlineError message={errors.file} fieldID="myFieldID" />
        )}

        <TextField
          value={data.desc}
          onChange={handleInputChange("desc")}
          label="Description"
          autoComplete="off"
          error={errors.desc}
        />

        <ButtonGroup>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="primary">
            Save
          </Button>
        </ButtonGroup>
      </FormLayout>
    </Form>
  );
}

export default ModalProduct;
