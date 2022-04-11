import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { withSessionSsr } from "../../@lib/session";
import { tokenOnly } from "../../@routes/tokenOnly";
import { FaLock, FaUnlock } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <>
      <div className="flex items-center justify-center mt-52">
        <div className="bg-main-300 rounded-md w-[50rem] h-fit px-1 py-1">
          <div className="flex flex-col items-start space-y-3">
            <FormQuestion
              value={email}
              dispatch={setEmail}
              name={"E-mail Adddress"}
              type={"email"}
              placeholder="Your account email address"
            />
            <FormQuestion
              value={password}
              dispatch={setPassword}
              name="Password"
              type="password"
              placeholder="Your account password"
            />
            <button className="bg-main-200 disabled:cursor-not-allowed text-white px-2 py-1 rounded-md text-lg font-semibold">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

interface QuestionProps {
  dispatch: Dispatch<SetStateAction<(string | undefined) | string>>;
  value: (string | undefined) | string;
  placeholder: string;
  name: string;
  type: "text" | "email" | "password";
}

function FormQuestion({
  dispatch,
  value,
  placeholder,
  name,
  type,
}: QuestionProps) {
  const [passwordState, setPasswordState] = useState("password");
  const [validEmail, setValidEmail] = useState(true);

  var pattern = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-white text-lg font-semibold">{name}</p>
      <div className="flex items-center space-x-1">
        <input
          type={type == "password" ? passwordState : "text"}
          placeholder={placeholder}
          value={value}
          className={clsx(
            "outline-none px-1 py-1 rounded-md bg-main-200 text-white placeholder:text-white w-[30rem]",
            !validEmail ? "border border-rose-600" : ""
          )}
          onChange={(e) => {
            dispatch(e.target.value);

            if (type == "email") {
              if (!pattern.test(e.target.value)) {
                setValidEmail(false);
              } else {
                setValidEmail(true);
              }
            }
          }}
        />
        {type == "password" ? (
          <>
            {passwordState == "password" ? (
              <FaLock
                className="text-white cursor-pointer"
                onClick={() => setPasswordState("text")}
              />
            ) : (
              <FaUnlock
                className="text-white cursor-pointer"
                onClick={(e) => setPasswordState("password")}
              />
            )}
          </>
        ) : null}
      </div>
      {!validEmail && (
        <p className="text-rose-600 text-sm">
          Please input a valid email address
        </p>
      )}
    </div>
  );
}

export const getServerSideProps = withSessionSsr(tokenOnly);
