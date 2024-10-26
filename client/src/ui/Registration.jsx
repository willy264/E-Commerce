import React, { useState } from 'react'
import Login from './Login';

const Registration = () => {

  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  return (
    <div>
      {!login ? (
        <Login setLogin={setLogin} />
      ) : (
        <div className="bg-gray-950 rounded-lg">
          <form
            // onSubmit={handleRegistration}
            className="max-w-5xl mx-auto pt-10 px-10 lg:px-0 text-white"
          >
            <div className="border-b border-b-white/10 pb-5">
              <h2 className="text-lg font-semibold uppercase leading-7">
                Registration Form
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                You need to provide required information to get register with
                us.
              </p>
            </div>            
          </form>
        </div>
      )}
    </div>
  )
}

export default Registration