import React, { useMemo } from "react";
import { FaUserPlus } from "react-icons/fa";
import styles from "../styles/Home.module.css";
import usersData from "../data/users.json";
import { useSelector } from "react-redux"; 

const SuggestedConnections = ({ connections = {}, handleConnect, currentUsername }) => {
  const isConnectionsObject =
    typeof connections === "object" && !Array.isArray(connections);

  const searchTerm = useSelector((state) => state.search.searchTerm);  
  const suggestedUsers = useMemo(() => {
    if (!connections) return usersData.slice(0, 3); 

    return usersData
      .filter((user) =>
        isConnectionsObject
          ? !connections[user.id]
          : !connections.some((conn) => conn.id === user.id)
      )
      .filter((user) => !currentUsername || user.name !== currentUsername) 
      .filter((user) => 
        searchTerm === "" || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
        user.headline.toLowerCase().includes(searchTerm.toLowerCase()) 
      )
      .slice(0, 3);
  }, [connections, currentUsername,searchTerm]);

  return (
    <div className={styles.sidebar}>
      <h5 className="text-center mb-3">People You May Know</h5>
      {suggestedUsers.length === 0 ? (
        <p className="text-center" style={{color:"grey"}}> {searchTerm ? "No connections match your search" : "No new connections available"}</p>
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
      
    </div>
  );
};

export default SuggestedConnections;
