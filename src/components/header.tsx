import { Avatar, Button, Col, Layout, Menu, MenuProps, Row, Space, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../utils/hooks';
import { UserLocalInfo } from '../utils/types';

const headerStyle: React.CSSProperties = {
    width: "100%",
    height: "64px",
    // position: "fixed",
    zIndex: 1,
    // backgroundColor: "#6495ED",
};

const items: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const { Header } = Layout;

// Header of the index page, with a linker to page "/login"   
export const MainHeader: React.FC = () => {
    // Hooks
    const router = useRouter();
    const [userInfo, setUserInfo] = useLocalStorage("userInfo", undefined as UserLocalInfo | undefined);

    // Header
    return (
        // Create another header with title and nav bar
        <Header className="header" style={headerStyle}>
            <Row justify="center" align="middle" style={{ height: "100%" }}>
                <Col span={4} style={{ height: "100%" }}>
                    <Space align="center">
                        <div className="logo" style={{ float: "left" }} />
                        <Button type="text" onClick={() => router.push("/")}>
                            <h1 style={{ margin: 0, color: "white" }}>
                                GIF Explorer
                            </h1>
                        </Button>
                    </Space>
                </Col>
                <Col span={16} style={{ height: "100%" }}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={items}
                    />
                </Col>
                <Col span={4} style={{ height: "100%" }}>
                    <div style={{ float: "right" }}>
                        {!userInfo ? (
                            <Button type="link" onClick={() => router.push("/login")}>
                                <UserOutlined style={{ fontSize: '1.5rem', color: "white" }} />
                            </Button>
                        ) : (
                            <Button type="text" onClick={() => router.push(`/user/${userInfo.id}`)}>
                                <Space align="center">
                                    <Avatar style={{ backgroundColor: "grey" }}>
                                        {userInfo.user_name[0]}
                                    </Avatar>
                                    <span style={{ color: "white" }}>
                                        {userInfo.user_name}
                                    </span>
                                </Space>
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
        </Header>
    );
};
