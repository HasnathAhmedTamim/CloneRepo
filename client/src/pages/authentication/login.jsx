import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function AuthLogin() {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

// function onSubmit(event) {
//   event.preventDefault();

//   dispatch(loginUser(formData)).then((data) => {
//     if (data?.payload?.success) {
//       toast({
//         title: data?.payload
//       });
//     } else {
//       toast({
//         title: data?.payload,
//         variant: "destructive",
//       });
//     }
//     console.log(data)
//   });
// }

async function onSubmit(event) {
  event.preventDefault();

  try {
    const resultAction = await dispatch(loginUser(formData));
    console.log(resultAction.payload.message)
    if (loginUser.fulfilled.match(resultAction)) {
      if (resultAction.payload.success) {
        // If login is successful, show a success toast
        toast({
          title: resultAction.payload.message,
          description: "You have successfully logged in.",
          variant: "success",
        });
        // Optionally handle redirection logic here if needed
      } else {
        // Handle login failure and show error toast
        toast({
          title: resultAction.payload.message ,
          
          variant: "destructive",
        });
      }
    } else {
      // Handle case where resultAction does not match fulfilled
      toast({
        title: resultAction.payload.message,
        
        variant: "destructive",
      });
    }
  } catch (error) {
    // Handle any errors that occur during the login process
    toast({
      title: "Error",
      description: "An unexpected error occurred during login.",
      variant: "destructive",
    });
    console.error("An error occurred during login", error);
  }
}

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl tracking-tight text-foreground font-bold">
          Login to Your Account <br />
        </h1>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <p className="mt-2">
        Want to Create a new account?
        <Link
          className="font-bold text-green-500 hover:underline ml-2"
          to="/auth/register"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default AuthLogin;
