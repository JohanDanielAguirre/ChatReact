const Message = ({ message }) => {
  return (
    <div style={styles.message}>
      <p>
        <strong>{message.sender}:</strong> {message.content}
      </p>
    </div>
  );
};

const styles = {
  message: {
    marginBottom: "10px",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "5px",
  },
};

export default Message;
