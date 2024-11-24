import * as React from "react";
import Logo from "../../asset/icon/Logo";
import LogoText from "../../asset/icon/LogoText";
import GoogleIcon from "../../asset/icon/GoogleIcon";
import FacebookIcon from "../../asset/icon/FacebookIcon";
import { signIn } from 'next-auth/react';
import { Button, Input, Link } from "@nextui-org/react";

const Login = () => {
  return (
    <div className="p-6 rounded-lg max-w-sm mx-auto">
      <div className="flex flex-col items-center mb-6 mt-5">
        <LogoText />
      </div>
      <p className="text-gray-400 text-small mb-6 text-center">Log in to get full extensions</p>

      <div className="flex flex-col items-center mb-6">
        <Logo />
      </div>

      {/* <div className="w-full flex flex-col gap-4 mb-2">
        <div key="lg" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input size="lg" type="email" label="Email" />
        </div>
        <div key="lg" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input size="lg" type="password" label="Password" />
        </div>
      </div>

      <p className="text-gray-500 text-small text-left mb-5">
        Forgot your password? <a href="#" className="text-primary">Retrieve your password</a>
      </p>

      <div className="mt-5 mb-5">
        <Button isDisabled className="w-full bg-primary text-white" >Log in</Button>
      </div> */}

      <div className="flex items-center justify-center my-4 mt-4 mb-5">
        <hr className="flex-grow border-gray-700" />
        <span className="px-3 text-sm">Login with google</span>
        <hr className="flex-grow border-gray-700" />
      </div>

      <div className="flex flex-row mb-5">
        <Button startContent={<GoogleIcon />} size="md" className="button flex-1 mx-1" onPress={() => signIn()}>Google</Button>
        {/* <Button isDisabled startContent={<FacebookIcon />} size="md" className="button flex-1 mx-1">Facebook</Button> */}
      </div>

      <p className="text-gray-500 text-center text-small">
        By clicking Log in, you agree to our <a href="#" className="text-primary">Terms of use</a> and <a href="/policy" className="text-primary">Privacy policy</a>.
      </p>
    </div>
  );
}


export default Login;