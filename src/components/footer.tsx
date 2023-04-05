import { Layout } from 'antd';

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#6495ED',
};

// Footer of the index page
export const MainFooter = () => {
    return (
        <Footer style={footerStyle}>
            GIF Explorer ©2023 Created by Nullptr
        </Footer>
    );
};