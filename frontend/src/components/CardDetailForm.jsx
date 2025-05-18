import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  MenuItem,
  InputAdornment,
  Box,
  Typography,
  Paper,
} from '@mui/material';


const CreditCardForm = ({onSubmit}) => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const months = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1;
    return {
      value: monthNum.toString().padStart(2, '0'),
      label: monthNum.toString().padStart(2, '0'),
    };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => {
    const yearNum = currentYear + i;
    return {
      value: yearNum.toString(),
      label: yearNum.toString(),
    };
  });

  const handleSubmitForm = (event) => {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className='w-full max-w-md' onSubmit={handleSubmitForm}>
      <CardHeader title='Credit Card Details' className='text-center' />
      <CardContent className='space-y-6'>
        {/* Payment Method */}
        <Paper variant='outlined' className='p-3'>
          <Typography variant='body2' className='mb-2 text-sm font-medium'>
            Payment Method
          </Typography>
          <Box className='flex items-center justify-center gap-4'>
            <img
              src='/images/mastercard-logo.svg'
              alt='Mastercard'
              className='h-5'
            />
            <img src='/images/visa-logo.svg' alt='Visa' className='h-5' />
            <img
              src='/images/amex-logo.svg'
              alt='American Express'
              className='h-5'
            />
            <img
              src='/images/discover-logo.svg'
              alt='Discover'
              className='h-5'
            />
          </Box>
        </Paper>

        {/* Name on card */}
        <Box className='space-y-2'>
          <Typography variant='body2' className='text-sm font-medium'>
            Name on card
          </Typography>
          <TextField
            fullWidth
            placeholder='Your Name'
            variant='outlined'
            size='small'
          />
        </Box>

        {/* Card number */}
        <Box className='space-y-2'>
          <Typography variant='body2' className='text-sm font-medium'>
            Card number
          </Typography>
          <TextField
            fullWidth
            placeholder='0000 0000 0000 0000'
            variant='outlined'
            size='small'
          />
        </Box>

        {/* Card expiration */}
        <Box className='space-y-2'>
          <Typography variant='body2' className='text-sm font-medium'>
            Card expiration
          </Typography>
          <Box className='flex gap-2'>
            <TextField
              select
              fullWidth
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder='Month'
              variant='outlined'
              size='small'
            >
              <MenuItem disabled value=''>
                Month
              </MenuItem>
              {months.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder='Year'
              variant='outlined'
              size='small'
            >
              <MenuItem disabled value=''>
                Year
              </MenuItem>
              {years.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        {/* Card Security Code */}
        <Box className='space-y-2'>
          <Typography variant='body2' className='text-sm font-medium'>
            Card Security Code
          </Typography>
          <TextField
            fullWidth
            placeholder='Code'
            variant='outlined'
            size='small'
            InputProps={{
              endAdornment: <InputAdornment position='end'></InputAdornment>,
            }}
          />
        </Box>

        {/* Continue Button */}
        <button className='w-full py-2 text-white normal-case rounded bg-primary hover:bg-primary-700'>
          Continue
        </button>
      </CardContent>
    </form>
  );
}

export default CreditCardForm;
