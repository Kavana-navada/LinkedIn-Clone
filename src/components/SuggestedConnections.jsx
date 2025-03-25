import React, { useMemo } from "react";
import { FaUserPlus } from "react-icons/fa";
import styles from "../styles/Home.module.css";
import usersData from "../data/users.json";

const SuggestedConnections = ({ connections = {}, handleConnect, currentUsername }) => {
  const isConnectionsObject =
    typeof connections === "object" && !Array.isArray(connections);

  const suggestedUsers = useMemo(() => {
    if (!connections) return usersData.slice(0, 3); 

    return usersData
      .filter((user) =>
        isConnectionsObject
          ? !connections[user.id]
          : !connections.some((conn) => conn.id === user.id)
      )
      .filter((user) => !currentUsername || user.name !== currentUsername) // ✅ Exclude only if username exists
      .slice(0, 3);
  }, [connections, currentUsername]);

  return (
    <div className={styles.sidebar}>
      <h5 className="text-center mb-3">People You May Know</h5>
      {suggestedUsers.length === 0 ? (
        <p className="text-center">No new connections available</p>
      ) : (
        suggestedUsers.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
            <div className={styles.userInfo}>
              <p>{user.name}</p>
              <span>{user.headline}</span>
              <button
                className={styles.connectButton}
                onClick={() => handleConnect(user.id)}
              >
                <FaUserPlus className={styles.btnicon} /> Connect
              </button>
            </div>
          </div>
        ))
      )}
      <button
        className={styles.viewMoreButton}
        onClick={() => (window.location.href = "/connections")}
      >
        View More Connections
      </button>
    </div>
  );
};

export default SuggestedConnections;
