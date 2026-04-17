import React from "react";

function UsernameInputs({ usernames, setUsernames }) {
  const platforms = ["github", "leetcode", "codeforces"];

  const handleChange = (platform, value) => {
    setUsernames((prev) => ({ ...prev, [platform]: value }));
  };

  return (
    <div className="username-inputs">
      <h2>Enter Usernames</h2>

      {platforms.map((platform) => (
        <div key={platform} className="input-group">
          <label>
            {platform.charAt(0).toUpperCase() +
              platform.slice(1)}
          </label>
          <input
            type="text"
            value={usernames[platform]}
            onChange={(e) =>
              handleChange(platform, e.target.value)
            }
            placeholder="Enter username"
          />
        </div>
      ))}
    </div>
  );
}

export default UsernameInputs;
