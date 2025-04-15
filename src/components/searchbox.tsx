'use client';

import React, { ChangeEvent, useState } from 'react';
import { TextField, InputAdornment, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearchClick?: () => void;
  placeholder?: string;
  className?: string;
  buttonLabel?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  value: propValue,
  onChange,
  onSearchClick,
  placeholder = 'Contract Address',
  className,
  buttonLabel = 'Read Contract',
}) => {
  const [internalValue, setInternalValue] = useState(propValue || '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const value = propValue !== undefined ? propValue : internalValue;

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <TextField
        variant="outlined"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          width: 400,
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: 'divider',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: '1px',
            },
          },
          ...(className ? {} : {}),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSearchClick}
        sx={{
          height: '56px', // Match TextField height
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default React.memo(SearchBox);