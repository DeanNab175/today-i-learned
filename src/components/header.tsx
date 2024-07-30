interface HeaderProps {
  showForm: boolean;
  onToggleForm: () => void;
}
function Header({ showForm, onToggleForm }: HeaderProps) {
  const appTitle = "Today I Learned";

  return (
    <header className="header">
      <div className="logo">
        <img
          src="logo.png"
          height="68"
          width="68"
          alt="Today I Learned Logo"
        />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-share"
        onClick={onToggleForm}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  )
}

export default Header