import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const items: MenuProps['items'] = new Array(3).fill(null).map(
    (_, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);

// Sider
export const MainSider = () => {
    return (
        <Sider width={200}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
            > {
                Array(3).fill(null).map((_, index) => {
                    const key = String(index + 1);
                    return (
                        <Menu.Item key={key} label={key}>
                            <span>nav {key}</span>
                        </Menu.Item>
                    );
                })
            } </Menu>
        </Sider>
    );
};