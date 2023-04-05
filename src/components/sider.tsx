import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

const items: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

// Sider
export const MainSider = () => {
    return (
        <Sider className="main-sider" width={200}>
            <Menu
                mode="inline"
                theme="dark"
                style={{ height: '100%', borderRight: 0 }}
                items={items}
            />
        </Sider>
    );
};