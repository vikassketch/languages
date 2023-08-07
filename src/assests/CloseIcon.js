const CloseIcon = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      onClick={onClick}
      style={{
        cursor: "pointer",
        marginBottom: "12px"
      }}
    >
      <path
        d="M20.5834 9.20835L13 16.7917L5.41669 9.20835"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default CloseIcon;
