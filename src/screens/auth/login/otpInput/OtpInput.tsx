/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../utils";
import AuthContext from "../../../../contexts/authContext/authContext";

type OtpInputProps = {
  otp: string[];
  realOtp: string;
  email: string;
  handleOTPChange: (value: string, index: number) => void;
};

export const OtpInput = ({
  otp,
  realOtp,
  email,
  handleOTPChange,
}: OtpInputProps) => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [isInvalid, setIsInvalid] = useState(false);
  const getHomeRedirect = (user: any) => {
    if (!user) return "/login";
    return user.role === "ADMIN" ? "/admin/events" : "/client/";
  };
  const handleLoginUser = async () => {
    try {
      const payload = { email: email };
      const response = await api.auth.userLogin(payload);
      setUser(response);
      console.log("user data received:", getHomeRedirect(response));
      navigate(getHomeRedirect(response));
    } catch (error) {
      console.log("first error", error);
    }
  };

  useEffect(() => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length === realOtp.length) {
      if (enteredOtp === realOtp) {
        handleLoginUser();
      } else {
        setIsInvalid(true);
      }
    } else {
      setIsInvalid(false); // Reset if user is still typing
    }
  }, [otp, realOtp]);

  return (
    <div className="flex gap-4 mb-4">
      {otp.map((digit: any, index: any) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          ref={(el) => {
            if (el) inputsRef.current[index] = el;
          }}
          onChange={(e) => {
            handleOTPChange(e.target.value, index);
            if (e.target.value && index < otp.length - 1) {
              inputsRef.current[index + 1]?.focus(); // Auto-focus next
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !otp[index] && index > 0) {
              inputsRef.current[index - 1]?.focus(); // Go back
            }
          }}
          className={`w-12 h-12 text-xl text-center border rounded-lg focus:outline-none focus:ring-2 ${
            isInvalid
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-black"
          }`}
        />
      ))}
    </div>
  );
};
