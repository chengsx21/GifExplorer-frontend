import { Button, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const headerStyle: React.CSSProperties = {
    position: 'fixed',
    paddingInline: 50,
    height: 60,
    backgroundColor: '#6495ED',
    display: 'flex',
    flexDirection: 'row',
};

const { Header, Footer, Sider, Content } = Layout;

// Header of the index page, with a linker to page "/login"   
export const MainHeader = () => {
    const router = useRouter();
    return (
        <Header style={headerStyle}>
            <div className="logo" />
            <div className="title">
                GIF Explorer
            </div>
            <div>
                <Button type="link" onClick={() => { router.push("/login") }}>
                    <UserOutlined style={{ fontSize: '1.5rem', color: "white" }} />
                </Button>
            </div>
        </Header>
    );
};
