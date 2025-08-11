import { useState } from "react";
// import { api } from "../../../utils";
import { OtpInput } from "./otpInput/OtpInput";
// import { decryptDataFrontend } from "../../../utils/commonFunctions/dycryptData";

export const Login = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [realOtp, setRealotp] = useState("");
  const [email, setEmail] = useState("");

  const handleOTPChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handlegetPasscode = async () => {
    setOtp(["", "", "", ""]);

    try {
      // const payload = { email: email };
      // const result = await api.auth.getPasscode(payload);
      // console.log("Passcode received:", decryptDataFrontend(result));
      setRealotp("1234");
      console.log(realOtp);
      setShowOTP(true);
    } catch (error) {
      console.error("Error fetching passcode:", error);
    }
  };
  return (
    <div className="sm:flex h-screen w-full">
      {/* Left Side - Image Placeholder */}
      <div className="sm:w-1/2 bg-[#202226] flex items-center justify-center">
        <img
          src="https://framerusercontent.com/images/3hAyZ00oRc483dBqSEyAZsbu7Ls.png"
          alt="Map Illustration"
          className="w-[60%] my-10 sm:my-0 sm:max-w-xl  object-contain"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="sm:w-1/2 rounded-t-2xl -mt-4 sm:rounded-t sm:mt-0 pt-16 sm:pt-0 bg-white flex items-center justify-center">
        <div className="w-full flex flex-col px-10 sm:px-20">
          {/* Logo SVG */}
          <h1 className="text-lg font-semibold text-gray-800 tracking-widest mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75.734"
              height="19.364"
              fill="none"
              overflow="visible"
              className="mb-10"
            >
              <g>
                <path
                  d="M 0 19.364 L 0 0 L 75.734 0 L 75.734 19.364 Z"
                  fill="transparent"
                ></path>
                <path
                  d="M 61.603 3.818 L 61.603 0 L 75.679 0 L 75.679 3.818 L 70.696 3.818 L 70.696 19.364 L 66.71 19.364 L 66.71 3.818 Z"
                  fill="rgb(32, 34, 38)"
                  opacity="0.48"
                ></path>
                <path
                  d="M 54.503 0 L 54.503 15.41 L 61.479 15.41 L 61.479 19.364 L 50.517 19.364 L 50.517 0 Z"
                  fill="rgb(32, 34, 38)"
                  opacity="0.48"
                ></path>
                <path
                  d="M 36.379 19.364 L 32.324 19.364 L 38.651 0 L 42.443 0 L 48.773 19.364 L 44.646 19.364 L 43.378 14.524 L 40.511 14.524 L 37.643 14.524 Z M 40.043 5.982 L 38.397 11.633 L 42.648 11.633 L 41.003 5.982 C 40.811 5.325 40.595 4.564 40.523 4.091 C 40.451 4.537 40.259 5.273 40.043 5.982 Z"
                  fill="rgb(32, 34, 38)"
                  opacity="0.48"
                ></path>
                <path
                  d="M 27.056 12.324 C 26.256 10.721 26.27 8.765 27.094 7.144 C 28.067 5.234 29.24 2.882 30.102 1.002 C 30.116 0.971 30.13 0.942 30.144 0.912 C 30.208 0.781 30.37 0.441 30.58 0 L 26.234 0 C 25.468 1.621 24.533 3.491 23.721 5.087 C 22.264 7.952 22.219 11.45 23.668 14.352 L 26.171 19.364 L 30.57 19.364 L 30.1 18.42 Z"
                  fill="rgb(32, 34, 38)"
                  opacity="0.48"
                ></path>
                <path
                  d="M 16.546 12.324 C 17.347 10.721 17.332 8.765 16.508 7.144 C 15.536 5.234 14.363 2.882 13.5 1.002 C 13.486 0.971 13.472 0.942 13.458 0.912 C 13.395 0.781 13.232 0.441 13.022 0 L 17.368 0 C 18.135 1.621 19.069 3.491 19.881 5.087 C 21.338 7.952 21.383 11.45 19.935 14.352 L 17.432 19.364 L 13.033 19.364 L 13.502 18.42 Z"
                  fill="rgb(32, 34, 38)"
                  opacity="0.48"
                ></path>
                <path
                  d="M 11.278 19.364 L 0 19.364 L 0 0 L 11.258 0 L 11.258 3.804 L 3.867 3.804 L 3.867 7.614 L 10.418 7.614 L 10.418 11.344 L 3.867 11.344 L 3.867 15.364 L 11.258 15.364 Z"
                  fill="rgb(32, 34, 38)"
                  opacity="0.48"
                ></path>
              </g>
            </svg>
          </h1>

          <h2 className="text-3xl font-bold mb-8 text-black">
            Sign in to your dashboard
          </h2>

          {/* Email Input or OTP Box */}
          {!showOTP ? (
            <>
              <input
                type="email"
                placeholder="Enter Login Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="sm:w-[80%] px-4 py-2.5 rounded-lg bg-gray-200 focus:ring-2 focus:ring-black mb-4"
              />
              <a
                href="#"
                className="text-md font-semibold text-purple-600 pl-2 group inline-block relative"
                onClick={handlegetPasscode}
              >
                <span className="relative z-10">
                  Send Passcode
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </>
          ) : (
            <>
              <OtpInput
                otp={otp}
                realOtp={"1234"}
                handleOTPChange={handleOTPChange}
                email={email}
              />
              <a
                className="text-md font-semibold text-purple-600 pl-2 group inline-block relative"
                onClick={handlegetPasscode}
              >
                <span className="relative z-10">
                  Resend Passcode
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
