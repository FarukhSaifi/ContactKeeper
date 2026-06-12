import AuthForm from "@/components/forms/AuthForm";
import { AUTH_FORM_MODES } from "@/constants/forms";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, error, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (formData) => {
    await register(formData);
  };

  return (
    <Box className="w-full">
      <Box className="rounded-xl bg-white px-6 py-8 shadow-xl dark:bg-gray-800 sm:px-10">
        <Box className="mb-6 flex justify-center">
          <Avatar
            sx={{
              width: 64,
              height: 64,
              backgroundColor: (theme) => theme.palette.primary.main,
            }}
          >
            <LockOutlined sx={{ fontSize: 32 }} />
          </Avatar>
        </Box>

        <AuthForm mode={AUTH_FORM_MODES.REGISTER} onSubmit={handleSubmit} loading={loading} error={error} />
      </Box>
    </Box>
  );
};

export default Register;
