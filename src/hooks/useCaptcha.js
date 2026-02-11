import { useCallback, useState } from "react";

const CAPTCHA_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";

export function useCaptcha(captchaLength) {
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");

  const generateCaptcha = useCallback((captchaLength) => {
    let res = "";
    for (let i = 0; i < captchaLength; i++) {
      res += CAPTCHA_CHARS.charAt(
        Math.floor(Math.random() * CAPTCHA_CHARS.length),
      );
    }
    setGeneratedCaptcha(res);
  }, []);

  return { generatedCaptcha, generateCaptcha };
}
