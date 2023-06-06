"use client";

import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer/";

import { useEffect, useState } from "react";

interface CodeProps {
  code: string;
  show: boolean;
  animationDelay?: number;
  animated?: boolean;
  language: string;
}

const Code: React.FC<CodeProps> = ({
  code,
  animated,
  show,
  animationDelay,
  language,
}) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState(animated ? "" : code);
  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i = i + 1;
          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);
        return () => clearInterval(intervalId);
      }, animationDelay || 150);
    }
  }, [code, animated, show, animationDelay]);

  // number of lines
  const lines = text.split(/\r\n|\r|\n/).length;
  const theme =
    applicationTheme === "light" ? themes.nightOwlLight : themes.nightOwl;

  return (
    <Highlight code={text} theme={theme} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className + "transition-all w-fit bg-transparent duration-100 py-0"
          }

        >
          {tokens.map((line, key) => (
            <div key={key} {...getLineProps({ line })} className="relative">
              <span className="select-none">{key + 1} </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
export default Code;
