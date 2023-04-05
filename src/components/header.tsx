import { Button, Col, Layout, Menu, MenuProps, Row, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const headerStyle: React.CSSProperties = {
    width: "100%",
    height: "64px",
    position: "fixed",
    zIndex: 1,
    // backgroundColor: "#6495ED",
};

const items: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const { Header } = Layout;
const { Title } = Typography;

// Header of the index page, with a linker to page "/login"   
export const MainHeader = () => {
    const router = useRouter();
    return (
        // Create another header with title and nav bar
        <Header className="header" style={headerStyle}>
            <Row justify="center" align="middle" style={{ height: "100%" }}>
                <Col span={4} style={{ height: "100%" }}>
                    <div className="logo" style={{ float: "left" }}/>
                    <Title level={1} style={{ textAlign: "center", color: "white", fontSize: "2em"}}>
                        GIF Explorer
                    </Title>
                </Col>
                <Col span={20} style={{ height: "100%" }}>
                    <div style={{ float: "right" }}>
                        <Button type="link" onClick={() => { router.push("/login") }}>
                            <UserOutlined style={{ fontSize: '1.5rem', color: "white" }} />
                        </Button>
                    </div>
                    <div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            items={items}
                        />
                    </div>
                </Col>
            </Row>
        </Header>
    );
};
