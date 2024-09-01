import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast"; // Ensure this path is correct

import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function AuthRegister() {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast(); // Ensure this returns a valid toast function

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const resultAction = await dispatch(registerUser(formData));
      if (registerUser.fulfilled.match(resultAction)) {
        // If registration is successful, show a success toast and navigate to login
        toast({
          title: resultAction.payload.message,
          description: "You have successfully registered.",
          variant: "success",
        });
        navigate("/auth/login");
      } else {
        // Handle registration failure and show error toast, but do not navigate
        toast({
          title: "Registration Failed",
          description:
            resultAction.payload?.message ||
            "User already exists. Please try with another email.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Handle any errors that occur during the registration process
      toast({
        title: "Error",
        description: "An error occurred during registration",
        variant: "destructive",
      });
      console.error("An error occurred during registration", error);
    }
  }


  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl tracking-tight text-foreground font-bold">
          Create a new Account <br />
          Sign Up Here!
        </h1>
      </div>

      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <p className="mt-2">
        Already have an account?
        <Link
          className="font-bold text-green-500 hover:underline ml-2"
          to="/auth/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default AuthRegister;
