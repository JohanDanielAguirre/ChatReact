const Input = ({ placeholder, value, onChange }) => {
  return <input placeholder={placeholder} value={value} onChange={onChange} style={styles.input} />;
};

const styles = {
  input: {
    padding: "10px",
    fontSize: "16px",
  },
};

export default Input;
