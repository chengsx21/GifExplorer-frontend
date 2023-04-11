import { Avatar, Button, Col, Layout, Menu, MenuProps, Row, Space, Tooltip } from 'antd';
import { FileImageTwoTone, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../utils/hooks';
import { UserLocalInfo } from '../utils/types';

const headerStyle: React.CSSProperties = {
    width: "100%",
    height: "64px",
    // position: "fixed",
    zIndex: 1,
    paddingLeft: 40,
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
        <Header className="header" style={headerStyle}>
            <Row align="middle" style={{ height: "100%" }}>
                {/* Logo */}
                <Col span={4} style={{ height: "100%" }}>
                        <FileImageTwoTone style={{ fontSize: 20 }}/>
                        <Button type="text" onClick={() => router.push("/")}>
                            <h1 style={{ verticalAlign: "middle", margin: 0, color: "white" }}>
                                GIF Explorer
                            </h1>
                        </Button>
                </Col>
                
                {/* Nav */}
                <Col span={16} style={{ height: "100%" }}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={items}
                    />
                </Col>

                {/* User */}
                <Col span={4} style={{ height: "100%" }}>
                    <div style={{ float: "right" }}>
                        {!userInfo ? (
                            <Button type="link" onClick={() => router.push("/login")}>
                                <UserOutlined style={{ fontSize: '1.5rem', color: "white" }} />
                            </Button>
                        ) : (
                            <Button type="text" onClick={() => router.push(`/user/${userInfo.id}`)}>
                                <Space align="baseline">
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
