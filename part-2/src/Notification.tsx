const Notification = ({ message }: { message: string | null }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      style={{
        color: "red",
        border: "1px solid red",
        padding: "8px",
        borderRadius: "4px",
        marginTop: "10px",
        backgroundColor: "grey",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
