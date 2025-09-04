import { LockOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/forms/AuthForm";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const { register, error, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await register(formData);
      // Navigation will be handled by the useEffect above
    } catch (err) {
      // Error is handled by the auth context
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-lg sm:px-10">
          <div className="flex justify-center mb-6">
            <Avatar
              sx={{
                width: 64,
                height: 64,
                backgroundColor: (theme) => theme.palette.primary.main,
              }}
            >
              <LockOutlined sx={{ fontSize: 32 }} />
            </Avatar>
          </div>

          <AuthForm mode="register" onSubmit={handleSubmit} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Register;
