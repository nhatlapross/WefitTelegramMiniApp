import FacebookWhite from "@/asset/icon/FacebookWhite";
import LinkedInWhite from "@/asset/icon/LinkedIn";
import LogoText from "@/asset/icon/LogoText";
import XWhite from "@/asset/icon/XWhite";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <LogoText />
                <div className="flex items-center gap-5">
                    <FacebookWhite />
                    <LinkedInWhite />
                    <XWhite />
                </div>
            </div>
            <div className="flex justify-end gap-1.5 font-bold text-white text-[10px] leading-normal">
                <Link href={"#"}>Terms of use</Link>
                <Link href={"#"}>Privacy policy</Link>
                <Link href={"#"}>Contact us</Link>
            </div>
        </footer>
    );
}