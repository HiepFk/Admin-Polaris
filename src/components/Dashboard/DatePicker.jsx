import { useState, useCallback, useEffect } from "react";
import { Button, DatePicker } from "@shopify/polaris";
import { CalendarIcon } from "@shopify/polaris-icons";
import Modal from "../Modal";

function DateRange() {
  const [isOpen, setIsOpen] = useState(false);

  const [{ month, year }, setDate] = useState({ month: 8, year: 2024 });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (selectedDates.end !== selectedDates.start) setIsOpen(false);
  }, [selectedDates]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Button icon={CalendarIcon} onClick={() => handleModal()}>
        Filter Date
      </Button>
      <Modal isOpen={isOpen} onClose={handleModal}>
        <DatePicker
          month={month}
          year={year}
          onChange={setSelectedDates}
          onMonthChange={handleMonthChange}
          selected={selectedDates}
          multiMonth
          allowRange
        />
      </Modal>
    </div>
  );
}

export default DateRange;
