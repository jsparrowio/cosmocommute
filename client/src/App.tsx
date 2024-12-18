
import './App.css';
import HeaderContent from './components/Header';
import FooterContent from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import WeatherPage from './pages/WeatherPage';
import TrafficPage from './pages/TrafficPage';
import Nav from './components/Nav';
import { Layout } from 'antd'
import { Button, } from 'antd';

// function to render entire React single page application
const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#73A8C2',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#2E5F87',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#73A8C2',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
};

const App: React.FC = () => {

  return (
    <Router>
      <Layout style = {layoutStyle}>
        <Header style = {headerStyle}>
          <HeaderContent />
        </Header>
        <Nav />
        <Content className='main-content' style = {contentStyle}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Dashboard" element={<DashboardPage />} />
            <Route path="/Weather" element={<WeatherPage />} />
            <Route path="/Traffic" element={<TrafficPage />} />
          </Routes>
        </Content>
        <Footer style = {footerStyle}>
          <FooterContent />
        </Footer>
      </Layout>
    </Router>
  )
};
export default App;