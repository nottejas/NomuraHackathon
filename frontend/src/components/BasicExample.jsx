import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function BasicExample() {
  return (
    <Navbar expand="lg" className="fixed-top" style={{
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '1.5rem'
        }}>
          ✨ EventHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{
          borderColor: 'rgba(102, 126, 234, 0.5)'
        }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white-50 fw-semibold px-3" style={{
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.color = '#667eea'} onMouseLeave={(e) => e.target.style.color = ''}>
              🏠 Home
            </Nav.Link>
            <Nav.Link as={Link} to="/events" className="text-white-50 fw-semibold px-3" style={{
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.color = '#667eea'} onMouseLeave={(e) => e.target.style.color = ''}>
              🎉 Events
            </Nav.Link>
            <Nav.Link as={Link} to="/chat" className="text-white-50 fw-semibold px-3" style={{
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.color = '#667eea'} onMouseLeave={(e) => e.target.style.color = ''}>
              💬 Chat
            </Nav.Link>
            <Nav.Link as={Link} to="/charts" className="text-white-50 fw-semibold px-3" style={{
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.color = '#667eea'} onMouseLeave={(e) => e.target.style.color = ''}>
              📊 Analytics
            </Nav.Link>
            <Nav.Link as={Link} to="/maps" className="text-white-50 fw-semibold px-3" style={{
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.color = '#667eea'} onMouseLeave={(e) => e.target.style.color = ''}>
              🗺️ Maps
            </Nav.Link>

            <NavDropdown title="⚙️ More" id="basic-nav-dropdown" className="text-white-50 fw-semibold" style={{
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <NavDropdown.Item as={Link} to="/qr" style={{
                background: 'rgba(15, 23, 42, 0.95)',
                color: '#cbd5e1',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                e.target.style.color = '#667eea';
              }} onMouseLeave={(e) => {
                e.target.style.background = 'rgba(15, 23, 42, 0.95)';
                e.target.style.color = '#cbd5e1';
              }}>
                QR Code
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/ml-report" style={{
                background: 'rgba(15, 23, 42, 0.95)',
                color: '#cbd5e1',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                e.target.style.color = '#667eea';
              }} onMouseLeave={(e) => {
                e.target.style.background = 'rgba(15, 23, 42, 0.95)';
                e.target.style.color = '#cbd5e1';
              }}>
                ML Reports
              </NavDropdown.Item>
              <NavDropdown.Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              <NavDropdown.Item as={Link} to="/admin-login" style={{
                background: 'rgba(15, 23, 42, 0.95)',
                color: '#cbd5e1',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                e.target.style.color = '#667eea';
              }} onMouseLeave={(e) => {
                e.target.style.background = 'rgba(15, 23, 42, 0.95)';
                e.target.style.color = '#cbd5e1';
              }}>
                🔒 Admin Portal
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Link to="/login" className="btn me-2" style={{
              background: 'transparent',
              border: '2px solid #667eea',
              color: '#667eea',
              fontWeight: '600',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.target.style.background = '#667eea';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }} onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#667eea';
              e.target.style.transform = 'translateY(0)';
            }}>
              Login
            </Link>
            <Link to="/register" className="btn" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              color: 'white',
              fontWeight: '600',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.4)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
