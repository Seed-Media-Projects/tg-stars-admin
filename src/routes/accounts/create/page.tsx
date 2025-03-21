import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { createAccountAcction } from './action';
const CreateAccount = () => {
  const navigation = useNavigation();
  const [showPass, setShowPass] = useState(false);
  const isLoading = navigation.formData?.get('username') != null;
  const actionData = useActionData() as { error: string } | undefined;

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '80vw',
        margin: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Create account for manager
      </Typography>

      <Form method="post">
        <TextField margin="normal" required fullWidth label="Username" name="username" autoFocus />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          name="password"
          type={showPass ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => setShowPass(!showPass)}>
                  {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>{' '}
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'create'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

export const Component = CreateAccount;
export const action = createAccountAcction;
