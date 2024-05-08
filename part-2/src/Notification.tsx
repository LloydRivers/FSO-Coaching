import "./style.css";
const Notification = ({ message }: { message: string | null }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
