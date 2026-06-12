import { FORM_LABELS, PAGE_LABELS } from "@/constants/labels";
import { UI_CONFIG } from "@/constants/ui";
import { debounce } from "@/utils/helpers";
import { TextField } from "@mui/material";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import contactContext from "../Context/contactContext";

const ContactFilter = () => {
  const { filterContacts, clearFilter, filtered } = useContext(contactContext);
  const [search, setSearch] = useState("");

  const filterContactsRef = useRef(filterContacts);
  const clearFilterRef = useRef(clearFilter);

  useEffect(() => {
    filterContactsRef.current = filterContacts;
    clearFilterRef.current = clearFilter;
  }, [filterContacts, clearFilter]);

  const debouncedFilter = useMemo(
    () =>
      debounce((value) => {
        if (value === "") {
          clearFilterRef.current();
        } else {
          filterContactsRef.current(value);
        }
      }, UI_CONFIG.DEBOUNCE_DELAY),
    [],
  );

  useEffect(() => {
    if (filtered === null) {
      setSearch("");
    }
  }, [filtered]);

  const onChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    debouncedFilter(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{PAGE_LABELS.SEARCH_CONTACTS}</h3>
      <TextField
        label={FORM_LABELS.SEARCH_CONTACT}
        type="search"
        variant="outlined"
        fullWidth
        value={search}
        onChange={onChange}
        className="transition-all duration-300"
        inputProps={{ "aria-label": PAGE_LABELS.SEARCH_CONTACTS }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: UI_CONFIG.COLORS.PRIMARY_FOCUS,
            },
            "&.Mui-focused fieldset": {
              borderColor: UI_CONFIG.COLORS.PRIMARY_FOCUS,
            },
          },
        }}
      />
    </div>
  );
};

export default ContactFilter;
