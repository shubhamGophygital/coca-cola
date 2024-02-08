import "./MessageLayout.css";

export default function MessageLayout({
  image,
  messageTitle = "",
  messageSubtitle = "",
  children,
  className = "",
}) {
  return (
    <div className={`message_layout_container ${className}`}>
      {image && <img src={image} alt="image" />}
      <h1>{messageTitle}</h1>
      <p>{messageSubtitle}</p>
      {children}
    </div>
  );
}
