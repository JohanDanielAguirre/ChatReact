const Button = ({ text }) => {
  return (
    <button style={styles.button} type="submit">
      {text}
    </button>
  );
};

const styles = {
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Button;
