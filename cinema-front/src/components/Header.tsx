
const Header = () => {
  
  const resetLocalStorage = () => {
    localStorage.clear();
  }

  return (
    <>
        <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <a href="/" className='navbar-brand' onClick={resetLocalStorage}>Cinema Management</a>
            </nav>
        </header>
    </>
  )
}

export default Header