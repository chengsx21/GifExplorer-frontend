import { Layout, Divider } from 'antd';

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.65)',
    backgroundColor: '#001529',
    padding: 0,
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

// Footer of the index page
export const MainFooter = () => {
    return (
        <Footer style={footerStyle}>
            GIF Explorer
            <Divider
                type="vertical"
                style={{ height: '40%', borderInlineStart: '1px solid rgba(255, 255, 255, 0.65)', translate: '0 2px'}}
            />
            © 2023 Nullptr
        </Footer>
    );
};